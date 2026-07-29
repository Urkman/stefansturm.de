# Professional PDF Export Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the continuous three-page CV print document with a deterministic, readable, privacy-focused two-page German and English PDF export.

**Architecture:** Extract PDF generation from `js/main.js` into `js/cv-export.js`, while preserving `downloadCv()` as the existing button contract. Build two fixed A4 page sections from localized CV data, embed a resized portrait data URL, and verify generated PDFs through a Node VM fixture plus headless Chrome and Poppler.

**Tech Stack:** Static HTML, vanilla JavaScript, Node.js VM assertions, headless Chrome, Poppler, pdfplumber

## Global Constraints

- Exactly two A4 pages in German and English.
- Selectable HTML text is retained for ATS compatibility.
- No external PDF-generation dependency.
- The PDF omits street address, birthplace, and marital status.
- The PDF retains nationality and uses `Willich, Deutschland` / `Willich, Germany`.
- The website profile and Markdown export remain unchanged.
- Unicode dash characters and contact-icon glyphs are absent from generated PDF HTML.
- Temporary PDF fixtures and PNG renders stay under `tmp/pdfs/` and are removed after verification.

---

### Task 1: Define the Two-Page PDF Contract

**Files:**
- Create: `tests/pdf-export.test.js`
- Test: `tests/pdf-export.test.js`

**Interfaces:**
- Consumes: `CV`, `CV_TRANSLATIONS`, `I18N`, `localizeCV()`, and `buildCvHtml(photoDataUrl)`
- Produces: A VM-based contract callable for German and English without a browser

- [ ] **Step 1: Create a DOM-light VM harness**

```js
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
```

- [ ] **Step 2: Assert structure, curation, privacy, and content**

```js
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
  assert.match(page2, /Informationstechnik/);
  assert.match(html, /data:image\/jpeg;base64,TEST_PHOTO/);

  assert.doesNotMatch(html, /Albert-Brülls/);
  assert.doesNotMatch(html, /Willich-Anrath/);
  assert.doesNotMatch(html, /Verheiratet|Married/);
  assert.doesNotMatch(html, /[–—‑]/);
  assert.doesNotMatch(html, /✉|☎|⌂|⚙/);
}

console.log('Professional PDF export contract passed for DE and EN');
```

- [ ] **Step 3: Run the test and verify the missing-module failure**

Run:

```bash
node tests/pdf-export.test.js
```

Expected: FAIL with `ENOENT` for `js/cv-export.js`.

- [ ] **Step 4: Commit the failing contract**

```bash
git add tests/pdf-export.test.js
git commit -m "test: define professional PDF export"
```

---

### Task 2: Add PDF-Specific Localized Content

**Files:**
- Modify: `js/data.js`
- Test: `tests/profile-content.test.js`

**Interfaces:**
- Consumes: Existing project and translation structures
- Produces: `cvDescription` project fields and PDF-only I18N copy

- [ ] **Step 1: Add German `cvDescription` values to all four projects**

```js
// DevBar
cvDescription: 'Native macOS-26-Menüleisten-App zum Bereinigen von Xcode- und SPM-Caches, Steuern von Simulatoren und Ausführen von Git-Workflows mit lokaler Apple Intelligence.',

// Fast.io
cvDescription: 'Intervallfasten-Timer für iPhone und Apple Watch mit Live Activities, Widgets, Apple Health und Hydration-Tracking.',

// OverlayLab
cvDescription: 'Kamera-App für Wetter-, Standort- und Text-Overlays auf Fotos und Videos.',

// S3XY Watch
cvDescription: 'iPhone- und Apple-Watch-App zur Steuerung und Überwachung eines Teslas mit Swift/Vapor-Backend.',
```

- [ ] **Step 2: Add the matching English overrides**

```js
// DevBar
cvDescription: 'Native macOS 26 menu-bar app for cleaning Xcode and SPM caches, controlling simulators, and running Git workflows with local Apple Intelligence.',

// Fast.io
cvDescription: 'Intermittent fasting timer for iPhone and Apple Watch with Live Activities, widgets, Apple Health, and hydration tracking.',

// OverlayLab
cvDescription: 'Camera app for weather, location, and text overlays on photos and videos.',

// S3XY Watch
cvDescription: 'iPhone and Apple Watch app for controlling and monitoring a Tesla with a Swift/Vapor backend.',
```

- [ ] **Step 3: Add PDF-only I18N keys**

German:

```js
cvProfileSummary: 'Senior iOS-Entwickler mit mehr als 15 Jahren Erfahrung in der Entwicklung hochwertiger Apps mit Swift, SwiftUI und Combine. Schwerpunkte sind Swift Concurrency, Foundation, iOS-Plattform-APIs sowie automatisierte Tests mit Swift Testing und XCTest. Erfahrung in komplexen Produktlandschaften, E-Commerce- und Marktplatzumfeldern sowie verlässlichen GitLab-CI/CD-Prozessen.',
cvLocation: 'Willich, Deutschland',
cvEarlierExperience: 'Frühere Berufserfahrung',
cvAdditionalExperience: 'Weitere Stationen',
cvSelectedProjects: 'Ausgewählte Projekte',
cvTechnicalSkills: 'Technische Kenntnisse',
cvPage: 'Seite',
```

English:

```js
cvProfileSummary: 'Senior iOS developer with more than 15 years of experience building high-quality apps with Swift, SwiftUI and Combine. Key strengths include Swift Concurrency, Foundation, iOS platform APIs, and automated testing with Swift Testing and XCTest. Experienced in complex product environments, e-commerce and marketplaces, and reliable GitLab CI/CD delivery.',
cvLocation: 'Willich, Germany',
cvEarlierExperience: 'Earlier Experience',
cvAdditionalExperience: 'Additional Experience',
cvSelectedProjects: 'Selected Projects',
cvTechnicalSkills: 'Technical Skills',
cvPage: 'Page',
```

- [ ] **Step 4: Extend the content contract**

```js
for (const [lang, profile] of Object.entries(profiles)) {
  profile.projects.forEach(project => {
    assert.ok(project.cvDescription, `${lang}: ${project.name} is missing cvDescription`);
  });
}

const { I18N } = context.__profile;
const pdfTranslationKeys = [
  'cvProfileSummary',
  'cvLocation',
  'cvEarlierExperience',
  'cvAdditionalExperience',
  'cvSelectedProjects',
  'cvTechnicalSkills',
  'cvPage',
];
for (const lang of ['de', 'en']) {
  pdfTranslationKeys.forEach(key => {
    assert.ok(I18N[lang][key], `${lang}: missing PDF translation ${key}`);
  });
}
```

Expose `I18N` in the existing data-test VM result:

```js
`${dataSource}\nthis.__profile = { CV, I18N, CV_TRANSLATIONS };`
```

- [ ] **Step 5: Run and commit the content changes**

```bash
node tests/profile-content.test.js
git add js/data.js tests/profile-content.test.js
git commit -m "feat: add concise PDF content"
```

Expected: `Profile content contract passed for DE and EN`.

---

### Task 3: Extract and Rebuild the PDF Export

**Files:**
- Create: `js/cv-export.js`
- Modify: `js/main.js`
- Modify: `index.html`
- Test: `tests/pdf-export.test.js`

**Interfaces:**
- Consumes: `activeCV`, `currentLang`, `t()`, and `esc()` from `js/main.js`
- Produces: global `buildCvHtml(photoDataUrl)`, `getCvPhotoDataUrl()`, and `downloadCv()`

- [ ] **Step 1: Add PDF text and selection helpers**

```js
function cvText(value) {
  return String(value ?? '')
    .replace(/[–—‑]/g, '-')
    .replace(/\s+/g, ' ')
    .trim();
}

function cvEsc(value) {
  return esc(cvText(value));
}

function findCvSkill(name) {
  return activeCV.skills
    .flatMap(category => category.items)
    .find(item => item.name === name);
}

function cvTech(items, limit) {
  return (items || []).slice(0, limit).map(cvEsc).join(' · ');
}
```

- [ ] **Step 2: Add portrait conversion with initials fallback**

```js
function getCvPhotoDataUrl() {
  try {
    const image = document.getElementById('profileImg');
    if (!image || !image.complete || !image.naturalWidth || !image.naturalHeight) return '';

    const canvas = document.createElement('canvas');
    canvas.width = 320;
    canvas.height = 320;
    const context = canvas.getContext('2d');
    const sourceSize = Math.min(image.naturalWidth, image.naturalHeight);
    const sourceX = (image.naturalWidth - sourceSize) / 2;
    const sourceY = (image.naturalHeight - sourceSize) / 2;
    context.drawImage(image, sourceX, sourceY, sourceSize, sourceSize, 0, 0, 320, 320);
    return canvas.toDataURL('image/jpeg', 0.88);
  } catch {
    return '';
  }
}
```

- [ ] **Step 3: Build explicit content groups**

```js
const coreSkillNames = [
  'Swift',
  'SwiftUI',
  'UIKit',
  'Combine',
  'Swift Concurrency',
  'Foundation',
  'XCTest',
  'GitLab CI/CD',
];
const coreSkills = coreSkillNames.map(findCvSkill).filter(Boolean);
const recentExperience = activeCV.experience.slice(0, 5);
const earlierExperience = activeCV.experience.slice(5, 8);
const additionalExperience = activeCV.experience.slice(8);
const selectedProjects = activeCV.projects.slice(0, 4);
```

- [ ] **Step 4: Add exact HTML render helpers**

```js
function renderCvSectionTitle(title) {
  return `<h2 class="cv-section-title">${cvEsc(title)}</h2>`;
}

function renderCvHeader(personal, photoDataUrl) {
  const portrait = photoDataUrl
    ? `<img class="cv-photo" src="${esc(photoDataUrl)}" alt="">`
    : '<div class="cv-photo cv-photo-fallback">SS</div>';
  const languages = activeCV.languages
    .map(language => `${cvEsc(language.name)} ${cvEsc(language.level)}`)
    .join(' | ');

  return `<header class="cv-header">
    ${portrait}
    <div class="cv-identity">
      <h1>${cvEsc(personal.name)}</h1>
      <p class="cv-title">${cvEsc(personal.title)}</p>
      <p class="cv-meta">${cvEsc(t('cvLocation'))} | ${cvEsc(personal.email)} | ${cvEsc(personal.phone)}</p>
      <p class="cv-meta">${cvEsc(personal.github.replace('https://', ''))} | ${cvEsc(personal.linkedin.replace('https://www.', ''))}</p>
      <p class="cv-meta">${languages} | ${cvEsc(t('cvNationality'))}: ${cvEsc(personal.nationality)}</p>
    </div>
  </header>`;
}

function renderCvRole(job, includeTech) {
  return `<article class="cv-role" data-company="${cvEsc(job.company)}">
    <div class="cv-role-heading">
      <div>
        <h3>${cvEsc(job.role)}</h3>
        <p class="cv-company">${cvEsc(job.company)}${job.location ? ` - ${cvEsc(job.location)}` : ''}</p>
      </div>
      <p class="cv-period">${cvEsc(job.period)}</p>
    </div>
    ${job.appName ? `<p class="cv-app">${cvEsc(job.appName)}</p>` : ''}
    <p class="cv-copy">${cvEsc(job.description)}</p>
    ${includeTech && job.tech?.length ? `<p class="cv-tech">${cvTech(job.tech, 8)}</p>` : ''}
  </article>`;
}

function renderCvHistoryRow(job) {
  return `<div class="cv-history-row" data-company="${cvEsc(job.company)}">
    <span>${cvEsc(job.period)}</span>
    <strong>${cvEsc(job.company)}</strong>
    <span>${cvEsc(job.role)}</span>
  </div>`;
}

function renderCvProject(project) {
  return `<article class="cv-project">
    <div class="cv-project-heading">
      <h3>${cvEsc(project.name)}</h3>
      <span>${cvEsc(project.period)}</span>
    </div>
    <p>${cvEsc(project.cvDescription || project.description)}</p>
    <p class="cv-tech">${cvTech(project.tech, 6)}</p>
  </article>`;
}

function renderCvSkillGroup(category) {
  return `<div class="cv-skill-group">
    <h3>${cvEsc(category.category)}</h3>
    <p>${category.items.map(item => cvEsc(item.name)).join(', ')}</p>
  </div>`;
}

function renderCvEducationRow(education) {
  return `<div class="cv-education-row">
    <strong>${cvEsc(education.degree)}</strong>
    <span>${cvEsc(education.institution)} | ${cvEsc(education.period)}</span>
  </div>`;
}

function renderCvFooter(page) {
  return `<footer class="cv-footer">
    <span>Stefan Sturm - CV</span>
    <span>${cvEsc(t('cvPage'))} ${page} / 2</span>
  </footer>`;
}
```

- [ ] **Step 5: Implement the exact two-page document structure**

```js
function buildCvHtml(photoDataUrl = '') {
  const personal = activeCV.personal;
  const coreSkillNames = ['Swift', 'SwiftUI', 'UIKit', 'Combine', 'Swift Concurrency', 'Foundation', 'XCTest', 'GitLab CI/CD'];
  const coreSkills = coreSkillNames.map(findCvSkill).filter(Boolean);
  const recentExperience = activeCV.experience.slice(0, 5);
  const earlierExperience = activeCV.experience.slice(5, 8);
  const additionalExperience = activeCV.experience.slice(8);
  const selectedProjects = activeCV.projects.slice(0, 4);
  const coreSkillsHtml = coreSkills.map(skill =>
    `<span class="cv-core-skill"><strong>${cvEsc(skill.name)}</strong>${skill.years ? ` ${cvEsc(skill.years)}` : ''}</span>`
  ).join('');

  return `<!DOCTYPE html>
  <html lang="${cvEsc(currentLang)}">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>CV - ${cvEsc(personal.name)}</title>
    <style>${CV_PRINT_STYLES}</style>
  </head>
  <body>
    <button class="cv-print-button" onclick="window.print()">${cvEsc(t('cvPrint'))}</button>
    <section class="cv-page" data-page="1">
      ${renderCvHeader(personal, photoDataUrl)}
      <div class="cv-intro-grid">
        <section class="cv-profile">
          ${renderCvSectionTitle(t('cvProfile'))}
          <p>${cvEsc(t('cvProfileSummary'))}</p>
        </section>
        <section class="cv-core">
          ${renderCvSectionTitle(t('cvCoreSkills'))}
          <div class="cv-core-grid">${coreSkillsHtml}</div>
        </section>
      </div>
      <section class="cv-section cv-recent">
        ${renderCvSectionTitle(t('cvExperience'))}
        ${recentExperience.map(job => renderCvRole(job, true)).join('')}
      </section>
      ${renderCvFooter(1)}
    </section>
    <section class="cv-page" data-page="2">
      <header class="cv-page-header">
        <strong>${cvEsc(personal.name)}</strong>
        <span>${cvEsc(personal.title)}</span>
      </header>
      <div class="cv-page-two-top">
        <div class="cv-earlier-column">
          ${renderCvSectionTitle(t('cvEarlierExperience'))}
          ${earlierExperience.map(job => renderCvRole(job, false)).join('')}
          <div class="cv-additional">
            <h3>${cvEsc(t('cvAdditionalExperience'))}</h3>
            ${additionalExperience.map(renderCvHistoryRow).join('')}
          </div>
        </div>
        <div class="cv-project-column">
          ${renderCvSectionTitle(t('cvSelectedProjects'))}
          ${selectedProjects.map(renderCvProject).join('')}
        </div>
      </div>
      <section class="cv-section cv-skills">
        ${renderCvSectionTitle(t('cvTechnicalSkills'))}
        <div class="cv-skills-grid">${activeCV.skills.map(renderCvSkillGroup).join('')}</div>
      </section>
      <section class="cv-section cv-education">
        ${renderCvSectionTitle(t('cvEducation'))}
        <div class="cv-education-grid">${activeCV.education.map(renderCvEducationRow).join('')}</div>
      </section>
      ${renderCvFooter(2)}
    </section>
    <script>window.addEventListener('load',function(){setTimeout(function(){window.print()},600)})<\/script>
  </body>
  </html>`;
}
```

Define the complete embedded stylesheet:

```js
const CV_PRINT_STYLES = `
  @page{size:A4;margin:0}
  *{box-sizing:border-box}
  html,body{margin:0;padding:0}
  body{font-family:-apple-system,BlinkMacSystemFont,"Helvetica Neue",Arial,sans-serif;color:#182230;background:#eef2f6}
  p,h1,h2,h3{margin:0}
  .cv-page{position:relative;width:210mm;height:297mm;padding:10mm 12mm 13mm;background:#fff;overflow:hidden;break-after:page}
  .cv-page:last-of-type{break-after:auto}
  .cv-print-button{position:fixed;right:18px;bottom:18px;z-index:20;border:0;border-radius:6px;padding:10px 16px;background:#0070e0;color:#fff;font:600 14px -apple-system,BlinkMacSystemFont,"Helvetica Neue",Arial,sans-serif;cursor:pointer}
  .cv-header{display:grid;grid-template-columns:28mm 1fr;gap:7mm;align-items:center;padding-bottom:5mm;border-bottom:.5mm solid #d9e7f5}
  .cv-photo{width:28mm;height:28mm;border-radius:50%;object-fit:cover;border:1mm solid #e5f1ff}
  .cv-photo-fallback{display:flex;align-items:center;justify-content:center;background:#0070e0;color:#fff;font-size:20pt;font-weight:800}
  .cv-identity h1{font-size:23pt;line-height:1.05;color:#0f172a}
  .cv-title{margin-top:1mm;font-size:11pt;font-weight:650;color:#0070e0}
  .cv-meta{margin-top:1.2mm;font-size:7.3pt;line-height:1.25;color:#526071}
  .cv-intro-grid{display:grid;grid-template-columns:1.35fr 1fr;gap:7mm;padding:5mm 0 4mm}
  .cv-section-title{margin-bottom:2.5mm;padding-bottom:1.5mm;border-bottom:.45mm solid #d9e7f5;color:#0070e0;font-size:9pt;line-height:1;text-transform:uppercase;letter-spacing:.06em}
  .cv-profile>p{font-size:8pt;line-height:1.45;color:#3f4d5f}
  .cv-core-grid{display:grid;grid-template-columns:1fr 1fr;gap:1.5mm 3mm}
  .cv-core-skill{display:flex;justify-content:space-between;gap:2mm;padding-bottom:1mm;border-bottom:.2mm solid #e7edf4;font-size:7pt;color:#526071}
  .cv-core-skill strong{color:#253244}
  .cv-role{margin-bottom:3.2mm;break-inside:avoid}
  .cv-role-heading{display:flex;justify-content:space-between;gap:5mm;align-items:flex-start}
  .cv-role h3{font-size:8.6pt;line-height:1.2;color:#152033}
  .cv-company{margin-top:.5mm;font-size:7.8pt;font-weight:650;color:#0070e0}
  .cv-period{flex-shrink:0;font-size:7pt;font-weight:700;color:#0070e0}
  .cv-app{margin-top:.5mm;font-size:6.9pt;color:#697586}
  .cv-copy{margin-top:1mm;font-size:7.35pt;line-height:1.34;color:#465466}
  .cv-tech{margin-top:1mm;font-size:6.4pt;line-height:1.28;color:#8793a3}
  .cv-page-header{display:flex;justify-content:space-between;align-items:baseline;padding-bottom:3mm;border-bottom:.5mm solid #d9e7f5}
  .cv-page-header strong{font-size:13pt;color:#152033}
  .cv-page-header span{font-size:8pt;color:#0070e0}
  .cv-page-two-top{display:grid;grid-template-columns:1.1fr .9fr;gap:6mm;padding-top:4mm}
  .cv-earlier-column .cv-role{margin-bottom:2.8mm}
  .cv-earlier-column .cv-copy{font-size:7pt;line-height:1.3}
  .cv-additional{margin-top:2mm}
  .cv-additional>h3{margin-bottom:1.4mm;font-size:7.5pt;color:#253244}
  .cv-history-row{display:grid;grid-template-columns:24mm 28mm 1fr;gap:2mm;padding:1.1mm 0;border-top:.2mm solid #e7edf4;font-size:6.5pt;line-height:1.2;color:#596779}
  .cv-history-row strong{color:#253244}
  .cv-project{margin-bottom:3mm;padding:2.5mm 3mm;border:.25mm solid #dfe7f0;border-radius:2mm;break-inside:avoid}
  .cv-project-heading{display:flex;justify-content:space-between;gap:3mm;align-items:flex-start}
  .cv-project h3{font-size:7.7pt;line-height:1.2;color:#152033}
  .cv-project-heading span{flex-shrink:0;font-size:6.4pt;font-weight:700;color:#0070e0}
  .cv-project>p:not(.cv-tech){margin-top:1mm;font-size:6.8pt;line-height:1.32;color:#526071}
  .cv-skills{margin-top:3mm}
  .cv-skills-grid{display:grid;grid-template-columns:1fr 1fr;gap:2.3mm 6mm}
  .cv-skill-group{break-inside:avoid}
  .cv-skill-group h3{margin-bottom:.7mm;font-size:7.1pt;color:#253244}
  .cv-skill-group p{font-size:6.6pt;line-height:1.3;color:#697586}
  .cv-education{margin-top:3.5mm}
  .cv-education-grid{display:grid;grid-template-columns:1fr 1fr;gap:1.4mm 6mm}
  .cv-education-row{display:flex;justify-content:space-between;gap:3mm;border-bottom:.2mm solid #e7edf4;padding-bottom:.8mm;font-size:6.5pt;line-height:1.2;break-inside:avoid}
  .cv-education-row strong{color:#253244}
  .cv-education-row span{text-align:right;color:#697586}
  .cv-role,.cv-project,.cv-education-row,.cv-skill-group{break-inside:avoid}
  .cv-footer{position:absolute;left:12mm;right:12mm;bottom:6mm;display:flex;justify-content:space-between;border-top:.25mm solid #d9e2ec;padding-top:2.5mm;font-size:6.4pt;color:#697586}
  @media print{body{background:#fff}.cv-page{margin:0;box-shadow:none}.cv-print-button{display:none!important}}
  @media screen{body{display:flex;flex-direction:column;align-items:center;gap:10mm;padding:10mm}.cv-page{box-shadow:0 8px 30px rgba(15,23,42,.18)}}
`;
```

- [ ] **Step 6: Keep the public export interaction**

```js
function downloadCv() {
  const html = buildCvHtml(getCvPhotoDataUrl());
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const win = window.open(url, '_blank');
  if (!win) {
    const link = document.createElement('a');
    link.href = url;
    link.download = currentLang === 'en' ? 'Stefan_Sturm_Resume.html' : 'Stefan_Sturm_CV.html';
    link.click();
  }
  setTimeout(() => URL.revokeObjectURL(url), 30000);
}
```

- [ ] **Step 7: Remove the old PDF builder from `js/main.js`**

Delete `buildCvHtml()` and `downloadCv()` from `js/main.js`. Keep Markdown generation and the existing DOMContentLoaded PDF button wiring unchanged.

- [ ] **Step 8: Load the export module and rotate cache keys**

```html
<script src="js/data.js?v=20260729-professional-pdf"></script>
<script src="js/main.js?v=20260729-professional-pdf"></script>
<script src="js/cv-export.js?v=20260729-professional-pdf"></script>
```

- [ ] **Step 9: Run syntax and contract checks**

```bash
node --check js/data.js
node --check js/main.js
node --check js/cv-export.js
node tests/profile-content.test.js
node tests/pdf-export.test.js
git diff --check
```

Expected: both contracts pass and all syntax/diff checks are clean.

- [ ] **Step 10: Commit the export implementation**

```bash
git add index.html js/main.js js/cv-export.js tests/pdf-export.test.js
git commit -m "feat: redesign PDF export"
```

---

### Task 4: Render and Inspect German and English PDFs

**Files:**
- Temporary: `tmp/pdfs/professional-cv/de.html`
- Temporary: `tmp/pdfs/professional-cv/en.html`
- Temporary: `tmp/pdfs/professional-cv/de.pdf`
- Temporary: `tmp/pdfs/professional-cv/en.pdf`

**Interfaces:**
- Consumes: `buildCvHtml(photoDataUrl)` from `js/cv-export.js`
- Produces: Visual and structural QA evidence only; no committed artifacts

- [ ] **Step 1: Generate German and English HTML fixtures**

Use a temporary Node VM script that loads `js/data.js`, `js/main.js`, and `js/cv-export.js`, reads `assets/stefan.png` as a data URL, and writes `buildCvHtml(photoDataUrl)` for both languages.

- [ ] **Step 2: Print both fixtures with headless Chrome**

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless --disable-gpu --no-pdf-header-footer \
  --print-to-pdf=tmp/pdfs/professional-cv/de.pdf \
  file:///ABSOLUTE_PATH/tmp/pdfs/professional-cv/de.html

"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless --disable-gpu --no-pdf-header-footer \
  --print-to-pdf=tmp/pdfs/professional-cv/en.pdf \
  file:///ABSOLUTE_PATH/tmp/pdfs/professional-cv/en.html
```

- [ ] **Step 3: Verify PDF structure**

Run `pdfinfo` on both PDFs.

Expected:

- `Pages: 2`
- A4 page size near `595 x 842 pts`
- No encryption or forms

- [ ] **Step 4: Render and inspect all pages**

```bash
pdftoppm -png -r 144 tmp/pdfs/professional-cv/de.pdf tmp/pdfs/professional-cv/de-page
pdftoppm -png -r 144 tmp/pdfs/professional-cv/en.pdf tmp/pdfs/professional-cv/en-page
```

Inspect all four PNGs. Require:

- No clipping, overlap, broken glyphs, or split entries
- Balanced whitespace on every page
- Legible body text at normal zoom
- Correct portrait crop
- Consistent headings, dates, and footers
- No empty sidebar or blank lower third

- [ ] **Step 5: Extract and verify text**

Use bundled Python with `pdfplumber` to assert headings, all companies, all four projects, all skill categories, all education entries, and page labels are present.

- [ ] **Step 6: Correct any visual defects**

If inspection exposes overflow, clipping, weak hierarchy, or poor spacing, adjust only `CV_PRINT_STYLES` or the PDF-specific copy, then repeat Steps 2 through 5 until both languages pass.

- [ ] **Step 7: Verify the live interaction**

Use the in-app browser in German and English. Click a PDF button, confirm the print document opens, inspect its DOM for two `.cv-page` sections, and verify no relevant console errors.

- [ ] **Step 8: Clean temporary artifacts**

```bash
rm -rf tmp/pdfs/cv-review tmp/pdfs/professional-cv
```

- [ ] **Step 9: Run final repository checks**

```bash
node --check js/data.js
node --check js/main.js
node --check js/cv-export.js
node tests/profile-content.test.js
node tests/pdf-export.test.js
git diff --check
git status --short --branch
```

- [ ] **Step 10: Commit any QA-driven refinements**

If Step 6 changed tracked files:

```bash
git add js/data.js js/cv-export.js
git commit -m "fix: polish professional PDF layout"
```
