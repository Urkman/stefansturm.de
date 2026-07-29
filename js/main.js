/**
 * main.js — Renderer and interactions
 * Stefan Sturm Personal Website
 */

let currentLang = localStorage.getItem('language') === 'en' ? 'en' : 'de';
let activeCV = localizeCV(currentLang);

/* ══════════════════════════════════════════════
   DARK MODE
══════════════════════════════════════════════ */

(function initTheme() {
  const stored = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (stored === 'dark' || (!stored && prefersDark)) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();

function setupThemeToggle() {
  const btn = document.getElementById('themeToggle');
  if (!btn) return;

  function applyTheme(dark) {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    localStorage.setItem('theme', dark ? 'dark' : 'light');
    btn.setAttribute('aria-label', dark ? t('themeToggleLight') : t('themeToggle'));
    btn.querySelector('i').className = dark ? 'fas fa-sun' : 'fas fa-moon';
  }

  // Set correct icon on load
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  btn.querySelector('i').className = isDark ? 'fas fa-sun' : 'fas fa-moon';

  btn.addEventListener('click', () => {
    const nowDark = document.documentElement.getAttribute('data-theme') !== 'dark';
    applyTheme(nowDark);
  });
}

/* ══════════════════════════════════════════════
   RENDER HELPERS
══════════════════════════════════════════════ */

/** Escape special HTML characters to prevent XSS. */
function esc(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function t(key) {
  return I18N[currentLang]?.[key] || I18N.de[key] || key;
}

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

function localizeCV(lang) {
  return mergeLocalized(CV, CV_TRANSLATIONS[lang]);
}

function applyStaticTranslations() {
  document.documentElement.lang = currentLang;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.dataset.i18n);
  });
  document.querySelectorAll('[data-i18n-aria-label]').forEach(el => {
    el.setAttribute('aria-label', t(el.dataset.i18nAriaLabel));
  });
  document.querySelectorAll('.language-option').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === currentLang);
    btn.setAttribute('aria-pressed', String(btn.dataset.lang === currentLang));
  });
  const themeBtn = document.getElementById('themeToggle');
  if (themeBtn) {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    themeBtn.setAttribute('aria-label', isDark ? t('themeToggleLight') : t('themeToggle'));
  }
  document.title = currentLang === 'en'
    ? 'Stefan Sturm – Senior iOS Developer'
    : 'Stefan Sturm – Senior iOS Developer';
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', currentLang === 'en'
      ? 'Stefan Sturm – Senior iOS Developer with 15+ years of experience in Swift, SwiftUI and Combine.'
      : 'Stefan Sturm – Senior iOS Developer mit 15+ Jahren Erfahrung in Swift, SwiftUI und Combine.');
  }
}

/** Render an array of tech strings as tag chips. */
function renderTechTags(techArray) {
  if (!techArray || !techArray.length) return '';
  return `<div class="tech-tags">
    ${techArray.map(t => `<span class="tech-tag">${esc(t)}</span>`).join('')}
  </div>`;
}

/* ══════════════════════════════════════════════
   SECTION RENDERERS
══════════════════════════════════════════════ */

function renderHero() {
  const p = activeCV.personal;

  // Bio
  document.getElementById('hero-bio').innerHTML = activeCV.summary
    .replace(/\n/g, ' ')
    .split('<br><br>')[0]
    .trim()
    .replace(/\s+/g, ' ')
    .substring(0, 220) + '…';

  // Social links
  document.getElementById('hero-social').innerHTML = `
    <a href="${esc(p.github)}" target="_blank" rel="noopener noreferrer" class="hero-social-link">
      <i class="fab fa-github" aria-hidden="true"></i> GitHub
    </a>
    <a href="${esc(p.linkedin)}" target="_blank" rel="noopener noreferrer" class="hero-social-link">
      <i class="fab fa-linkedin" aria-hidden="true"></i> LinkedIn
    </a>
    <a href="mailto:${esc(p.email)}" class="hero-social-link">
      <i class="fas fa-envelope" aria-hidden="true"></i> ${esc(p.email)}
    </a>
    <a href="${esc(p.twitter)}" target="_blank" rel="noopener noreferrer" class="hero-social-link">
      <i class="fab fa-x-twitter" aria-hidden="true"></i> X
    </a>`;

  // Stats
  document.getElementById('hero-stats').innerHTML = activeCV.stats
    .map(s => `
      <div class="hero-stat">
        <span class="hero-stat-val">${esc(s.value)}</span>
        <span class="hero-stat-lbl">${esc(s.label)}</span>
      </div>`)
    .join('');
}

function renderAbout() {
  const paras = activeCV.summary.split('<br><br>');
  const parasHtml = paras.map(p => `<p>${p.replace(/\n/g, ' ').trim()}</p>`).join('');

  const langsHtml = activeCV.languages.map(l => `
    <div class="lang-chip">
      <span class="lang-name">${esc(l.name)}</span>
      <span class="lang-level">${esc(l.level)}</span>
      ${l.note ? `<span class="lang-note">${esc(l.note)}</span>` : ''}
    </div>`).join('');

  document.getElementById('about-content').innerHTML =
    `<div class="about-content reveal">${parasHtml}
      <div class="about-langs">${langsHtml}</div>
    </div>`;
}

function renderExperience() {
  const html = activeCV.experience.map(job => {
    const appLink = job.appUrl ? `
      <a href="${esc(job.appUrl)}" target="_blank" rel="noopener noreferrer" class="timeline-app-link">
        <i class="fab fa-app-store-ios" aria-hidden="true"></i>
        ${esc(job.appName || job.appUrl)}
        <i class="fas fa-external-link-alt" aria-hidden="true" style="font-size:.65rem"></i>
      </a>` : '';

    return `
      <li class="timeline-item${job.current ? ' current' : ''} reveal" role="listitem">
        <p class="timeline-period">${esc(job.period)}</p>
        <div class="timeline-card">
          <h3 class="timeline-role">${esc(job.role)}</h3>
          <p class="timeline-company">${esc(job.company)}</p>
          <div class="timeline-meta">
            <span><i class="fas fa-location-dot" aria-hidden="true"></i> ${esc(job.location)}</span>
            ${job.current ? `<span class="text-accent"><i class="fas fa-circle" style="font-size:.45rem;vertical-align:middle" aria-hidden="true"></i> ${esc(t('current'))}</span>` : ''}
          </div>
          ${appLink}
          <p class="timeline-desc">${esc(job.description)}</p>
          ${renderTechTags(job.tech)}
        </div>
      </li>`;
  }).join('');

  document.getElementById('timeline').innerHTML = html;
}

function renderSkills() {
  const html = activeCV.skills.map(cat => `
    <div class="skill-card reveal">
      <h3 class="skill-card-title">
        <i class="${esc(cat.icon)}" aria-hidden="true"></i>
        ${esc(cat.category)}
      </h3>
      <div class="skill-chips">
        ${cat.items.map(item => `
          <span class="skill-chip">
            ${esc(item.name)}
            ${item.years ? `<span class="skill-years">${esc(item.years)}</span>` : ''}
          </span>`).join('')}
      </div>
    </div>`).join('');

  document.getElementById('skills-grid').innerHTML = html;
}

function renderProjects() {
  const html = activeCV.projects.map(proj => {
    const isWebsite = proj.linkType === 'website';
    const linkIcon = isWebsite ? 'fas fa-globe' : 'fab fa-app-store-ios';
    const linkLabel = isWebsite ? t('websiteView') : t('appStoreView');

    return `
    <article class="project-card reveal">
      <div class="project-header">
        <h3 class="project-name">${esc(proj.name)}</h3>
        <span class="project-badge">${esc(proj.period)}</span>
      </div>
      ${proj.url ? `
        <a href="${esc(proj.url)}" target="_blank" rel="noopener noreferrer" class="project-store-link">
          <i class="${linkIcon}" aria-hidden="true"></i>
          ${esc(linkLabel)}
          <i class="fas fa-external-link-alt" style="font-size:.7rem" aria-hidden="true"></i>
        </a>` : ''}
      <p class="project-desc">${esc(proj.description)}</p>
      ${renderTechTags(proj.tech)}
    </article>`;
  }).join('');

  document.getElementById('projects-grid').innerHTML = html;
}

function renderEducation() {
  const html = activeCV.education.map(edu => `
    <div class="edu-card reveal">
      <span class="edu-period">${esc(edu.period)}</span>
      <div>
        <p class="edu-degree">${esc(edu.degree)}</p>
        <p class="edu-inst">${esc(edu.institution)}</p>
      </div>
    </div>`).join('');

  document.getElementById('education-grid').innerHTML = html;
}

function renderContact() {
  const p = activeCV.personal;
  const items = [
    { icon: 'fas fa-envelope',      label: 'E-Mail',    val: `<a href="mailto:${esc(p.email)}" class="contact-val">${esc(p.email)}</a>` },
    { icon: 'fas fa-phone',         label: currentLang === 'en' ? 'Phone' : 'Telefon', val: `<a href="tel:${esc(p.phone)}" class="contact-val">${esc(p.phone)}</a>` },
    { icon: 'fas fa-location-dot',  label: currentLang === 'en' ? 'Address' : 'Adresse', val: esc(p.address) },
    { icon: 'fab fa-github',        label: 'GitHub',    val: `<a href="${esc(p.github)}" target="_blank" rel="noopener noreferrer" class="contact-val">${esc(p.github.replace('https://', ''))}</a>` },
    { icon: 'fab fa-linkedin',      label: 'LinkedIn',  val: `<a href="${esc(p.linkedin)}" target="_blank" rel="noopener noreferrer" class="contact-val">${esc(p.linkedin.replace('https://', ''))}</a>` },
    { icon: 'fab fa-x-twitter',     label: 'X',         val: `<a href="${esc(p.twitter)}" target="_blank" rel="noopener noreferrer" class="contact-val">${esc(p.twitter.replace('https://', ''))}</a>` },
    { icon: 'fas fa-flag',          label: t('cvNationality'), val: esc(p.nationality) },
  ];

  document.getElementById('contact-layout').innerHTML = items.map(item => `
    <div class="contact-card reveal">
      <div class="contact-icon" aria-hidden="true"><i class="${esc(item.icon)}"></i></div>
      <div>
        <p class="contact-lbl">${esc(item.label)}</p>
        <p class="contact-val">${item.val}</p>
      </div>
    </div>`).join('');
}

function buildCvMarkdown() {
  const p = activeCV.personal;
  const lines = [];

  // Header
  lines.push(`# ${p.name}`);
  lines.push(`**${p.title}**`);
  lines.push('');
  lines.push(`📧 ${p.email} | 📞 ${p.phone} | 🌍 ${p.address}`);
  lines.push(`🔗 ${p.github} | ${p.linkedin} | ${p.twitter}`);
  lines.push('');

  // Profile
  lines.push(`## ${t('markdownProfile')}`);
  lines.push(activeCV.summary.replace(/<br><br>/g, '\n\n').replace(/\n/g, ' ').trim());
  lines.push('');

  // Experience
  lines.push(`## ${t('cvExperience')}`);
  lines.push('');
  activeCV.experience.forEach(job => {
    lines.push(`### ${job.role}`);
    lines.push(`**${job.company}**${job.location ? ` · ${job.location}` : ''} | ${job.period}`);
    if (job.appName) lines.push(`*${job.appName}*`);
    lines.push('');
    lines.push(job.description);
    if (job.tech && job.tech.length) lines.push(`\n> ${job.tech.join(' · ')}`);
    lines.push('');
  });

  // Projects
  lines.push(`## ${t('cvProjects')}`);
  lines.push('');
  activeCV.projects.forEach(proj => {
    lines.push(`### ${proj.name} (${proj.period})`);
    lines.push(proj.description);
    if (proj.tech && proj.tech.length) lines.push(`\n> ${proj.tech.join(' · ')}`);
    lines.push('');
  });

  // Skills
  lines.push(`## ${t('cvSkills')}`);
  lines.push('');
  activeCV.skills.forEach(cat => {
    lines.push(`**${cat.category}:** ${cat.items.map(i => i.name + (i.years ? ` (${i.years})` : '')).join(', ')}`);
  });
  lines.push('');

  // Education
  lines.push(`## ${t('cvEducation')}`);
  lines.push('');
  activeCV.education.forEach(e => {
    lines.push(`- **${e.degree}** – ${e.institution} (${e.period})`);
  });
  lines.push('');

  // Languages
  lines.push(`## ${t('cvLanguages')}`);
  lines.push('');
  activeCV.languages.forEach(l => {
    lines.push(`- **${l.name}** – ${l.level}${l.note ? ` (${l.note})` : ''}`);
  });
  lines.push('');

  return lines.join('\n');
}

function downloadMarkdown() {
  const md   = buildCvMarkdown();
  const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = currentLang === 'en' ? 'Stefan_Sturm_Resume.md' : 'Stefan_Sturm_CV.md';
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 10000);
}

/* ══════════════════════════════════════════════
   NAVIGATION
══════════════════════════════════════════════ */

function initNav() {
  const header  = document.getElementById('header');
  const toggle  = document.getElementById('navToggle');
  const menu    = document.getElementById('navMenu');
  const links   = menu.querySelectorAll('.nav-link');

  // Scroll-based header shadow
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
    updateActiveLink();
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile toggle
  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.querySelector('i').className = open ? 'fas fa-times' : 'fas fa-bars';
  });

  // Close menu on link click
  links.forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.querySelector('i').className = 'fas fa-bars';
    });
  });

  // Close menu on outside click
  document.addEventListener('click', e => {
    if (menu.classList.contains('open') && !header.contains(e.target)) {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.querySelector('i').className = 'fas fa-bars';
    }
  });
}

function updateActiveLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  let current = '';

  sections.forEach(section => {
    const top = section.offsetTop - (window.innerHeight / 3);
    if (window.scrollY >= top) current = section.id;
  });

  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}

function renderAll() {
  activeCV = localizeCV(currentLang);
  applyStaticTranslations();
  renderHero();
  renderAbout();
  renderExperience();
  renderSkills();
  renderProjects();
  renderEducation();
  renderContact();

  const fyEl = document.getElementById('footer-year');
  if (fyEl) fyEl.textContent = new Date().getFullYear();
}

function setupLanguageToggle() {
  document.querySelectorAll('.language-option').forEach(btn => {
    btn.addEventListener('click', () => {
      const nextLang = btn.dataset.lang === 'en' ? 'en' : 'de';
      if (nextLang === currentLang) return;
      currentLang = nextLang;
      localStorage.setItem('language', currentLang);
      renderAll();
      requestAnimationFrame(() => initReveal());
    });
  });
}

/* ══════════════════════════════════════════════
   SCROLL REVEAL (Intersection Observer)
══════════════════════════════════════════════ */

function initReveal() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    // Make all elements visible immediately
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger children in the same parent
        const siblings = entry.target.parentElement.querySelectorAll('.reveal:not(.visible)');
        let delay = 0;
        siblings.forEach(sib => {
          if (sib === entry.target || sib.getBoundingClientRect().top < window.innerHeight + 100) {
            sib.style.transitionDelay = `${delay}ms`;
            sib.classList.add('visible');
            delay += 60;
            observer.unobserve(sib);
          }
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* ══════════════════════════════════════════════
   INIT
══════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  renderAll();

  setupPdfExportMenus();

  // Wire Markdown download buttons
  ['downloadMdBtn', 'heroDownloadMdBtn'].forEach(id => {
    const btn = document.getElementById(id);
    if (btn) btn.addEventListener('click', downloadMarkdown);
  });

  // Nav behaviour
  initNav();
  setupThemeToggle();
  setupLanguageToggle();

  // Scroll-reveal (runs after render so .reveal elements exist)
  requestAnimationFrame(() => initReveal());
});
