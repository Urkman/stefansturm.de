/**
 * main.js — Renderer, interactions & PDF export
 * Stefan Sturm Personal Website
 */

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
    btn.setAttribute('aria-label', dark ? 'Light mode umschalten' : 'Dark mode umschalten');
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
  const p = CV.personal;

  // Bio
  document.getElementById('hero-bio').innerHTML = CV.summary
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
  document.getElementById('hero-stats').innerHTML = CV.stats
    .map(s => `
      <div class="hero-stat">
        <span class="hero-stat-val">${esc(s.value)}</span>
        <span class="hero-stat-lbl">${esc(s.label)}</span>
      </div>`)
    .join('');
}

function renderAbout() {
  const paras = CV.summary.split('<br><br>');
  const parasHtml = paras.map(p => `<p>${p.replace(/\n/g, ' ').trim()}</p>`).join('');

  const langsHtml = CV.languages.map(l => `
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
  const html = CV.experience.map(job => {
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
            ${job.current ? '<span class="text-accent"><i class="fas fa-circle" style="font-size:.45rem;vertical-align:middle" aria-hidden="true"></i> Aktuell</span>' : ''}
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
  const html = CV.skills.map(cat => `
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
  const html = CV.projects.map(proj => `
    <article class="project-card reveal">
      <div class="project-header">
        <h3 class="project-name">${esc(proj.name)}</h3>
        <span class="project-badge">${esc(proj.period)}</span>
      </div>
      ${proj.url ? `
        <a href="${esc(proj.url)}" target="_blank" rel="noopener noreferrer" class="project-store-link">
          <i class="fab fa-app-store-ios" aria-hidden="true"></i>
          Im App Store ansehen
          <i class="fas fa-external-link-alt" style="font-size:.7rem" aria-hidden="true"></i>
        </a>` : ''}
      <p class="project-desc">${esc(proj.description)}</p>
      ${renderTechTags(proj.tech)}
    </article>`).join('');

  document.getElementById('projects-grid').innerHTML = html;
}

function renderEducation() {
  const html = CV.education.map(edu => `
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
  const p = CV.personal;
  const items = [
    { icon: 'fas fa-envelope',      label: 'E-Mail',    val: `<a href="mailto:${esc(p.email)}" class="contact-val">${esc(p.email)}</a>` },
    { icon: 'fas fa-phone',         label: 'Telefon',   val: `<a href="tel:${esc(p.phone)}" class="contact-val">${esc(p.phone)}</a>` },
    { icon: 'fas fa-location-dot',  label: 'Adresse',   val: esc(p.address) },
    { icon: 'fab fa-github',        label: 'GitHub',    val: `<a href="${esc(p.github)}" target="_blank" rel="noopener noreferrer" class="contact-val">${esc(p.github.replace('https://', ''))}</a>` },
    { icon: 'fab fa-linkedin',      label: 'LinkedIn',  val: `<a href="${esc(p.linkedin)}" target="_blank" rel="noopener noreferrer" class="contact-val">${esc(p.linkedin.replace('https://', ''))}</a>` },
    { icon: 'fab fa-x-twitter',     label: 'X',         val: `<a href="${esc(p.twitter)}" target="_blank" rel="noopener noreferrer" class="contact-val">${esc(p.twitter.replace('https://', ''))}</a>` },
    { icon: 'fas fa-flag',          label: 'Nationalität', val: esc(p.nationality) },
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

function renderAI() {
  const ai = CV.ai;

  const modelsHtml = ai.modelMatrix.map(m => `
    <div class="ai-model-card reveal">
      <div class="ai-model-header">
        <div class="ai-model-icon" aria-hidden="true"><i class="${esc(m.icon)}"></i></div>
        <span class="ai-model-category">${esc(m.category)}</span>
      </div>
      <p class="ai-model-desc">${esc(m.desc)}</p>
      <div class="ai-model-tags">
        ${m.models.map(model => `<span class="ai-model-tag">${esc(model)}</span>`).join('')}
      </div>
    </div>`).join('');

  const toolsHtml = ai.tools.map(t => `
    <div class="ai-tool-card reveal">
      <div class="ai-tool-icon" aria-hidden="true"><i class="${esc(t.icon)}"></i></div>
      <div>
        <p class="ai-tool-name">${esc(t.name)}</p>
        <p class="ai-tool-desc">${esc(t.desc)}</p>
      </div>
    </div>`).join('');

  document.getElementById('ai-content').innerHTML = `
    <p class="ai-intro reveal">${esc(ai.intro)}</p>

    <h3 class="ai-sub-title reveal">
      <i class="fas fa-microchip" aria-hidden="true"></i> Model-Matrix: Welches Modell für was
    </h3>
    <div class="ai-models-grid">${modelsHtml}</div>

    <h3 class="ai-sub-title reveal">
      <i class="fas fa-toolbox" aria-hidden="true"></i> Tool-Stack
    </h3>
    <div class="ai-tools-grid">${toolsHtml}</div>`;
}

/* ══════════════════════════════════════════════
   PDF / CV DOWNLOAD
   Builds a clean A4 CV document from CV data,
   then exports via html2pdf.js
══════════════════════════════════════════════ */

function buildCvHtml() {
  const p = CV.personal;

  const S = {
    page:       'display:flex;width:210mm;min-height:297mm;font-family:Helvetica Neue,Arial,sans-serif;font-size:10pt;color:#111827;background:#fff;',
    sidebar:    'width:68mm;min-height:297mm;background:linear-gradient(180deg,#0056CC 0%,#007AFF 100%);color:#fff;padding:20pt 14pt;flex-shrink:0;',
    main:       'flex:1;padding:24pt 18pt;overflow:hidden;min-width:0;',
    h2sb:       'font-size:7.5pt;text-transform:uppercase;letter-spacing:.08em;font-weight:700;color:rgba(255,255,255,.65);border-bottom:1px solid rgba(255,255,255,.28);padding-bottom:4pt;margin-bottom:9pt;margin-top:16pt;',
    h2mn:       'font-size:7.5pt;text-transform:uppercase;letter-spacing:.08em;font-weight:700;color:#007AFF;border-bottom:2px solid #e5f0ff;padding-bottom:4pt;margin-bottom:10pt;',
    section:    'margin-bottom:16pt;',
    contactRow: 'display:flex;align-items:flex-start;gap:5pt;font-size:8pt;margin-bottom:5pt;color:rgba(255,255,255,.88);word-break:break-all;',
    skillRow:   'display:flex;justify-content:space-between;font-size:8pt;margin-bottom:4pt;padding-bottom:4pt;border-bottom:1px solid rgba(255,255,255,.12);',
    langRow:    'display:flex;justify-content:space-between;font-size:8pt;margin-bottom:4pt;',
  };

  const topSkills = CV.skills.flatMap(c => c.items).filter(s => s.years);
  const profileText = CV.summary.replace(/<br><br>/g, ' ').replace(/\n/g, ' ').trim();

  const skillsHtml = topSkills.map(s =>
    `<div style="${S.skillRow}"><span>${esc(s.name)}</span><span style="opacity:.75;">${esc(s.years)}</span></div>`
  ).join('');

  const langsHtml = CV.languages.map(l =>
    `<div style="${S.langRow}"><span>${esc(l.name)}</span><span style="opacity:.75;">${esc(l.level)}${l.note ? ' · ' + esc(l.note) : ''}</span></div>`
  ).join('');

  // Skills grid: 2-column layout of all categories
  const kenntnisseHtml = `<div style="display:grid;grid-template-columns:1fr 1fr;gap:8pt;">` +
    CV.skills.map(cat => `
      <div style="page-break-inside:avoid;">
        <p style="font-size:7.5pt;font-weight:700;color:#374151;margin-bottom:3pt;">${esc(cat.category)}</p>
        <p style="font-size:7.5pt;color:#6b7280;line-height:1.6;">${cat.items.map(i => esc(i.name)).join(' · ')}</p>
      </div>`).join('') + `</div>`;

  // AI section: intro + model matrix + tools
  const aiHtml = `
    <p style="font-size:8pt;color:#4b5563;line-height:1.6;margin-bottom:8pt;">${esc(CV.ai.intro)}</p>
    <p style="font-size:7.5pt;font-weight:700;color:#374151;margin-bottom:5pt;">Model-Matrix</p>
    <div style="margin-bottom:8pt;">
      ${CV.ai.modelMatrix.map(m => `
        <div style="display:flex;gap:6pt;margin-bottom:5pt;padding-bottom:5pt;border-bottom:1px solid #f3f4f6;">
          <p style="font-size:7.5pt;font-weight:700;color:#374151;min-width:110pt;flex-shrink:0;">${esc(m.category)}</p>
          <div>
            <p style="font-size:7.5pt;color:#007AFF;font-weight:600;margin-bottom:1pt;">${m.models.map(esc).join(' · ')}</p>
            <p style="font-size:7pt;color:#6b7280;line-height:1.4;">${esc(m.desc)}</p>
          </div>
        </div>`).join('')}
    </div>
    <p style="font-size:7.5pt;font-weight:700;color:#374151;margin-bottom:3pt;">Tool-Stack</p>
    <p style="font-size:7.5pt;color:#6b7280;line-height:1.6;">${CV.ai.tools.map(t => esc(t.name)).join(' · ')}</p>`;

  const expHtml = CV.experience.map(job => `
    <div style="margin-bottom:11pt;page-break-inside:avoid;">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:6pt;margin-bottom:1pt;">
        <strong style="font-size:9pt;color:#111827;line-height:1.3;">${esc(job.role)}</strong>
        <span style="font-size:7.5pt;color:#007AFF;white-space:nowrap;font-weight:700;flex-shrink:0;">${esc(job.period)}</span>
      </div>
      <p style="font-size:8.5pt;color:#007AFF;font-weight:600;margin-bottom:1pt;">${esc(job.company)}${job.location ? ` · ${esc(job.location)}` : ''}</p>
      ${job.appName ? `<p style="font-size:7.5pt;color:#6b7280;margin-bottom:2pt;">${esc(job.appName)}</p>` : ''}
      <p style="font-size:8pt;color:#4b5563;line-height:1.5;margin-bottom:3pt;">${esc(job.description)}</p>
      <p style="font-size:7pt;color:#9ca3af;line-height:1.4;">${job.tech ? job.tech.join(' · ') : ''}</p>
    </div>`).join('');

  const projHtml = CV.projects.map(proj => `
    <div style="margin-bottom:9pt;page-break-inside:avoid;">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:6pt;margin-bottom:1pt;">
        <strong style="font-size:8.5pt;color:#111827;">${esc(proj.name)}</strong>
        <span style="font-size:7.5pt;color:#007AFF;white-space:nowrap;font-weight:700;flex-shrink:0;">${esc(proj.period)}</span>
      </div>
      <p style="font-size:8pt;color:#4b5563;line-height:1.5;">${esc(proj.description)}</p>
    </div>`).join('');

  const eduHtml = CV.education.map(e => `
    <div style="margin-bottom:7pt;page-break-inside:avoid;">
      <strong style="font-size:8.5pt;color:#111827;display:block;">${esc(e.degree)}</strong>
      <span style="font-size:7.5pt;color:#6b7280;">${esc(e.institution)} · ${esc(e.period)}</span>
    </div>`).join('');

  return `<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<title>CV – ${esc(p.name)}</title>
<style>
  *{margin:0;padding:0;box-sizing:border-box;}
  body{background:#fff;}
  @media print{
    @page{size:A4;margin:0;}
    body{-webkit-print-color-adjust:exact;print-color-adjust:exact;}
    #printBtn{display:none!important;}
  }
  #printBtn{
    position:fixed;bottom:20px;right:20px;z-index:9999;
    background:#007AFF;color:#fff;border:none;border-radius:10px;
    padding:10px 20px;font-size:14px;font-weight:600;cursor:pointer;
    box-shadow:0 4px 16px rgba(0,122,255,.4);
  }
  #printBtn:hover{background:#0056CC;}
</style>
</head>
<body>
<button id="printBtn" onclick="window.print()">Als PDF speichern</button>
<div style="${S.page}">

  <div style="${S.sidebar}">
    <p style="font-size:20pt;font-weight:800;letter-spacing:-.02em;line-height:1.1;margin-bottom:3pt;">${esc(p.name)}</p>
    <p style="font-size:10pt;font-weight:500;color:rgba(255,255,255,.85);margin-bottom:14pt;">${esc(p.title)}</p>

    <h2 style="${S.h2sb}margin-top:0;">Kontakt</h2>
    <div style="${S.contactRow}"><span>✉</span><span>${esc(p.email)}</span></div>
    <div style="${S.contactRow}"><span>☎</span><span>${esc(p.phone)}</span></div>
    <div style="${S.contactRow}"><span>⌂</span><span>${esc(p.address)}</span></div>
    <div style="${S.contactRow}"><span>⚙</span><span>${esc(p.github.replace('https://', ''))}</span></div>
    <div style="${S.contactRow}"><span>in</span><span>${esc(p.linkedin.replace('https://www.', ''))}</span></div>

    <h2 style="${S.h2sb}">Kernkompetenzen</h2>
    ${skillsHtml}

    <h2 style="${S.h2sb}">Sprachen</h2>
    ${langsHtml}

    <h2 style="${S.h2sb}">Persönlich</h2>
    <div style="font-size:8pt;color:rgba(255,255,255,.88);line-height:1.7;">
      <p>Nationalität: ${esc(p.nationality)}</p>
      <p>Geburtsort: ${esc(p.birthplace)}</p>
      <p>Familienstand: ${esc(p.maritalStatus)}</p>
    </div>
  </div>

  <div style="${S.main}">
    <div style="${S.section}">
      <h2 style="${S.h2mn}margin-top:0;">Profil</h2>
      <p style="font-size:8pt;color:#4b5563;line-height:1.65;">${esc(profileText)}</p>
    </div>
    <div style="${S.section}">
      <h2 style="${S.h2mn}">Beruflicher Werdegang</h2>
      ${expHtml}
    </div>
    <div style="${S.section}">
      <h2 style="${S.h2mn}">Projekte</h2>
      ${projHtml}
    </div>
    <div style="${S.section}">
      <h2 style="${S.h2mn}">Kenntnisse</h2>
      ${kenntnisseHtml}
    </div>
    <div style="${S.section}">
      <h2 style="${S.h2mn}">AI &amp; Agentic Development</h2>
      ${aiHtml}
    </div>
    <div style="${S.section}">
      <h2 style="${S.h2mn}">Ausbildung</h2>
      ${eduHtml}
    </div>
  </div>

</div>
<script>
  // Auto-trigger print after a short delay so the page renders first
  window.addEventListener('load', function() {
    setTimeout(function() { window.print(); }, 600);
  });
<\/script>
</body>
</html>`;
}

function downloadCv() {
  const html = buildCvHtml();
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url  = URL.createObjectURL(blob);
  const win  = window.open(url, '_blank');
  if (!win) {
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Stefan_Sturm_CV.html';
    a.click();
  }
  setTimeout(() => URL.revokeObjectURL(url), 30000);
}

function buildCvMarkdown() {
  const p = CV.personal;
  const lines = [];

  // Header
  lines.push(`# ${p.name}`);
  lines.push(`**${p.title}**`);
  lines.push('');
  lines.push(`📧 ${p.email} | 📞 ${p.phone} | 🌍 ${p.address}`);
  lines.push(`🔗 ${p.github} | ${p.linkedin} | ${p.twitter}`);
  lines.push('');

  // Profil
  lines.push('## Profil');
  lines.push(CV.summary.replace(/<br><br>/g, '\n\n').replace(/\n/g, ' ').trim());
  lines.push('');

  // Beruflicher Werdegang
  lines.push('## Beruflicher Werdegang');
  lines.push('');
  CV.experience.forEach(job => {
    lines.push(`### ${job.role}`);
    lines.push(`**${job.company}**${job.location ? ` · ${job.location}` : ''} | ${job.period}`);
    if (job.appName) lines.push(`*${job.appName}*`);
    lines.push('');
    lines.push(job.description);
    if (job.tech && job.tech.length) lines.push(`\n> ${job.tech.join(' · ')}`);
    lines.push('');
  });

  // Projekte
  lines.push('## Projekte');
  lines.push('');
  CV.projects.forEach(proj => {
    lines.push(`### ${proj.name} (${proj.period})`);
    lines.push(proj.description);
    if (proj.tech && proj.tech.length) lines.push(`\n> ${proj.tech.join(' · ')}`);
    lines.push('');
  });

  // Kenntnisse
  lines.push('## Kenntnisse');
  lines.push('');
  CV.skills.forEach(cat => {
    lines.push(`**${cat.category}:** ${cat.items.map(i => i.name + (i.years ? ` (${i.years})` : '')).join(', ')}`);
  });
  lines.push('');

  // AI & Agentic Development
  lines.push('## AI & Agentic Development');
  lines.push('');
  lines.push(CV.ai.intro);
  lines.push('');
  lines.push('### Model-Matrix');
  lines.push('');
  CV.ai.modelMatrix.forEach(m => {
    lines.push(`**${m.category}:** ${m.models.join(', ')}`);
    lines.push(m.desc);
    lines.push('');
  });
  lines.push('### Tool-Stack');
  lines.push('');
  CV.ai.tools.forEach(t => {
    lines.push(`**${t.name}:** ${t.desc}`);
    lines.push('');
  });

  // Ausbildung
  lines.push('## Ausbildung');
  lines.push('');
  CV.education.forEach(e => {
    lines.push(`- **${e.degree}** – ${e.institution} (${e.period})`);
  });
  lines.push('');

  // Sprachen
  lines.push('## Sprachen');
  lines.push('');
  CV.languages.forEach(l => {
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
  a.download = 'Stefan_Sturm_CV.md';
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
  // Render all sections
  renderHero();
  renderAbout();
  renderExperience();
  renderSkills();
  renderProjects();
  renderAI();
  renderEducation();
  renderContact();

  // Footer year
  const fyEl = document.getElementById('footer-year');
  if (fyEl) fyEl.textContent = new Date().getFullYear();

  // Wire CV download buttons
  ['downloadCvBtn', 'heroDownloadBtn'].forEach(id => {
    const btn = document.getElementById(id);
    if (btn) btn.addEventListener('click', downloadCv);
  });

  // Wire Markdown download buttons
  ['downloadMdBtn', 'heroDownloadMdBtn'].forEach(id => {
    const btn = document.getElementById(id);
    if (btn) btn.addEventListener('click', downloadMarkdown);
  });

  // Nav behaviour
  initNav();
  setupThemeToggle();

  // Scroll-reveal (runs after render so .reveal elements exist)
  requestAnimationFrame(() => initReveal());
});
