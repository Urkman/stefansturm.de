# AI Development Profile Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a bilingual AI-development section, TCA knowledge, Devil/Fast.io AI positioning, and matching compact and expanded static PDFs.

**Architecture:** Keep `js/data.js` as the shared localized source for website and PDF content. Add one focused website renderer in `js/main.js`, corresponding styles in `css/styles.css`, and dedicated compact/expanded PDF renderers in `js/cv-export.js`; retain the existing static Chrome/Python generation pipeline and strengthen it to require the nine-page expanded layout and AI page.

**Tech Stack:** Static HTML, vanilla JavaScript, CSS Grid, Node.js VM/assertion tests, headless Google Chrome, Poppler, Python 3 with `pypdf`, and the existing raw PDF merger.

## Global Constraints

- Place the standalone AI section between `Kenntnisse` / `Skills` and `Projekte` / `Projects`.
- Use only Codex, Claude, and Grok as named AI tools; do not add model versions.
- Include Skills, Plugins, Vibe Coding, Agentic Coding, `brainstorming`, `grill-me`, `writing-plans`, and model/reasoning selection.
- Do not mention RocketSim inside the AI section; keep RocketSim and App Store Connect CLI under `Tools & CI/CD`.
- Rename `DevBar – Apple Developer Toolkit` to `Devil – Apple Developer Toolkit` while retaining `https://devbar.netlify.app`.
- Add TCA to `Architektur` / `Architecture`, Devil, and Fast.io.
- State that Devil and Fast.io were developed end to end using AI-supported, agentic workflows under Stefan's technical direction.
- Keep compact PDFs at exactly two A4 pages.
- Put technical skills on expanded page 2 and the dedicated AI section on expanded page 3; expanded PDFs must contain exactly nine A4 pages.
- Preserve the existing no-dependency static-site architecture and the staged static-PDF replacement behavior.

## File Map

- `js/data.js`: owns bilingual AI copy, skill taxonomy, TCA tags, Devil rename, project claims, and navigation translations.
- `index.html`: owns navigation/section order, semantic AI section containers, alternating section bands, and browser asset versioning.
- `js/main.js`: owns the escaped, data-driven website AI renderer and render order.
- `css/styles.css`: owns responsive AI section layout and visual states.
- `js/cv-export.js`: owns compact AI summary, expanded AI page, PDF page numbering, and static PDF cache version.
- `scripts/generate-pdfs.js`: owns exact artifact page counts and content validation for expanded page 3.
- `tests/profile-content.test.js`: enforces localized content, taxonomy, project naming, TCA, and claims.
- `tests/ai-section.test.js`: enforces website structure, responsive CSS hooks, rendering, and localization.
- `tests/pdf-export.test.js`: enforces compact and expanded AI HTML composition and page order.
- `tests/static-pdf-downloads.test.js`: enforces the rotated static asset version and generator contract.
- `assets/pdf/*.pdf`: committed generated artifacts served by the website.

---

### Task 1: Define the Bilingual Content Contract

**Files:**
- Modify: `tests/profile-content.test.js:38-163`
- Test: `tests/profile-content.test.js`

**Interfaces:**
- Consumes: `CV`, `I18N`, `CV_TRANSLATIONS.en`, and the existing index-aligned `mergeLocalized(base, override)` helper in the test.
- Produces: the exact `profile.ai`, AI skills, TCA, Devil, Fast.io, and navigation translation contract used by all later tasks.

- [ ] **Step 1: Replace the old AI and DevBar fixtures with the approved contract**

Replace `expectedAiSkills`, `expectedDevBar`, and `expectedDevBarTech` with:

```js
const projectClaim = {
  de: 'End-to-end mit AI-gestützten, agentischen Workflows unter eigener technischer Leitung entwickelt.',
  en: 'Developed end to end using AI-supported, agentic workflows under my technical direction.',
};

const expectedAiSkills = {
  de: {
    workflow: [
      'Agentic Coding',
      'Vibe Coding',
      'Prompt & Context Engineering',
      'Skills & Plugins',
      'Planning Skills (brainstorming / grill-me / writing-plans)',
      'Worktree / PR Workflows',
      'AI-gestütztes Testing',
      'AI Code Review',
      'Modell- & Reasoning-Auswahl',
    ],
    tools: ['Codex', 'Claude', 'Grok'],
  },
  en: {
    workflow: [
      'Agentic Coding',
      'Vibe Coding',
      'Prompt & Context Engineering',
      'Skills & Plugins',
      'Planning Skills (brainstorming / grill-me / writing-plans)',
      'Worktree / PR Workflows',
      'AI-assisted Testing',
      'AI Code Review',
      'Model & Reasoning Selection',
    ],
    tools: ['Codex', 'Claude', 'Grok'],
  },
};

const expectedAi = {
  de: {
    title: 'AI-gestützte Entwicklung',
    introduction: 'Ich verbinde langjährige iOS-Erfahrung mit AI-gestützter und agentischer Entwicklung. Vibe Coding nutze ich für schnelle Exploration; Agentic Coding für strukturierte, nachvollziehbare Umsetzung. Werkzeug, Modell und Reasoning-Tiefe wähle ich passend zu Aufgabe, Kontext und Risiko. Skills und Plugins unterstützen den gesamten Ablauf, ohne Architektur- und Qualitätsverantwortung abzugeben.',
    workflowTitle: 'Von der Idee zur geprüften Auslieferung',
    compactSummary: 'Agentic Coding mit Codex, Claude und Grok: strukturierte Planung mit brainstorming, grill-me und writing-plans, aufgabengerechte Modell- und Reasoning-Auswahl sowie Umsetzung über Skills, Plugins, Worktrees, Tests und Code Review.',
    toolDescriptions: [
      'Repository-basierte Umsetzung, Tests, Code Review sowie Worktree- und Pull-Request-Workflows.',
      'Brainstorming, grill-me, Planung, Kontextarbeit und Bewertung alternativer Lösungswege.',
      'Recherche, Gegenprüfung und zusätzliche Perspektiven bei technischen Entscheidungen.',
    ],
    workflowTitles: ['Verstehen & planen', 'Modell wählen', 'Agentisch umsetzen', 'Prüfen & liefern'],
  },
  en: {
    title: 'AI-Supported Development',
    introduction: 'I combine extensive iOS experience with AI-supported and agentic development. I use Vibe Coding for rapid exploration and Agentic Coding for structured, traceable implementation. I choose the tool, model, and reasoning depth to match the task, context, and risk. Skills and Plugins support the full workflow without delegating architectural or quality ownership.',
    workflowTitle: 'From idea to verified delivery',
    compactSummary: 'Agentic Coding with Codex, Claude, and Grok: structured planning using brainstorming, grill-me, and writing-plans; task-appropriate model and reasoning selection; and implementation through Skills, Plugins, worktrees, tests, and code review.',
    toolDescriptions: [
      'Repository-based implementation, testing, code review, and worktree and pull-request workflows.',
      'Brainstorming, grill-me, planning, context work, and evaluation of alternative approaches.',
      'Research, cross-checking, and additional perspectives for technical decisions.',
    ],
    workflowTitles: ['Understand & plan', 'Select the model', 'Implement agentically', 'Verify & deliver'],
  },
};

const expectedDevilTech = [
  'Swift',
  'SwiftUI',
  'TCA',
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

- [ ] **Step 2: Replace the old standalone-AI absence assertions with structural assertions**

Replace lines 91-117 with:

```js
for (const [lang, profile] of Object.entries(profiles)) {
  const expected = expectedAi[lang];
  const workflow = profile.skills.find(category => category.category === 'AI & Agentic Development');
  const aiTools = profile.skills.find(category => category.category === 'AI Tools');
  const generalTools = profile.skills.find(category => category.category === 'Tools & CI/CD');
  const architecture = profile.skills.find(category =>
    category.category === (lang === 'de' ? 'Architektur' : 'Architecture')
  );

  assert.ok(profile.ai, `${lang}: standalone AI data missing`);
  assert.equal(profile.ai.title, expected.title, `${lang}: AI title differs`);
  assert.equal(profile.ai.introduction, expected.introduction, `${lang}: AI introduction differs`);
  assert.equal(profile.ai.workflowTitle, expected.workflowTitle, `${lang}: AI workflow title differs`);
  assert.equal(profile.ai.compactSummary, expected.compactSummary, `${lang}: compact AI summary differs`);
  assert.deepEqual(Array.from(profile.ai.tools, item => item.name), expectedAiSkills[lang].tools);
  assert.deepEqual(Array.from(profile.ai.tools, item => item.description), expected.toolDescriptions);
  assert.deepEqual(Array.from(profile.ai.workflow, item => item.title), expected.workflowTitles);
  assert.deepEqual(Array.from(profile.ai.proof, item => item.description), [projectClaim[lang], projectClaim[lang]]);

  assert.ok(workflow, `${lang}: AI workflow skills category missing`);
  assert.ok(aiTools, `${lang}: AI tools category missing`);
  assert.ok(generalTools, `${lang}: general tools category missing`);
  assert.deepEqual(Array.from(workflow.items, item => item.name), expectedAiSkills[lang].workflow);
  assert.deepEqual(Array.from(aiTools.items, item => item.name), expectedAiSkills[lang].tools);
  assert.ok(generalTools.items.some(item => item.name === 'RocketSim'));
  assert.ok(generalTools.items.some(item => item.name === 'App Store Connect CLI'));
  assert.ok(architecture.items.some(item => item.name === 'TCA'), `${lang}: architecture missing TCA`);
  assert.doesNotMatch(JSON.stringify(profile.ai), /RocketSim/i);
  assert.doesNotMatch(JSON.stringify(profile.ai), /ChatGPT|GitHub Copilot/i);
}
```

- [ ] **Step 3: Replace the DevBar assertions with Devil and Fast.io assertions**

Replace the current first-project block with:

```js
  const devil = profile.projects[0];
  const fast = profile.projects[1];
  assert.equal(devil.name, 'Devil – Apple Developer Toolkit', `${lang}: Devil must be first`);
  assert.equal(devil.url, 'https://devbar.netlify.app', `${lang}: Devil URL differs`);
  assert.equal(devil.linkType, 'website', `${lang}: Devil link type differs`);
  assert.deepEqual(Array.from(devil.tech), expectedDevilTech, `${lang}: Devil technology tags differ`);
  assert.ok(devil.description.endsWith(projectClaim[lang]), `${lang}: Devil description missing AI claim`);
  assert.ok(devil.cvDescription.endsWith(projectClaim[lang]), `${lang}: Devil compact copy missing AI claim`);
  assert.ok(fast.tech.includes('TCA'), `${lang}: Fast.io missing TCA`);
  assert.ok(fast.description.endsWith(projectClaim[lang]), `${lang}: Fast.io description missing AI claim`);
  assert.ok(fast.cvDescription.endsWith(projectClaim[lang]), `${lang}: Fast.io compact copy missing AI claim`);
```

Add `navAI` to `pdfTranslationKeys`' neighboring translation contract list so both languages must expose the navigation label.

- [ ] **Step 4: Run the content contract and verify the expected failure**

Run:

```bash
node tests/profile-content.test.js
```

Expected: FAIL at `standalone AI data missing` because `profile.ai` does not exist yet.

- [ ] **Step 5: Commit the failing contract**

```bash
git add tests/profile-content.test.js
git commit -m "test: define AI development profile content"
```

---

### Task 2: Implement the Shared Localized AI and Project Data

**Files:**
- Modify: `js/data.js:241-405`
- Modify: `js/data.js:422-540`
- Modify: `js/data.js:641-732`
- Test: `tests/profile-content.test.js`

**Interfaces:**
- Consumes: the repository's index-aligned `mergeLocalized(base, override)` behavior.
- Produces: `activeCV.ai`, updated `activeCV.skills`, and updated `activeCV.projects` for website and PDF renderers.

- [ ] **Step 1: Add TCA and replace the German AI skill taxonomy**

Append `{ name: 'TCA' }` after `MVC` in the `Architektur` items. Replace the two AI categories with:

```js
    {
      category: 'AI & Agentic Development',
      icon: 'fas fa-microchip',
      items: [
        { name: 'Agentic Coding' },
        { name: 'Vibe Coding' },
        { name: 'Prompt & Context Engineering' },
        { name: 'Skills & Plugins' },
        { name: 'Planning Skills (brainstorming / grill-me / writing-plans)' },
        { name: 'Worktree / PR Workflows' },
        { name: 'AI-gestütztes Testing' },
        { name: 'AI Code Review' },
        { name: 'Modell- & Reasoning-Auswahl' },
      ],
    },
    {
      category: 'AI Tools',
      icon: 'fas fa-wand-magic-sparkles',
      items: [
        { name: 'Codex' },
        { name: 'Claude' },
        { name: 'Grok' },
      ],
    },
```

- [ ] **Step 2: Add the German shared AI data block before `projects`**

```js
  ai: {
    title: 'AI-gestützte Entwicklung',
    introduction: 'Ich verbinde langjährige iOS-Erfahrung mit AI-gestützter und agentischer Entwicklung. Vibe Coding nutze ich für schnelle Exploration; Agentic Coding für strukturierte, nachvollziehbare Umsetzung. Werkzeug, Modell und Reasoning-Tiefe wähle ich passend zu Aufgabe, Kontext und Risiko. Skills und Plugins unterstützen den gesamten Ablauf, ohne Architektur- und Qualitätsverantwortung abzugeben.',
    tools: [
      { name: 'Codex', description: 'Repository-basierte Umsetzung, Tests, Code Review sowie Worktree- und Pull-Request-Workflows.' },
      { name: 'Claude', description: 'Brainstorming, grill-me, Planung, Kontextarbeit und Bewertung alternativer Lösungswege.' },
      { name: 'Grok', description: 'Recherche, Gegenprüfung und zusätzliche Perspektiven bei technischen Entscheidungen.' },
    ],
    workflowTitle: 'Von der Idee zur geprüften Auslieferung',
    workflow: [
      { step: '01', title: 'Verstehen & planen', description: 'brainstorming, grill-me, writing-plans und klare Akzeptanzkriterien.' },
      { step: '02', title: 'Modell wählen', description: 'Tool, Modell und Reasoning-Tiefe passend zu Aufgabe, Kontext und Risiko.' },
      { step: '03', title: 'Agentisch umsetzen', description: 'Skills, Plugins, fokussierte Tasks, Worktrees und Pull Requests.' },
      { step: '04', title: 'Prüfen & liefern', description: 'Automatisierte Tests, Code Review, Dokumentation und kontrollierte Auslieferung.' },
    ],
    proof: [
      { project: 'Devil – Apple Developer Toolkit', description: 'End-to-end mit AI-gestützten, agentischen Workflows unter eigener technischer Leitung entwickelt.' },
      { project: 'Fast.io – Fasting Timer', description: 'End-to-end mit AI-gestützten, agentischen Workflows unter eigener technischer Leitung entwickelt.' },
    ],
    compactSummary: 'Agentic Coding mit Codex, Claude und Grok: strukturierte Planung mit brainstorming, grill-me und writing-plans, aufgabengerechte Modell- und Reasoning-Auswahl sowie Umsetzung über Skills, Plugins, Worktrees, Tests und Code Review.',
  },
```

- [ ] **Step 3: Rename Devil, append the approved claims, and add TCA**

Change the first two German projects to use these exact changed fields while retaining every other existing field:

```js
      name: 'Devil – Apple Developer Toolkit',
      description: 'Eine native macOS-26-Menüleisten-App für Apple-Plattform-Entwickler. Devil bereinigt Xcode- und SPM-Caches, steuert Simulatoren, unterstützt Git-Workflows mit Diffs, Commits, Push und Pull Requests und bündelt Referenzen sowie Entwicklerwerkzeuge. Die App arbeitet sandboxed und weitgehend offline; Commit-Nachrichten entstehen lokal mit Apple Intelligence. End-to-end mit AI-gestützten, agentischen Workflows unter eigener technischer Leitung entwickelt.',
      cvDescription: 'Native macOS-26-Menüleisten-App zum Bereinigen von Xcode- und SPM-Caches, Steuern von Simulatoren und Ausführen von Git-Workflows mit lokaler Apple Intelligence. End-to-end mit AI-gestützten, agentischen Workflows unter eigener technischer Leitung entwickelt.',
```

Insert `'TCA'` immediately after `'SwiftUI'` in Devil's `tech` array.

Use these exact Fast.io copy fields and insert `'TCA'` immediately after `'SwiftUI'` in its `tech` array:

```js
      description: 'Ein einfach zu bedienender Intervallfasten-Timer für iPhone und Apple Watch. Fast.io hilft dabei, Fastenziele konsequent zu verfolgen – mit Echtzeit-Tracking, Hydration-Log, Live Activities, Dynamic Island, Home Screen Widgets und Apple Health Integration. Unterstützt populäre Fasten-Schemata wie 16:8, 18:6 und OMAD. Als Einmalkauf erhältlich – kein Abo. End-to-end mit AI-gestützten, agentischen Workflows unter eigener technischer Leitung entwickelt.',
      cvDescription: 'Intervallfasten-Timer für iPhone und Apple Watch mit Live Activities, Widgets, Apple Health und Hydration-Tracking. End-to-end mit AI-gestützten, agentischen Workflows unter eigener technischer Leitung entwickelt.',
```

- [ ] **Step 4: Add navigation translations and the English AI override**

Add `navAI: 'AI'` to both `I18N.de` and `I18N.en` after `navSkills`.

Replace the English AI skill override with:

```js
      {
        category: 'AI & Agentic Development',
        items: [
          {},
          {},
          {},
          {},
          {},
          {},
          { name: 'AI-assisted Testing' },
          {},
          { name: 'Model & Reasoning Selection' },
        ],
      },
      { category: 'AI Tools' },
```

Add this English `ai` override after `skills` and before `projects`:

```js
    ai: {
      title: 'AI-Supported Development',
      introduction: 'I combine extensive iOS experience with AI-supported and agentic development. I use Vibe Coding for rapid exploration and Agentic Coding for structured, traceable implementation. I choose the tool, model, and reasoning depth to match the task, context, and risk. Skills and Plugins support the full workflow without delegating architectural or quality ownership.',
      tools: [
        { description: 'Repository-based implementation, testing, code review, and worktree and pull-request workflows.' },
        { description: 'Brainstorming, grill-me, planning, context work, and evaluation of alternative approaches.' },
        { description: 'Research, cross-checking, and additional perspectives for technical decisions.' },
      ],
      workflowTitle: 'From idea to verified delivery',
      workflow: [
        { title: 'Understand & plan', description: 'brainstorming, grill-me, writing-plans, and clear acceptance criteria.' },
        { title: 'Select the model', description: 'Choose the tool, model, and reasoning depth for the task, context, and risk.' },
        { title: 'Implement agentically', description: 'Skills, Plugins, focused tasks, worktrees, and pull requests.' },
        { title: 'Verify & deliver', description: 'Automated tests, code review, documentation, and controlled delivery.' },
      ],
      proof: [
        { description: 'Developed end to end using AI-supported, agentic workflows under my technical direction.' },
        { description: 'Developed end to end using AI-supported, agentic workflows under my technical direction.' },
      ],
      compactSummary: 'Agentic Coding with Codex, Claude, and Grok: structured planning using brainstorming, grill-me, and writing-plans; task-appropriate model and reasoning selection; and implementation through Skills, Plugins, worktrees, tests, and code review.',
    },
```

- [ ] **Step 5: Update the English Devil and Fast.io copy**

Use these exact English overrides:

```js
      {
        period: '2026 – present',
        description: 'A native macOS 26 menu-bar app for Apple-platform developers. Devil cleans Xcode and SPM caches, controls simulators, supports Git workflows with diffs, commits, pushes and pull requests, and bundles references and everyday developer utilities. The app is sandboxed and mostly offline; commit messages are generated locally with Apple Intelligence. Developed end to end using AI-supported, agentic workflows under my technical direction.',
        cvDescription: 'Native macOS 26 menu-bar app for cleaning Xcode and SPM caches, controlling simulators, and running Git workflows with local Apple Intelligence. Developed end to end using AI-supported, agentic workflows under my technical direction.',
      },
      {
        period: '2025 – present',
        description: 'An easy-to-use intermittent fasting timer for iPhone and Apple Watch. Fast.io helps users consistently track fasting goals with real-time tracking, hydration logging, Live Activities, Dynamic Island, Home Screen widgets and Apple Health integration. It supports popular fasting schedules such as 16:8, 18:6 and OMAD. Available as a one-time purchase, no subscription. Developed end to end using AI-supported, agentic workflows under my technical direction.',
        cvDescription: 'Intermittent fasting timer for iPhone and Apple Watch with Live Activities, widgets, Apple Health, and hydration tracking. Developed end to end using AI-supported, agentic workflows under my technical direction.',
      },
```

- [ ] **Step 6: Run syntax and content tests**

```bash
node --check js/data.js
node tests/profile-content.test.js
git diff --check
```

Expected: syntax exits `0`, the test prints `Profile content contract passed for DE and EN`, and the diff check prints nothing.

- [ ] **Step 7: Commit the shared content**

```bash
git add js/data.js
git commit -m "feat: add bilingual AI development profile data"
```

---

### Task 3: Build the Responsive Website AI Section

**Files:**
- Create: `tests/ai-section.test.js`
- Modify: `index.html:59-219`
- Modify: `index.html:239-242`
- Modify: `js/main.js:195-238`
- Modify: `js/main.js:411-420`
- Modify: `css/styles.css:696-823`
- Test: `tests/ai-section.test.js`

**Interfaces:**
- Consumes: `activeCV.ai` from Task 2 and the existing `esc(value)` helper.
- Produces: `renderAI(): void`, `#ai`, `#ai-heading`, and `#ai-content` for navigation, localization, and browser rendering.

- [ ] **Step 1: Write the focused website contract**

Create `tests/ai-section.test.js`:

```js
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const css = fs.readFileSync(path.join(root, 'css/styles.css'), 'utf8');
const dataSource = fs.readFileSync(path.join(root, 'js/data.js'), 'utf8');
const mainSource = fs.readFileSync(path.join(root, 'js/main.js'), 'utf8');

const skillsIndex = html.indexOf('id="skills"');
const aiIndex = html.indexOf('id="ai"');
const projectsIndex = html.indexOf('id="projects"');
assert.match(html, /href="#ai"[^>]*data-i18n="navAI"/);
assert.ok(skillsIndex < aiIndex && aiIndex < projectsIndex, 'AI section order is wrong');
assert.match(html, /id="ai-heading"/);
assert.match(html, /id="ai-content"/);
assert.match(mainSource, /function renderAI\(\)/);
assert.match(mainSource, /renderSkills\(\);\s*renderAI\(\);\s*renderProjects\(\);/);
assert.match(css, /\.ai-tools-grid/);
assert.match(css, /\.ai-workflow-grid/);
assert.match(css, /\.ai-proof-grid/);

function renderLanguage(lang) {
  const elements = {
    'ai-heading': { textContent: '' },
    'ai-content': { innerHTML: '' },
  };
  const context = {
    localStorage: { getItem: () => lang, setItem: () => {} },
    window: { matchMedia: () => ({ matches: false }) },
    document: {
      documentElement: { setAttribute: () => {}, getAttribute: () => null },
      getElementById: id => elements[id] || null,
      querySelector: () => null,
      querySelectorAll: () => [],
      addEventListener: () => {},
    },
  };
  vm.createContext(context);
  vm.runInContext(dataSource, context, { filename: 'js/data.js' });
  vm.runInContext(mainSource, context, { filename: 'js/main.js' });
  vm.runInContext(`currentLang = '${lang}'; activeCV = localizeCV('${lang}'); renderAI();`, context);
  return elements;
}

for (const lang of ['de', 'en']) {
  const elements = renderLanguage(lang);
  const content = elements['ai-content'].innerHTML;
  assert.equal(elements['ai-heading'].textContent, lang === 'de' ? 'AI-gestützte Entwicklung' : 'AI-Supported Development');
  ['Codex', 'Claude', 'Grok', 'Devil', 'Fast.io', 'brainstorming', 'grill-me', 'writing-plans'].forEach(term => {
    assert.ok(content.includes(term), `${lang}: missing ${term}`);
  });
  assert.match(content, /Skills(?:,| and| und) Plugins/);
  assert.doesNotMatch(content, /RocketSim|ChatGPT|GitHub Copilot/);
}

console.log('AI section contract passed for DE and EN');
```

- [ ] **Step 2: Run the focused test and verify it fails**

```bash
node tests/ai-section.test.js
```

Expected: FAIL because `href="#ai"` and the AI section markup do not exist.

- [ ] **Step 3: Add the navigation item and semantic section**

Insert this navigation item immediately after the skills link:

```html
          <li><a href="#ai"         class="nav-link" data-i18n="navAI">AI</a></li>
```

Insert this section after `#skills` and before `#projects`:

```html
    <!-- AI DEVELOPMENT -->
    <section class="section" id="ai" aria-labelledby="ai-heading">
      <div class="container">
        <h2 class="section-title" id="ai-heading">AI-gestützte Entwicklung</h2>
        <div class="ai-section-content" id="ai-content"><!-- filled by JS --></div>
      </div>
    </section>
```

Set Projects to `class="section section-alt"`, Education to `class="section"`, and Contact to `class="section section-alt"` so the page bands continue alternating after the insertion.

- [ ] **Step 4: Add the escaped AI renderer and render order**

Insert after `renderSkills()`:

```js
function renderAI() {
  const ai = activeCV.ai;
  document.getElementById('ai-heading').textContent = ai.title;
  document.getElementById('ai-content').innerHTML = `
    <p class="ai-introduction reveal">${esc(ai.introduction)}</p>
    <div class="ai-tools-grid">
      ${ai.tools.map(tool => `
        <article class="ai-tool-card reveal">
          <h3>${esc(tool.name)}</h3>
          <p>${esc(tool.description)}</p>
        </article>`).join('')}
    </div>
    <section class="ai-workflow" aria-labelledby="ai-workflow-heading">
      <h3 class="ai-subheading" id="ai-workflow-heading">${esc(ai.workflowTitle)}</h3>
      <div class="ai-workflow-grid">
        ${ai.workflow.map(item => `
          <article class="ai-workflow-step reveal">
            <span class="ai-step-number">${esc(item.step)}</span>
            <h4>${esc(item.title)}</h4>
            <p>${esc(item.description)}</p>
          </article>`).join('')}
      </div>
    </section>
    <div class="ai-proof-grid">
      ${ai.proof.map(item => `
        <article class="ai-proof-card reveal">
          <h3>${esc(item.project)}</h3>
          <p>${esc(item.description)}</p>
        </article>`).join('')}
    </div>`;
}
```

In `renderAll()`, call `renderAI()` immediately between `renderSkills()` and `renderProjects()`.

- [ ] **Step 5: Add the approved responsive styles**

Insert between the Skills and Projects CSS blocks:

```css
/* -------- AI Development -------- */
.ai-section-content { display: grid; gap: 1.5rem; }
.ai-introduction {
  max-width: 58rem;
  color: var(--text-muted);
  font-size: 1rem;
  line-height: 1.75;
}
.ai-tools-grid,
.ai-workflow-grid,
.ai-proof-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}
.ai-tool-card,
.ai-workflow-step,
.ai-proof-card {
  min-width: 0;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: .5rem;
  padding: 1.25rem;
}
.ai-tool-card { border-top: .2rem solid var(--accent); }
.ai-tool-card h3,
.ai-proof-card h3 {
  margin-bottom: .5rem;
  color: var(--text);
  font-size: 1rem;
}
.ai-tool-card p,
.ai-workflow-step p,
.ai-proof-card p {
  color: var(--text-muted);
  font-size: .875rem;
  line-height: 1.65;
}
.ai-workflow { display: grid; gap: .875rem; }
.ai-subheading { color: var(--text); font-size: 1rem; }
.ai-workflow-step { position: relative; padding-top: 2.25rem; }
.ai-step-number {
  position: absolute;
  top: 1rem;
  color: var(--accent);
  font-size: .6875rem;
  font-weight: 800;
}
.ai-workflow-step h4 {
  margin-bottom: .5rem;
  color: var(--text);
  font-size: .9375rem;
}
.ai-proof-card {
  border-left: .2rem solid var(--accent);
  background: var(--accent-light);
}
@media (min-width: 640px) {
  .ai-workflow-grid,
  .ai-proof-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (min-width: 900px) {
  .ai-tools-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .ai-workflow-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); }
}
```

- [ ] **Step 6: Rotate browser source asset versions**

Set all three local script query values in `index.html` to `20260805-ai-development`:

```html
  <script src="js/data.js?v=20260805-ai-development"></script>
  <script src="js/main.js?v=20260805-ai-development"></script>
  <script src="js/cv-export.js?v=20260805-ai-development"></script>
```

- [ ] **Step 7: Run focused and regression tests**

```bash
node tests/ai-section.test.js
node tests/profile-content.test.js
node --check js/main.js
git diff --check
```

Expected: both contracts print their pass messages; syntax and diff checks exit `0`.

- [ ] **Step 8: Commit the website section**

```bash
git add tests/ai-section.test.js index.html js/main.js css/styles.css
git commit -m "feat: add responsive AI development section"
```

---

### Task 4: Define the PDF AI Composition Contract

**Files:**
- Modify: `tests/pdf-export.test.js:53-168`
- Test: `tests/pdf-export.test.js`

**Interfaces:**
- Consumes: `profile.ai`, updated project names/claims, and TCA data from Task 2.
- Produces: required compact summary placement and expanded `data-page="ai"` ordering for Task 5.

- [ ] **Step 1: Update compact PDF assertions**

Replace the DevBar assertion with:

```js
  assert.match(page2, /Devil - Apple Developer Toolkit/);
```

After the existing AI skill assertion, add:

```js
  assertContains(page2, profile.ai.title, `${lang}: compact AI heading missing`);
  assertContains(page2, profile.ai.compactSummary, `${lang}: compact AI summary missing`);
  assert.match(page2, /TCA/);
  assertContains(page2, profile.projects[0].cvDescription, `${lang}: compact Devil claim missing`);
  assertContains(page2, profile.projects[1].cvDescription, `${lang}: compact Fast.io claim missing`);
```

- [ ] **Step 2: Add expanded AI page and ordering assertions**

After the expanded skills-page assertions, add:

```js
  assert.match(expanded, /class="cv-expanded-page cv-expanded-ai-page"/);
  assert.match(expanded, /data-page="ai"/);
  assert.equal((expanded.match(/<section class="cv-expanded-page/g) || []).length, 9, `${lang}: expected nine expanded CV pages`);
  const expandedSkillsIndex = expanded.indexOf('data-page="skills"');
  const expandedAiIndex = expanded.indexOf('data-page="ai"');
  const expandedExperienceIndex = expanded.indexOf('data-page="experience-1"');
  assert.ok(
    expandedSkillsIndex < expandedAiIndex && expandedAiIndex < expandedExperienceIndex,
    `${lang}: expanded AI page order is wrong`
  );
  assertContains(expanded, profile.ai.introduction, `${lang}: expanded AI introduction missing`);
  assertContains(expanded, profile.ai.workflowTitle, `${lang}: expanded AI workflow title missing`);
  profile.ai.tools.forEach(tool => {
    assertContains(expanded, tool.name, `${lang}: expanded AI tool ${tool.name} missing`);
    assertContains(expanded, tool.description, `${lang}: expanded AI tool copy missing`);
  });
  profile.ai.workflow.forEach(item => {
    assertContains(expanded, item.title, `${lang}: expanded workflow ${item.title} missing`);
    assertContains(expanded, item.description, `${lang}: expanded workflow copy missing`);
  });
  profile.ai.proof.forEach(item => {
    assertContains(expanded, item.project, `${lang}: expanded proof project missing`);
    assertContains(expanded, item.description, `${lang}: expanded proof claim missing`);
  });
```

- [ ] **Step 3: Run the PDF contract and verify it fails**

```bash
node tests/pdf-export.test.js
```

Expected: FAIL because the compact AI summary and expanded `data-page="ai"` page do not exist.

- [ ] **Step 4: Commit the failing PDF contract**

```bash
git add tests/pdf-export.test.js
git commit -m "test: define AI PDF composition"
```

---

### Task 5: Implement Compact and Expanded AI PDF Rendering

**Files:**
- Modify: `js/cv-export.js:167-276`
- Modify: `js/cv-export.js:277-425`
- Modify: `js/cv-export.js:427-632`
- Test: `tests/pdf-export.test.js`

**Interfaces:**
- Consumes: `activeCV.ai` from Task 2 and existing `cvEsc`, section-header, footer, and page helpers.
- Produces: `renderCvAiSummary(ai): string`, `renderExpandedAI(ai): string`, compact page-2 AI content, and expanded `data-page="ai"` page 3.

- [ ] **Step 1: Add compact and expanded AI renderer helpers**

Insert after `renderCvSkillGroup`:

```js
function renderCvAiSummary(ai) {
  return `<section class="cv-section cv-ai-summary">
    ${renderCvSectionTitle(ai.title)}
    <p>${cvEsc(ai.compactSummary)}</p>
  </section>`;
}
```

Insert after `renderExpandedSkillGroup`:

```js
function renderExpandedAI(ai) {
  return `<div class="cv-expanded-ai">
    <p class="cv-expanded-ai-introduction">${cvEsc(ai.introduction)}</p>
    <div class="cv-expanded-ai-tools">${ai.tools.map(tool => `
      <section class="cv-expanded-ai-tool">
        <h3>${cvEsc(tool.name)}</h3>
        <p>${cvEsc(tool.description)}</p>
      </section>`).join('')}</div>
    ${renderExpandedSectionTitle(ai.workflowTitle)}
    <div class="cv-expanded-ai-workflow">${ai.workflow.map(item => `
      <section class="cv-expanded-ai-step">
        <span>${cvEsc(item.step)}</span>
        <h3>${cvEsc(item.title)}</h3>
        <p>${cvEsc(item.description)}</p>
      </section>`).join('')}</div>
    <div class="cv-expanded-ai-proof">${ai.proof.map(item => `
      <section>
        <h3>${cvEsc(item.project)}</h3>
        <p>${cvEsc(item.description)}</p>
      </section>`).join('')}</div>
  </div>`;
}
```

- [ ] **Step 2: Add compact PDF styles and insert the summary**

Add to `CV_PRINT_STYLES` after `.cv-skills-grid`:

```css
  .cv-ai-summary{margin-top:2.5mm;padding:2.3mm 3mm;border-left:.7mm solid #0070e0;background:#f5f9fd;break-inside:avoid}
  .cv-ai-summary .cv-section-title{margin-bottom:1.2mm;padding-bottom:1mm}
  .cv-ai-summary>p{font-size:6.8pt;line-height:1.35;color:#526071}
```

Insert `${renderCvAiSummary(activeCV.ai)}` immediately after `.cv-page-two-top` and before `.cv-skills` in page 2.

- [ ] **Step 3: Add expanded AI page styles**

Add to `EXPANDED_CV_PRINT_STYLES` after the expanded skill styles:

```css
  .cv-expanded-ai{display:grid;gap:6mm}
  .cv-expanded-ai-introduction{font-size:9pt;line-height:1.6;color:#3f4d5f}
  .cv-expanded-ai-tools{display:grid;grid-template-columns:repeat(3,1fr);gap:4mm}
  .cv-expanded-ai-tool,.cv-expanded-ai-step,.cv-expanded-ai-proof>section{padding:4mm;border:.25mm solid #dfe7f0;border-radius:2mm;background:#fbfdff}
  .cv-expanded-ai-tool{border-top:.8mm solid #0070e0}
  .cv-expanded-ai-tool h3,.cv-expanded-ai-step h3,.cv-expanded-ai-proof h3{margin-bottom:1.5mm;font-size:9pt;color:#152033}
  .cv-expanded-ai-tool p,.cv-expanded-ai-step p,.cv-expanded-ai-proof p{font-size:7.5pt;line-height:1.5;color:#526071}
  .cv-expanded-ai-workflow{display:grid;grid-template-columns:1fr 1fr;gap:4mm}
  .cv-expanded-ai-step span{display:block;margin-bottom:1mm;color:#0070e0;font-size:7pt;font-weight:800}
  .cv-expanded-ai-proof{display:grid;grid-template-columns:1fr 1fr;gap:4mm}
  .cv-expanded-ai-proof>section{border-left:.8mm solid #0070e0;background:#f5f9fd}
```

- [ ] **Step 4: Insert expanded page 3 and update page totals**

Change:

```js
  const totalPages = 5 + experiencePages.length;
```

Immediately after the expanded skills page and before the experience-page mapping, insert:

```js
      <section class="cv-expanded-page cv-expanded-ai-page" data-page="ai">
        ${renderExpandedPageHeader(activeCV.ai.title, t('cvExpandedLabel'))}
        <div class="cv-expanded-page-content">
          ${renderExpandedAI(activeCV.ai)}
        </div>
        ${renderExpandedPageFooter(personal, nextPageNumber(), totalPages)}
      </section>
```

- [ ] **Step 5: Run focused and regression tests**

```bash
node --check js/cv-export.js
node tests/pdf-export.test.js
node tests/pdf-export-menu.test.js
node tests/profile-content.test.js
git diff --check
```

Expected: all three contracts print their pass messages; syntax and diff checks exit `0`.

- [ ] **Step 6: Commit the PDF renderer**

```bash
git add js/cv-export.js tests/pdf-export.test.js
git commit -m "feat: add AI content to CV renderers"
```

---

### Task 6: Strengthen Static PDF Validation and Regenerate Artifacts

**Files:**
- Modify: `tests/static-pdf-downloads.test.js`
- Modify: `scripts/generate-pdfs.js:12-17`
- Modify: `scripts/generate-pdfs.js:79-117`
- Modify: `js/cv-export.js:648`
- Modify: `assets/pdf/stefan-sturm-cv-de.pdf`
- Modify: `assets/pdf/stefan-sturm-cv-en.pdf`
- Modify: `assets/pdf/stefan-sturm-expanded-cv-de.pdf`
- Modify: `assets/pdf/stefan-sturm-expanded-cv-en.pdf`
- Test: `tests/static-pdf-downloads.test.js`

**Interfaces:**
- Consumes: the PDF HTML pages from Task 5 and `scripts/merge-pdfs.py`.
- Produces: four validated static PDFs, compact page count `2`, expanded page count `9`, technical skills on page 2, AI on page 3, and cache version `20260805-ai-development-v2`.

- [ ] **Step 1: Extend the static artifact contract**

Read the generator source in `tests/static-pdf-downloads.test.js`:

```js
const generatorSource = fs.readFileSync(path.join(root, 'scripts/generate-pdfs.js'), 'utf8');
```

Replace the generic version assertion and add generator assertions:

```js
assert.match(exportSource, /const STATIC_PDF_VERSION = '20260805-ai-development-v2'/);
assert.match(generatorSource, /format: 'expanded'[^\n]*pages: 9[^\n]*aiHeading: 'AI-gestützte Entwicklung'/);
assert.match(generatorSource, /format: 'expanded'[^\n]*pages: 9[^\n]*aiHeading: 'AI-Supported Development'/);
assert.match(generatorSource, /texts\[2\]/);
```

- [ ] **Step 2: Run the static contract and verify it fails**

```bash
node tests/static-pdf-downloads.test.js
```

Expected: FAIL because the current cache version is `20260730-static-pdf-v1` and expanded artifacts use `minPages`.

- [ ] **Step 3: Require exact expanded pages and AI headings**

Replace `ARTIFACTS` with:

```js
const ARTIFACTS = [
  { language: 'de', format: 'compact', file: 'stefan-sturm-cv-de.pdf', heading: 'Technische Kenntnisse', pages: 2 },
  { language: 'en', format: 'compact', file: 'stefan-sturm-cv-en.pdf', heading: 'Technical Skills', pages: 2 },
  { language: 'de', format: 'expanded', file: 'stefan-sturm-expanded-cv-de.pdf', heading: 'Technische Kenntnisse', pages: 9, aiHeading: 'AI-gestützte Entwicklung' },
  { language: 'en', format: 'expanded', file: 'stefan-sturm-expanded-cv-en.pdf', heading: 'Technical Skills', pages: 9, aiHeading: 'AI-Supported Development' },
];
```

Change the Python validation argument parsing and AI check to:

```python
pdf_path, expected_heading, expected_ai_heading = sys.argv[1:]
reader = PdfReader(pdf_path)
texts = [(page.extract_text() or '').strip() for page in reader.pages]
if any(not text for text in texts):
    raise SystemExit('PDF contains an empty page')
uris = []
for page in reader.pages:
    for annotation in page.get('/Annots', []):
        action = annotation.get_object().get('/A')
        if action and action.get('/URI'):
            uris.append(str(action['/URI']).rstrip('/'))
if 'https://stefansturm.de' not in uris:
    raise SystemExit('PDF does not contain a website link')
if expected_heading.lower() not in texts[1].lower():
    raise SystemExit(f'PDF page 2 does not contain {expected_heading!r}')
if expected_ai_heading and expected_ai_heading.lower() not in texts[2].lower():
    raise SystemExit(f'PDF page 3 does not contain {expected_ai_heading!r}')
```

Pass the third argument with:

```js
  run('python3', ['-c', validationScript, filePath, artifact.heading, artifact.aiHeading || '']);
```

Remove the now-unused `artifact.minPages` validation branch.

- [ ] **Step 4: Rotate the static PDF cache version**

In `js/cv-export.js`, set:

```js
const STATIC_PDF_VERSION = '20260805-ai-development-v2';
```

- [ ] **Step 5: Run source contracts before regeneration**

```bash
node tests/static-pdf-downloads.test.js
node tests/pdf-export.test.js
git diff --check
```

Expected: both contracts pass and the diff check prints nothing. The committed PDF binaries are still the old generation at this step.

- [ ] **Step 6: Regenerate all four static artifacts**

```bash
node scripts/generate-pdfs.js
```

Expected output:

```text
Validated stefan-sturm-cv-de.pdf
Validated stefan-sturm-cv-en.pdf
Validated stefan-sturm-expanded-cv-de.pdf
Validated stefan-sturm-expanded-cv-en.pdf
```

- [ ] **Step 7: Verify final PDF metadata, text, links, and required content**

Run:

```bash
python3 - <<'PY'
from pathlib import Path
from pypdf import PdfReader

expected = {
    'stefan-sturm-cv-de.pdf': (2, 'AI-gestützte Entwicklung'),
    'stefan-sturm-cv-en.pdf': (2, 'AI-Supported Development'),
    'stefan-sturm-expanded-cv-de.pdf': (9, 'AI-gestützte Entwicklung'),
    'stefan-sturm-expanded-cv-en.pdf': (9, 'AI-Supported Development'),
}
for path in sorted(Path('assets/pdf').glob('*.pdf')):
    reader = PdfReader(path)
    texts = [(page.extract_text() or '').strip() for page in reader.pages]
    pages, ai_heading = expected[path.name]
    assert len(reader.pages) == pages, (path.name, len(reader.pages))
    assert all(texts), f'{path.name}: empty page'
    full_text = '\n'.join(texts)
    for term in [ai_heading, 'Devil', 'Fast.io', 'TCA', 'Codex', 'Claude', 'Grok', 'brainstorming', 'grill-me', 'writing-plans']:
        assert term in full_text, f'{path.name}: missing {term}'
    if pages == 9:
        assert ai_heading in texts[2], f'{path.name}: AI heading not on page 3'
    uris = []
    for page in reader.pages:
        for annotation in page.get('/Annots', []):
            action = annotation.get_object().get('/A')
            if action and action.get('/URI'):
                uris.append(str(action['/URI']).rstrip('/'))
    assert 'https://stefansturm.de' in uris, f'{path.name}: website link missing'
    if pages == 9:
        assert 'https://devbar.netlify.app' in uris, f'{path.name}: Devil link missing'
    print(path.name, pages, 'pages validated')
PY
```

Expected: four `pages validated` lines with no assertion error.

- [ ] **Step 8: Render every PDF page for visual QA**

```bash
mkdir -p tmp/pdfs/ai-profile-final
for pdf in assets/pdf/*.pdf; do
  base=$(basename "$pdf" .pdf)
  pdftoppm -png -r 110 "$pdf" "tmp/pdfs/ai-profile-final/$base" >/dev/null
done
find tmp/pdfs/ai-profile-final -type f -name '*.png' | sort
```

Expected: 22 PNG files: two pages for each compact PDF and nine pages for each expanded PDF.

Inspect all 22 PNG files. Confirm:

- no blank or clipped pages;
- compact page 2 retains education and its footer;
- expanded page 2 contains all skill groups without overlap;
- expanded page 3 contains the complete AI introduction, all three tools, all four workflow steps, and both proof blocks;
- experience begins on page 4;
- all headers, footers, and page numbers are visible;
- German and English layouts have matching hierarchy.

- [ ] **Step 9: Remove only the generated QA images**

```bash
find tmp/pdfs/ai-profile-final -type f -delete
find tmp/pdfs/ai-profile-final -type d -empty -delete
```

Expected: `tmp/pdfs/ai-profile-final` no longer exists; committed PDFs remain untouched.

- [ ] **Step 10: Run all automated tests and commit source plus artifacts**

```bash
for test in tests/*.test.js; do node "$test"; done
git diff --check
git add tests/static-pdf-downloads.test.js scripts/generate-pdfs.js js/cv-export.js assets/pdf
git commit -m "build: regenerate AI-enabled CV PDFs"
```

Expected: every contract passes, the diff check prints nothing, and the commit contains the generator/version changes plus exactly four refreshed PDFs.

---

### Task 7: Perform Final Website and Repository QA

**Files:**
- Modify: none unless QA finds a defect in an in-scope file
- Test: all `tests/*.test.js`

**Interfaces:**
- Consumes: the completed website, localized data, PDF renderers, and four final static artifacts.
- Produces: a clean, review-ready branch with verified desktop/mobile behavior.

- [ ] **Step 1: Start a local static server**

```bash
python3 -m http.server 8081 --bind 127.0.0.1
```

Expected: the site is available at `http://127.0.0.1:8081/`. If port 8081 is occupied by this repository's existing server, reuse that server rather than launching a duplicate.

- [ ] **Step 2: Verify the German and English website at desktop width**

At `1440x1000`, verify in both languages:

- the nav AI link scrolls to the correct section;
- section order is Kenntnisse/Skills, AI, Projekte/Projects;
- Codex, Claude, and Grok cards align evenly;
- the four workflow steps remain stable and readable;
- Devil and Fast.io proof blocks show the approved claim;
- Devil project naming, retained website URL, TCA tags, and Fast.io TCA tag are visible;
- language switching updates all section content without reload;
- PDF menu links still trigger the localized static artifacts;
- there are no relevant console errors.

- [ ] **Step 3: Verify mobile layout and reduced space**

At `390x844`, verify in both languages:

- no horizontal overflow;
- nav menu opens, includes AI, closes after selection, and restores the page correctly;
- tool cards stack to one column;
- workflow steps use one column at this width;
- proof cards stack and long terms such as `Planning Skills (brainstorming / grill-me / writing-plans)` wrap inside their containers;
- text and tags do not overlap adjacent sections.

- [ ] **Step 4: Run the final automated suite and worktree checks**

```bash
for test in tests/*.test.js; do node "$test"; done
node --check js/data.js
node --check js/main.js
node --check js/cv-export.js
python3 - <<'PY'
from pathlib import Path
source = Path('scripts/merge-pdfs.py').read_text()
compile(source, 'scripts/merge-pdfs.py', 'exec')
PY
git diff --check
git status --short
```

Expected: all tests pass, syntax/compile checks exit `0`, no whitespace errors appear, and status lists no uncommitted implementation files.

- [ ] **Step 5: Report the completed result**

Report the website AI section, TCA/project updates, compact two-page PDFs, expanded nine-page PDFs, exact verification commands, and any residual browser-specific risk. Do not push until the user requests publication or the active execution request explicitly includes it.
