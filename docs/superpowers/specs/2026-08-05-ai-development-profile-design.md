# AI Development Profile Design

## Goal

Extend the bilingual profile with a credible, concrete account of AI-supported iOS development. The update must present AI as an engineering workflow under Stefan's technical direction, add TCA to the relevant architecture and project knowledge, rename DevBar to Devil, and keep the website and both PDF formats aligned.

## Scope

This change includes:

- a standalone AI section between `Kenntnisse` / `Skills` and `Projekte` / `Projects`;
- a matching navigation item in German and English;
- refined AI skill categories under `Kenntnisse` / `Skills`;
- Codex, Claude, and Grok as the three named AI tools;
- named planning skills and the use of Skills and Plugins;
- model and reasoning-depth selection as an explicit competency;
- TCA in architecture knowledge and in the Devil and Fast.io technology lists;
- the DevBar-to-Devil rename while retaining the existing website URL;
- end-to-end AI-supported development statements for Devil and Fast.io;
- equivalent content in the compact and expanded PDF exports;
- regeneration of all four committed static PDF artifacts.

The change does not add model version numbers, external AI APIs, live model data, AI-generated visuals, or RocketSim references inside the AI section.

## Positioning Principles

- AI augments established iOS engineering experience; it does not replace architectural judgment, verification, or product responsibility.
- `Vibe Coding` describes rapid exploration and prototyping.
- `Agentic Coding` describes structured, traceable planning and implementation with AI agents.
- Tool and model selection depends on the task, context, risk, and required reasoning depth.
- Devil and Fast.io are evidence of the workflow, not broad claims that AI independently created the products.
- Model names remain durable product-family names: Codex, Claude, and Grok. No model numbers or release-specific labels appear.

## Data Model

Add a bilingual `ai` content block to the localized CV data. It provides:

- `title`;
- `introduction`;
- three tool-role entries;
- four workflow entries;
- two project-proof entries;
- a concise PDF summary for the compact export.

The website and PDF renderers consume this shared data. German base data and English overrides follow the repository's existing localization pattern; no visible AI copy is duplicated inside renderer functions.

## Website Structure

Add an `AI` navigation item and a full-width section between the existing skills and projects sections. The section follows the approved hybrid hierarchy:

1. section heading and concise narrative;
2. compact role cards for Codex, Claude, and Grok;
3. a four-step workflow from planning through delivery;
4. proof blocks for Devil and Fast.io.

Desktop uses three tool columns, four workflow columns, and two proof columns. At narrower widths, tool and proof cards stack; workflow steps reduce to two columns and then one column. The section reuses the site's restrained blue, white, and light-gray visual language, existing border radii, spacing scale, and reveal behavior.

## Approved Bilingual Copy

### Introduction

German:

> Ich verbinde langjährige iOS-Erfahrung mit AI-gestützter und agentischer Entwicklung. Vibe Coding nutze ich für schnelle Exploration; Agentic Coding für strukturierte, nachvollziehbare Umsetzung. Werkzeug, Modell und Reasoning-Tiefe wähle ich passend zu Aufgabe, Kontext und Risiko. Skills und Plugins unterstützen den gesamten Ablauf, ohne Architektur- und Qualitätsverantwortung abzugeben.

English:

> I combine extensive iOS experience with AI-supported and agentic development. I use Vibe Coding for rapid exploration and Agentic Coding for structured, traceable implementation. I choose the tool, model, and reasoning depth to match the task, context, and risk. Skills and Plugins support the full workflow without delegating architectural or quality ownership.

### Tool Roles

Codex:

- DE: `Repository-basierte Umsetzung, Tests, Code Review sowie Worktree- und Pull-Request-Workflows.`
- EN: `Repository-based implementation, testing, code review, and worktree and pull-request workflows.`

Claude:

- DE: `Brainstorming, grill-me, Planung, Kontextarbeit und Bewertung alternativer Lösungswege.`
- EN: `Brainstorming, grill-me, planning, context work, and evaluation of alternative approaches.`

Grok:

- DE: `Recherche, Gegenprüfung und zusätzliche Perspektiven bei technischen Entscheidungen.`
- EN: `Research, cross-checking, and additional perspectives for technical decisions.`

### Workflow

1. `Verstehen & planen` / `Understand & plan`
   - DE: `brainstorming, grill-me, writing-plans und klare Akzeptanzkriterien.`
   - EN: `brainstorming, grill-me, writing-plans, and clear acceptance criteria.`
2. `Modell wählen` / `Select the model`
   - DE: `Tool, Modell und Reasoning-Tiefe passend zu Aufgabe, Kontext und Risiko.`
   - EN: `Choose the tool, model, and reasoning depth for the task, context, and risk.`
3. `Agentisch umsetzen` / `Implement agentically`
   - DE: `Skills, Plugins, fokussierte Tasks, Worktrees und Pull Requests.`
   - EN: `Skills, Plugins, focused tasks, worktrees, and pull requests.`
4. `Prüfen & liefern` / `Verify & deliver`
   - DE: `Automatisierte Tests, Code Review, Dokumentation und kontrollierte Auslieferung.`
   - EN: `Automated tests, code review, documentation, and controlled delivery.`

### Project Proof

German:

> End-to-end mit AI-gestützten, agentischen Workflows unter eigener technischer Leitung entwickelt.

English:

> Developed end to end using AI-supported, agentic workflows under my technical direction.

The statement appears for both Devil and Fast.io in the standalone AI section and is integrated naturally into each project's full and compact PDF descriptions.

### Compact PDF Summary

German:

> Agentic Coding mit Codex, Claude und Grok: strukturierte Planung mit brainstorming, grill-me und writing-plans, aufgabengerechte Modell- und Reasoning-Auswahl sowie Umsetzung über Skills, Plugins, Worktrees, Tests und Code Review.

English:

> Agentic Coding with Codex, Claude, and Grok: structured planning using brainstorming, grill-me, and writing-plans; task-appropriate model and reasoning selection; and implementation through Skills, Plugins, worktrees, tests, and code review.

## Skills Taxonomy

Keep the AI knowledge visible under `Kenntnisse` / `Skills`, but make it support the narrative rather than repeat it.

`AI & Agentic Development` contains:

- Agentic Coding
- Vibe Coding
- Prompt & Context Engineering
- Skills & Plugins
- Planning Skills (`brainstorming` / `grill-me` / `writing-plans`)
- Worktree / PR Workflows
- AI-assisted Testing
- AI Code Review
- Model & Reasoning Selection

Use appropriate German labels for `AI-assisted Testing` and `Model & Reasoning Selection`; established workflow terms remain in English.

`AI Tools` contains only:

- Codex
- Claude
- Grok

RocketSim and App Store Connect CLI remain in `Tools & CI/CD`. Neither appears in the new AI section.

## Architecture and Projects

Add `TCA` to the `Architektur` / `Architecture` skill category.

Rename `DevBar – Apple Developer Toolkit` to `Devil – Apple Developer Toolkit` in both languages, all website views, tests, and PDF output. Keep the URL `https://devbar.netlify.app` until a replacement URL is supplied.

Add `TCA` to the technology arrays for:

- Devil – Apple Developer Toolkit
- Fast.io – Fasting Timer

Append the approved project-proof sentence verbatim to each project's German and English `description` and `cvDescription`. This preserves the existing product explanation while making Stefan's technical ownership explicit and consistent across the website and PDFs.

## PDF Design

### Compact PDF

Keep the compact export at exactly two A4 pages. Page 2 gains a concise AI workflow block sourced from `ai.compactSummary`, plus the AI-development statements in the Devil and Fast.io project cards. The existing AI skill groups retain the detailed keywords.

If the first generated layout exceeds two pages or becomes visually crowded, reduce spacing or shorten only the compact AI summary. Do not remove required skill names, TCA, the project claims, or education content.

### Expanded PDF

Add a dedicated AI page immediately after the technical-skills page and before professional experience. It contains the full introduction, tool roles, workflow, and both project-proof entries. The expanded export therefore changes from eight to nine pages while retaining:

- skills on page 2;
- AI content on page 3;
- all experience entries;
- all project descriptions and technology tags;
- education and contact content on the final page.

The page uses the existing expanded-PDF header, footer, typography, and restrained panel styling.

### Static Artifacts

Regenerate and commit:

- `assets/pdf/stefan-sturm-cv-de.pdf`
- `assets/pdf/stefan-sturm-cv-en.pdf`
- `assets/pdf/stefan-sturm-expanded-cv-de.pdf`
- `assets/pdf/stefan-sturm-expanded-cv-en.pdf`

Rotate `STATIC_PDF_VERSION` after regeneration so browsers request the updated artifacts.

## Failure Handling

- Rendering must escape all localized content through the existing escaping helpers.
- Missing project URLs keep the existing no-link behavior; the Devil URL remains valid and unchanged.
- PDF generation remains staged: existing committed PDFs are replaced only after all four new artifacts pass validation.
- If compact pagination exceeds two pages, generation fails through the existing exact-page-count check rather than installing partial or malformed artifacts.

## Verification

### Automated Content Checks

- German and English profiles expose the same AI structure.
- The AI tools are exactly Codex, Claude, and Grok.
- Named skills include `brainstorming`, `grill-me`, and `writing-plans`.
- Skills, Plugins, Vibe Coding, Agentic Coding, and model/reasoning selection are present.
- RocketSim is absent from the AI section and remains under general tools.
- TCA appears in architecture knowledge and both target projects.
- Devil replaces DevBar everywhere except the retained URL.
- Devil and Fast.io include the approved AI-development claim in both languages.

### Website Checks

- Navigation reaches the new section in German and English.
- Section order is skills, AI, projects.
- Desktop and mobile layouts have no horizontal overflow, overlap, or clipped text.
- Language switching updates every AI label and paragraph without a reload.
- Existing experience, projects, downloads, and contact links continue to work.

### PDF Checks

- Compact PDFs remain two A4 pages.
- Expanded PDFs contain nine A4 pages, skills on page 2, and AI on page 3.
- Every page has extractable text and no blank-page regression.
- Both languages include TCA, Devil, Codex, Claude, Grok, the named skills, and both project claims.
- Website and project links remain clickable.
- Every page of all four final PDFs is rendered to PNG and visually checked for clipping, overflow, missing headers, and footer collisions.

## Acceptance Criteria

- The approved hybrid AI section appears between skills and projects in both languages.
- AI positioning is concrete, professional, and explicitly retains Stefan's technical ownership.
- Codex, Claude, Grok, Skills, Plugins, Vibe Coding, Agentic Coding, named planning skills, and model/reasoning selection are represented.
- TCA appears in architecture knowledge, Devil, and Fast.io.
- DevBar is renamed Devil while its URL remains unchanged.
- Devil and Fast.io state that they were developed end to end with AI-supported, agentic workflows under Stefan's technical direction.
- Compact and expanded PDFs contain the corresponding content and pass automated and visual validation.
- All website and PDF tests pass in German and English.
