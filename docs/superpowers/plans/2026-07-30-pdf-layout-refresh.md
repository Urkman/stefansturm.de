# PDF Layout Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox syntax for tracking.

**Goal:** Make both browser-generated CV exports stable and more polished, move the expanded export's full knowledge section to page 2, and add a clickable website link.

**Architecture:** Keep the existing localized HTML/CSS print flow. Add the website to personal data, keep the compact builder as two explicit A4 pages, and refactor the expanded builder into explicit A4 page wrappers. Experience will use readable continuation pages rather than an unsafe fixed page count.

**Tech Stack:** Vanilla JavaScript, localized data in js/data.js, HTML/CSS print layouts in js/cv-export.js, Node VM contract tests, Chrome/Poppler/Python PDF QA.

## Global Constraints

- Preserve all expanded profile, experience, project, skill, education, and contact data.
- Keep address, birthplace, and marital-status data out of both PDF exports.
- Add visible, clickable https://stefansturm.de as stefansturm.de to both exports.
- Keep German and English exports structurally aligned.
- Use explicit A4 page sections instead of one long flowing expanded document.
- Keep existing compact/expanded menu behavior unchanged.
- Use ASCII hyphens in generated PDF copy and avoid clipped, overlapping, or stranded content.

## Files And Responsibilities

- Modify js/data.js: add the canonical personal website URL.
- Modify js/cv-export.js: render website links, polish compact styles, and rebuild expanded page structure.
- Modify tests/profile-content.test.js: validate the canonical website URL.
- Modify tests/pdf-export.test.js: validate page wrappers, website links, complete content, and privacy rules.
- Modify index.html: bump asset cache versions after generator changes.
- Temporary QA output: tmp/pdfs/layout-refresh; remove it after verification.

### Task 1: Add Failing Contracts

Files:
- Modify tests/profile-content.test.js
- Modify tests/pdf-export.test.js

Interfaces:
- Consumes existing CV, CV_TRANSLATIONS, buildCvHtml(photo), and buildExpandedCvHtml(photo) VM fixtures.
- Produces failing assertions for personal.website, compact website markup, and explicit expanded page markers.

- [ ] Step 1: Add the website data assertion inside the localized profile loop:

    assert.equal(profile.personal.website, 'https://stefansturm.de', lang + ': website URL differs');

- [ ] Step 2: Add these assertions after each compact and expanded fixture is built:

    assert.ok(compact.includes('href="https://stefansturm.de"'), lang + ': compact website link missing');
    assert.ok(expanded.includes('href="https://stefansturm.de"'), lang + ': expanded website link missing');
    assert.match(compact, /stefansturm\.de/);
    assert.match(expanded, /stefansturm\.de/);

- [ ] Step 3: Require these expanded structure markers:

    assert.match(expanded, /class="cv-expanded-page cv-expanded-cover-page"/);
    assert.match(expanded, /class="cv-expanded-page cv-expanded-skills-page"/);
    assert.match(expanded, /data-page="skills"/);
    assert.match(expanded, /data-page="experience/);
    assert.match(expanded, /data-page="projects"/);
    assert.match(expanded, /data-page="education"/);
    assert.doesNotMatch(expanded, /class="cv-expanded-content-section/);

- [ ] Step 4: Run node tests/profile-content.test.js and node tests/pdf-export.test.js. Expected: FAIL because the website field and wrappers do not exist.

- [ ] Step 5: Commit:

    git add tests/profile-content.test.js tests/pdf-export.test.js
    git commit -m "test: define refreshed PDF layout contract"

### Task 2: Add Website Data And Link Rendering

Files:
- Modify js/data.js personal
- Modify js/cv-export.js renderCvHeader and expanded contact construction

Interfaces:
- Consumes activeCV.personal.website and existing cvEsc/esc helpers.
- Produces clickable website markup for both builders.

- [ ] Step 1: Add website beside the existing social URLs in CV.personal:

    website:       'https://stefansturm.de',

Do not add a language override because the URL is identical in German and English.

- [ ] Step 2: Add this helper beside the existing link helpers:

    function renderCvWebsiteLink(personal, className = '') {
      const label = personal.website.replace(/^https?:\/\//, '').replace(/\/$/, '');
      return '<a class="' + className + '" href="' + esc(personal.website) + '">' + cvEsc(label) + '</a>';
    }

- [ ] Step 3: Add the helper to the compact header metadata after the GitHub/LinkedIn row:

    <p class="cv-meta">website link helper with class cv-website-link</p>

The real implementation must emit an anchor and must use the helper, not a hard-coded URL.

- [ ] Step 4: Add renderCvWebsiteLink(personal, 'cv-expanded-contact-link') to the expanded cover contact items.

- [ ] Step 5: Run node --check js/data.js, node --check js/cv-export.js, and node tests/profile-content.test.js.

- [ ] Step 6: Commit:

    git add js/data.js js/cv-export.js
    git commit -m "feat: add website link to CV exports"

### Task 3: Polish The Compact Two-Page Export

Files:
- Modify js/cv-export.js CV_PRINT_STYLES and buildCvHtml

Interfaces:
- Consumes renderCvWebsiteLink and the existing compact arrays.
- Produces exactly two cv-page sections with a visible clickable website.

- [ ] Step 1: Extend CV_PRINT_STYLES with these rules:

    .cv-meta a{color:#0070e0;text-decoration:none}
    .cv-website-link{font-weight:650}
    .cv-page-header{border-top:.8mm solid #0070e0;padding-top:3mm}
    .cv-page-header span{font-weight:650}
    .cv-page-contact{margin:2mm 0 1mm;color:#526071;font-size:7pt}
    .cv-page-contact a{color:#0070e0;text-decoration:none;font-weight:650}

Keep width 210mm, height 297mm, and the existing footer placement.

- [ ] Step 2: Add a page-two contact row below the page header and before the earlier-experience/project grid. It must visibly show stefansturm.de and use the website helper for the anchor.

- [ ] Step 3: Run node tests/pdf-export.test.js and confirm compact assertions pass, including exactly two pages and the website link.

- [ ] Step 4: Commit:

    git add js/cv-export.js
    git commit -m "fix: polish compact PDF layout"

### Task 4: Rebuild Expanded Export With Explicit A4 Pages

Files:
- Modify js/cv-export.js EXPANDED_CV_PRINT_STYLES and buildExpandedCvHtml

Interfaces:
- Consumes all localized arrays, expanded render helpers, renderCvWebsiteLink, and the portrait data URL.
- Produces buildExpandedCvHtml(photo) with explicit page wrappers and no cv-expanded-content-section flow containers.

- [ ] Step 1: Replace expanded flow pagination with these page rules:

    @page{size:A4;margin:0}
    .cv-expanded-page{position:relative;width:210mm;height:297mm;padding:13mm 14mm 18mm;background:#fff;break-after:page;page-break-after:always;overflow:hidden}
    .cv-expanded-page:last-child{break-after:auto;page-break-after:auto}
    .cv-expanded-page-header{display:flex;justify-content:space-between;align-items:baseline;border-top:.8mm solid #0070e0;padding-top:3mm;margin-bottom:7mm}
    .cv-expanded-page-header strong{font-size:13pt;color:#152033}
    .cv-expanded-page-header span{font-size:8pt;color:#0070e0;font-weight:650}
    @media print{body{background:#fff}.cv-expanded-page{margin:0;box-shadow:none}}
    @media screen{body{padding:10mm}.cv-expanded-page{box-shadow:0 8px 30px rgba(15,23,42,.18);margin-bottom:10mm}}

Remove min-height/break-after from the old cover and all break-before rules on content sections. Page wrappers must control page boundaries.

- [ ] Step 2: Add this localized page-header helper:

    function renderExpandedPageHeader(title, pageLabel) {
      return '<header class="cv-expanded-page-header"><strong>' + cvEsc(title) + '</strong><span>' + cvEsc(pageLabel) + '</span></header>';
    }

- [ ] Step 3: Wrap the cover as one cv-expanded-page with cv-expanded-cover-page and data-page="cover". Keep portrait, identity, website/contact links, profile, statistics, and languages.

- [ ] Step 4: Render every skill category on page 2:

    <section class="cv-expanded-page cv-expanded-skills-page" data-page="skills">
      localized page header for cvTechnicalSkills
      <div class="cv-expanded-skills cv-expanded-skills-page-grid">
        all activeCV.skills rendered with renderExpandedSkillGroup
      </div>
    </section>

Use a balanced two-column grid with explicit group spacing. Keep AI workflow and AI tools visible. Do not place education on this page.

- [ ] Step 5: Render complete experience in explicit continuation pages. Start with the most recent entries and keep each renderExpandedExperience entry intact. Use a deterministic initial split:

    const experienceSplit = Math.ceil(activeCV.experience.length / 2);
    const experiencePages = [
      activeCV.experience.slice(0, experienceSplit),
      activeCV.experience.slice(experienceSplit),
    ];

Render each non-empty group with data-page values experience-1 and experience-2. If rendered visual QA shows either group exceeds one A4 page, split that group into additional explicit pages; never allow an entry to cross a page boundary or create a blank page.

- [ ] Step 6: Render projects in a dedicated projects page with the existing two-column cards. Render education in a dedicated education page followed by a contact block containing website, email, phone, GitHub, LinkedIn, and X. Continue the contact block onto another explicit page if required. Do not render private address/birth/marital data.

- [ ] Step 7: Replace the @page margin-box footer with a footer inside every explicit page:

    <footer class="cv-expanded-footer">
      <span>Stefan Sturm - localized expanded label</span>
      <span>localized page label and page number</span>
    </footer>

Use position:absolute;left:14mm;right:14mm;bottom:7mm inside the page wrapper. Remove dynamic @page :first footer rules.

- [ ] Step 8: Run node tests/pdf-export.test.js. Expected: complete-data, privacy, link, A4, explicit-page, and no-flow-container assertions pass for German and English.

- [ ] Step 9: Commit:

    git add js/cv-export.js
    git commit -m "feat: stabilize expanded PDF page layout"

### Task 5: Refresh Browser Assets And Generate Fixtures

Files:
- Modify index.html
- Temporary tmp/pdfs/layout-refresh

Interfaces:
- Consumes committed builders and assets/stefan.png.
- Produces compact and expanded German/English HTML and PDF fixtures.

- [ ] Step 1: Replace every 20260730-profile-summary asset query in index.html with 20260730-pdf-layout-refresh.

- [ ] Step 2: Generate four fixture HTML files and expected.json using the existing VM fixture pattern from tests/pdf-export.test.js, with the real portrait:

    tmp/pdfs/layout-refresh/de-compact.html
    tmp/pdfs/layout-refresh/en-compact.html
    tmp/pdfs/layout-refresh/de-expanded.html
    tmp/pdfs/layout-refresh/en-expanded.html
    tmp/pdfs/layout-refresh/expected.json

- [ ] Step 3: Print all four fixtures with Chrome headless and --no-pdf-header-footer. Store PDFs beside their matching HTML files.

- [ ] Step 4: Render every PDF with bundled pdftoppm at 144 dpi to page PNGs.

- [ ] Step 5: Commit the cache version:

    git add index.html
    git commit -m "chore: refresh PDF asset cache version"

### Task 6: Automated And Visual QA

Files:
- Test tests/profile-content.test.js
- Test tests/pdf-export-menu.test.js
- Test tests/pdf-export.test.js
- Temporary tmp/pdfs/layout-refresh

Interfaces:
- Consumes four final PDFs and expected.json.
- Produces verified exports with no blank pages, complete text, privacy-safe content, and clickable links.

- [ ] Step 1: Run:

    node --check js/data.js
    node --check js/main.js
    node --check js/cv-export.js
    node tests/profile-content.test.js
    node tests/pdf-export-menu.test.js
    node tests/pdf-export.test.js
    git diff --check

All commands must pass.

- [ ] Step 2: Run pdfinfo on all four PDFs. Require A4 portrait, no encryption, no forms, exactly two pages for compact PDFs, and more than two pages for expanded PDFs.

- [ ] Step 3: Use pdfplumber to assert every experience company, role, period, full description, technology, project description, skill item, education item, profile paragraph, and website label is selectable in each language. Assert address, birthplace, and marital status are absent from both export types.

- [ ] Step 4: Use pypdf to collect /URI annotations and require email, phone, GitHub, LinkedIn, X, website, app, and project links in both languages and both export modes.

- [ ] Step 5: Inspect every rendered PNG. Require no empty page 2, knowledge beginning on expanded page 2, balanced skill spacing, no clipping or footer collisions, website visibility in both exports, and matching German/English hierarchy.

- [ ] Step 6: Remove QA files:

    find tmp/pdfs/layout-refresh -type f -delete
    rmdir tmp/pdfs/layout-refresh tmp/pdfs

- [ ] Step 7: Run git diff --check and git status --short --branch. Expected: no unstaged or untracked files.
