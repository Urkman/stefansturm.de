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

const forbiddenAiTerms = /\bAI\b|Agentic|Codex|Claude|ChatGPT|Copilot|Grok|Prompt Engineering|RocketSim|App Store Connect CLI/i;
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

const sourceFiles = {
  html: fs.readFileSync(path.join(root, 'index.html'), 'utf8'),
  main: fs.readFileSync(path.join(root, 'js/main.js'), 'utf8'),
  css: fs.readFileSync(path.join(root, 'css/styles.css'), 'utf8'),
};

assert.doesNotMatch(sourceFiles.html, /href="#ai"|id="ai"|AI & Tools/);
assert.doesNotMatch(sourceFiles.main, /renderAI|activeCV\.ai|AI & Agentic Development/);
assert.doesNotMatch(sourceFiles.css, /\.ai-[a-z-]+/);

console.log('Profile content contract passed for DE and EN');
