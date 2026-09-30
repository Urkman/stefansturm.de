const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const container = { innerHTML: '', querySelectorAll: () => [] };
const projects = { innerHTML: '' };
const linked = { classList: { contains: name => name === 'blog-details' }, open: false,
  scrollIntoView() { this.scrolled = true; } };
const context = vm.createContext({
  localStorage: { getItem: () => 'de' },
  window: { matchMedia: () => ({ matches: false }), location: { hash: '' } },
  document: {
    documentElement: { setAttribute() {} }, addEventListener() {},
    getElementById: id => ({ 'blog-posts': container, 'projects-grid': projects, 'blog-example': linked })[id],
  },
});
for (const file of ['js/data.js', 'js/blog.js', 'js/main.js']) {
  vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), context);
}
const run = code => vm.runInContext(code, context);

run('renderBlog()');
assert.match(container.innerHTML, /Cross-Plattform ohne Cross-Plattform/);
assert.match(container.innerHTML, /2026-09-30/);
assert.match(container.innerHTML, /ios-app-setup/);
assert.match(container.innerHTML, /android-app-from-documentation/);
assert.match(container.innerHTML, /Android-Umsetzung von Ripple mit Kotlin und Jetpack Compose/);
assert.match(container.innerHTML, /href="https:\/\/apps\.apple\.com\/us\/app\/ripple-water-tracker\/id6808143149"/);
assert.ok(run('BLOG_POSTS[0].de.sections.length === BLOG_POSTS[0].en.sections.length'));
assert.doesNotMatch(container.innerHTML, /class="blog-details" open/);
run("currentLang = 'en'; renderBlog()");
assert.match(container.innerHTML, /Cross-platform without a cross-platform framework/);
assert.match(container.innerHTML, /android-conversion-readiness/);
assert.match(container.innerHTML, /The Android app has been submitted to Google/);
assert.match(container.innerHTML, /available on the App Store/);
assert.doesNotMatch(container.innerHTML, /class="blog-details" open/);

// Test content remains confined to this isolated renderer; it is never published.
run(`BLOG_POSTS.push({slug: 'example', date: '2026-09-30',
  de: {title: 'Beispiel <script>', excerpt: 'Einblick', sections: [{heading: 'Funktionen', paragraphs: ['Text & Inhalt'], items: ['Eintrag']}]},
  en: {title: 'Example <script>', excerpt: 'Insight', sections: [{heading: 'Features', paragraphs: ['Text & content'], items: ['Entry']}]}
}); renderBlog()`);
assert.match(container.innerHTML, /Example &lt;script&gt;/);
assert.match(container.innerHTML, /Text &amp; content/);
assert.match(container.innerHTML, /30 September 2026/);
assert.match(container.innerHTML, /href="#blog-example"/);
assert.doesNotMatch(container.innerHTML, /class="blog-details" open/);

const safeContent = run(`renderBlogText('<img src=x onerror=alert(1)> [unsafe](javascript:alert(1)) [safe](https://example.com/?x=1&y=2)')`);
assert.doesNotMatch(safeContent, /<img/);
assert.doesNotMatch(safeContent, /href="javascript:/);
assert.match(safeContent, /&lt;img/);
assert.match(safeContent, /\[unsafe\]\(javascript:alert\(1\)\)/);
assert.match(safeContent, /href="https:\/\/example\.com\/\?x=1&amp;y=2"/);

run("window.location.hash = '#blog-example'; openLinkedBlogPost(); currentLang = 'de'; renderBlog()");
assert.ok(linked.open && linked.scrolled);
assert.match(container.innerHTML, /class="blog-details" open/);
assert.match(container.innerHTML, /30\. September 2026/);
assert.match(container.innerHTML, /Beispiel &lt;script&gt;/);

run("window.location.hash = ''");
container.querySelectorAll = () => [{ id: 'blog-example' }];
run("currentLang = 'en'; renderBlog()");
assert.match(container.innerHTML, /class="blog-details" open/);
run("BLOG_POSTS.push({slug: 'untranslated', date: '2026-10-01', de: {title: 'Not ready'}}); renderBlog()");
assert.doesNotMatch(container.innerHTML, /Not ready/);
assert.match(container.innerHTML, /Cross-platform without a cross-platform framework/);

for (const lang of ['de', 'en']) {
  run(`currentLang = '${lang}'; activeCV = localizeCV(currentLang); renderProjects()`);
  assert.match(projects.innerHTML, /assets\/ripple.png/);
assert.match(projects.innerHTML, lang === 'de' ? /Funktionen &amp; Besonderheiten/ : /Features &amp; highlights/);
assert.match(projects.innerHTML, lang === 'de' ? /iPhone, iPad, Apple Watch und Android/ : /iPhone, iPad, Apple Watch, and Android/);
assert.match(projects.innerHTML, lang === 'de' ? /Kotlin und Jetpack Compose/ : /Kotlin and Jetpack Compose/);
  assert.equal((projects.innerHTML.match(/class="project-features"/g) || []).length, 1);
}
assert.ok(fs.existsSync(path.join(root, 'assets/ripple.png')));
console.log('Blog localization, safe rendering, direct links, and Ripple features passed');
