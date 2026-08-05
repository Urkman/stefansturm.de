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
