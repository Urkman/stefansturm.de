# PDF Layout Refresh Design

Date: 2026-07-30

## Problem

The expanded PDF exported from the website can produce an empty second page in Safari. Its technical skills section is also visually dense, with too many categories competing for space near education. The current exports are functional but visually restrained, and the website URL is not presented consistently in the PDF documents.

## Goals

- Make the expanded export stable in Safari and Chrome without an empty page.
- Give the expanded export a dedicated, readable knowledge page 2.
- Preserve all profile, experience, project, skill, education, and contact data.
- Improve the visual hierarchy of both compact and expanded exports without adding decorative clutter.
- Add a visible, clickable `stefansturm.de` website link to both exports.
- Keep German and English exports aligned in structure and content coverage.

## Non-goals

- Do not change the website profile content or project data.
- Do not remove or shorten any expanded-export data.
- Do not replace the browser print/export flow with a separate PDF library.
- Do not expose private address, birthplace, or marital-status data in the expanded export.

## Layout

### Expanded export

Use explicit page sections rather than relying on one long flowing document with forced breaks:

1. Cover: portrait, name, title, tagline, website/contact links, profile, statistics, and languages.
2. Knowledge: a balanced two-column layout for iOS development, architecture, backend/API, tools/CI/CD, testing, security/crypto, AI workflow, and AI tools.
3. Professional experience, beginning with the most recent roles.
4. Continued professional experience, with entries kept intact at page boundaries.
5. Projects in a two-column grid, including full descriptions, all technology tags, and links.
6. Education followed by a final contact block; if the block does not fit below education, it continues on the next explicit page section without being clipped. The website is always present on the cover.

Each page section must have predictable A4 dimensions, stable top and bottom spacing, and a footer with the document label and page number. Page headings must stay with their first content row. Experience entries and project cards must not split across pages.

### Compact export

Keep the two-page résumé structure. Improve the cover/header hierarchy, use the available second-page space more intentionally, and add the website alongside the existing contact and social links. Keep the compact content selection and privacy rules unchanged.

## Website link

Add a shared website value to the personal profile data: `https://stefansturm.de`. Render it as a visible label `stefansturm.de` with a clickable link in both exports. The compact export places it in the contact/header area. The expanded export places it in the cover contact area and repeats it in the final contact block when that block is present.

## Visual direction

- Keep the existing blue accent and dark text system.
- Use stronger page titles, section rules, and whitespace to improve scanning.
- Use restrained panels only for repeated project items and compact stats.
- Avoid gradients, large decorative graphics, and dense unstructured tag walls.
- Keep typography and spacing consistent between German and English versions.

## Data and behavior

- Both export builders continue to consume the localized `activeCV` data.
- The expanded builder must use every item in the experience, projects, skills, and education arrays.
- PDF links remain clickable for email, telephone, social profiles, app links, project links, and the website.
- Existing compact/expanded export menu behavior remains unchanged.

## Validation

- Update structural tests for the dedicated expanded skills page and website link.
- Generate German and English expanded and compact fixtures with the real portrait.
- Verify PDF metadata: A4, portrait, expected page count, no encryption, and no forms.
- Verify selectable text contains all expected data and excludes private fields.
- Verify all expected URLs appear as PDF link annotations.
- Render every final page to PNG and inspect for blank pages, clipped text, overlaps, stranded headings, and excessive density.
- Test the export menus and language switch in the local browser after the implementation.
