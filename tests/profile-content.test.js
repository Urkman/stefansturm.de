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
  assert.equal(profile.ai, undefined, `${lang}: standalone AI data must be removed`);

  const aiSkills = profile.skills.find(category => category.category === 'AI & Agentic Development');
  assert.ok(aiSkills, `${lang}: AI skills category missing`);
  [
    /Codex/,
    /Claude/,
    /ChatGPT/,
    /GitHub Copilot/,
    /Grok/,
    /Prompt Engineering/,
    /PRD \/ (Sprintplanung|sprint planning)/,
    /AI-(gestütztes|assisted) Testing/i,
  ].forEach(pattern => {
    assert.match(JSON.stringify(aiSkills), pattern, `${lang}: missing AI skill ${pattern}`);
  });
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
