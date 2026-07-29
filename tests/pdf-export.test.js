const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const dataSource = fs.readFileSync(path.join(root, 'js/data.js'), 'utf8');
const mainSource = fs.readFileSync(path.join(root, 'js/main.js'), 'utf8');
const pdfSource = fs.readFileSync(path.join(root, 'js/cv-export.js'), 'utf8');

const context = {
  localStorage: { getItem: () => null, setItem: () => {} },
  window: { matchMedia: () => ({ matches: false }) },
  document: {
    documentElement: { setAttribute: () => {}, getAttribute: () => null },
    addEventListener: () => {},
  },
};

vm.createContext(context);
vm.runInContext(dataSource, context, { filename: 'js/data.js' });
vm.runInContext(mainSource, context, { filename: 'js/main.js' });
vm.runInContext(
  `${pdfSource}
  this.__buildCv = (lang, photo) => {
    currentLang = lang;
    activeCV = localizeCV(lang);
    return buildCvHtml(photo);
  };`,
  context,
  { filename: 'js/cv-export.js' }
);

for (const lang of ['de', 'en']) {
  const html = context.__buildCv(lang, 'data:image/jpeg;base64,TEST_PHOTO');
  const pages = html.match(/<section class="cv-page"/g) || [];
  const [page1, page2] = html.split('<section class="cv-page" data-page="2">');

  assert.equal(pages.length, 2, `${lang}: expected two CV pages`);
  assert.match(html, /width:210mm;height:297mm/);
  assert.match(page1, /data-company="EnBW"/);
  assert.match(page1, /data-company="Chrono24"/);
  assert.match(page1, /data-company="1und1"/);
  assert.match(page1, /data-company="RTL"/);
  assert.match(page1, /data-company="Nexenio \(Luca App\)"/);
  assert.doesNotMatch(page1, /data-company="Comdirect"/);
  assert.match(page2, /data-company="Comdirect"/);
  assert.match(page2, /data-company="Buhl"/);
  assert.match(page2, /data-company="Porsche"/);
  assert.match(page2, /DevBar - Apple Developer Toolkit/);
  assert.match(page2, /Fast\.io - Fasting Timer/);
  assert.match(page2, /AI &amp; Agentic Development/);
  assert.match(page2, lang === 'de' ? /Informationstechnik/ : /Information Technology/);
  assert.match(html, /data:image\/jpeg;base64,TEST_PHOTO/);

  assert.doesNotMatch(html, /Albert-Brülls/);
  assert.doesNotMatch(html, /Willich-Anrath/);
  assert.doesNotMatch(html, /Verheiratet|Married/);
  assert.doesNotMatch(html, /[–—‑]/);
  assert.doesNotMatch(html, /✉|☎|⌂|⚙/);
}

console.log('Professional PDF export contract passed for DE and EN');
