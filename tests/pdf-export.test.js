const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const dataSource = fs.readFileSync(path.join(root, 'js/data.js'), 'utf8');
const mainSource = fs.readFileSync(path.join(root, 'js/main.js'), 'utf8');
const pdfSource = fs.readFileSync(path.join(root, 'js/cv-export.js'), 'utf8');

const context = {
  localStorage: { getItem: () => null, setItem: () => {} },
  window: { matchMedia: () => ({ matches: false }) },
  document: {
    documentElement: { setAttribute: () => {}, getAttribute: () => null },
    addEventListener: () => {},
  },
};

vm.createContext(context);
vm.runInContext(dataSource, context, { filename: 'js/data.js' });
vm.runInContext(mainSource, context, { filename: 'js/main.js' });
vm.runInContext(
  `${pdfSource}
  this.__buildCvFixture = (lang, photo) => {
    currentLang = lang;
    activeCV = localizeCV(lang);
    return {
      compact: buildCvHtml(photo),
      expanded: buildExpandedCvHtml(photo),
      profile: activeCV,
    };
  };`,
  context,
  { filename: 'js/cv-export.js' }
);

function cvExpected(value) {
  return String(value ?? '')
    .replace(/[–—‑]/g, '-')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function assertContains(html, value, message) {
  assert.ok(html.includes(cvExpected(value)), message);
}

for (const lang of ['de', 'en']) {
  const { compact, expanded, profile } = context.__buildCvFixture(
    lang,
    'data:image/jpeg;base64,TEST_PHOTO'
  );
  const pages = compact.match(/<section class="cv-page"/g) || [];
  const [page1, page2] = compact.split('<section class="cv-page" data-page="2">');

  assert.equal(pages.length, 2, `${lang}: expected two compact CV pages`);
  assert.match(compact, /width:210mm;height:297mm/);
  assert.match(page1, /data-company="EnBW"/);
  assert.match(page1, /data-company="Chrono24"/);
  assert.match(page1, /data-company="1und1"/);
  assert.match(page1, /data-company="RTL"/);
  assert.match(page1, /data-company="Nexenio \(Luca App\)"/);
  assert.doesNotMatch(page1, /data-company="Comdirect"/);
  assert.match(page2, /data-company="Comdirect"/);
  assert.match(page2, /data-company="Buhl"/);
  assert.match(page2, /data-company="Porsche"/);
  assert.match(page2, /Devil - Apple Developer Toolkit/);
  assert.match(page2, /Fast\.io - Fasting Timer/);
  assert.match(page2, /AI &amp; Agentic Development/);
  assertContains(page2, profile.ai.compactSummary, `${lang}: compact AI summary missing`);
  assertContains(page2, 'TCA', `${lang}: compact TCA missing`);
  assertContains(page2, profile.projects[0].cvDescription, `${lang}: compact Devil copy missing`);
  assertContains(page2, profile.projects[1].cvDescription, `${lang}: compact Fast.io copy missing`);
  assert.match(page2, lang === 'de' ? /Informationstechnik/ : /Information Technology/);
  assert.ok(compact.includes('href="https://stefansturm.de"'), `${lang}: compact website link missing`);
  assert.match(compact, /stefansturm\.de/);
  assert.match(compact, /data:image\/jpeg;base64,TEST_PHOTO/);
  assert.doesNotMatch(compact, /Albert-Brülls/);
  assert.doesNotMatch(compact, /Willich-Anrath/);
  assert.doesNotMatch(compact, /Verheiratet|Married/);
  assert.doesNotMatch(compact, /[–—‑]/);
  assert.doesNotMatch(compact, /✉|☎|⌂|⚙/);

  assert.match(expanded, /<main class="cv-expanded-document">/);
  assert.doesNotMatch(expanded, /<section class="cv-page"/);
  assert.ok(expanded.includes('href="https://stefansturm.de"'), `${lang}: expanded website link missing`);
  assert.match(expanded, /stefansturm\.de/);
  assert.match(expanded, /class="cv-expanded-page cv-expanded-cover-page"/);
  assert.match(expanded, /class="cv-expanded-page cv-expanded-skills-page"/);
  assert.match(expanded, /data-page="skills"/);
  assert.match(expanded, /class="cv-expanded-page cv-expanded-ai-page"/);
  assert.match(expanded, /data-page="ai"/);
  assert.equal((expanded.match(/<section class="cv-expanded-page/g) || []).length, 9, `${lang}: expanded CV must contain nine pages`);
  assert.ok(
    expanded.indexOf('data-page="skills"') < expanded.indexOf('data-page="ai"') &&
      expanded.indexOf('data-page="ai"') < expanded.indexOf('data-page="experience-1"'),
    `${lang}: expanded AI page order is wrong`
  );
  assert.match(expanded, /data-page="experience/);
  assert.match(expanded, /data-page="projects"/);
  assert.match(expanded, /data-page="education"/);
  assert.doesNotMatch(expanded, /class="cv-expanded-content-section/);
  assert.match(expanded, /@page\{size:A4;/);
  assert.match(expanded, /data:image\/jpeg;base64,TEST_PHOTO/);
  assertContains(expanded, profile.personal.tagline, `${lang}: missing personal tagline`);
  assertContains(expanded, profile.ai.introduction, `${lang}: full AI introduction missing`);
  assertContains(expanded, profile.ai.workflowTitle, `${lang}: AI workflow title missing`);

  profile.ai.tools.forEach(tool => {
    assertContains(expanded, tool.name, `${lang}: missing AI tool ${tool.name}`);
    assertContains(expanded, tool.description, `${lang}: missing AI tool description ${tool.name}`);
  });
  profile.ai.workflow.forEach(item => {
    assertContains(expanded, item.title, `${lang}: missing AI workflow step ${item.title}`);
    assertContains(expanded, item.description, `${lang}: missing AI workflow description ${item.title}`);
  });
  profile.ai.proof.forEach(item => {
    assertContains(expanded, item.project, `${lang}: missing AI proof project ${item.project}`);
    assertContains(expanded, item.description, `${lang}: missing AI proof claim ${item.project}`);
  });

  profile.summary.split('<br><br>').forEach((paragraph, index) => {
    assertContains(expanded, paragraph, `${lang}: missing profile paragraph ${index}`);
  });

  profile.stats.forEach(stat => {
    assertContains(expanded, stat.value, `${lang}: missing statistic value ${stat.value}`);
    assertContains(expanded, stat.label, `${lang}: missing statistic label ${stat.label}`);
  });

  profile.languages.forEach(language => {
    assertContains(expanded, language.name, `${lang}: missing language ${language.name}`);
    assertContains(expanded, language.level, `${lang}: missing language level ${language.level}`);
    if (language.note) {
      assertContains(expanded, language.note, `${lang}: missing language note ${language.note}`);
    }
  });

  profile.experience.forEach(job => {
    assertContains(expanded, job.company, `${lang}: missing company ${job.company}`);
    assertContains(expanded, job.role, `${lang}: missing role at ${job.company}`);
    assertContains(expanded, job.period, `${lang}: missing period at ${job.company}`);
    assertContains(expanded, job.location, `${lang}: missing location at ${job.company}`);
    assertContains(expanded, job.description, `${lang}: shortened description at ${job.company}`);
    if (job.appName) assertContains(expanded, job.appName, `${lang}: missing app at ${job.company}`);
    if (job.appUrl) {
      assert.ok(expanded.includes(`href="${job.appUrl}"`), `${lang}: missing app URL at ${job.company}`);
    }
    (job.tech || []).forEach(technology => {
      assertContains(expanded, technology, `${lang}: missing ${technology} at ${job.company}`);
    });
  });

  profile.projects.forEach(project => {
    assertContains(expanded, project.name, `${lang}: missing project ${project.name}`);
    assertContains(expanded, project.period, `${lang}: missing period for ${project.name}`);
    assertContains(expanded, project.description, `${lang}: full description missing for ${project.name}`);
    assert.ok(expanded.includes(`href="${project.url}"`), `${lang}: missing URL for ${project.name}`);
    if (project.cvDescription !== project.description) {
      assert.ok(
        !expanded.includes(`<p class="cv-expanded-copy">${cvExpected(project.cvDescription)}</p>`),
        `${lang}: compact project copy used for ${project.name}`
      );
    }
    project.tech.forEach(technology => {
      assertContains(expanded, technology, `${lang}: missing ${technology} for ${project.name}`);
    });
  });

  profile.skills.forEach(category => {
    assertContains(expanded, category.category, `${lang}: missing skill category ${category.category}`);
    category.items.forEach(item => {
      assertContains(expanded, item.name, `${lang}: missing skill ${item.name}`);
      if (item.years) assertContains(expanded, item.years, `${lang}: missing years for ${item.name}`);
    });
  });

  profile.education.forEach(education => {
    assertContains(expanded, education.degree, `${lang}: missing education ${education.degree}`);
    assertContains(expanded, education.institution, `${lang}: missing institution for ${education.degree}`);
    assertContains(expanded, education.period, `${lang}: missing period for ${education.degree}`);
  });

  assertContains(expanded, profile.personal.twitter, `${lang}: missing X profile`);
  assert.doesNotMatch(expanded, /Albert-Brülls/);
  assert.doesNotMatch(expanded, /Willich-Anrath/);
  assert.doesNotMatch(expanded, /Verheiratet|Married/);
  assert.doesNotMatch(expanded, /[–—‑]/);
  assert.doesNotMatch(expanded, /✉|☎|⌂|⚙/);
}

console.log('Professional PDF export contract passed for DE and EN');
