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

const projectClaim = {
  de: 'End-to-end mit AI-gestützten, agentischen Workflows unter eigener technischer Leitung entwickelt.',
  en: 'Developed end to end using AI-supported, agentic workflows under my technical direction.',
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
  'Swift Concurrency',
  'Foundation',
  'AppKit',
  'Apple Intelligence',
  'macOS 26',
  'GitHub',
  'XCTest',
  'Xcode Cloud',
  'MVVM',
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
  assert.ok(architecture.items.some(item => item.name === 'TCA'), `${lang}: architecture missing TCA`);
  assert.doesNotMatch(JSON.stringify(profile.ai), /RocketSim/i);
  assert.doesNotMatch(JSON.stringify(profile.ai), /ChatGPT|GitHub Copilot/i);
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
