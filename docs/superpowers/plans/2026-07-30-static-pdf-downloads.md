# Static PDF Downloads Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace browser-generated PDF downloads with four validated, committed PDF artifacts generated from the existing CV renderer.

**Architecture:** Keep `js/data.js` and the existing `buildCvHtml` / `buildExpandedCvHtml` functions as the single source for PDF content and layout. Add a Node/Chrome generator that renders all language and format combinations into temporary files, validates them, then installs them under `assets/pdf/`; the browser download function maps the active language and format directly to those files.

**Tech Stack:** Vanilla JavaScript, Node.js VM and child processes, headless Google Chrome, Poppler `pdfinfo` / `pdftoppm`, Python `pypdf` for PDF validation, and the existing Node test scripts.

## Global Constraints

- Store final artifacts under `assets/pdf/` with stable filenames.
- Keep German and English compact and expanded exports.
- Do not use browser-side `window.print()` for visitor downloads.
- Generate from the existing PDF renderer; do not duplicate CV content in the generator.
- Generate into `tmp/pdfs/` first and install artifacts only after all four pass validation.
- Use `CHROME_BIN` when set; otherwise use the current macOS Chrome path.
- Validate A4 size, unencrypted output, non-empty pages, website text, and website links.
- Regenerate with `node scripts/generate-pdfs.js` after CV data or translation changes.

---

### Task 1: Add the static-download contract

**Files:**
- Create: `tests/static-pdf-downloads.test.js`
- Modify: `js/cv-export.js` only after the failing test is confirmed

**Interfaces:**
- Produces the expected `STATIC_PDF_VERSION` and `STATIC_PDF_ASSETS` interface for the browser download flow.
- Expects these final asset names: `stefan-sturm-cv-de.pdf`, `stefan-sturm-cv-en.pdf`, `stefan-sturm-expanded-cv-de.pdf`, and `stefan-sturm-expanded-cv-en.pdf`.

- [ ] **Step 1: Write the failing contract test.**

Create `tests/static-pdf-downloads.test.js` with assertions that:

```js
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const exportSource = fs.readFileSync(path.join(root, 'js/cv-export.js'), 'utf8');
const expected = [
  'assets/pdf/stefan-sturm-cv-de.pdf',
  'assets/pdf/stefan-sturm-cv-en.pdf',
  'assets/pdf/stefan-sturm-expanded-cv-de.pdf',
  'assets/pdf/stefan-sturm-expanded-cv-en.pdf',
];

assert.match(exportSource, /const STATIC_PDF_VERSION = '[^']+'/);
assert.match(exportSource, /const STATIC_PDF_ASSETS = \{/);
assert.match(exportSource, /link\.download = filename/);
expected.forEach(asset => assert.ok(exportSource.includes(asset), `missing ${asset}`));

for (const asset of expected) {
  assert.ok(fs.existsSync(path.join(root, asset)), `missing generated artifact ${asset}`);
}

console.log('Static PDF download contract passed');
```

- [ ] **Step 2: Run the test and verify it fails.**

Run:

```bash
node tests/static-pdf-downloads.test.js
```

Expected: FAIL because the static mapping and generated PDF files do not exist yet.

- [ ] **Step 3: Commit the failing contract.**

```bash
git add tests/static-pdf-downloads.test.js
git commit -m "test: define static PDF download contract"
```

### Task 2: Switch the browser download flow to static assets

**Files:**
- Modify: `js/cv-export.js:640-660`
- Test: `tests/static-pdf-downloads.test.js`

**Interfaces:**
- `STATIC_PDF_VERSION`: string used as the cache-busting query value.
- `STATIC_PDF_ASSETS`: `{ de: { compact: string, expanded: string }, en: { compact: string, expanded: string } }`.
- `downloadCv(mode = 'compact')`: creates and clicks a same-origin download anchor without opening an HTML document.

- [ ] **Step 1: Add the stable asset mapping and replace the dynamic download implementation.**

Add the following mapping near the existing export helpers:

```js
const STATIC_PDF_VERSION = '20260730-static-pdf-v1';
const STATIC_PDF_ASSETS = {
  de: {
    compact: 'assets/pdf/stefan-sturm-cv-de.pdf',
    expanded: 'assets/pdf/stefan-sturm-expanded-cv-de.pdf',
  },
  en: {
    compact: 'assets/pdf/stefan-sturm-cv-en.pdf',
    expanded: 'assets/pdf/stefan-sturm-expanded-cv-en.pdf',
  },
};
```

Replace `downloadCv` with:

```js
function downloadCv(mode = 'compact') {
  const language = STATIC_PDF_ASSETS[currentLang] ? currentLang : 'de';
  const format = mode === 'expanded' ? 'expanded' : 'compact';
  const asset = STATIC_PDF_ASSETS[language][format];
  const filename = language === 'en'
    ? format === 'expanded' ? 'Stefan_Sturm_Expanded_Resume.pdf' : 'Stefan_Sturm_Resume.pdf'
    : format === 'expanded' ? 'Stefan_Sturm_Ausfuehrlicher_CV.pdf' : 'Stefan_Sturm_CV.pdf';
  const link = document.createElement('a');
  link.href = `${asset}?v=${encodeURIComponent(STATIC_PDF_VERSION)}`;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
}
```

Leave `buildCvHtml`, `buildExpandedCvHtml`, and their helpers intact for the offline generator and existing renderer tests. The browser path must no longer call `getCvPhotoDataUrl`, `openCvDocument`, or `window.print()`.

- [ ] **Step 2: Extend the contract test for the download behavior.**

Assert that the source contains the four mapping paths, a cache-busting query, and no dynamic call from `downloadCv`:

```js
assert.match(exportSource, /\?v=\$\{encodeURIComponent\(STATIC_PDF_VERSION\)\}/);
assert.doesNotMatch(exportSource, /function downloadCv[\s\S]*?getCvPhotoDataUrl\(\)/);
assert.doesNotMatch(exportSource, /function downloadCv[\s\S]*?openCvDocument\(/);
```

- [ ] **Step 3: Run the focused tests.**

Run:

```bash
node tests/pdf-export-menu.test.js
node tests/pdf-export.test.js
node tests/static-pdf-downloads.test.js
```

Expected: the existing menu and renderer tests pass; the static test still fails only because the four PDF artifacts have not been generated.

- [ ] **Step 4: Commit the browser flow change.**

```bash
git add js/cv-export.js tests/static-pdf-downloads.test.js
git commit -m "feat: download static CV PDFs"
```

### Task 3: Add the repeatable PDF generator

**Files:**
- Create: `scripts/generate-pdfs.js`
- Create: `docs/pdf-generation.md`
- Test: `tests/static-pdf-downloads.test.js`

**Interfaces:**
- Command: `node scripts/generate-pdfs.js`.
- Environment: optional `CHROME_BIN`; default `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`.
- Output: four validated PDFs in `assets/pdf/`.

- [ ] **Step 1: Add the generator with VM rendering and staged output.**

Implement a Node script using `fs`, `path`, `vm`, `child_process.spawnSync`, and `url.pathToFileURL` with these functions:

```js
const ARTIFACTS = [
  { language: 'de', format: 'compact', file: 'stefan-sturm-cv-de.pdf' },
  { language: 'en', format: 'compact', file: 'stefan-sturm-cv-en.pdf' },
  { language: 'de', format: 'expanded', file: 'stefan-sturm-expanded-cv-de.pdf' },
  { language: 'en', format: 'expanded', file: 'stefan-sturm-expanded-cv-en.pdf' },
];

function renderHtml(language, format, photoDataUrl) {
  currentLang = language;
  activeCV = localizeCV(language);
  return format === 'expanded'
    ? buildExpandedCvHtml(photoDataUrl)
    : buildCvHtml(photoDataUrl);
}
```

The VM context must provide the same minimal browser globals already used by `tests/pdf-export.test.js`: `localStorage`, `window.matchMedia`, `document.documentElement`, and `document.addEventListener`. Load `js/data.js`, `js/main.js`, and `js/cv-export.js`, then expose `renderHtml` from the context.

Use the portrait data URL from `assets/stefan.png`. Write all intermediate HTML and PDFs under a unique `tmp/pdfs/static-export-<timestamp>/` directory. Resolve the Chrome binary from `CHROME_BIN` or the default path and fail before generation if it is not executable.

Print each HTML file with:

```text
--headless --disable-gpu --no-pdf-header-footer --print-to-pdf=<staged-pdf> file://<staged-html>
```

Do not write to `assets/pdf/` until every artifact has been generated and validated.

- [ ] **Step 2: Add PDF validation and atomic installation.**

Validate each staged PDF with `pdfinfo`:

- `Page size` must be A4 (`594.96 x 841.92 pts`).
- `Encrypted` must be `no`.
- `Pages` must be `2` for compact files and greater than `2` for expanded files.

Run a short `python3` process using `pypdf` for each file. Require every page to have non-whitespace extracted text and require at least one URI equal to `https://stefansturm.de` after trimming a trailing slash. Require the expanded page-2 text to contain `Technische Kenntnisse` for German and `Technical Skills` for English.

After all four checks pass, create `assets/pdf/` and rename the staged PDFs to their stable filenames. On failure, leave existing committed artifacts untouched and delete only the unique temporary directory.

- [ ] **Step 3: Document regeneration and prerequisites.**

Create `docs/pdf-generation.md` containing:

````markdown
# PDF Generation

Regenerate all committed CV PDF artifacts after changing CV data or translations:

```bash
node scripts/generate-pdfs.js
```

The generator requires headless Google Chrome, Poppler (`pdfinfo`), Python 3 with `pypdf`, and the repository portrait at `assets/stefan.png`. Set `CHROME_BIN` when Chrome is installed at a different path.
````

- [ ] **Step 4: Test the generator in isolation.**

Run:

```bash
node scripts/generate-pdfs.js
```

Expected: it prints four validated artifact names and exits `0`; `assets/pdf/` contains exactly four PDF files. Run the static contract test and expect it to pass.

- [ ] **Step 5: Commit the generator and documentation.**

```bash
git add scripts/generate-pdfs.js docs/pdf-generation.md
git commit -m "feat: add reproducible static PDF generator"
```

### Task 4: Generate and verify the committed PDF artifacts

**Files:**
- Create: `assets/pdf/stefan-sturm-cv-de.pdf`
- Create: `assets/pdf/stefan-sturm-cv-en.pdf`
- Create: `assets/pdf/stefan-sturm-expanded-cv-de.pdf`
- Create: `assets/pdf/stefan-sturm-expanded-cv-en.pdf`

**Interfaces:**
- Consumes the generator from Task 3 and the current localized CV data.
- Produces four files consumed by `downloadCv` and the static artifact test.

- [ ] **Step 1: Generate the PDFs.**

Run:

```bash
node scripts/generate-pdfs.js
```

Expected: all four files are regenerated under `assets/pdf/` and the generator validates them before installation.

- [ ] **Step 2: Run all automated checks.**

Run:

```bash
for test in tests/*.test.js; do node "$test"; done
git diff --check
```

Expected: all tests pass and Git reports no whitespace errors.

- [ ] **Step 3: Commit the generated artifacts.**

```bash
git add assets/pdf
git commit -m "build: add static CV PDF artifacts"
```

### Task 5: Perform final PDF QA and clean temporary files

**Files:**
- Modify: none unless QA exposes a defect in `js/cv-export.js` or `scripts/generate-pdfs.js`
- Temporary: `tmp/pdfs/`

**Interfaces:**
- Verifies the exact artifacts served by the website, not only the HTML renderer.

- [ ] **Step 1: Inspect metadata and links.**

Run:

```bash
for file in assets/pdf/*.pdf; do
  pdfinfo "$file" | rg 'Pages|Page size|Encrypted|Form'
done
```

Use `pypdf` to verify the website link, all pages having text, the compact page count of 2, and expanded page 2 containing the skills heading in both languages.

- [ ] **Step 2: Render every final PDF page.**

Run:

```bash
mkdir -p tmp/pdfs/final-render
for file in assets/pdf/*.pdf; do
  base="$(basename "$file" .pdf)"
  pdftoppm -png -r 110 "$file" "tmp/pdfs/final-render/$base"
done
```

Inspect every generated PNG. Confirm there are no blank pages, clipped headings, overlapping text, missing page footers, broken portrait rendering, or clustered skills content. Confirm the website appears in the contact areas and the expanded skills page is page 2.

- [ ] **Step 3: Remove temporary QA files and check the final worktree.**

```bash
find tmp/pdfs -type f -delete
find tmp/pdfs -type d -empty -delete
git diff --check
git status --short
```

Expected: no temporary files remain; only intentional source, documentation, test, and PDF artifact changes are present.

- [ ] **Step 4: Commit any QA fixes and push the completed branch.**

If QA required a source fix, run the focused tests and generator again, then commit the fix. When the worktree is clean:

```bash
git push origin main
```
