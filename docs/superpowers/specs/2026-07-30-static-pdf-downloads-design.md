# Static PDF Downloads Design

## Context

The website currently builds an HTML print document in the browser and opens it in a new tab. The browser then performs the PDF pagination. This makes the result sensitive to browser print behavior and has caused blank pages, clipped headings, and inconsistent page headers.

The CV data and PDF layout already live in the repository. The export should use that same source of truth while delivering stable PDF files to visitors.

## Goals

- Deliver deterministic PDF files without browser-side print pagination.
- Provide German and English versions of both compact and expanded CV exports.
- Keep the existing export menu and language switch behavior.
- Keep the existing PDF renderer as the generation source so content and layout are not duplicated.
- Make regeneration repeatable after profile, skills, experience, project, or translation changes.
- Validate the generated artifacts before they are committed.

## Non-goals

- Redesigning the website PDF layouts in this change.
- Generating PDFs on the server at request time.
- Adding a CMS or automatic content publishing pipeline.
- Keeping browser-generated PDF output as a visitor-facing fallback.

## Architecture

### Static artifacts

Commit four generated files under `assets/pdf/` with stable names:

- `stefan-sturm-cv-de.pdf`
- `stefan-sturm-cv-en.pdf`
- `stefan-sturm-expanded-cv-de.pdf`
- `stefan-sturm-expanded-cv-en.pdf`

The files are same-origin website assets and are downloaded through normal anchor elements. Stable names keep links simple; a version query parameter prevents stale browser cache entries after regeneration.

### Generator

Add `scripts/generate-pdfs.js` as the single regeneration command. It will:

1. Load `js/data.js`, `js/main.js`, and `js/cv-export.js` in a minimal VM context.
2. Set the language and select the localized CV data.
3. Embed `assets/stefan.png` as a data URL for the generated HTML source.
4. Build compact and expanded HTML using the existing renderer functions.
5. Write intermediate HTML under `tmp/pdfs/`.
6. Invoke a locally available headless Chrome binary to print each logical page to a temporary output directory under `tmp/pdfs/`.
7. Assemble the one-page PDFs with `scripts/merge-pdfs.py` without rewriting page resources.
8. Validate every resulting PDF as A4, unencrypted, non-empty on every page, and containing `stefansturm.de` as both text and a link.
9. Move the validated PDFs into `assets/pdf/` and remove intermediate files when generation succeeds.

The Chrome executable path will be configurable through `CHROME_BIN`, with the current macOS Chrome path as the local default. A missing browser dependency must produce a clear error instead of partially updating artifacts.

### Browser download flow

`downloadCv(mode)` will map the active language and mode to one of the four static asset paths. It will create an anchor with the matching `href`, cache-busting query parameter, and localized filename, then trigger the download. The menu keyboard and focus behavior remains unchanged.

The browser will no longer call `getCvPhotoDataUrl`, `buildCvHtml`, `buildExpandedCvHtml`, `openCvDocument`, or `window.print()` for visitor downloads. Those rendering helpers remain available to the generator and HTML-level tests.

## Error handling

- The generator fails if the source portrait, renderer files, Chrome binary, or output directory is unavailable.
- Generated artifacts are written to temporary paths first and moved into `assets/pdf/` only after all four PDFs pass validation.
- The browser download mapping falls back to the compact German asset only if an invalid mode or language somehow reaches the function; normal UI paths always use a valid pair.

## Testing

- Add a static artifact contract test for the four filenames, mapping logic, and cache-busting version.
- Keep the existing bilingual HTML renderer tests because the generator still depends on those renderers.
- Run the generator and validate all four PDFs with `pdfinfo` and `pypdf`.
- Render the final PDFs with `pdftoppm` and inspect every page for blank pages, clipping, missing headings, and broken links.
- Verify the website link and page counts in both languages.

## Update workflow

When CV content changes:

```bash
node scripts/generate-pdfs.js
```

The changed PDFs and any intentional renderer changes are committed together. The website then serves the committed artifacts directly.

## Acceptance criteria

- All four PDFs are present under `assets/pdf/`.
- Compact exports have exactly two A4 pages.
- Expanded exports contain all current content, place `Kenntnisse` on page 2, and contain no empty pages.
- Website downloads complete without opening an HTML print document.
- German and English downloads resolve to the correct static artifact.
- Regeneration after a data change produces updated PDFs with the changed content.
- Automated checks and final visual PDF inspection pass.
