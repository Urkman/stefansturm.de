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

const { CV, I18N, CV_TRANSLATIONS } = context.__profile;

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
      'Agentic Coding',
      'Prompt & Context Engineering',
      'Planungs- & Ausführungs-Skills',
      'AI-gestütztes Testing',
      'AI Code Review',
      'Modell- & Reasoning-Auswahl',
      'MCP-Integration',
    ],
    harnesses: ['Codex', 'Grok', 'Claude Code', 'XcodeBuildMCP'],
  },
  en: {
    workflow: [
      'Agentic Coding',
      'Prompt & Context Engineering',
      'Planning & Execution Skills',
      'AI-assisted Testing',
      'AI Code Review',
      'Model & Reasoning Selection',
      'MCP Integration',
    ],
    harnesses: ['Codex', 'Grok', 'Claude Code', 'XcodeBuildMCP'],
  },
};

const projectClaim = {
  de: 'End-to-end mit AI-gestützten, agentischen Workflows unter eigener technischer Leitung entwickelt.',
  en: 'Developed end to end using AI-supported, agentic workflows under my technical direction.',
};

const expectedAi = {
  de: {
    title: 'AI-gestützte Entwicklung',
    sectionTitles: ['Workflow', 'Harnesses / Coding-Agenten', 'Skills', 'MCPs', 'Reasoning & Token-Effizienz', 'Praxis'],
    workflowTitles: ['Planung', 'Überprüfung', 'Implementierung', 'Code Review & Auslieferung'],
    agentNames: ['Codex', 'Grok', 'Claude Code'],
    skillGroups: ['Planung & Ausführung', 'Apple-Plattformen', 'Qualität & Auslieferung'],
    mcpNames: ['XcodeBuildMCP', 'Browser / Computer Use', 'Devil MCP Server'],
    mcpStatuses: ['Im Einsatz', 'Im Einsatz', 'In Entwicklung'],
    reasoningLevels: ['Max', 'Low', 'Low / High', 'High'],
    reasoningUses: ['Planung', 'Implementierung', 'Bugfixing', 'Code Review'],
    reasoningVariants: ['Codex Sol', 'Luna', 'Claude Opus', 'Fable'],
    compactTerms: ['XcodeBuildMCP', 'Reasoning', 'Planung', 'Implementierung', 'Bugfixing', 'Review', 'Devil MCP Server'],
  },
  en: {
    title: 'AI-Supported Development',
    sectionTitles: ['Workflow', 'Harnesses / Coding Agents', 'Skills', 'MCPs', 'Reasoning & Token Efficiency', 'In Practice'],
    workflowTitles: ['Planning', 'Verification', 'Implementation', 'Code Review & Delivery'],
    agentNames: ['Codex', 'Grok', 'Claude Code'],
    skillGroups: ['Planning & Execution', 'Apple Platforms', 'Quality & Delivery'],
    mcpNames: ['XcodeBuildMCP', 'Browser / Computer Use', 'Devil MCP Server'],
    mcpStatuses: ['In use', 'In use', 'In development'],
    reasoningLevels: ['Max', 'Low', 'Low / High', 'High'],
    reasoningUses: ['Planning', 'Implementation', 'Bug Fixing', 'Code Review'],
    reasoningVariants: ['Codex Sol', 'Luna', 'Claude Opus', 'Fable'],
    compactTerms: ['XcodeBuildMCP', 'reasoning', 'planning', 'implementation', 'bug fixing', 'review', 'Devil MCP Server'],
  },
};

const expectedDevilTech = [
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
  'MVVM',
  'MCP',
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

for (const [lang, profile] of Object.entries(profiles)) {
  const expected = expectedAi[lang];
  const workflow = profile.skills.find(category => category.category === 'AI & Agentic Development');
  const aiHarnesses = profile.skills.find(category => category.category === 'AI Harnesses & Tools');
  const generalTools = profile.skills.find(category => category.category === 'Tools & CI/CD');
  const agileMethods = profile.skills.find(category =>
    category.category === (lang === 'de' ? 'Agile Arbeitsmethoden' : 'Agile Ways of Working')
  );
  const architecture = profile.skills.find(category =>
    category.category === (lang === 'de' ? 'Architektur' : 'Architecture')
  );

  assert.ok(profile.ai, `${lang}: standalone AI data missing`);
  assert.equal(profile.ai.title, expected.title, `${lang}: AI title differs`);
  assert.deepEqual(
    [profile.ai.workflowTitle, profile.ai.agentsTitle, profile.ai.skillsTitle, profile.ai.mcpsTitle, profile.ai.reasoningTitle, profile.ai.proofTitle],
    expected.sectionTitles,
    `${lang}: AI section titles differ`
  );
  assert.deepEqual(Array.from(profile.ai.workflow, item => item.title), expected.workflowTitles);
  assert.deepEqual(Array.from(profile.ai.agents, item => item.name), expected.agentNames);
  assert.deepEqual(Array.from(profile.ai.skills, item => item.category), expected.skillGroups);
  assert.deepEqual(Array.from(profile.ai.mcps, item => item.name), expected.mcpNames);
  assert.deepEqual(Array.from(profile.ai.mcps, item => item.status), expected.mcpStatuses);
  assert.deepEqual(Array.from(profile.ai.reasoning, item => item.level), expected.reasoningLevels);
  assert.deepEqual(Array.from(profile.ai.reasoning, item => item.use), expected.reasoningUses);
  expected.reasoningVariants.forEach(variant => {
    assert.equal(
      profile.ai.reasoningNote.split(variant).length - 1,
      1,
      `${lang}: ${variant} must appear exactly once in the model-agnostic reasoning note`
    );
  });
  assert.equal(profile.ai.proof.length, 3, `${lang}: expected three AI proof entries`);
  expected.compactTerms.forEach(term => {
    assert.ok(profile.ai.compactSummary.includes(term), `${lang}: compact AI summary missing ${term}`);
  });
  assert.match(profile.ai.mcps[2].description, /Devil/i);

  assert.ok(workflow, `${lang}: AI workflow skills category missing`);
  assert.ok(aiHarnesses, `${lang}: AI harnesses category missing`);
  assert.ok(generalTools, `${lang}: general tools category missing`);
  assert.ok(agileMethods, `${lang}: agile methods category missing`);
  assert.deepEqual(
    Array.from(agileMethods.items, item => item.name),
    ['Scrum', 'Kanban'],
    `${lang}: agile methods differ`
  );
  assert.deepEqual(
    Array.from(workflow.items, item => item.name),
    expectedAiSkills[lang].workflow,
    `${lang}: AI workflow skills differ`
  );
  assert.deepEqual(
    Array.from(aiHarnesses.items, item => item.name),
    expectedAiSkills[lang].harnesses,
    `${lang}: AI harnesses and tools differ`
  );
  assert.ok(generalTools.items.some(item => item.name === 'RocketSim'), `${lang}: RocketSim must be a general tool`);
  assert.ok(
    generalTools.items.some(item => item.name === 'App Store Connect CLI'),
    `${lang}: App Store Connect CLI must be a general tool`
  );
  assert.ok(architecture.items.some(item => item.name === 'TCA'), `${lang}: architecture missing TCA`);
  assert.doesNotMatch(JSON.stringify(profile.ai), /RocketSim/i);
  assert.doesNotMatch(JSON.stringify(profile.ai), /ChatGPT|GitHub Copilot|grill-me/i);
}

for (const [lang, profile] of Object.entries(profiles)) {
  assert.match(profile.summary, lang === 'de' ? /^Stefan Sturm ist/ : /^Stefan Sturm is/);
  assert.equal(profile.personal.website, 'https://stefansturm.de', `${lang}: website URL differs`);
  assert.match(profile.heroSummary, lang === 'de' ? /^Ich entwickle/ : /^I build/);
  assert.notEqual(profile.heroSummary, profile.websiteSummary, `${lang}: hero and website summaries must differ`);
  assert.match(profile.websiteSummary, lang === 'de' ? /^Ich bin/ : /^I am/);
  assert.doesNotMatch(
    profile.websiteSummary,
    lang === 'de' ? /\b(Stefan Sturm ist|Sein|Er)\b/ : /\b(Stefan Sturm is|His|He)\b/
  );

  profile.projects.forEach(project => {
    assert.ok(project.cvDescription, `${lang}: ${project.name} is missing cvDescription`);
  });

  const devil = profile.projects[0];
  const fast = profile.projects[1];
  assert.equal(devil.name, 'Devil – Apple Developer Toolkit', `${lang}: Devil must be first`);
  assert.equal(devil.url, 'https://devbar.netlify.app', `${lang}: Devil URL differs`);
  assert.equal(devil.linkType, 'website', `${lang}: Devil link type differs`);
  assert.deepEqual(Array.from(devil.tech), expectedDevilTech, `${lang}: Devil technology tags differ`);
  assert.match(devil.description, /MCP/i, `${lang}: Devil description missing MCP server`);
  assert.ok(devil.description.endsWith(projectClaim[lang]), `${lang}: Devil description missing AI claim`);
  assert.ok(devil.cvDescription.endsWith(projectClaim[lang]), `${lang}: Devil compact copy missing AI claim`);
  assert.ok(fast.tech.includes('MVVM'), `${lang}: Fast.io missing MVVM`);
  assert.ok(!fast.tech.includes('TCA'), `${lang}: Fast.io must not include TCA`);
  assert.ok(fast.description.endsWith(projectClaim[lang]), `${lang}: Fast.io description missing AI claim`);
  assert.ok(fast.cvDescription.endsWith(projectClaim[lang]), `${lang}: Fast.io compact copy missing AI claim`);

  ['EnBW', 'Chrono24'].forEach(company => {
    const job = profile.experience.find(entry => entry.company === company);
    assert.ok(job, `${lang}: ${company} experience missing`);
    expectedExperienceTech[company].forEach(technology => {
      assert.ok(job.tech.includes(technology), `${lang}: ${company} missing ${technology}`);
    });
  });

  const enbw = profile.experience.find(entry => entry.company === 'EnBW');
  assert.match(enbw.description, /AI-(?:gestützte|assisted) Workflows/i, `${lang}: EnBW description missing AI workflow`);
  assert.ok(enbw.tech.includes('Agentic Coding'), `${lang}: EnBW missing Agentic Coding`);
  assert.ok(enbw.tech.includes('AI-assisted Development'), `${lang}: EnBW missing AI-assisted Development`);

  profile.experience.slice(2).forEach(job => {
    assert.ok(!job.tech.includes('TCA'), `${lang}: ${job.company} must not include TCA`);
  });

  profile.projects.forEach(project => {
    assert.ok(project.tech.includes('MVVM'), `${lang}: ${project.name} missing MVVM`);
    assert.ok(!project.tech.includes('TCA'), `${lang}: ${project.name} must not include TCA`);
  });
}

const pdfTranslationKeys = [
  'cvProfileSummary',
  'cvLocation',
  'cvEarlierExperience',
  'cvAdditionalExperience',
  'cvSelectedProjects',
  'cvTechnicalSkills',
  'cvPage',
  'pdfExportMenu',
  'compactCvTitle',
  'compactCvDescription',
  'expandedCvTitle',
  'expandedCvDescription',
  'cvExpandedLabel',
  'cvStatistics',
  'navAI',
];
for (const lang of ['de', 'en']) {
  pdfTranslationKeys.forEach(key => {
    assert.ok(I18N[lang][key], `${lang}: missing PDF translation ${key}`);
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
    /Scrum/,
    /Kanban/,
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
    /Scrum/,
    /Kanban/,
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
}

const sourceFiles = {
  html: fs.readFileSync(path.join(root, 'index.html'), 'utf8'),
  main: fs.readFileSync(path.join(root, 'js/main.js'), 'utf8'),
  css: fs.readFileSync(path.join(root, 'css/styles.css'), 'utf8'),
};

assert.match(sourceFiles.main, /proj\.linkType === 'website'/);
assert.match(sourceFiles.main, /t\('websiteView'\)/);
assert.match(dataSource, /websiteView:\s*'Website ansehen'/);
assert.match(dataSource, /websiteView:\s*'View website'/);

console.log('Profile content contract passed for DE and EN');
