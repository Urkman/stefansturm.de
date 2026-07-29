/**
 * cv-export.js - Professional two-page PDF export
 * Stefan Sturm Personal Website
 */

function cvText(value) {
  return String(value ?? '')
    .replace(/[–—‑]/g, '-')
    .replace(/\s+/g, ' ')
    .trim();
}

function cvEsc(value) {
  return esc(cvText(value));
}

function findCvSkill(name) {
  return activeCV.skills
    .flatMap(category => category.items)
    .find(item => item.name === name);
}

function cvTech(items, limit) {
  return (items || []).slice(0, limit).map(cvEsc).join(' · ');
}

function getCvPhotoDataUrl() {
  try {
    const image = document.getElementById('profileImg');
    if (!image || !image.complete || !image.naturalWidth || !image.naturalHeight) return '';

    const canvas = document.createElement('canvas');
    canvas.width = 320;
    canvas.height = 320;
    const context = canvas.getContext('2d');
    const sourceSize = Math.min(image.naturalWidth, image.naturalHeight);
    const sourceX = (image.naturalWidth - sourceSize) / 2;
    const sourceY = (image.naturalHeight - sourceSize) / 2;
    context.drawImage(image, sourceX, sourceY, sourceSize, sourceSize, 0, 0, 320, 320);
    return canvas.toDataURL('image/jpeg', 0.88);
  } catch {
    return '';
  }
}

function closePdfExportMenu(menu, restoreFocus = false) {
  const trigger = menu.querySelector('.pdf-export-trigger');
  const options = menu.querySelector('.pdf-export-options');
  options.hidden = true;
  trigger.setAttribute('aria-expanded', 'false');
  if (restoreFocus) trigger.focus();
}

function openPdfExportMenu(menu, focusFirst = false) {
  document.querySelectorAll('[data-pdf-menu]').forEach(otherMenu => {
    if (otherMenu !== menu) closePdfExportMenu(otherMenu);
  });
  const trigger = menu.querySelector('.pdf-export-trigger');
  const options = menu.querySelector('.pdf-export-options');
  options.hidden = false;
  trigger.setAttribute('aria-expanded', 'true');
  if (focusFirst) options.querySelector('.pdf-export-option').focus();
}

function setupPdfExportMenus() {
  const menus = Array.from(document.querySelectorAll('[data-pdf-menu]'));

  menus.forEach(menu => {
    const trigger = menu.querySelector('.pdf-export-trigger');
    const optionsPanel = menu.querySelector('.pdf-export-options');
    const options = Array.from(menu.querySelectorAll('.pdf-export-option'));

    trigger.addEventListener('click', event => {
      event.stopPropagation();
      if (optionsPanel.hidden) openPdfExportMenu(menu);
      else closePdfExportMenu(menu);
    });

    trigger.addEventListener('keydown', event => {
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        openPdfExportMenu(menu, true);
      }
      if (event.key === 'Escape') closePdfExportMenu(menu);
    });

    options.forEach((option, index) => {
      option.addEventListener('click', () => {
        closePdfExportMenu(menu);
        downloadCv(option.dataset.cvExport);
      });
      option.addEventListener('keydown', event => {
        if (event.key === 'Escape') {
          event.preventDefault();
          closePdfExportMenu(menu, true);
        }
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
          event.preventDefault();
          const direction = event.key === 'ArrowDown' ? 1 : -1;
          const nextIndex = (index + direction + options.length) % options.length;
          options[nextIndex].focus();
        }
      });
    });
  });

  document.addEventListener('click', event => {
    menus.forEach(menu => {
      if (!menu.contains(event.target)) closePdfExportMenu(menu);
    });
  });
}

function renderCvSectionTitle(title) {
  return `<h2 class="cv-section-title">${cvEsc(title)}</h2>`;
}

function renderCvHeader(personal, photoDataUrl) {
  const portrait = photoDataUrl
    ? `<img class="cv-photo" src="${esc(photoDataUrl)}" alt="">`
    : '<div class="cv-photo cv-photo-fallback">SS</div>';
  const languages = activeCV.languages
    .map(language => `${cvEsc(language.name)} ${cvEsc(language.level)}`)
    .join(' | ');

  return `<header class="cv-header">
    ${portrait}
    <div class="cv-identity">
      <h1>${cvEsc(personal.name)}</h1>
      <p class="cv-title">${cvEsc(personal.title)}</p>
      <p class="cv-meta">${cvEsc(t('cvLocation'))} | ${cvEsc(personal.email)} | ${cvEsc(personal.phone)}</p>
      <p class="cv-meta">${cvEsc(personal.github.replace('https://', ''))} | ${cvEsc(personal.linkedin.replace('https://www.', ''))}</p>
      <p class="cv-meta">${languages} | ${cvEsc(t('cvNationality'))}: ${cvEsc(personal.nationality)}</p>
    </div>
  </header>`;
}

function renderCvRole(job, includeTech) {
  return `<article class="cv-role" data-company="${cvEsc(job.company)}">
    <div class="cv-role-heading">
      <div>
        <h3>${cvEsc(job.role)}</h3>
        <p class="cv-company">${cvEsc(job.company)}${job.location ? ` - ${cvEsc(job.location)}` : ''}</p>
      </div>
      <p class="cv-period">${cvEsc(job.period)}</p>
    </div>
    ${job.appName ? `<p class="cv-app">${cvEsc(job.appName)}</p>` : ''}
    <p class="cv-copy">${cvEsc(job.description)}</p>
    ${includeTech && job.tech?.length ? `<p class="cv-tech">${cvTech(job.tech, 8)}</p>` : ''}
  </article>`;
}

function renderCvHistoryRow(job) {
  return `<div class="cv-history-row" data-company="${cvEsc(job.company)}">
    <span>${cvEsc(job.period)}</span>
    <strong>${cvEsc(job.company)}</strong>
    <span>${cvEsc(job.role)}</span>
  </div>`;
}

function renderCvProject(project) {
  return `<article class="cv-project">
    <div class="cv-project-heading">
      <h3>${cvEsc(project.name)}</h3>
      <span>${cvEsc(project.period)}</span>
    </div>
    <p>${cvEsc(project.cvDescription || project.description)}</p>
    <p class="cv-tech">${cvTech(project.tech, 6)}</p>
  </article>`;
}

function renderCvSkillGroup(category) {
  return `<div class="cv-skill-group">
    <h3>${cvEsc(category.category)}</h3>
    <p>${category.items.map(item => cvEsc(item.name)).join(', ')}</p>
  </div>`;
}

function renderCvEducationRow(education) {
  return `<div class="cv-education-row">
    <strong>${cvEsc(education.degree)}</strong>
    <span>${cvEsc(education.institution)} | ${cvEsc(education.period)}</span>
  </div>`;
}

function renderCvFooter(page) {
  return `<footer class="cv-footer">
    <span>Stefan Sturm - CV</span>
    <span>${cvEsc(t('cvPage'))} ${page} / 2</span>
  </footer>`;
}

const CV_PRINT_STYLES = `
  @page{size:A4;margin:0}
  *{box-sizing:border-box}
  html,body{margin:0;padding:0}
  body{font-family:-apple-system,BlinkMacSystemFont,"Helvetica Neue",Arial,sans-serif;color:#182230;background:#eef2f6}
  p,h1,h2,h3{margin:0}
  .cv-page{position:relative;width:210mm;height:297mm;padding:10mm 12mm 13mm;background:#fff;overflow:hidden;break-after:page}
  .cv-page:last-of-type{break-after:auto}
  .cv-print-button{position:fixed;right:18px;bottom:18px;z-index:20;border:0;border-radius:6px;padding:10px 16px;background:#0070e0;color:#fff;font:600 14px -apple-system,BlinkMacSystemFont,"Helvetica Neue",Arial,sans-serif;cursor:pointer}
  .cv-header{display:grid;grid-template-columns:28mm 1fr;gap:7mm;align-items:center;padding-bottom:5mm;border-bottom:.5mm solid #d9e7f5}
  .cv-photo{width:28mm;height:28mm;border-radius:50%;object-fit:cover;border:1mm solid #e5f1ff}
  .cv-photo-fallback{display:flex;align-items:center;justify-content:center;background:#0070e0;color:#fff;font-size:20pt;font-weight:800}
  .cv-identity h1{font-size:23pt;line-height:1.05;color:#0f172a}
  .cv-title{margin-top:1mm;font-size:11pt;font-weight:650;color:#0070e0}
  .cv-meta{margin-top:1.2mm;font-size:7.3pt;line-height:1.25;color:#526071}
  .cv-intro-grid{display:grid;grid-template-columns:1.35fr 1fr;gap:7mm;padding:5mm 0 4mm}
  .cv-section-title{margin-bottom:2.5mm;padding-bottom:1.5mm;border-bottom:.45mm solid #d9e7f5;color:#0070e0;font-size:9pt;line-height:1;text-transform:uppercase;letter-spacing:0}
  .cv-profile>p{font-size:8pt;line-height:1.45;color:#3f4d5f}
  .cv-core-grid{display:grid;grid-template-columns:1fr 1fr;gap:1.5mm 3mm}
  .cv-core-skill{display:flex;justify-content:space-between;gap:2mm;padding-bottom:1mm;border-bottom:.2mm solid #e7edf4;font-size:7pt;color:#526071}
  .cv-core-skill strong{color:#253244}
  .cv-role{margin-bottom:3.2mm;break-inside:avoid}
  .cv-role-heading{display:flex;justify-content:space-between;gap:5mm;align-items:flex-start}
  .cv-role h3{font-size:8.6pt;line-height:1.2;color:#152033}
  .cv-company{margin-top:.5mm;font-size:7.8pt;font-weight:650;color:#0070e0}
  .cv-period{flex-shrink:0;font-size:7pt;font-weight:700;color:#0070e0}
  .cv-app{margin-top:.5mm;font-size:6.9pt;color:#697586}
  .cv-copy{margin-top:1mm;font-size:7.35pt;line-height:1.34;color:#465466}
  .cv-tech{margin-top:1mm;font-size:6.4pt;line-height:1.28;color:#8793a3}
  .cv-recent .cv-role{margin-bottom:5mm}
  .cv-recent .cv-role h3{font-size:9pt}
  .cv-recent .cv-company{font-size:8.1pt}
  .cv-recent .cv-period{font-size:7.2pt}
  .cv-recent .cv-app{font-size:7.2pt}
  .cv-recent .cv-copy{margin-top:1.2mm;font-size:8pt;line-height:1.4}
  .cv-recent .cv-tech{margin-top:1.2mm;font-size:6.7pt;line-height:1.32}
  .cv-page-header{display:flex;justify-content:space-between;align-items:baseline;padding-bottom:3mm;border-bottom:.5mm solid #d9e7f5}
  .cv-page-header strong{font-size:13pt;color:#152033}
  .cv-page-header span{font-size:8pt;color:#0070e0}
  .cv-page-two-top{display:grid;grid-template-columns:1.1fr .9fr;gap:6mm;padding-top:4mm}
  .cv-earlier-column .cv-role{margin-bottom:2.8mm}
  .cv-earlier-column .cv-copy{font-size:7.4pt;line-height:1.35}
  .cv-additional{margin-top:2mm}
  .cv-additional>h3{margin-bottom:1.4mm;font-size:7.5pt;color:#253244}
  .cv-history-row{display:grid;grid-template-columns:24mm 28mm 1fr;gap:2mm;padding:1.1mm 0;border-top:.2mm solid #e7edf4;font-size:6.5pt;line-height:1.2;color:#596779}
  .cv-history-row strong{color:#253244}
  .cv-project{margin-bottom:3mm;padding:2.5mm 3mm;border:.25mm solid #dfe7f0;border-radius:2mm;break-inside:avoid}
  .cv-project-heading{display:flex;justify-content:space-between;gap:3mm;align-items:flex-start}
  .cv-project h3{font-size:7.7pt;line-height:1.2;color:#152033}
  .cv-project-heading span{flex-shrink:0;font-size:6.4pt;font-weight:700;color:#0070e0}
  .cv-project>p:not(.cv-tech){margin-top:1mm;font-size:7.2pt;line-height:1.34;color:#526071}
  .cv-project .cv-tech{font-size:6.6pt}
  .cv-skills{margin-top:3mm}
  .cv-skills-grid{display:grid;grid-template-columns:1fr 1fr;gap:2.7mm 6mm}
  .cv-skill-group{break-inside:avoid}
  .cv-skill-group h3{margin-bottom:.7mm;font-size:7.4pt;color:#253244}
  .cv-skill-group p{font-size:6.9pt;line-height:1.34;color:#697586}
  .cv-education{margin-top:3.5mm}
  .cv-education-grid{display:grid;grid-template-columns:1fr 1fr;gap:1.7mm 6mm}
  .cv-education-row{display:flex;justify-content:space-between;gap:3mm;border-bottom:.2mm solid #e7edf4;padding-bottom:1mm;font-size:6.8pt;line-height:1.25;break-inside:avoid}
  .cv-education-row strong{color:#253244}
  .cv-education-row span{text-align:right;color:#697586}
  .cv-role,.cv-project,.cv-education-row,.cv-skill-group{break-inside:avoid}
  .cv-footer{position:absolute;left:12mm;right:12mm;bottom:6mm;display:flex;justify-content:space-between;border-top:.25mm solid #d9e2ec;padding-top:2.5mm;font-size:6.4pt;color:#697586}
  @media print{body{background:#fff;-webkit-print-color-adjust:exact;print-color-adjust:exact}.cv-page{margin:0;box-shadow:none}.cv-print-button{display:none!important}}
  @media screen{body{display:flex;flex-direction:column;align-items:center;gap:10mm;padding:10mm}.cv-page{box-shadow:0 8px 30px rgba(15,23,42,.18)}}
`;

function buildCvHtml(photoDataUrl = '') {
  const personal = activeCV.personal;
  const coreSkillNames = [
    'Swift',
    'SwiftUI',
    'UIKit',
    'Combine',
    'Swift Concurrency',
    'Foundation',
    'XCTest',
    'GitLab CI/CD',
  ];
  const coreSkills = coreSkillNames.map(findCvSkill).filter(Boolean);
  const recentExperience = activeCV.experience.slice(0, 5);
  const earlierExperience = activeCV.experience.slice(5, 8);
  const additionalExperience = activeCV.experience.slice(8);
  const selectedProjects = activeCV.projects.slice(0, 4);
  const coreSkillsHtml = coreSkills.map(skill =>
    `<span class="cv-core-skill"><strong>${cvEsc(skill.name)}</strong>${skill.years ? ` ${cvEsc(skill.years)}` : ''}</span>`
  ).join('');

  return `<!DOCTYPE html>
  <html lang="${cvEsc(currentLang)}">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>CV - ${cvEsc(personal.name)}</title>
    <style>${CV_PRINT_STYLES}</style>
  </head>
  <body>
    <button class="cv-print-button" onclick="window.print()">${cvEsc(t('cvPrint'))}</button>
    <section class="cv-page" data-page="1">
      ${renderCvHeader(personal, photoDataUrl)}
      <div class="cv-intro-grid">
        <section class="cv-profile">
          ${renderCvSectionTitle(t('cvProfile'))}
          <p>${cvEsc(t('cvProfileSummary'))}</p>
        </section>
        <section class="cv-core">
          ${renderCvSectionTitle(t('cvCoreSkills'))}
          <div class="cv-core-grid">${coreSkillsHtml}</div>
        </section>
      </div>
      <section class="cv-section cv-recent">
        ${renderCvSectionTitle(t('cvExperience'))}
        ${recentExperience.map(job => renderCvRole(job, true)).join('')}
      </section>
      ${renderCvFooter(1)}
    </section>
    <section class="cv-page" data-page="2">
      <header class="cv-page-header">
        <strong>${cvEsc(personal.name)}</strong>
        <span>${cvEsc(personal.title)}</span>
      </header>
      <div class="cv-page-two-top">
        <div class="cv-earlier-column">
          ${renderCvSectionTitle(t('cvEarlierExperience'))}
          ${earlierExperience.map(job => renderCvRole(job, false)).join('')}
          <div class="cv-additional">
            <h3>${cvEsc(t('cvAdditionalExperience'))}</h3>
            ${additionalExperience.map(renderCvHistoryRow).join('')}
          </div>
        </div>
        <div class="cv-project-column">
          ${renderCvSectionTitle(t('cvSelectedProjects'))}
          ${selectedProjects.map(renderCvProject).join('')}
        </div>
      </div>
      <section class="cv-section cv-skills">
        ${renderCvSectionTitle(t('cvTechnicalSkills'))}
        <div class="cv-skills-grid">${activeCV.skills.map(renderCvSkillGroup).join('')}</div>
      </section>
      <section class="cv-section cv-education">
        ${renderCvSectionTitle(t('cvEducation'))}
        <div class="cv-education-grid">${activeCV.education.map(renderCvEducationRow).join('')}</div>
      </section>
      ${renderCvFooter(2)}
    </section>
    <script>window.addEventListener('load',function(){setTimeout(function(){window.print()},600)})<\/script>
  </body>
  </html>`;
}

function downloadCv() {
  const html = buildCvHtml(getCvPhotoDataUrl());
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const win = window.open(url, '_blank');
  if (!win) {
    const link = document.createElement('a');
    link.href = url;
    link.download = currentLang === 'en' ? 'Stefan_Sturm_Resume.html' : 'Stefan_Sturm_CV.html';
    link.click();
  }
  setTimeout(() => URL.revokeObjectURL(url), 30000);
}
