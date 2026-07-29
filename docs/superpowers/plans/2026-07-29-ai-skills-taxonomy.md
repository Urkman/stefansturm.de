# AI Skills Taxonomy Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the mixed AI skills card with separate workflow competencies and AI tools while moving RocketSim and App Store Connect CLI into the general tools category.

**Architecture:** Keep the existing data-driven skills renderer unchanged. Update the German base data and index-aligned English overrides in `js/data.js`, then enforce the category placement and bilingual labels through the existing Node content contract.

**Tech Stack:** Static HTML, vanilla JavaScript, Node.js assertions, in-app browser QA

## Global Constraints

- The standalone AI profile section, navigation entry, workflow narrative, model matrix, and tool descriptions remain removed.
- German and English profiles use the same skills category and item structure.
- Product names remain unchanged.
- Established technical terms may remain in English in the German profile.
- No new runtime dependencies or rendering abstractions.

---

### Task 1: Define the AI Skills Taxonomy Contract

**Files:**
- Modify: `tests/profile-content.test.js`
- Test: `tests/profile-content.test.js`

**Interfaces:**
- Consumes: `CV` and `CV_TRANSLATIONS.en` from `js/data.js`
- Produces: Assertions for `AI & Agentic Development`, `AI Tools`, and `Tools & CI/CD`

- [ ] **Step 1: Replace the existing AI skills assertion with the new category contract**

```js
const expectedAiSkills = {
  de: {
    workflow: [
      'Agentic Development',
      'Prompt & Context Engineering',
      'Planning Skills (brainstorming / grill-me)',
      'PRD / Sprintplanung',
      'Worktree / PR Workflows',
      'AI-gestütztes Testing',
      'AI Code Review',
      'Modellauswahl',
    ],
    tools: ['Codex', 'Claude', 'ChatGPT', 'GitHub Copilot', 'Grok'],
  },
  en: {
    workflow: [
      'Agentic Development',
      'Prompt & Context Engineering',
      'Planning Skills (brainstorming / grill-me)',
      'PRD / Sprint Planning',
      'Worktree / PR Workflows',
      'AI-assisted Testing',
      'AI Code Review',
      'Model Selection',
    ],
    tools: ['Codex', 'Claude', 'ChatGPT', 'GitHub Copilot', 'Grok'],
  },
};

for (const [lang, profile] of Object.entries(profiles)) {
  assert.equal(profile.ai, undefined, `${lang}: standalone AI data must be removed`);

  const workflow = profile.skills.find(category => category.category === 'AI & Agentic Development');
  const aiTools = profile.skills.find(category => category.category === 'AI Tools');
  const generalTools = profile.skills.find(category => category.category === 'Tools & CI/CD');

  assert.ok(workflow, `${lang}: AI workflow skills category missing`);
  assert.ok(aiTools, `${lang}: AI tools category missing`);
  assert.ok(generalTools, `${lang}: general tools category missing`);
  assert.deepEqual(
    Array.from(workflow.items, item => item.name),
    expectedAiSkills[lang].workflow,
    `${lang}: AI workflow skills differ`
  );
  assert.deepEqual(
    Array.from(aiTools.items, item => item.name),
    expectedAiSkills[lang].tools,
    `${lang}: AI tools differ`
  );
  assert.ok(generalTools.items.some(item => item.name === 'RocketSim'), `${lang}: RocketSim must be a general tool`);
  assert.ok(
    generalTools.items.some(item => item.name === 'App Store Connect CLI'),
    `${lang}: App Store Connect CLI must be a general tool`
  );
}
```

- [ ] **Step 2: Run the contract and verify it fails against the old mixed card**

Run:

```bash
node tests/profile-content.test.js
```

Expected: FAIL because `AI Tools` is missing and RocketSim/App Store Connect CLI are not in `Tools & CI/CD`.

- [ ] **Step 3: Commit the failing contract**

```bash
git add tests/profile-content.test.js
git commit -m "test: define AI skills taxonomy"
```

---

### Task 2: Implement the Bilingual Skills Taxonomy

**Files:**
- Modify: `js/data.js`
- Modify: `index.html`
- Test: `tests/profile-content.test.js`

**Interfaces:**
- Consumes: The index-aligned localization behavior in `mergeLocalized(base, override)`
- Produces: Eight skills categories in both languages, including separate AI workflow and AI tool cards

- [ ] **Step 1: Add deployment and UI verification tools to `Tools & CI/CD`**

Append these items to the German base category after `CocoaPods`:

```js
{ name: 'RocketSim' },
{ name: 'App Store Connect CLI' },
```

The English override requires no item-name changes because both product names are identical.

- [ ] **Step 2: Replace the mixed German AI card with workflow competencies and a separate tools card**

```js
{
  category: 'AI & Agentic Development',
  icon: 'fas fa-microchip',
  items: [
    { name: 'Agentic Development' },
    { name: 'Prompt & Context Engineering' },
    { name: 'Planning Skills (brainstorming / grill-me)' },
    { name: 'PRD / Sprintplanung' },
    { name: 'Worktree / PR Workflows' },
    { name: 'AI-gestütztes Testing' },
    { name: 'AI Code Review' },
    { name: 'Modellauswahl' },
  ],
},
{
  category: 'AI Tools',
  icon: 'fas fa-wand-magic-sparkles',
  items: [
    { name: 'Codex' },
    { name: 'Claude' },
    { name: 'ChatGPT' },
    { name: 'GitHub Copilot' },
    { name: 'Grok' },
  ],
},
```

- [ ] **Step 3: Update the English overrides for the modified category indices**

The new general tools keep their product names from the German base data and need no English item overrides. Replace the current AI override and append the AI tools override:

```js
{
  category: 'AI & Agentic Development',
  items: [
    {},
    {},
    {},
    { name: 'PRD / Sprint Planning' },
    {},
    { name: 'AI-assisted Testing' },
    {},
    { name: 'Model Selection' },
  ],
},
{
  category: 'AI Tools',
},
```

- [ ] **Step 4: Rotate the asset version in `index.html`**

Use the same version for both local scripts:

```html
<script src="js/data.js?v=20260729-ai-skills-taxonomy"></script>
<script src="js/main.js?v=20260729-ai-skills-taxonomy"></script>
```

- [ ] **Step 5: Run syntax, contract, and diff checks**

Run:

```bash
node --check js/data.js
node --check js/main.js
node tests/profile-content.test.js
git diff --check
```

Expected: both syntax checks exit successfully, the contract prints `Profile content contract passed for DE and EN`, and the diff check prints nothing.

- [ ] **Step 6: Verify the rendered profile**

Serve the repository and inspect the skills section in German and English at desktop width and at `390x844`.

Expected:

- `AI & Agentic Development` contains eight workflow competencies.
- `AI Tools` contains five product names.
- `Tools & CI/CD` contains RocketSim and App Store Connect CLI.
- The skills grid has no horizontal overflow.
- The browser console has no relevant warnings or errors.
- The standalone AI section remains absent.

- [ ] **Step 7: Commit the implementation**

```bash
git add js/data.js index.html
git commit -m "feat: clarify AI skills taxonomy"
```
