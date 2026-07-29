# DevBar Project Card Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add DevBar as the newest bilingual portfolio project with an accurate website CTA and confirmed native macOS technology tags.

**Architecture:** Extend the existing project data with a `linkType` discriminator and keep project rendering data-driven. The renderer maps `linkType: 'website'` to a localized website label and globe icon while preserving the App Store fallback for all existing projects.

**Tech Stack:** Static HTML, vanilla JavaScript, Node.js assertions, in-app browser QA

## Global Constraints

- DevBar is the first project in German and English.
- The project URL is exactly `https://devbar.netlify.app`.
- The period is `2026 – bis jetzt` in German and `2026 – present` in English.
- DevBar uses `linkType: 'website'`; existing projects keep the App Store CTA.
- No new runtime dependencies or project-card-specific CSS.

---

### Task 1: Define the DevBar Project Contract

**Files:**
- Modify: `tests/profile-content.test.js`
- Test: `tests/profile-content.test.js`

**Interfaces:**
- Consumes: Localized `profiles.de.projects` and `profiles.en.projects`
- Produces: Exact assertions for DevBar placement, identity, copy, tags, and link type

- [ ] **Step 1: Add the expected DevBar content**

```js
const expectedDevBar = {
  de: {
    period: '2026 – bis jetzt',
    description: 'Eine native macOS-26-Menüleisten-App für Apple-Plattform-Entwickler. DevBar bereinigt Xcode- und SPM-Caches, steuert Simulatoren, unterstützt Git-Workflows mit Diffs, Commits, Push und Pull Requests und bündelt Referenzen sowie Entwicklerwerkzeuge. Die App arbeitet sandboxed und weitgehend offline; Commit-Nachrichten entstehen lokal mit Apple Intelligence.',
  },
  en: {
    period: '2026 – present',
    description: 'A native macOS 26 menu-bar app for Apple-platform developers. DevBar cleans Xcode and SPM caches, controls simulators, supports Git workflows with diffs, commits, pushes and pull requests, and bundles references and everyday developer utilities. The app is sandboxed and mostly offline; commit messages are generated locally with Apple Intelligence.',
  },
};

const expectedDevBarTech = [
  'Swift',
  'SwiftUI',
  'Swift Concurrency',
  'Foundation',
  'AppKit',
  'Apple Intelligence',
  'macOS 26',
  'GitHub',
  'XCTest',
  'Xcode Cloud',
];
```

- [ ] **Step 2: Assert the localized first project**

```js
for (const [lang, profile] of Object.entries(profiles)) {
  const devbar = profile.projects[0];
  assert.equal(devbar.name, 'DevBar – Apple Developer Toolkit', `${lang}: DevBar must be first`);
  assert.equal(devbar.period, expectedDevBar[lang].period, `${lang}: DevBar period differs`);
  assert.equal(devbar.url, 'https://devbar.netlify.app', `${lang}: DevBar URL differs`);
  assert.equal(devbar.linkType, 'website', `${lang}: DevBar link type differs`);
  assert.equal(devbar.description, expectedDevBar[lang].description, `${lang}: DevBar description differs`);
  assert.deepEqual(Array.from(devbar.tech), expectedDevBarTech, `${lang}: DevBar technology tags differ`);
}
```

- [ ] **Step 3: Run the contract and verify it fails**

Run:

```bash
node tests/profile-content.test.js
```

Expected: FAIL because the first project is still Fast.io.

- [ ] **Step 4: Commit the failing contract**

```bash
git add tests/profile-content.test.js
git commit -m "test: define DevBar project content"
```

---

### Task 2: Add DevBar to the Bilingual Project Data

**Files:**
- Modify: `js/data.js`
- Test: `tests/profile-content.test.js`

**Interfaces:**
- Consumes: The index-aligned localization behavior in `mergeLocalized(base, override)`
- Produces: A localized DevBar project at `activeCV.projects[0]`

- [ ] **Step 1: Insert DevBar at the start of the German base projects**

```js
{
  name: 'DevBar – Apple Developer Toolkit',
  period: '2026 – bis jetzt',
  url: 'https://devbar.netlify.app',
  linkType: 'website',
  description: 'Eine native macOS-26-Menüleisten-App für Apple-Plattform-Entwickler. DevBar bereinigt Xcode- und SPM-Caches, steuert Simulatoren, unterstützt Git-Workflows mit Diffs, Commits, Push und Pull Requests und bündelt Referenzen sowie Entwicklerwerkzeuge. Die App arbeitet sandboxed und weitgehend offline; Commit-Nachrichten entstehen lokal mit Apple Intelligence.',
  tech: [
    'Swift',
    'SwiftUI',
    'Swift Concurrency',
    'Foundation',
    'AppKit',
    'Apple Intelligence',
    'macOS 26',
    'GitHub',
    'XCTest',
    'Xcode Cloud',
  ],
},
```

- [ ] **Step 2: Insert the English DevBar override at the start of `CV_TRANSLATIONS.en.projects`**

```js
{
  period: '2026 – present',
  description: 'A native macOS 26 menu-bar app for Apple-platform developers. DevBar cleans Xcode and SPM caches, controls simulators, supports Git workflows with diffs, commits, pushes and pull requests, and bundles references and everyday developer utilities. The app is sandboxed and mostly offline; commit messages are generated locally with Apple Intelligence.',
},
```

Existing English project overrides remain after this new first item so their indices continue to match the German base list.

- [ ] **Step 3: Run the content contract**

Run:

```bash
node tests/profile-content.test.js
```

Expected: `Profile content contract passed for DE and EN`.

- [ ] **Step 4: Commit the project data**

```bash
git add js/data.js
git commit -m "feat: add DevBar project"
```

---

### Task 3: Render the Correct Project CTA

**Files:**
- Modify: `js/data.js`
- Modify: `js/main.js`
- Modify: `index.html`
- Test: `tests/profile-content.test.js`

**Interfaces:**
- Consumes: `proj.linkType` with supported value `'website'`
- Produces: `websiteView` translations and per-project CTA icon/label selection

- [ ] **Step 1: Add the website CTA translations**

Add to `I18N.de`:

```js
websiteView: 'Website ansehen',
```

Add to `I18N.en`:

```js
websiteView: 'View website',
```

- [ ] **Step 2: Make `renderProjects` choose the CTA from `linkType`**

Replace the project mapper with a block body and derive the presentation before returning the existing card markup:

```js
function renderProjects() {
  const html = activeCV.projects.map(proj => {
    const isWebsite = proj.linkType === 'website';
    const linkIcon = isWebsite ? 'fas fa-globe' : 'fab fa-app-store-ios';
    const linkLabel = isWebsite ? t('websiteView') : t('appStoreView');

    return `
    <article class="project-card reveal">
      <div class="project-header">
        <h3 class="project-name">${esc(proj.name)}</h3>
        <span class="project-badge">${esc(proj.period)}</span>
      </div>
      ${proj.url ? `
        <a href="${esc(proj.url)}" target="_blank" rel="noopener noreferrer" class="project-store-link">
          <i class="${linkIcon}" aria-hidden="true"></i>
          ${esc(linkLabel)}
          <i class="fas fa-external-link-alt" style="font-size:.7rem" aria-hidden="true"></i>
        </a>` : ''}
      <p class="project-desc">${esc(proj.description)}</p>
      ${renderTechTags(proj.tech)}
    </article>`;
  }).join('');

  document.getElementById('projects-grid').innerHTML = html;
}
```

- [ ] **Step 3: Extend the source-level contract**

```js
assert.match(sourceFiles.main, /proj\.linkType === 'website'/);
assert.match(sourceFiles.main, /t\('websiteView'\)/);
assert.match(dataSource, /websiteView:\s*'Website ansehen'/);
assert.match(dataSource, /websiteView:\s*'View website'/);
```

- [ ] **Step 4: Rotate the local script asset version**

```html
<script src="js/data.js?v=20260729-devbar-project"></script>
<script src="js/main.js?v=20260729-devbar-project"></script>
```

- [ ] **Step 5: Run syntax, content, and diff checks**

Run:

```bash
node --check js/data.js
node --check js/main.js
node tests/profile-content.test.js
git diff --check
```

Expected: syntax checks exit successfully, the contract prints `Profile content contract passed for DE and EN`, and the diff check prints nothing.

- [ ] **Step 6: Verify the rendered card**

Serve the repository and inspect DevBar in German and English at desktop width and at `390x844`.

Expected:

- DevBar is the first project.
- The CTA reads `Website ansehen` in German and `View website` in English.
- The CTA points to `https://devbar.netlify.app/` in the rendered browser.
- Existing projects retain `Im App Store ansehen` / `View on the App Store`.
- All ten technology tags render without horizontal overflow.
- The browser console has no relevant warnings or errors.

- [ ] **Step 7: Commit the CTA implementation**

```bash
git add js/data.js js/main.js index.html tests/profile-content.test.js
git commit -m "feat: support project website links"
```
