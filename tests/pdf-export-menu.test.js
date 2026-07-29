const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const css = fs.readFileSync(path.join(root, 'css/styles.css'), 'utf8');
const main = fs.readFileSync(path.join(root, 'js/main.js'), 'utf8');
const pdf = fs.readFileSync(path.join(root, 'js/cv-export.js'), 'utf8');
const data = fs.readFileSync(path.join(root, 'js/data.js'), 'utf8');

assert.equal((html.match(/data-pdf-menu/g) || []).length, 2);
assert.equal((html.match(/data-cv-export="compact"/g) || []).length, 2);
assert.equal((html.match(/data-cv-export="expanded"/g) || []).length, 2);
assert.equal((html.match(/aria-haspopup="menu"/g) || []).length, 2);
assert.match(css, /\.pdf-export-options/);
assert.match(css, /\.pdf-export-option/);
assert.match(css, /@media \(max-width: 639px\)/);
assert.match(main, /setupPdfExportMenus\(\)/);
assert.match(pdf, /function setupPdfExportMenus\(\)/);
assert.match(pdf, /event\.key === 'Escape'/);
assert.match(pdf, /event\.key === 'ArrowDown'/);
assert.match(pdf, /event\.key === 'ArrowUp'/);
assert.match(pdf, /downloadCv\(option\.dataset\.cvExport\)/);

[
  'pdfExportMenu',
  'compactCvTitle',
  'compactCvDescription',
  'expandedCvTitle',
  'expandedCvDescription',
  'cvExpandedLabel',
  'cvStatistics',
].forEach(key => {
  assert.equal((data.match(new RegExp(`${key}:`, 'g')) || []).length, 2, `missing bilingual ${key}`);
});

console.log('PDF export menu contract passed');
