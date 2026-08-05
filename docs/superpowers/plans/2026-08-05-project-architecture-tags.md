# Project Architecture Tags Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Put architecture and modern Swift technology tags on the correct profile entries, with TCA limited to EnBW and Chrono24 and MVVM present on every private project.

**Architecture:** Keep `js/data.js` as the shared German base and English localization source. Update the existing content contract before changing data, then regenerate the existing static PDFs because the website and PDF renderers already consume the same technology arrays.

**Tech Stack:** Plain JavaScript data objects, Node.js contract tests, headless Chrome, Python/pypdf, committed static PDF assets.

## Global Constraints

- TCA appears on EnBW and Chrono24 only.
- Devil, Fast.io, OverlayLab, and S3XY Watch for Tesla contain MVVM.
- Devil and Fast.io retain their existing AI project claims; only their technology tags change.
- Update German base arrays and English experience overrides so both languages show the same stack.
- Keep compact PDFs at exactly 2 A4 pages and expanded PDFs at exactly 9 A4 pages.
- Bump browser and static PDF cache versions so reloads cannot serve stale data or artifacts.
- Do not add dependencies or modify the PDF layout renderer unless a regression requires it.

---

### Task 1: Define the technology-tag contract

**Files:**
- Modify: `tests/profile-content.test.js`
- Test: `tests/profile-content.test.js`

**Interfaces:**
- Consumes: `CV` and `CV_TRANSLATIONS.en` through the existing `mergeLocalized` helper.
- Produces: assertions for EnBW/Chrono24 stacks, private-project MVVM coverage, and private-project TCA exclusion.

- [ ] **Step 1: Update the Devil fixture and add stack fixtures**

Replace `expectedDevilTech` with:

```js
const expectedDevilTech = [
  'Swift', 'SwiftUI', 'Swift Concurrency', 'Foundation', 'AppKit',
  'Apple Intelligence', 'macOS 26', 'GitHub', 'XCTest', 'Xcode Cloud', 'MVVM',
];

const expectedExperienceTech = {
  EnBW: [
    'Swift', 'SwiftUI', 'Combine', 'TCA', 'MVVM', 'Swift Concurrency',
    'SwiftData', 'Foundation', 'XCTest', 'Swift Testing', 'GitLab CI/CD',
  ],
  Chrono24: [
    'Swift', 'SwiftUI', 'Combine', 'TCA', 'CleanSwift', 'Swift Concurrency',
    'SwiftData', 'Foundation', 'XCTest', 'Swift Testing', 'REST (JSON)',
    'GraphQL', 'GitLab CI/CD',
  ],
};
```

- [ ] **Step 2: Add bilingual experience and private-project assertions**

Inside the existing project/content loop, add:

```js
  ['EnBW', 'Chrono24'].forEach(company => {
    const job = profile.experience.find(entry => entry.company === company);
    assert.ok(job, `${lang}: ${company} experience missing`);
    expectedExperienceTech[company].forEach(technology => {
      assert.ok(job.tech.includes(technology), `${lang}: ${company} missing ${technology}`);
    });
  });

  profile.projects.forEach(project => {
    assert.ok(project.tech.includes('MVVM'), `${lang}: ${project.name} missing MVVM`);
    assert.ok(!project.tech.includes('TCA'), `${lang}: ${project.name} must not include TCA`);
  });
```

Replace the current Fast.io assertion with:

```js
  assert.ok(fast.tech.includes('MVVM'), `${lang}: Fast.io missing MVVM`);
  assert.ok(!fast.tech.includes('TCA'), `${lang}: Fast.io must not include TCA`);
```

- [ ] **Step 3: Run the contract and verify the intended failure**

```bash
node tests/profile-content.test.js
```

Expected: FAIL because the current data still puts TCA on Devil/Fast.io and lacks the approved EnBW/Chrono24 tags.

- [ ] **Step 4: Commit the failing contract**

```bash
git add tests/profile-content.test.js
git commit -m "test: define project architecture tag mapping"
```

### Task 2: Update localized shared data and cache versions

**Files:**
- Modify: `js/data.js`
- Modify: `index.html`
- Modify: `js/cv-export.js`
- Test: `tests/profile-content.test.js`

**Interfaces:**
- Consumes: the contract from Task 1.
- Produces: localized technology arrays used by the website, generated HTML, and static PDFs.

- [ ] **Step 1: Update German EnBW and Chrono24 technology arrays**

Add these missing tags while preserving existing relevant tags:

```js
// EnBW additions
'TCA', 'MVVM', 'Swift Concurrency', 'SwiftData', 'Foundation',
'XCTest', 'Swift Testing', 'GitLab CI/CD',

// Chrono24 additions
'TCA', 'Swift Concurrency', 'SwiftData', 'Foundation', 'XCTest',
'Swift Testing', 'GraphQL', 'GitLab CI/CD',
```

- [ ] **Step 2: Update the private project architecture tags**

Change the private project arrays as follows:

```js
// Devil: remove TCA and add MVVM
tech: [
  'Swift', 'SwiftUI', 'Swift Concurrency', 'Foundation', 'AppKit',
  'Apple Intelligence', 'macOS 26', 'GitHub', 'XCTest', 'Xcode Cloud', 'MVVM',
],

// Fast.io: remove TCA and keep MVVM
tech: ['Swift', 'SwiftUI', 'Swift Concurrency', 'Foundation', 'Swift Testing', 'XCTest',
       'HealthKit', 'Live Activities', 'WidgetKit', 'Apple Watch', 'Dynamic Island',
       'Xcode Cloud', 'MVVM'],
```

Leave OverlayLab and S3XY Watch for Tesla unchanged because both already contain MVVM and neither contains TCA.

- [ ] **Step 3: Mirror EnBW and Chrono24 tags in English overrides**

Update the two `CV_TRANSLATIONS.en.experience` technology arrays with the same approved additions and existing English labels:

```js
// EnBW additions
'TCA', 'MVVM', 'Swift Concurrency', 'SwiftData', 'Foundation',
'XCTest', 'Swift Testing', 'GitLab CI/CD',

// Chrono24 additions
'TCA', 'Swift Concurrency', 'SwiftData', 'Foundation', 'XCTest',
'Swift Testing', 'GraphQL', 'GitLab CI/CD',
```

- [ ] **Step 4: Bump browser and static PDF cache versions**

Set the stylesheet and three local scripts in `index.html` to `?v=20260805-project-architecture-tags` and set in `js/cv-export.js`:

```js
const STATIC_PDF_VERSION = '20260805-project-architecture-tags-v1';
```

- [ ] **Step 5: Run data and syntax checks**

```bash
node --check js/data.js
node --check js/main.js
node --check js/cv-export.js
node tests/profile-content.test.js
git diff --check
```

Expected: all checks pass and the profile contract prints `Profile content contract passed for DE and EN`.

- [ ] **Step 6: Commit the data update**

```bash
git add js/data.js index.html js/cv-export.js
git commit -m "feat: align project architecture technology tags"
```

### Task 3: Regenerate and validate static PDFs

**Files:**
- Modify: `assets/pdf/stefan-sturm-cv-de.pdf`
- Modify: `assets/pdf/stefan-sturm-cv-en.pdf`
- Modify: `assets/pdf/stefan-sturm-expanded-cv-de.pdf`
- Modify: `assets/pdf/stefan-sturm-expanded-cv-en.pdf`
- Test: `tests/static-pdf-downloads.test.js`, `tests/pdf-export.test.js`

**Interfaces:**
- Consumes: updated localized data and the existing `scripts/generate-pdfs.js` pipeline.
- Produces: four static PDFs with updated architecture tags and unchanged page contracts.

- [ ] **Step 1: Run source contracts before generation**

```bash
node tests/profile-content.test.js
node tests/pdf-export.test.js
node tests/static-pdf-downloads.test.js
```

- [ ] **Step 2: Generate all four PDFs**

```bash
node scripts/generate-pdfs.js
```

Expected output contains four `Validated ...pdf` lines.

- [ ] **Step 3: Verify page counts and architecture terms**

```bash
python3 - <<'PY'
from pathlib import Path
from pypdf import PdfReader

expected = {
    'stefan-sturm-cv-de.pdf': 2,
    'stefan-sturm-cv-en.pdf': 2,
    'stefan-sturm-expanded-cv-de.pdf': 9,
    'stefan-sturm-expanded-cv-en.pdf': 9,
}
for path in sorted(Path('assets/pdf').glob('*.pdf')):
    reader = PdfReader(path)
    assert len(reader.pages) == expected[path.name], (path.name, len(reader.pages))
    text = '\n'.join((page.extract_text() or '') for page in reader.pages)
    for term in ['EnBW', 'Chrono24', 'TCA', 'MVVM', 'Swift Concurrency', 'SwiftData', 'Foundation']:
        assert term.lower() in text.lower(), f'{path.name}: missing {term}'
    print(path.name, len(reader.pages), 'pages validated')
PY
```

- [ ] **Step 4: Run all contracts and commit regenerated artifacts**

```bash
for test in tests/*.test.js; do node "$test"; done
git diff --check
git add assets/pdf
git commit -m "build: regenerate PDFs with project architecture tags"
```

### Task 4: Final QA

**Files:**
- Test: all `tests/*.test.js`

- [ ] **Step 1: Confirm no private project contains TCA**

```bash
node tests/profile-content.test.js
```

- [ ] **Step 2: Confirm the local website and language switch**

Use the existing local server at `http://127.0.0.1:8081/`. Check that EnBW and Chrono24 show TCA and the modern stack, while Devil/Fast.io/OverlayLab/S3XY show MVVM without TCA in both languages.

- [ ] **Step 3: Confirm repository state**

```bash
node --check js/data.js
node --check js/main.js
node --check js/cv-export.js
for test in tests/*.test.js; do node "$test"; done
git diff --check
git status --short --branch
```

Expected: all tests pass and the working tree is clean.
