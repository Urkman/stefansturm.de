const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const exportSource = fs.readFileSync(path.join(root, 'js/cv-export.js'), 'utf8');
const generatorSource = fs.readFileSync(path.join(root, 'scripts/generate-pdfs.js'), 'utf8');
const expected = [
  'assets/pdf/stefan-sturm-cv-de.pdf',
  'assets/pdf/stefan-sturm-cv-en.pdf',
  'assets/pdf/stefan-sturm-expanded-cv-de.pdf',
  'assets/pdf/stefan-sturm-expanded-cv-en.pdf',
];

assert.match(exportSource, /const STATIC_PDF_VERSION = '20260805-project-architecture-tags-v1'/);
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
  assert.ok(fs.existsSync(path.join(root, asset)), `missing generated artifact ${asset}`);
}

console.log('Static PDF download contract passed');
