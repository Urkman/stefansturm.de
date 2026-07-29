# Expanded PDF Export Design

## Goal

Add a second, professional PDF export that includes the complete CV dataset without shortening descriptions or limiting arrays. Preserve the existing two-page CV as the compact export.

## User Interface

The existing PDF controls in the navigation and hero become bilingual export menus. Each menu offers:

- Compact CV: the existing fixed two-page document
- Expanded CV: the new complete multi-page document

The Markdown controls remain separate and unchanged. Both PDF menus expose the same commands and close after selection, outside click, or Escape. Menu buttons and items are keyboard accessible and carry translated accessible labels.

## Architecture

Keep the current compact implementation in `js/cv-export.js` stable. Add a dedicated `buildExpandedCvHtml(photoDataUrl)` path beside it.

The compact and expanded exporters share:

- HTML escaping and ASCII-hyphen normalization
- Portrait conversion and initials fallback
- Localized active CV data
- Blob URL opening and downloadable-HTML fallback
- Small rendering helpers where their output is suitable for both formats

The expanded exporter has independent document structure and print styles. It uses natural browser pagination rather than fixed `.cv-page` elements or a fixed page count.

## Expanded Content Contract

The expanded PDF includes all non-private CV data available for the active language:

- Portrait
- Name and professional title
- City, email, phone, GitHub, LinkedIn, and X
- Nationality
- All languages, levels, and notes
- All profile statistics
- The full profile summary
- Every experience entry
- Every experience period, company, role, location, current state, app name, and app URL
- Every experience description without truncation
- Every experience technology without limits
- Every project
- Every project period, URL, and link type
- Every full project `description`
- Every project technology without limits
- Every skill category
- Every skill item and available years value
- Every education entry

The expanded document must use each project's full `description`, not `cvDescription`.

The following fields remain excluded:

- Street address
- Birthplace
- Marital status

## Layout

The output is portrait A4 with print margins reserved for a repeated footer. The document is allowed to use as many pages as its content requires.

The first page contains:

- Portrait and identity
- Contact and profile metadata
- Statistics and languages
- Full profile summary

The remaining content follows in this order:

1. Professional experience
2. Projects
3. Technical skills
4. Education

Experience and project entries use a clear heading row, full body copy, an optional clickable app or project link, and a complete technology list. Skills use readable grouped lists with years where available. Education uses compact rows.

Print rules avoid splitting an experience, project, skill group, or education entry when it fits on one page. Entries too tall for one page may split rather than overflow or disappear. A restrained repeated footer identifies the document as Stefan Sturm's expanded CV. The output must not depend on browser-generated headers or footers.

## Localization

All visible controls, menu labels, section headings, document metadata, and fallback labels support German and English. The active website language determines the export language.

New translation keys cover:

- PDF export menu label
- Compact CV command and description
- Expanded CV command and description
- Expanded CV document label
- Statistics heading
- Link labels where existing translations are insufficient

## Error Handling

- If portrait conversion fails, render the existing initials fallback.
- If a popup is blocked, download the generated expanded CV as an HTML file, matching the current fallback behavior.
- Missing optional links, notes, app names, or years omit only their corresponding UI.
- Missing project `description` is treated as a content-contract failure in tests rather than silently using compact copy.

## Testing

Add automated contracts for both German and English that verify:

- The compact export remains exactly two pages.
- The expanded export has no fixed two-page structure.
- Every experience, project, skill category, skill item, technology, language, statistic, and education entry appears.
- Full project descriptions are used and `cvDescription` is not substituted.
- App and project URLs are present when provided.
- Street address, birthplace, and marital status are absent.
- Generated HTML contains no Unicode dash characters or legacy contact glyphs.
- Both export menus expose compact and expanded commands.

Generate German and English expanded PDFs with the real portrait. Verify A4 sizing, a page count greater than two, selectable text, clickable links, and privacy exclusions. Render every page to PNG and inspect for clipping, overlap, broken glyphs, awkward page breaks, inconsistent spacing, and missing repeated footers.

## Non-Goals

- Changing the website profile content
- Changing the Markdown export
- Replacing or relaxing the compact two-page CV
- Adding an external PDF-generation library
- Including private personal fields
