# PDF Generation

Regenerate all committed CV PDF artifacts after changing CV data or translations:

```bash
node scripts/generate-pdfs.js
```

The generator requires headless Google Chrome, Poppler (`pdfinfo`), Python 3 with `pypdf`, and the optimized PDF portrait at `assets/stefan-cv.jpg`. Set `CHROME_BIN` when Chrome is installed at a different path.

Each logical CV page is printed separately and assembled with
`scripts/merge-pdfs.py`. This keeps Chrome from repaginating the page wrappers
and preserves the page resources and links in the final PDF.
