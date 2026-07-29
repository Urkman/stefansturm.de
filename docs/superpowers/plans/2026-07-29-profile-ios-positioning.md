# Profile iOS Positioning Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove all AI-specific profile content and reposition the bilingual website around the requested senior iOS, testing, platform, CI/CD, language, and marketplace competencies.

**Architecture:** Preserve the static HTML/CSS/JavaScript architecture and the existing `CV` plus `CV_TRANSLATIONS.en` localization model. Add one dependency-free Node content-contract test, update the bilingual data at its source, then remove the now-unused AI presentation/export implementation.

**Tech Stack:** HTML5, CSS, vanilla JavaScript, Node.js built-in `assert`/`vm`, local Python static server

## Global Constraints

- German remains the default language.
- German and English must express the same experience and positioning.
- Remove every AI-specific reference from visible content, skills, projects, data, renderers, exports, translations, and styles.
- Integrate Swift, SwiftUI, Combine, Swift Concurrency, async/await, Actors, Swift Testing, XCTest, Foundation, iOS platform APIs, GitLab CI/CD, English/German proficiency, and e-commerce/marketplace experience.
- Marketplace positioning must be grounded in the existing Chrono24 catalog work.
- Do not add a new page section, framework, or runtime dependency.

---

### Task 1: Add a bilingual profile content contract

**Files:**
- Create: `tests/profile-content.test.js`

**Interfaces:**
- Consumes: `CV`, `I18N`, and `CV_TRANSLATIONS` from `js/data.js`
- Produces: a dependency-free test command, `node tests/profile-content.test.js`, that validates profile positioning and AI removal

- [ ] **Step 1: Write the failing content-contract test**

```javascript
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const dataSource = fs.readFileSync(path.join(root, 'js/data.js'), 'utf8');
const context = {};

vm.runInNewContext(
  `${dataSource}\nthis.__profile = { CV, I18N, CV_TRANSLATIONS };`,
  context,
  { filename: 'js/data.js' }
);

const { CV, CV_TRANSLATIONS } = context.__profile;

function mergeLocalized(base, override) {
  if (override === undefined) return base;
  if (Array.isArray(base)) {
    return base.map((item, index) => mergeLocalized(item, override?.[index]));
  }
  if (base && typeof base === 'object') {
    const merged = { ...base };
    Object.keys(override || {}).forEach(key => {
      merged[key] = mergeLocalized(base[key], override[key]);
    });
    return merged;
  }
  return override;
}

const profiles = {
  de: CV,
  en: mergeLocalized(CV, CV_TRANSLATIONS.en),
};

const forbiddenAiTerms = /\bAI\b|Agentic|Codex|Claude|ChatGPT|Copilot|Grok|Prompt Engineering|RocketSim|App Store Connect CLI/i;
for (const [lang, profile] of Object.entries(profiles)) {
  assert.equal(profile.ai, undefined, `${lang}: AI data must be removed`);
  assert.doesNotMatch(JSON.stringify(profile), forbiddenAiTerms, `${lang}: AI wording remains`);
}

const requiredTerms = {
  de: [
    /Swift Concurrency/,
    /async\/await/,
    /Actors/,
    /Swift Testing/,
    /XCTest/,
    /Foundation/,
    /iOS-Plattform-APIs/,
    /GitLab CI\/CD/,
    /E-Commerce/,
    /Marktplatz/,
  ],
  en: [
    /Swift Concurrency/,
    /async\/await/,
    /Actors/,
    /Swift Testing/,
    /XCTest/,
    /Foundation/,
    /iOS platform APIs/,
    /GitLab CI\/CD/,
    /e-commerce/i,
    /marketplace/i,
  ],
};

for (const [lang, patterns] of Object.entries(requiredTerms)) {
  const content = JSON.stringify(profiles[lang]);
  patterns.forEach(pattern => assert.match(content, pattern, `${lang}: missing ${pattern}`));
}

for (const [lang, profile] of Object.entries(profiles)) {
  const chrono24 = profile.experience.find(job => job.company === 'Chrono24');
  assert.ok(chrono24, `${lang}: Chrono24 entry missing`);
  assert.match(
    chrono24.description,
    lang === 'de' ? /E-Commerce.*Marktplatz|Marktplatz.*E-Commerce/i : /e-commerce.*marketplace|marketplace.*e-commerce/i,
    `${lang}: Chrono24 must establish marketplace experience`
  );

  const fastIo = profile.projects.find(project => project.name.startsWith('Fast.io'));
  assert.ok(fastIo, `${lang}: Fast.io project missing`);
  assert.doesNotMatch(fastIo.description, forbiddenAiTerms, `${lang}: Fast.io still contains AI wording`);
}

console.log('Profile content contract passed for DE and EN');
```

- [ ] **Step 2: Run the test and verify it fails**

Run: `node tests/profile-content.test.js`

Expected: FAIL because `CV.ai` and AI wording still exist and the requested competency terms are incomplete.

- [ ] **Step 3: Commit the failing contract**

```bash
git add tests/profile-content.test.js
git commit -m "test: define bilingual iOS profile content contract"
```

---

### Task 2: Refocus the bilingual profile data

**Files:**
- Modify: `js/data.js`
- Test: `tests/profile-content.test.js`

**Interfaces:**
- Consumes: the existing positional override behavior of `mergeLocalized(base, override)`
- Produces: AI-free `CV` and `CV_TRANSLATIONS.en` objects with aligned German and English iOS positioning

- [ ] **Step 1: Rewrite the German and English profile summaries**

Replace the summaries with equivalent copy that explicitly covers:

```text
DE: Senior iOS-Entwicklung mit Swift; reaktive und deklarative Oberflächen mit SwiftUI und Combine; Swift Concurrency mit async/await und Actors; Foundation und iOS-Plattform-APIs; automatisierte Tests mit Swift Testing und XCTest; GitLab-basierte CI/CD; E-Commerce- und Marktplatzerfahrung durch Chrono24.

EN: Senior iOS development with Swift; reactive and declarative interfaces with SwiftUI and Combine; Swift Concurrency with async/await and Actors; Foundation and iOS platform APIs; automated testing with Swift Testing and XCTest; GitLab-based CI/CD; e-commerce and marketplace experience through Chrono24.
```

Keep the prose natural and retain the existing named-company credibility.

- [ ] **Step 2: Update the skills arrays in both locales**

The German base data must expose these skill groups:

```javascript
{
  category: 'iOS Entwicklung',
  items: [
    { name: 'Swift', years: '10 Jahre' },
    { name: 'SwiftUI', years: '5 Jahre' },
    { name: 'UIKit', years: '15 Jahre' },
    { name: 'Combine', years: '5 Jahre' },
    { name: 'Swift Concurrency', years: '3 Jahre' },
    { name: 'async/await', years: '3 Jahre' },
    { name: 'Actors', years: '3 Jahre' },
    { name: 'Foundation', years: '15 Jahre' },
    { name: 'iOS-Plattform-APIs', years: '15 Jahre' },
    { name: 'Widgets / Siri', years: '5 Jahre' },
    { name: 'Apple Watch', years: '10 Jahre' },
    { name: 'iPhone / iPad', years: '15 Jahre' },
  ],
}
```

Update Testing to include `Swift Testing`, `XCTest`, `UI Tests`, and `Snapshot Tests`. Update Tools & CI/CD to include `GitLab CI/CD`, `Git`, `Jenkins`, `Azure DevOps`, `Xcode Cloud`, `SPM`, and `CocoaPods`. Remove the entire AI skill category and remove its English positional override.

The English override must translate category names and year labels while preserving the exact technology names.

- [ ] **Step 3: Ground marketplace experience in Chrono24**

Use aligned descriptions:

```text
DE: Bei Chrono24 habe ich die Neuentwicklung des Katalogs in einem internationalen E-Commerce- und Marktplatzumfeld unterstützt.

EN: At Chrono24, I supported the redevelopment of the catalog in an international e-commerce and marketplace environment.
```

Add `E-Commerce`, `Marketplace`, `Foundation`, `Swift Concurrency`, `XCTest`, and `GitLab CI/CD` to the Chrono24 technology list only where they accurately describe the existing work.

- [ ] **Step 4: Remove AI positioning from Fast.io**

Start the German description with:

```text
Ein einfach zu bedienender Intervallfasten-Timer für iPhone und Apple Watch.
```

Start the English description with:

```text
An easy-to-use intermittent fasting timer for iPhone and Apple Watch.
```

Retain the concrete product capabilities and Apple technologies. Add `Foundation`, `Swift Concurrency`, `Swift Testing`, and `XCTest` to the project technology list if they are part of the product implementation.

- [ ] **Step 5: Remove AI data and translation keys**

Delete:

- `CV.ai`
- `CV_TRANSLATIONS.en.ai`
- AI-specific `I18N.de` and `I18N.en` keys
- the AI skill category and its English override

- [ ] **Step 6: Run the content contract**

Run: `node tests/profile-content.test.js`

Expected: PASS with `Profile content contract passed for DE and EN`.

- [ ] **Step 7: Commit the bilingual data update**

```bash
git add js/data.js tests/profile-content.test.js
git commit -m "feat: refocus profile on senior iOS competencies"
```

---

### Task 3: Remove AI presentation and export code

**Files:**
- Modify: `index.html`
- Modify: `js/main.js`
- Modify: `css/styles.css`
- Modify: `tests/profile-content.test.js`

**Interfaces:**
- Consumes: the AI-free localized profile data from Task 2
- Produces: a website, PDF, and Markdown renderer with no dependency on `activeCV.ai`

- [ ] **Step 1: Extend the test with structural assertions**

Append:

```javascript
const sourceFiles = {
  html: fs.readFileSync(path.join(root, 'index.html'), 'utf8'),
  main: fs.readFileSync(path.join(root, 'js/main.js'), 'utf8'),
  css: fs.readFileSync(path.join(root, 'css/styles.css'), 'utf8'),
};

assert.doesNotMatch(sourceFiles.html, /href="#ai"|id="ai"|AI & Tools/);
assert.doesNotMatch(sourceFiles.main, /renderAI|activeCV\.ai|AI & Agentic Development/);
assert.doesNotMatch(sourceFiles.css, /\.ai-[a-z-]+/);
```

- [ ] **Step 2: Run the test and verify the structural checks fail**

Run: `node tests/profile-content.test.js`

Expected: FAIL because the navigation, section, renderer, exports, and CSS still contain AI implementation.

- [ ] **Step 3: Remove the AI navigation and section**

Delete from `index.html`:

- the `href="#ai"` navigation item
- the complete `<section id="ai">…</section>`

Update the cache-busting suffix on CSS and JavaScript assets to `v=20260729-ios-profile`.

- [ ] **Step 4: Remove AI rendering and export paths**

Delete from `js/main.js`:

- `renderAI()`
- the `renderAI()` call in `renderAll()`
- the AI fragment in `buildCvHtml()`
- the AI section in the generated CV HTML
- the AI section in `buildCvMarkdown()`

Do not alter localization, theme switching, navigation behavior, or the remaining export sections.

- [ ] **Step 5: Remove AI-specific CSS**

Delete the complete `/* -------- AI & Tools Section -------- */` block and all `.ai-*` selectors from `css/styles.css`.

- [ ] **Step 6: Run syntax and structural tests**

Run:

```bash
node --check js/data.js
node --check js/main.js
node tests/profile-content.test.js
```

Expected: both syntax checks exit 0 and the profile content contract passes.

- [ ] **Step 7: Commit the presentation cleanup**

```bash
git add index.html js/main.js css/styles.css tests/profile-content.test.js
git commit -m "refactor: remove AI profile presentation"
```

---

### Task 4: Verify bilingual rendering and exports

**Files:**
- Modify only if verification finds a defect: `index.html`, `js/data.js`, `js/main.js`, `css/styles.css`
- Test: `tests/profile-content.test.js`

**Interfaces:**
- Consumes: the completed static profile
- Produces: verified German and English website and export behavior

- [ ] **Step 1: Run repository checks**

Run:

```bash
node --check js/data.js
node --check js/main.js
node tests/profile-content.test.js
git diff --check
```

Expected: all commands exit 0.

- [ ] **Step 2: Run a final forbidden-reference scan**

Run:

```bash
rg -n "\bAI\b|Agentic|Codex|Claude|ChatGPT|Copilot|Grok|Prompt Engineering|RocketSim|App Store Connect CLI|ai-" index.html js/data.js js/main.js css/styles.css
```

Expected: no matches.

- [ ] **Step 3: Verify the running static site**

Confirm the existing server serves this workspace:

```bash
lsof -iTCP:8081 -sTCP:LISTEN -n -P
curl -s http://127.0.0.1:8081/ | rg "20260729-ios-profile"
```

Expected: port 8081 is listening and the HTML contains the new asset version.

- [ ] **Step 4: Inspect both languages in the browser**

Open `http://127.0.0.1:8081/` and verify:

- DE is the default on a clean language preference.
- EN updates navigation, summary, experience, skills, projects, education, contact, and footer.
- Chrono24 establishes marketplace experience in both languages.
- The new competency chips fit at mobile and desktop widths.
- Removing the AI section leaves no broken navigation target or incoherent section spacing.
- PDF and Markdown downloads use the active language and contain no AI section.

- [ ] **Step 5: Commit any verification fixes**

If verification required changes:

```bash
git add index.html js/data.js js/main.js css/styles.css tests/profile-content.test.js
git commit -m "fix: polish bilingual iOS profile content"
```

If no fixes were needed, do not create an empty commit.
