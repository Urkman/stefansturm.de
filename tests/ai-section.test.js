const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const css = fs.readFileSync(path.join(root, 'css/styles.css'), 'utf8');
const dataSource = fs.readFileSync(path.join(root, 'js/data.js'), 'utf8');
const mainSource = fs.readFileSync(path.join(root, 'js/main.js'), 'utf8');

const aboutIndex = html.indexOf('id="about"');
const experienceIndex = html.indexOf('id="experience"');
const skillsIndex = html.indexOf('id="skills"');
const aiIndex = html.indexOf('id="ai"');
const projectsIndex = html.indexOf('id="projects"');
assert.equal(
  (html.match(/\?v=20260826-ai-agents/g) || []).length,
  4,
  'AI content and layout assets must share the updated cache version'
);
assert.match(html, /href="#ai"[^>]*data-i18n="navAI"/);
assert.ok(
  aboutIndex < aiIndex && aiIndex < experienceIndex && experienceIndex < skillsIndex && skillsIndex < projectsIndex,
  'AI section must appear directly after About and before Experience'
);
const navOrder = ['#about', '#ai', '#experience', '#skills', '#projects'].map(href => html.indexOf(`href="${href}"`));
assert.ok(navOrder.every((position, index) => index === 0 || navOrder[index - 1] < position), 'AI navigation order is wrong');
assert.match(html, /id="ai-heading"/);
assert.match(html, /id="ai-content"/);
assert.match(mainSource, /function renderAI\(\)/);
assert.match(mainSource, /renderAbout\(\);\s*renderAI\(\);\s*renderExperience\(\);\s*renderSkills\(\);/);
assert.match(css, /\.ai-workflow-grid/);
assert.match(css, /\.ai-agents-grid/);
assert.match(css, /\.ai-skills-groups/);
assert.match(css, /\.ai-mcp-grid/);
assert.match(css, /\.ai-reasoning-list/);
assert.match(
  css,
  /@media \(min-width: 640px\)[\s\S]*?\.ai-reasoning-label\s*\{[^}]*flex-direction:\s*column/,
  'desktop reasoning labels must stack to prevent long phase names overlapping descriptions'
);
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
  [
    'Codex',
    'Grok',
    'Claude Code',
    'XcodeBuildMCP',
    'Browser / Computer Use',
    'Devil MCP Server',
    'Devil',
    'Fast.io',
    'EnBW',
    'brainstorming',
    'writing-plans',
    'executing-plans',
    'Low',
    'Max',
    'Codex Sol',
    'Luna',
    'Claude Opus',
    'Fable',
    lang === 'de' ? 'Planung' : 'Planning',
    lang === 'de' ? 'Implementierung' : 'Implementation',
    lang === 'de' ? 'Bugfixing' : 'Bug Fixing',
    'Code Review',
  ].forEach(term => {
    assert.ok(content.includes(term), `${lang}: missing ${term}`);
  });
  ['Codex Sol', 'Luna', 'Claude Opus', 'Fable'].forEach(variant => {
    assert.equal(
      content.split(variant).length - 1,
      1,
      `${lang}: ${variant} must only appear in the model-agnostic extension sentence`
    );
  });
  const expectedHeadings = lang === 'de'
    ? ['Workflow', 'Harnesses / Coding-Agenten', 'Skills', 'MCPs', 'Reasoning &amp; Token-Effizienz', 'Praxis']
    : ['Workflow', 'Harnesses / Coding Agents', 'Skills', 'MCPs', 'Reasoning &amp; Token Efficiency', 'In Practice'];
  expectedHeadings.forEach(heading => {
    assert.ok(content.includes(heading), `${lang}: missing section heading ${heading}`);
  });
  assert.ok(
    content.includes(lang === 'de' ? 'In Entwicklung' : 'In development'),
    `${lang}: missing Devil MCP development status`
  );
  assert.doesNotMatch(content, /grill-me/);
  assert.doesNotMatch(content, /Codex \/ GPT/);
  assert.doesNotMatch(content, /RocketSim|ChatGPT|GitHub Copilot/);
}

console.log('AI section contract passed for DE and EN');
