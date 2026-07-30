# PDF Generation

Regenerate all committed CV PDF artifacts after changing CV data or translations:

```bash
node scripts/generate-pdfs.js
```

The generator requires headless Google Chrome, Poppler (`pdfinfo`), Python 3 with `pypdf`, and the repository portrait at `assets/stefan.png`. Set `CHROME_BIN` when Chrome is installed at a different path.
