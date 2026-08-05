const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const htmlSource = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const exportSource = fs.readFileSync(path.join(root, 'js/cv-export.js'), 'utf8');
const generatorSource = fs.readFileSync(path.join(root, 'scripts/generate-pdfs.js'), 'utf8');
const expected = [
  'assets/pdf/stefan-sturm-cv-de.pdf',
  'assets/pdf/stefan-sturm-cv-en.pdf',
  'assets/pdf/stefan-sturm-expanded-cv-de.pdf',
  'assets/pdf/stefan-sturm-expanded-cv-en.pdf',
];

assert.match(exportSource, /const STATIC_PDF_VERSION = '20260805-pdf-size-v1'/);
assert.match(htmlSource, /js\/cv-export\.js\?v=20260805-pdf-size/);
assert.match(generatorSource, /assets', 'stefan-cv\.jpg'/);
assert.match(generatorSource, /data:image\/jpeg;base64/);
const portraitPath = path.join(root, 'assets', 'stefan-cv.jpg');
assert.ok(fs.existsSync(portraitPath), 'missing optimized PDF portrait');
assert.ok(fs.statSync(portraitPath).size < 200_000, 'optimized PDF portrait is unexpectedly large');
assert.match(generatorSource, /format: 'expanded'[^\n]*pages: 9[^\n]*aiHeading: 'AI-gestützte Entwicklung'/);
assert.match(generatorSource, /format: 'expanded'[^\n]*pages: 9[^\n]*aiHeading: 'AI-Supported Development'/);
assert.match(generatorSource, /texts\[2\]/);
assert.match(exportSource, /const STATIC_PDF_ASSETS = \{/);
assert.match(exportSource, /link\.download = filename/);
assert.match(exportSource, /\?v=\$\{encodeURIComponent\(STATIC_PDF_VERSION\)\}/);
assert.doesNotMatch(exportSource, /function downloadCv[\s\S]*?getCvPhotoDataUrl\(\)/);
assert.doesNotMatch(exportSource, /function downloadCv[\s\S]*?openCvDocument\(/);
expected.forEach(asset => assert.ok(exportSource.includes(asset), `missing ${asset}`));

for (const asset of expected) {
  const artifactPath = path.join(root, asset);
  assert.ok(fs.existsSync(artifactPath), `missing generated artifact ${asset}`);
  const maxBytes = asset.includes('expanded') ? 2_000_000 : 1_000_000;
  assert.ok(fs.statSync(artifactPath).size < maxBytes, `${asset} is unexpectedly large`);
}

console.log('Static PDF download contract passed');
