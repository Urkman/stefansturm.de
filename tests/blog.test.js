const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const listing = { innerHTML: '' };
const article = { innerHTML: '' };
const projects = { innerHTML: '' };
const context = vm.createContext({
  localStorage: { getItem: key => key === 'language' ? 'de' : null, setItem() {} },
  URL,
  URLSearchParams,
  window: { matchMedia: () => ({ matches: false }), location: {
    hash: '', search: '', href: 'https://example.com/index.html',
  } },
  document: {
    title: '', documentElement: { lang: 'de', setAttribute() {} }, addEventListener() {},
    querySelector: () => null,
    getElementById: id => ({ 'blog-posts': listing, 'blog-article': article, 'projects-grid': projects })[id],
  },
});
for (const file of ['js/data.js', 'js/blog.js', 'js/main.js']) {
  vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), context);
}
const run = code => vm.runInContext(code, context);

run('renderBlog()');
assert.match(listing.innerHTML, /Cross-Plattform ohne Cross-Plattform/);
assert.match(listing.innerHTML, /2026-09-30/);
assert.match(listing.innerHTML, /href="blog\.html\?post=cross-platform-ohne-cross-platform"/);
assert.doesNotMatch(listing.innerHTML, /<details/);
assert.ok(run('BLOG_POSTS[0].de.sections.length === BLOG_POSTS[0].en.sections.length'));

run("window.location.search = '?post=cross-platform-ohne-cross-platform'; renderBlogArticlePage()");
assert.match(article.innerHTML, /ios-app-setup/);
assert.match(article.innerHTML, /android-app-from-documentation/);
assert.match(article.innerHTML, /Android-Umsetzung von Ripple mit Kotlin und Jetpack Compose/);
assert.match(article.innerHTML, /href="https:\/\/apps\.apple\.com\/us\/app\/ripple-water-tracker\/id6808143149"/);
assert.match(article.innerHTML, /← Zurück zum Blog/);
assert.equal(context.document.title, 'Cross-Plattform ohne Cross-Plattform: Von iOS zu Android mit KI | Stefan Sturm');

run("currentLang = 'en'; renderBlog(); renderBlogArticlePage()");
assert.match(listing.innerHTML, /Cross-platform without a cross-platform framework/);
assert.match(article.innerHTML, /The Android app has been submitted to Google/);
assert.match(article.innerHTML, /available on the App Store/);
assert.match(article.innerHTML, /Back to blog/);
assert.equal(context.document.documentElement.lang, 'en');

// Ensure untrusted content stays escaped on both the teaser and article page.
run(`BLOG_POSTS.push({slug: 'example', date: '2026-09-30',
  de: {title: 'Beispiel <script>', excerpt: 'Einblick', sections: [{heading: 'Funktionen', paragraphs: ['Text & Inhalt'], items: ['Eintrag']}]},
  en: {title: 'Example <script>', excerpt: 'Insight', sections: [{heading: 'Features', paragraphs: ['Text & content'], items: ['Entry']}]}
}); currentLang = 'en'; renderBlog()`);
assert.match(listing.innerHTML, /Example &lt;script&gt;/);
assert.match(listing.innerHTML, /href="blog\.html\?post=example"/);
assert.match(listing.innerHTML, /30 September 2026/);

run("window.location.search = '?post=example'; renderBlogArticlePage()");
assert.match(article.innerHTML, /Example &lt;script&gt;/);
assert.match(article.innerHTML, /Text &amp; content/);
assert.match(article.innerHTML, /<h2>Features<\/h2>/);

const safeContent = run(`renderBlogText('<img src=x onerror=alert(1)> [unsafe](javascript:alert(1)) [safe](https://example.com/?x=1&y=2)')`);
assert.doesNotMatch(safeContent, /<img/);
assert.doesNotMatch(safeContent, /href="javascript:/);
assert.match(safeContent, /&lt;img/);
assert.match(safeContent, /\[unsafe\]\(javascript:alert\(1\)\)/);
assert.match(safeContent, /href="https:\/\/example\.com\/\?x=1&amp;y=2"/);

const standaloneArticle = { innerHTML: '' };
const standaloneContext = vm.createContext({
  localStorage: { getItem: key => key === 'language' ? 'en' : null, setItem() {} },
  URL,
  URLSearchParams,
  window: { location: {
    search: '?post=cross-platform-ohne-cross-platform',
    href: 'https://example.com/blog.html?post=cross-platform-ohne-cross-platform',
  } },
  document: {
    title: '', documentElement: { lang: 'de', setAttribute() {} }, addEventListener() {},
    querySelector: () => null,
    getElementById: id => id === 'blog-article' ? standaloneArticle : null,
  },
});
for (const file of ['js/data.js', 'js/blog.js']) {
  vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), standaloneContext);
}
vm.runInContext('renderBlogArticlePage()', standaloneContext);
assert.match(standaloneArticle.innerHTML, /Cross-platform without a cross-platform framework/);
assert.equal(standaloneContext.document.documentElement.lang, 'en');
assert.equal(standaloneContext.document.title, 'Cross-platform without a cross-platform framework: From iOS to Android with AI | Stefan Sturm');

run("BLOG_POSTS.push({slug: 'untranslated', date: '2026-10-01', de: {title: 'Not ready'}}); renderBlog()");
assert.doesNotMatch(listing.innerHTML, /Not ready/);
run("window.location.search = '?post=missing'; renderBlogArticlePage()");
assert.match(article.innerHTML, /Article not found/);

for (const lang of ['de', 'en']) {
  run(`currentLang = '${lang}'; activeCV = localizeCV(currentLang); renderProjects()`);
  assert.match(projects.innerHTML, /assets\/ripple.png/);
  assert.match(projects.innerHTML, lang === 'de' ? /Funktionen &amp; Besonderheiten/ : /Features &amp; highlights/);
  assert.match(projects.innerHTML, lang === 'de' ? /iPhone, iPad, Apple Watch und Android/ : /iPhone, iPad, Apple Watch, and Android/);
  assert.match(projects.innerHTML, lang === 'de' ? /Kotlin und Jetpack Compose/ : /Kotlin and Jetpack Compose/);
  assert.equal((projects.innerHTML.match(/class="project-features"/g) || []).length, 1);
}
assert.ok(fs.existsSync(path.join(root, 'assets/ripple.png')));
console.log('Blog listing links, standalone articles, localization, safe rendering, and Ripple features passed');
