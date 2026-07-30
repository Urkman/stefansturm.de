const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { pathToFileURL } = require('node:url');
const { spawnSync } = require('node:child_process');

const ROOT = path.resolve(__dirname, '..');
const ASSET_DIR = path.join(ROOT, 'assets', 'pdf');
const TMP_DIR = path.join(ROOT, 'tmp', 'pdfs', `static-export-${Date.now()}`);
const CHROME_BIN = process.env.CHROME_BIN || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const ARTIFACTS = [
  { language: 'de', format: 'compact', file: 'stefan-sturm-cv-de.pdf', heading: 'Technische Kenntnisse', pages: 2 },
  { language: 'en', format: 'compact', file: 'stefan-sturm-cv-en.pdf', heading: 'Technical Skills', pages: 2 },
  { language: 'de', format: 'expanded', file: 'stefan-sturm-expanded-cv-de.pdf', heading: 'Technische Kenntnisse', minPages: 3 },
  { language: 'en', format: 'expanded', file: 'stefan-sturm-expanded-cv-en.pdf', heading: 'Technical Skills', minPages: 3 },
];

function run(command, args, options = {}) {
  const result = spawnSync(command, args, { encoding: 'utf8', ...options });
  if (result.error) throw result.error;
  if (result.status !== 0) {
    const output = `${result.stdout || ''}${result.stderr || ''}`.trim();
    throw new Error(`${command} failed with exit code ${result.status}${output ? `: ${output}` : ''}`);
  }
  return result.stdout || '';
}

function loadRenderer() {
  const context = {
    localStorage: { getItem: () => null, setItem: () => {} },
    window: { matchMedia: () => ({ matches: false }) },
    document: {
      documentElement: { setAttribute: () => {}, getAttribute: () => null },
      addEventListener: () => {},
    },
  };
  vm.createContext(context);

  for (const file of ['js/data.js', 'js/main.js']) {
    vm.runInContext(fs.readFileSync(path.join(ROOT, file), 'utf8'), context, { filename: file });
  }

  const exportSource = `${fs.readFileSync(path.join(ROOT, 'js/cv-export.js'), 'utf8')}
this.__renderStaticCv = (language, format, photoDataUrl) => {
  currentLang = language;
  activeCV = localizeCV(language);
  return format === 'expanded'
    ? buildExpandedCvHtml(photoDataUrl)
    : buildCvHtml(photoDataUrl);
};`;
  vm.runInContext(exportSource, context, { filename: 'js/cv-export.js' });
  return context.__renderStaticCv;
}

function extractPageSelectors(html, format) {
  const className = format === 'expanded' ? 'cv-expanded-page' : 'cv-page';
  const pattern = new RegExp(`<section class="${className}[^\"]*" data-page="([^"]+)"`, 'g');
  return [...html.matchAll(pattern)].map(match => match[1]);
}

function singlePageHtml(html, format, selector) {
  const className = format === 'expanded' ? 'cv-expanded-page' : 'cv-page';
  const attribute = JSON.stringify(selector);
  const display = format === 'expanded' && selector === 'cover' ? 'flex' : 'block';
  const pageFilter = `<style>
    @media print {
      .${className}{display:none!important;break-before:auto!important;break-after:auto!important;page-break-before:auto!important;page-break-after:auto!important}
      .${className}[data-page=${attribute}]{display:${display}!important}
    }
  </style>`;
  return html.replace('</head>', `${pageFilter}</head>`);
}

function mergePdfs(outputPath, pagePaths) {
  run('python3', [path.join(ROOT, 'scripts', 'merge-pdfs.py'), outputPath, ...pagePaths]);
}

function validatePdf(filePath, artifact) {
  const info = run('pdfinfo', [filePath]);
  const pageCount = Number(info.match(/^Pages:\s+(\d+)/m)?.[1]);
  if (!Number.isInteger(pageCount)) throw new Error(`Could not read page count from ${artifact.file}`);
  if (artifact.pages && pageCount !== artifact.pages) {
    throw new Error(`${artifact.file} has ${pageCount} pages; expected ${artifact.pages}`);
  }
  if (artifact.minPages && pageCount < artifact.minPages) {
    throw new Error(`${artifact.file} has ${pageCount} pages; expected at least ${artifact.minPages}`);
  }
  if (!/^Page size:\s+594\.96 x 841\.92 pts \(A4\)$/m.test(info)) {
    throw new Error(`${artifact.file} is not A4`);
  }
  if (!/^Encrypted:\s+no$/m.test(info)) {
    throw new Error(`${artifact.file} is encrypted`);
  }

  const validationScript = String.raw`
from pypdf import PdfReader
import sys

pdf_path, expected_heading = sys.argv[1:]
reader = PdfReader(pdf_path)
texts = [(page.extract_text() or '').strip() for page in reader.pages]
if any(not text for text in texts):
    raise SystemExit('PDF contains an empty page')
uris = []
for page in reader.pages:
    for annotation in page.get('/Annots', []):
        action = annotation.get_object().get('/A')
        if action and action.get('/URI'):
            uris.append(str(action['/URI']).rstrip('/'))
if 'https://stefansturm.de' not in uris:
    raise SystemExit('PDF does not contain a website link')
if expected_heading.lower() not in texts[1].lower():
    raise SystemExit(f'PDF page 2 does not contain {expected_heading!r}')
`;
  run('python3', ['-c', validationScript, filePath, artifact.heading]);
}

function generateArtifact(renderHtml, artifact, photoDataUrl) {
  const pdfPath = path.join(TMP_DIR, artifact.file);
  const html = renderHtml(artifact.language, artifact.format, photoDataUrl);
  const selectors = extractPageSelectors(html, artifact.format);
  if (!selectors.length) throw new Error(`No printable pages found for ${artifact.file}`);
  const pagePaths = selectors.map((selector, index) => {
    const htmlPath = path.join(TMP_DIR, `${artifact.file}-${index + 1}.html`);
    const pagePath = path.join(TMP_DIR, `${artifact.file}-${index + 1}.pdf`);
    fs.writeFileSync(htmlPath, singlePageHtml(html, artifact.format, selector));
    run(CHROME_BIN, [
      '--headless',
      '--disable-gpu',
      '--no-pdf-header-footer',
      `--print-to-pdf=${pagePath}`,
      pathToFileURL(htmlPath).href,
    ], { stdio: 'pipe' });
    return pagePath;
  });
  mergePdfs(pdfPath, pagePaths);
  validatePdf(pdfPath, artifact);
  console.log(`Validated ${artifact.file}`);
}

function main() {
  if (!fs.existsSync(CHROME_BIN)) {
    throw new Error(`Chrome executable not found at ${CHROME_BIN}. Set CHROME_BIN to a headless Chrome binary.`);
  }
  const portraitPath = path.join(ROOT, 'assets', 'stefan.png');
  if (!fs.existsSync(portraitPath)) throw new Error(`Portrait not found at ${portraitPath}`);

  fs.mkdirSync(TMP_DIR, { recursive: true });
  try {
    const renderHtml = loadRenderer();
    const photoDataUrl = `data:image/png;base64,${fs.readFileSync(portraitPath).toString('base64')}`;
    for (const artifact of ARTIFACTS) generateArtifact(renderHtml, artifact, photoDataUrl);
    fs.mkdirSync(ASSET_DIR, { recursive: true });
    for (const artifact of ARTIFACTS) {
      fs.renameSync(path.join(TMP_DIR, artifact.file), path.join(ASSET_DIR, artifact.file));
    }
  } finally {
    fs.rmSync(TMP_DIR, { recursive: true, force: true });
  }
}

try {
  main();
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
