# Expanded PDF Export Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a second bilingual PDF export that includes every non-private CV field without shortening descriptions or limiting arrays, while preserving the existing compact two-page CV.

**Architecture:** Keep the compact builder stable in `js/cv-export.js`, add an independent flowing A4 builder named `buildExpandedCvHtml(photoDataUrl)`, and route both through a shared document opener. Replace each direct PDF button with an accessible export menu that selects compact or expanded mode.

**Tech Stack:** Static HTML, vanilla JavaScript, CSS, Node.js VM assertions, headless Chrome, Poppler, pdfplumber, pypdf

## Global Constraints

- The current compact export remains exactly two fixed A4 pages.
- The expanded export includes all non-private localized CV data and has no fixed page count.
- Expanded projects use full `description` values, never `cvDescription`.
- Expanded experience and project technology arrays are never sliced or truncated.
- Street address, birthplace, and marital status remain absent from both PDFs.
- The Markdown export and visible website profile content remain unchanged.
- German and English exports use the active website language.
- Generated PDF HTML contains no Unicode dash characters or legacy contact glyphs.
- No external PDF-generation dependency is added.
- Temporary PDF fixtures remain under `tmp/pdfs/` and are removed after verification.

---

### Task 1: Define the Expanded Export Contract

**Files:**
- Modify: `tests/pdf-export.test.js`
- Test: `tests/pdf-export.test.js`

**Interfaces:**
- Consumes: `localizeCV(lang)`, existing `buildCvHtml(photoDataUrl)`, and future `buildExpandedCvHtml(photoDataUrl)`
- Produces: A bilingual full-data contract that later implementation must satisfy

- [ ] **Step 1: Expose compact and expanded fixtures from the VM**

Replace the current VM exposure block with:

```js
vm.runInContext(
  `${pdfSource}
  this.__buildCvFixture = (lang, photo) => {
    currentLang = lang;
    activeCV = localizeCV(lang);
    return {
      compact: buildCvHtml(photo),
      expanded: buildExpandedCvHtml(photo),
      profile: activeCV,
    };
  };`,
  context,
  { filename: 'js/cv-export.js' }
);
```

- [ ] **Step 2: Add deterministic expected-text helpers**

```js
function cvExpected(value) {
  return String(value ?? '')
    .replace(/[–—‑]/g, '-')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function assertContains(html, value, message) {
  assert.ok(html.includes(cvExpected(value)), message);
}
```

- [ ] **Step 3: Preserve the compact two-page assertions**

Inside the language loop, assign:

```js
const { compact, expanded, profile } = context.__buildCvFixture(
  lang,
  'data:image/jpeg;base64,TEST_PHOTO'
);
const pages = compact.match(/<section class="cv-page"/g) || [];
const [page1, page2] = compact.split('<section class="cv-page" data-page="2">');

assert.equal(pages.length, 2, `${lang}: expected two compact CV pages`);
assert.match(compact, /width:210mm;height:297mm/);
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
assert.match(compact, /data:image\/jpeg;base64,TEST_PHOTO/);
assert.doesNotMatch(compact, /Albert-Brülls/);
assert.doesNotMatch(compact, /Willich-Anrath/);
assert.doesNotMatch(compact, /Verheiratet|Married/);
assert.doesNotMatch(compact, /[–—‑]/);
assert.doesNotMatch(compact, /✉|☎|⌂|⚙/);
```

- [ ] **Step 4: Assert complete expanded content**

Add after the compact assertions:

```js
assert.match(expanded, /<main class="cv-expanded-document">/);
assert.doesNotMatch(expanded, /<section class="cv-page"/);
assert.match(expanded, /@page\{size:A4;/);
assert.match(expanded, /data:image\/jpeg;base64,TEST_PHOTO/);
assertContains(expanded, profile.personal.tagline, `${lang}: missing personal tagline`);

profile.summary.split('<br><br>').forEach((paragraph, index) => {
  assertContains(expanded, paragraph, `${lang}: missing profile paragraph ${index}`);
});

profile.stats.forEach(stat => {
  assertContains(expanded, stat.value, `${lang}: missing statistic value ${stat.value}`);
  assertContains(expanded, stat.label, `${lang}: missing statistic label ${stat.label}`);
});

profile.languages.forEach(language => {
  assertContains(expanded, language.name, `${lang}: missing language ${language.name}`);
  assertContains(expanded, language.level, `${lang}: missing language level ${language.level}`);
  if (language.note) {
    assertContains(expanded, language.note, `${lang}: missing language note ${language.note}`);
  }
});

profile.experience.forEach(job => {
  assertContains(expanded, job.company, `${lang}: missing company ${job.company}`);
  assertContains(expanded, job.role, `${lang}: missing role at ${job.company}`);
  assertContains(expanded, job.period, `${lang}: missing period at ${job.company}`);
  assertContains(expanded, job.location, `${lang}: missing location at ${job.company}`);
  assertContains(expanded, job.description, `${lang}: shortened description at ${job.company}`);
  if (job.appName) assertContains(expanded, job.appName, `${lang}: missing app at ${job.company}`);
  if (job.appUrl) assert.ok(expanded.includes(`href="${job.appUrl}"`), `${lang}: missing app URL at ${job.company}`);
  (job.tech || []).forEach(technology => {
    assertContains(expanded, technology, `${lang}: missing ${technology} at ${job.company}`);
  });
});

profile.projects.forEach(project => {
  assertContains(expanded, project.name, `${lang}: missing project ${project.name}`);
  assertContains(expanded, project.period, `${lang}: missing period for ${project.name}`);
  assertContains(expanded, project.description, `${lang}: full description missing for ${project.name}`);
  assert.ok(expanded.includes(`href="${project.url}"`), `${lang}: missing URL for ${project.name}`);
  if (project.cvDescription !== project.description) {
    assert.ok(
      !expanded.includes(`<p class="cv-expanded-copy">${cvExpected(project.cvDescription)}</p>`),
      `${lang}: compact project copy used for ${project.name}`
    );
  }
  project.tech.forEach(technology => {
    assertContains(expanded, technology, `${lang}: missing ${technology} for ${project.name}`);
  });
});

profile.skills.forEach(category => {
  assertContains(expanded, category.category, `${lang}: missing skill category ${category.category}`);
  category.items.forEach(item => {
    assertContains(expanded, item.name, `${lang}: missing skill ${item.name}`);
    if (item.years) assertContains(expanded, item.years, `${lang}: missing years for ${item.name}`);
  });
});

profile.education.forEach(education => {
  assertContains(expanded, education.degree, `${lang}: missing education ${education.degree}`);
  assertContains(expanded, education.institution, `${lang}: missing institution for ${education.degree}`);
  assertContains(expanded, education.period, `${lang}: missing period for ${education.degree}`);
});

assertContains(expanded, profile.personal.twitter, `${lang}: missing X profile`);
assert.doesNotMatch(expanded, /Albert-Brülls/);
assert.doesNotMatch(expanded, /Willich-Anrath/);
assert.doesNotMatch(expanded, /Verheiratet|Married/);
assert.doesNotMatch(expanded, /[–—‑]/);
assert.doesNotMatch(expanded, /✉|☎|⌂|⚙/);
```

- [ ] **Step 5: Run the test and verify the missing-builder failure**

Run:

```bash
node tests/pdf-export.test.js
```

Expected: FAIL with `ReferenceError: buildExpandedCvHtml is not defined`.

- [ ] **Step 6: Commit the failing contract**

```bash
git add tests/pdf-export.test.js
git commit -m "test: define expanded PDF export"
```

---

### Task 2: Add the Bilingual PDF Export Menus

**Files:**
- Modify: `index.html`
- Modify: `css/styles.css`
- Modify: `js/data.js`
- Modify: `js/main.js`
- Modify: `js/cv-export.js`
- Create: `tests/pdf-export-menu.test.js`
- Test: `tests/pdf-export-menu.test.js`
- Test: `tests/profile-content.test.js`

**Interfaces:**
- Consumes: `downloadCv(mode)` from `js/cv-export.js`
- Produces: `setupPdfExportMenus()`, two `[data-pdf-menu]` controls, and localized compact/expanded commands

- [ ] **Step 1: Write the menu source contract**

Create `tests/pdf-export-menu.test.js`:

```js
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
```

- [ ] **Step 2: Run the menu contract and verify it fails**

Run:

```bash
node tests/pdf-export-menu.test.js
```

Expected: FAIL because no `data-pdf-menu` controls exist.

- [ ] **Step 3: Add German and English menu translations**

Add to both `I18N` language objects in `js/data.js`:

```js
// German
pdfExportMenu: 'PDF-Export auswählen',
compactCvTitle: 'Kompakter CV',
compactCvDescription: 'Professioneller Lebenslauf auf zwei Seiten',
expandedCvTitle: 'Ausführlicher CV',
expandedCvDescription: 'Vollständiger Lebenslauf mit allen Details',
cvExpandedLabel: 'Ausführlicher Lebenslauf',
cvStatistics: 'Profil in Zahlen',

// English
pdfExportMenu: 'Choose PDF export',
compactCvTitle: 'Compact CV',
compactCvDescription: 'Professional two-page resume',
expandedCvTitle: 'Expanded CV',
expandedCvDescription: 'Complete resume with every detail',
cvExpandedLabel: 'Expanded Resume',
cvStatistics: 'Profile at a Glance',
```

Extend the `pdfTranslationKeys` array in `tests/profile-content.test.js` with all seven keys.

- [ ] **Step 4: Replace the navigation PDF button with a menu**

Replace `#downloadCvBtn` in `index.html` with:

```html
<div class="pdf-export-menu pdf-export-menu-nav" data-pdf-menu>
  <button class="btn btn-primary btn-sm pdf-export-trigger" id="downloadCvBtn"
          aria-haspopup="menu" aria-expanded="false"
          aria-label="PDF-Export auswählen" data-i18n-aria-label="pdfExportMenu">
    <i class="fas fa-file-pdf" aria-hidden="true"></i>
    <span>PDF</span>
    <i class="fas fa-chevron-down pdf-export-chevron" aria-hidden="true"></i>
  </button>
  <div class="pdf-export-options" role="menu" hidden>
    <button type="button" class="pdf-export-option" role="menuitem" data-cv-export="compact">
      <i class="fas fa-file-lines" aria-hidden="true"></i>
      <span>
        <strong data-i18n="compactCvTitle">Kompakter CV</strong>
        <small data-i18n="compactCvDescription">Professioneller Lebenslauf auf zwei Seiten</small>
      </span>
    </button>
    <button type="button" class="pdf-export-option" role="menuitem" data-cv-export="expanded">
      <i class="fas fa-file-circle-plus" aria-hidden="true"></i>
      <span>
        <strong data-i18n="expandedCvTitle">Ausführlicher CV</strong>
        <small data-i18n="expandedCvDescription">Vollständiger Lebenslauf mit allen Details</small>
      </span>
    </button>
  </div>
</div>
```

- [ ] **Step 5: Replace the hero PDF button with the matching menu**

Replace `#heroDownloadBtn` with the same structure, changing:

```html
<div class="pdf-export-menu pdf-export-menu-hero" data-pdf-menu>
  <button class="btn btn-primary btn-lg pdf-export-trigger" id="heroDownloadBtn"
          aria-haspopup="menu" aria-expanded="false"
          aria-label="PDF-Export auswählen" data-i18n-aria-label="pdfExportMenu">
    <i class="fas fa-file-pdf" aria-hidden="true"></i>
    <span data-i18n="downloadPdfText">Download as PDF</span>
    <i class="fas fa-chevron-down pdf-export-chevron" aria-hidden="true"></i>
  </button>
  <div class="pdf-export-options" role="menu" hidden>
    <button type="button" class="pdf-export-option" role="menuitem" data-cv-export="compact">
      <i class="fas fa-file-lines" aria-hidden="true"></i>
      <span>
        <strong data-i18n="compactCvTitle">Kompakter CV</strong>
        <small data-i18n="compactCvDescription">Professioneller Lebenslauf auf zwei Seiten</small>
      </span>
    </button>
    <button type="button" class="pdf-export-option" role="menuitem" data-cv-export="expanded">
      <i class="fas fa-file-circle-plus" aria-hidden="true"></i>
      <span>
        <strong data-i18n="expandedCvTitle">Ausführlicher CV</strong>
        <small data-i18n="expandedCvDescription">Vollständiger Lebenslauf mit allen Details</small>
      </span>
    </button>
  </div>
</div>
```

- [ ] **Step 6: Add complete menu styling**

Add before the PDF overlay section in `css/styles.css`:

```css
/* -------- PDF export menu -------- */
.pdf-export-menu {
  position: relative;
  display: inline-flex;
}
.pdf-export-trigger[aria-expanded="true"] .pdf-export-chevron {
  transform: rotate(180deg);
}
.pdf-export-chevron {
  font-size: .7em;
  transition: transform var(--t-base);
}
.pdf-export-options {
  position: absolute;
  z-index: 1100;
  top: calc(100% + .5rem);
  left: 0;
  width: min(22rem, calc(100vw - 2rem));
  padding: .375rem;
  border: 1px solid var(--border);
  border-radius: var(--r-md);
  background: var(--surface);
  box-shadow: var(--sh-xl);
}
.pdf-export-menu-nav .pdf-export-options {
  right: 0;
  left: auto;
}
.pdf-export-option {
  display: grid;
  grid-template-columns: 1.5rem 1fr;
  gap: .75rem;
  width: 100%;
  padding: .75rem;
  border-radius: var(--r-sm);
  color: var(--text);
  text-align: left;
}
.pdf-export-option:hover,
.pdf-export-option:focus-visible {
  background: var(--accent-light);
  color: var(--accent);
}
.pdf-export-option > i {
  margin-top: .15rem;
  color: var(--accent);
}
.pdf-export-option span {
  min-width: 0;
}
.pdf-export-option strong,
.pdf-export-option small {
  display: block;
  letter-spacing: 0;
}
.pdf-export-option strong {
  font-size: .875rem;
  line-height: 1.25;
}
.pdf-export-option small {
  margin-top: .2rem;
  color: var(--text-muted);
  font-size: .75rem;
  line-height: 1.35;
  white-space: normal;
}
@media (max-width: 639px) {
  .pdf-export-menu-hero,
  .pdf-export-menu-hero .pdf-export-trigger {
    width: 100%;
  }
  .pdf-export-menu-hero .pdf-export-trigger {
    justify-content: center;
  }
  .pdf-export-menu-hero .pdf-export-options {
    width: 100%;
  }
}
```

- [ ] **Step 7: Add keyboard-accessible menu behavior**

Add to `js/cv-export.js`:

```js
function closePdfExportMenu(menu, restoreFocus = false) {
  const trigger = menu.querySelector('.pdf-export-trigger');
  const options = menu.querySelector('.pdf-export-options');
  options.hidden = true;
  trigger.setAttribute('aria-expanded', 'false');
  if (restoreFocus) trigger.focus();
}

function openPdfExportMenu(menu, focusFirst = false) {
  document.querySelectorAll('[data-pdf-menu]').forEach(otherMenu => {
    if (otherMenu !== menu) closePdfExportMenu(otherMenu);
  });
  const trigger = menu.querySelector('.pdf-export-trigger');
  const options = menu.querySelector('.pdf-export-options');
  options.hidden = false;
  trigger.setAttribute('aria-expanded', 'true');
  if (focusFirst) options.querySelector('.pdf-export-option').focus();
}

function setupPdfExportMenus() {
  const menus = Array.from(document.querySelectorAll('[data-pdf-menu]'));

  menus.forEach(menu => {
    const trigger = menu.querySelector('.pdf-export-trigger');
    const optionsPanel = menu.querySelector('.pdf-export-options');
    const options = Array.from(menu.querySelectorAll('.pdf-export-option'));

    trigger.addEventListener('click', event => {
      event.stopPropagation();
      if (optionsPanel.hidden) openPdfExportMenu(menu);
      else closePdfExportMenu(menu);
    });

    trigger.addEventListener('keydown', event => {
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        openPdfExportMenu(menu, true);
      }
      if (event.key === 'Escape') closePdfExportMenu(menu);
    });

    options.forEach((option, index) => {
      option.addEventListener('click', () => {
        closePdfExportMenu(menu);
        downloadCv(option.dataset.cvExport);
      });
      option.addEventListener('keydown', event => {
        if (event.key === 'Escape') {
          event.preventDefault();
          closePdfExportMenu(menu, true);
        }
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
          event.preventDefault();
          const direction = event.key === 'ArrowDown' ? 1 : -1;
          const nextIndex = (index + direction + options.length) % options.length;
          options[nextIndex].focus();
        }
      });
    });
  });

  document.addEventListener('click', event => {
    menus.forEach(menu => {
      if (!menu.contains(event.target)) closePdfExportMenu(menu);
    });
  });
}
```

- [ ] **Step 8: Replace direct PDF button wiring**

In the `DOMContentLoaded` callback in `js/main.js`, replace:

```js
['downloadCvBtn', 'heroDownloadBtn'].forEach(id => {
  const btn = document.getElementById(id);
  if (btn) btn.addEventListener('click', downloadCv);
});
```

with:

```js
setupPdfExportMenus();
```

- [ ] **Step 9: Rotate browser cache keys**

Set all local asset query strings in `index.html` to:

```html
<link rel="stylesheet" href="css/styles.css?v=20260729-expanded-pdf">
<script src="js/data.js?v=20260729-expanded-pdf"></script>
<script src="js/main.js?v=20260729-expanded-pdf"></script>
<script src="js/cv-export.js?v=20260729-expanded-pdf"></script>
```

- [ ] **Step 10: Run menu and content tests**

```bash
node tests/pdf-export-menu.test.js
node tests/profile-content.test.js
node --check js/data.js
node --check js/main.js
node --check js/cv-export.js
git diff --check
```

Expected:

```text
PDF export menu contract passed
Profile content contract passed for DE and EN
```

- [ ] **Step 11: Commit the menu**

```bash
git add index.html css/styles.css js/data.js js/main.js js/cv-export.js tests/pdf-export-menu.test.js tests/profile-content.test.js
git commit -m "feat: add PDF export menu"
```

---

### Task 3: Build the Complete Multi-Page CV

**Files:**
- Modify: `js/cv-export.js`
- Test: `tests/pdf-export.test.js`
- Test: `tests/pdf-export-menu.test.js`

**Interfaces:**
- Consumes: `activeCV`, `currentLang`, `t()`, `cvEsc()`, and `getCvPhotoDataUrl()`
- Produces: `buildExpandedCvHtml(photoDataUrl = '')`, `openCvDocument(html, filename)`, and `downloadCv(mode = 'compact')`

- [ ] **Step 1: Add full-data render helpers**

Add to `js/cv-export.js`:

```js
function renderExpandedSectionTitle(title) {
  return `<h2 class="cv-expanded-section-title">${cvEsc(title)}</h2>`;
}

function renderExpandedLink(url, label) {
  if (!label) return '';
  if (!url) return `<span class="cv-expanded-link">${cvEsc(label)}</span>`;
  return `<a class="cv-expanded-link" href="${esc(url)}">${cvEsc(label)}</a>`;
}

function renderExpandedTech(items) {
  if (!items?.length) return '';
  return `<div class="cv-expanded-tech">${items.map(item =>
    `<span>${cvEsc(item)}</span>`
  ).join('')}</div>`;
}

function renderExpandedExperience(job) {
  return `<article class="cv-expanded-entry" data-company="${cvEsc(job.company)}">
    <div class="cv-expanded-heading">
      <div>
        <h3>${cvEsc(job.role)}</h3>
        <p class="cv-expanded-company">${cvEsc(job.company)}${job.location ? ` - ${cvEsc(job.location)}` : ''}</p>
      </div>
      <div class="cv-expanded-period">
        <span>${cvEsc(job.period)}</span>
        ${job.current ? `<small>${cvEsc(t('current'))}</small>` : ''}
      </div>
    </div>
    ${job.appName ? renderExpandedLink(job.appUrl, job.appName) : ''}
    <p class="cv-expanded-copy">${cvEsc(job.description)}</p>
    ${renderExpandedTech(job.tech)}
  </article>`;
}

function renderExpandedProject(project) {
  const linkLabel = project.linkType === 'website' ? t('websiteView') : t('appStoreView');
  return `<article class="cv-expanded-entry cv-expanded-project">
    <div class="cv-expanded-heading">
      <h3>${cvEsc(project.name)}</h3>
      <span class="cv-expanded-period">${cvEsc(project.period)}</span>
    </div>
    ${renderExpandedLink(project.url, linkLabel)}
    <p class="cv-expanded-copy">${cvEsc(project.description)}</p>
    ${renderExpandedTech(project.tech)}
  </article>`;
}

function renderExpandedSkillGroup(category) {
  return `<section class="cv-expanded-skill-group">
    <h3>${cvEsc(category.category)}</h3>
    <div>${category.items.map(item =>
      `<span class="cv-expanded-skill"><strong>${cvEsc(item.name)}</strong>${item.years ? ` <small>${cvEsc(item.years)}</small>` : ''}</span>`
    ).join('')}</div>
  </section>`;
}

function renderExpandedEducation(education) {
  return `<div class="cv-expanded-education">
    <div><strong>${cvEsc(education.degree)}</strong><span>${cvEsc(education.institution)}</span></div>
    <span>${cvEsc(education.period)}</span>
  </div>`;
}
```

- [ ] **Step 2: Add the complete expanded print stylesheet**

```js
const EXPANDED_CV_PRINT_STYLES = `
  @page{size:A4;margin:13mm 14mm 18mm}
  *{box-sizing:border-box}
  html,body{margin:0;padding:0}
  body{font-family:-apple-system,BlinkMacSystemFont,"Helvetica Neue",Arial,sans-serif;color:#182230;background:#eef2f6}
  p,h1,h2,h3{margin:0}
  a{color:inherit}
  .cv-expanded-document{width:100%;max-width:182mm;margin:0 auto;background:#fff}
  .cv-expanded-cover{min-height:250mm;break-after:page;display:flex;flex-direction:column}
  .cv-expanded-header{display:grid;grid-template-columns:34mm 1fr;gap:8mm;align-items:center;padding-bottom:7mm;border-bottom:.5mm solid #d9e7f5}
  .cv-expanded-photo{width:34mm;height:34mm;border-radius:50%;object-fit:cover;border:1mm solid #e5f1ff}
  .cv-expanded-photo-fallback{display:flex;align-items:center;justify-content:center;background:#0070e0;color:#fff;font-size:23pt;font-weight:800}
  .cv-expanded-identity h1{font-size:27pt;line-height:1.05;color:#0f172a;letter-spacing:0}
  .cv-expanded-title{margin-top:1.5mm;color:#0070e0;font-size:12pt;font-weight:650}
  .cv-expanded-tagline{margin-top:1mm;color:#526071;font-size:8.5pt}
  .cv-expanded-label{margin-top:1mm;color:#697586;font-size:8pt}
  .cv-expanded-contact{display:grid;grid-template-columns:1fr 1fr;gap:2mm 7mm;padding:6mm 0}
  .cv-expanded-contact a,.cv-expanded-contact span{font-size:8pt;line-height:1.35;color:#526071;text-decoration:none}
  .cv-expanded-profile{padding-top:5mm}
  .cv-expanded-profile p{margin-bottom:3mm;font-size:9pt;line-height:1.55;color:#3f4d5f}
  .cv-expanded-cover-grid{display:grid;grid-template-columns:1fr 1fr;gap:8mm;margin-top:auto;padding-top:7mm}
  .cv-expanded-section-title{margin:0 0 4mm;padding-bottom:2mm;border-bottom:.45mm solid #d9e7f5;color:#0070e0;font-size:10pt;line-height:1;text-transform:uppercase;letter-spacing:0}
  .cv-expanded-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:2mm}
  .cv-expanded-stat{padding:2.5mm;border:.25mm solid #dfe7f0;border-radius:2mm}
  .cv-expanded-stat strong{display:block;font-size:12pt;color:#152033}
  .cv-expanded-stat span{display:block;margin-top:.5mm;font-size:7pt;color:#697586}
  .cv-expanded-languages{display:grid;gap:2mm}
  .cv-expanded-language{display:flex;justify-content:space-between;gap:3mm;padding-bottom:1.5mm;border-bottom:.2mm solid #e7edf4;font-size:8pt}
  .cv-expanded-language span{color:#697586}
  .cv-expanded-content-section{margin-top:8mm}
  .cv-expanded-entry{margin-bottom:6mm;padding-bottom:5mm;border-bottom:.25mm solid #dfe7f0;break-inside:avoid-page}
  .cv-expanded-heading{display:flex;justify-content:space-between;gap:6mm;align-items:flex-start}
  .cv-expanded-heading h3{font-size:10.5pt;line-height:1.25;color:#152033}
  .cv-expanded-company{margin-top:.8mm;color:#0070e0;font-size:9pt;font-weight:650}
  .cv-expanded-period{flex-shrink:0;color:#0070e0;font-size:8pt;font-weight:700;text-align:right}
  .cv-expanded-period small{display:block;margin-top:.6mm;font-size:6.8pt;text-transform:uppercase}
  .cv-expanded-link{display:inline-block;margin-top:1.5mm;color:#0070e0;font-size:7.8pt;text-decoration:none}
  .cv-expanded-copy{margin-top:2mm;font-size:8.6pt;line-height:1.5;color:#465466}
  .cv-expanded-tech{display:flex;flex-wrap:wrap;gap:1.2mm;margin-top:2.5mm}
  .cv-expanded-tech span{padding:1mm 1.6mm;border-radius:1.5mm;background:#f1f6fb;color:#526071;font-size:6.8pt}
  .cv-expanded-projects{display:grid;grid-template-columns:1fr 1fr;gap:5mm 7mm}
  .cv-expanded-project{margin:0;padding:4mm;border:.25mm solid #dfe7f0;border-radius:2mm}
  .cv-expanded-project .cv-expanded-copy{font-size:8pt}
  .cv-expanded-skills{display:grid;grid-template-columns:1fr 1fr;gap:5mm 8mm}
  .cv-expanded-skill-group{break-inside:avoid-page}
  .cv-expanded-skill-group h3{margin-bottom:2mm;font-size:9pt;color:#152033}
  .cv-expanded-skill-group>div{display:flex;flex-wrap:wrap;gap:1.5mm}
  .cv-expanded-skill{padding:1.2mm 1.8mm;border:.25mm solid #dfe7f0;border-radius:1.5mm;font-size:7.2pt;color:#526071}
  .cv-expanded-skill small{color:#8793a3}
  .cv-expanded-education-list{display:grid;grid-template-columns:1fr 1fr;gap:3mm 8mm}
  .cv-expanded-education{display:flex;justify-content:space-between;gap:4mm;padding-bottom:2mm;border-bottom:.2mm solid #e7edf4;break-inside:avoid-page;font-size:7.5pt}
  .cv-expanded-education div{min-width:0}
  .cv-expanded-education strong,.cv-expanded-education div span{display:block}
  .cv-expanded-education div span{margin-top:.7mm;color:#697586}
  .cv-expanded-education>span{flex-shrink:0;color:#0070e0;font-weight:700}
  .cv-expanded-footer{padding-top:2.5mm;border-top:.25mm solid #d9e2ec;color:#697586;font-size:6.5pt;text-align:right}
  .cv-expanded-print-button{position:fixed;right:18px;bottom:18px;z-index:20;border:0;border-radius:6px;padding:10px 16px;background:#0070e0;color:#fff;font:600 14px -apple-system,BlinkMacSystemFont,"Helvetica Neue",Arial,sans-serif;cursor:pointer}
  @media print{
    body{background:#fff;-webkit-print-color-adjust:exact;print-color-adjust:exact}
    .cv-expanded-print-button{display:none!important}
    .cv-expanded-footer{position:fixed;left:0;right:0;bottom:-12mm}
  }
  @media screen{
    body{padding:10mm}
    .cv-expanded-document{padding:13mm 14mm 18mm;box-shadow:0 8px 30px rgba(15,23,42,.18)}
    .cv-expanded-footer{margin-top:10mm}
  }
`;
```

- [ ] **Step 3: Build the expanded cover and content**

```js
function buildExpandedCvHtml(photoDataUrl = '') {
  const personal = activeCV.personal;
  const portrait = photoDataUrl
    ? `<img class="cv-expanded-photo" src="${esc(photoDataUrl)}" alt="">`
    : '<div class="cv-expanded-photo cv-expanded-photo-fallback">SS</div>';
  const profileHtml = activeCV.summary.split('<br><br>').map(paragraph =>
    `<p>${cvEsc(paragraph)}</p>`
  ).join('');
  const contactItems = [
    `<span>${cvEsc(t('cvLocation'))}</span>`,
    `<a href="mailto:${esc(personal.email)}">${cvEsc(personal.email)}</a>`,
    `<a href="tel:${esc(personal.phone)}">${cvEsc(personal.phone)}</a>`,
    `<a href="${esc(personal.github)}">${cvEsc(personal.github.replace('https://', ''))}</a>`,
    `<a href="${esc(personal.linkedin)}">${cvEsc(personal.linkedin.replace('https://www.', ''))}</a>`,
    `<a href="${esc(personal.twitter)}">${cvEsc(personal.twitter.replace('https://', ''))}</a>`,
    `<span>${cvEsc(t('cvNationality'))}: ${cvEsc(personal.nationality)}</span>`,
  ].join('');

  return `<!DOCTYPE html>
  <html lang="${cvEsc(currentLang)}">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>${cvEsc(t('cvExpandedLabel'))} - ${cvEsc(personal.name)}</title>
    <style>${EXPANDED_CV_PRINT_STYLES}</style>
  </head>
  <body>
    <button class="cv-expanded-print-button" onclick="window.print()">${cvEsc(t('cvPrint'))}</button>
    <main class="cv-expanded-document">
      <section class="cv-expanded-cover">
        <header class="cv-expanded-header">
          ${portrait}
          <div class="cv-expanded-identity">
            <h1>${cvEsc(personal.name)}</h1>
            <p class="cv-expanded-title">${cvEsc(personal.title)}</p>
            <p class="cv-expanded-tagline">${cvEsc(personal.tagline)}</p>
            <p class="cv-expanded-label">${cvEsc(t('cvExpandedLabel'))}</p>
          </div>
        </header>
        <div class="cv-expanded-contact">${contactItems}</div>
        <section class="cv-expanded-profile">
          ${renderExpandedSectionTitle(t('cvProfile'))}
          ${profileHtml}
        </section>
        <div class="cv-expanded-cover-grid">
          <section>
            ${renderExpandedSectionTitle(t('cvStatistics'))}
            <div class="cv-expanded-stats">${activeCV.stats.map(stat =>
              `<div class="cv-expanded-stat"><strong>${cvEsc(stat.value)}</strong><span>${cvEsc(stat.label)}</span></div>`
            ).join('')}</div>
          </section>
          <section>
            ${renderExpandedSectionTitle(t('cvLanguages'))}
            <div class="cv-expanded-languages">${activeCV.languages.map(language =>
              `<div class="cv-expanded-language"><strong>${cvEsc(language.name)}</strong><span>${cvEsc(language.level)}${language.note ? ` | ${cvEsc(language.note)}` : ''}</span></div>`
            ).join('')}</div>
          </section>
        </div>
      </section>
      <section class="cv-expanded-content-section">
        ${renderExpandedSectionTitle(t('cvExperience'))}
        ${activeCV.experience.map(renderExpandedExperience).join('')}
      </section>
      <section class="cv-expanded-content-section">
        ${renderExpandedSectionTitle(t('cvProjects'))}
        <div class="cv-expanded-projects">${activeCV.projects.map(renderExpandedProject).join('')}</div>
      </section>
      <section class="cv-expanded-content-section">
        ${renderExpandedSectionTitle(t('cvTechnicalSkills'))}
        <div class="cv-expanded-skills">${activeCV.skills.map(renderExpandedSkillGroup).join('')}</div>
      </section>
      <section class="cv-expanded-content-section">
        ${renderExpandedSectionTitle(t('cvEducation'))}
        <div class="cv-expanded-education-list">${activeCV.education.map(renderExpandedEducation).join('')}</div>
      </section>
      <footer class="cv-expanded-footer">${cvEsc(personal.name)} - ${cvEsc(t('cvExpandedLabel'))}</footer>
    </main>
    <script>window.addEventListener('load',function(){setTimeout(function(){window.print()},600)})<\/script>
  </body>
  </html>`;
}
```

- [ ] **Step 4: Share document opening and route export mode**

Replace `downloadCv()` with:

```js
function openCvDocument(html, filename) {
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const win = window.open(url, '_blank');
  if (!win) {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
  }
  setTimeout(() => URL.revokeObjectURL(url), 30000);
}

function downloadCv(mode = 'compact') {
  const photoDataUrl = getCvPhotoDataUrl();
  const expanded = mode === 'expanded';
  const html = expanded
    ? buildExpandedCvHtml(photoDataUrl)
    : buildCvHtml(photoDataUrl);
  const filename = currentLang === 'en'
    ? expanded ? 'Stefan_Sturm_Expanded_Resume.html' : 'Stefan_Sturm_Resume.html'
    : expanded ? 'Stefan_Sturm_Ausfuehrlicher_CV.html' : 'Stefan_Sturm_CV.html';
  openCvDocument(html, filename);
}
```

- [ ] **Step 5: Run all contracts and syntax checks**

```bash
node --check js/data.js
node --check js/main.js
node --check js/cv-export.js
node tests/profile-content.test.js
node tests/pdf-export-menu.test.js
node tests/pdf-export.test.js
git diff --check
```

Expected:

```text
Profile content contract passed for DE and EN
PDF export menu contract passed
Professional PDF export contract passed for DE and EN
```

- [ ] **Step 6: Commit the expanded builder**

```bash
git add js/cv-export.js tests/pdf-export.test.js
git commit -m "feat: add expanded PDF export"
```

---

### Task 4: Render and Verify Expanded German and English PDFs

**Files:**
- Temporary: `tmp/pdfs/expanded-cv/de.html`
- Temporary: `tmp/pdfs/expanded-cv/en.html`
- Temporary: `tmp/pdfs/expanded-cv/de.pdf`
- Temporary: `tmp/pdfs/expanded-cv/en.pdf`

**Interfaces:**
- Consumes: `buildExpandedCvHtml(photoDataUrl)`
- Produces: Structural, text, link, interaction, and visual QA evidence only

- [ ] **Step 1: Generate bilingual HTML fixtures with the real portrait**

Run:

```bash
node - <<'NODE'
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = process.cwd();
const output = path.join(root, 'tmp/pdfs/expanded-cv');
fs.mkdirSync(output, { recursive: true });

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
vm.runInContext(dataSource, context);
vm.runInContext(mainSource, context);
vm.runInContext(
  `${pdfSource}
  this.__expandedFixture = (lang, photo) => {
    currentLang = lang;
    activeCV = localizeCV(lang);
    return {
      html: buildExpandedCvHtml(photo),
      profile: JSON.parse(JSON.stringify(activeCV)),
    };
  };`,
  context
);

const photo = `data:image/png;base64,${
  fs.readFileSync(path.join(root, 'assets/stefan.png')).toString('base64')
}`;
const expected = {};
for (const lang of ['de', 'en']) {
  const fixture = context.__expandedFixture(lang, photo);
  fs.writeFileSync(path.join(output, `${lang}.html`), fixture.html);
  expected[lang] = fixture.profile;
}
fs.writeFileSync(
  path.join(output, 'expected.json'),
  JSON.stringify(expected, null, 2)
);
NODE
```

Expected: `de.html` and `en.html` exist and each contains one `<main class="cv-expanded-document">`.

- [ ] **Step 2: Print both fixtures with headless Chrome**

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless --disable-gpu --no-pdf-header-footer \
  --print-to-pdf=tmp/pdfs/expanded-cv/de.pdf \
  file:///Users/urkman/Development/web/stefansturm.de_claude/tmp/pdfs/expanded-cv/de.html

"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless --disable-gpu --no-pdf-header-footer \
  --print-to-pdf=tmp/pdfs/expanded-cv/en.pdf \
  file:///Users/urkman/Development/web/stefansturm.de_claude/tmp/pdfs/expanded-cv/en.html
```

- [ ] **Step 3: Verify page structure**

Run `pdfinfo` on both files using the bundled Poppler binary.

Require:

- `Pages` greater than `2`
- A4 page size near `595 x 842 pts`
- `Encrypted: no`
- `Form: none`

- [ ] **Step 4: Verify selectable text and privacy**

Run:

```bash
/Users/urkman/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3 - <<'PY'
import json
import logging
import pathlib
import re
import pdfplumber

logging.getLogger("pdfminer").setLevel(logging.ERROR)
root = pathlib.Path("tmp/pdfs/expanded-cv")
profiles = json.loads((root / "expected.json").read_text())

def normalize(value):
    return re.sub(r"\s+", " ", str(value).replace("–", "-").replace("—", "-")).casefold()

for lang, profile in profiles.items():
    with pdfplumber.open(root / f"{lang}.pdf") as document:
        text = normalize(" ".join(page.extract_text() or "" for page in document.pages))

    required = [
        profile["personal"]["name"],
        profile["personal"]["title"],
        *[job["company"] for job in profile["experience"]],
        *[project["name"].split(" - ")[0].split(" – ")[0] for project in profile["projects"]],
        *[category["category"] for category in profile["skills"]],
        *[education["degree"] for education in profile["education"]],
        *[language["name"] for language in profile["languages"]],
        *[stat["value"] for stat in profile["stats"]],
        *[stat["label"] for stat in profile["stats"]],
    ]
    missing = [value for value in required if normalize(value) not in text]
    assert not missing, f"{lang}: missing selectable text {missing}"

    for project in profile["projects"]:
        significant_words = {
            word.casefold()
            for word in re.findall(r"[A-Za-zÀ-ÿ0-9]{5,}", project["description"])
        }
        missing_words = sorted(word for word in significant_words if word not in text)
        assert not missing_words, f"{lang}: missing project text words for {project['name']}: {missing_words}"

    forbidden = [
        profile["personal"]["address"],
        profile["personal"]["birthplace"],
        profile["personal"]["maritalStatus"],
    ]
    leaked = [value for value in forbidden if normalize(value) in text]
    assert not leaked, f"{lang}: leaked private data {leaked}"

print("Expanded PDF text and privacy checks passed for DE and EN")
PY
```

Expected output:

```text
Expanded PDF text and privacy checks passed for DE and EN
```

- [ ] **Step 5: Verify clickable PDF links**

Run:

```bash
/Users/urkman/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3 - <<'PY'
import json
import pathlib
from pypdf import PdfReader

root = pathlib.Path("tmp/pdfs/expanded-cv")
profiles = json.loads((root / "expected.json").read_text())

for lang, profile in profiles.items():
    reader = PdfReader(root / f"{lang}.pdf")
    actual = set()
    for page in reader.pages:
        for annotation_ref in page.get("/Annots", []):
            annotation = annotation_ref.get_object()
            action = annotation.get("/A")
            if action and action.get("/URI"):
                actual.add(str(action.get("/URI")))

    personal = profile["personal"]
    expected = {
        f"mailto:{personal['email']}",
        f"tel:{personal['phone']}",
        personal["github"],
        personal["linkedin"],
        personal["twitter"],
        *[
            job["appUrl"]
            for job in profile["experience"]
            if job.get("appUrl")
        ],
        *[
            project["url"]
            for project in profile["projects"]
            if project.get("url")
        ],
    }
    missing = sorted(expected - actual)
    assert not missing, f"{lang}: missing PDF links {missing}"

print("Expanded PDF link checks passed for DE and EN")
PY
```

Expected output:

```text
Expanded PDF link checks passed for DE and EN
```

- [ ] **Step 6: Render and inspect every page**

```bash
pdftoppm -png -r 144 tmp/pdfs/expanded-cv/de.pdf tmp/pdfs/expanded-cv/de-page
pdftoppm -png -r 144 tmp/pdfs/expanded-cv/en.pdf tmp/pdfs/expanded-cv/en-page
```

Inspect every generated PNG. Require:

- Balanced first-page cover
- No clipping, overlap, broken glyphs, or missing entries
- No entry stranded under a heading without meaningful content
- No avoidable split inside roles, projects, skills, or education
- Readable body text and technology labels at normal zoom
- Consistent margins and section hierarchy
- Repeated footer visible on every page
- No browser-generated date, URL, title, or page header

- [ ] **Step 7: Correct visual defects and repeat PDF QA**

If any requirement in Step 6 fails, change only `EXPANDED_CV_PRINT_STYLES` or expanded render structure. Repeat Steps 2 through 6 for both languages after every meaningful adjustment.

- [ ] **Step 8: Verify both live export menus**

Reload `http://127.0.0.1:8081/` in the in-app browser. For German and English:

- Open the navigation PDF menu and hero PDF menu
- Confirm both localized commands and descriptions
- Verify Escape closes and restores focus
- Verify arrow keys move between both menu items
- Select compact and confirm a two-page print document opens
- Select expanded and confirm a flowing document opens
- Confirm no relevant console errors

If browser security blocks automated popup actions, verify menu state and keyboard behavior in the live page, then rely on the generated fixtures and VM contracts for document opening.

- [ ] **Step 9: Clean temporary artifacts**

```bash
rm -r tmp/pdfs/expanded-cv
```

- [ ] **Step 10: Run final repository checks**

```bash
node --check js/data.js
node --check js/main.js
node --check js/cv-export.js
node tests/profile-content.test.js
node tests/pdf-export-menu.test.js
node tests/pdf-export.test.js
git diff --check
git status --short --branch
```

- [ ] **Step 11: Commit QA-driven refinements**

If Step 7 changed tracked files:

```bash
git add js/cv-export.js
git commit -m "fix: polish expanded PDF layout"
```
