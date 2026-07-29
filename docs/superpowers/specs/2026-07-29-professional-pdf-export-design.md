# Professional PDF Export Design

## Goal

Replace the current continuous three-page browser-print layout with a deterministic, professional two-page CV in German and English.

## Current Problems

- Page 1 is overcrowded with a long sidebar and six detailed roles.
- Pages 2 and 3 preserve an empty sidebar column.
- Project content can split across pages.
- Page 3 contains substantial unused space.
- Small type and long technology lists reduce readability.
- Unicode contact symbols trigger missing-font warnings during PDF rendering.
- The current comment incorrectly states that html2pdf.js performs the export.

## Output Format

The export remains selectable HTML text printed to PDF for ATS compatibility. It uses two explicit A4 `.cv-page` elements rather than one continuous flex container.

- A4 dimensions: `210mm x 297mm`
- Print margin: `0`
- Two explicit pages with `break-after: page`
- System font stack for reliable local and hosted rendering
- White background, charcoal text, and restrained Apple-blue accents
- Embedded page number and footer on each page
- No Unicode icons or decorative symbols
- Export text normalizes typographic dashes to ASCII hyphens

## Page 1

### Header

- Existing portrait, center-cropped to a compact circle
- Stefan Sturm
- Senior iOS Developer
- Willich, Germany
- Email, phone, GitHub, and LinkedIn
- German and English language levels
- German nationality

The PDF omits the street address, birthplace, and marital status. The website profile data remains unchanged.

### Profile

Use a concise PDF-only profile:

German:

> Senior iOS-Entwickler mit mehr als 15 Jahren Erfahrung in der Entwicklung hochwertiger Apps mit Swift, SwiftUI und Combine. Schwerpunkte sind Swift Concurrency, Foundation, iOS-Plattform-APIs sowie automatisierte Tests mit Swift Testing und XCTest. Erfahrung in komplexen Produktlandschaften, E-Commerce- und Marktplatzumfeldern sowie verlässlichen GitLab-CI/CD-Prozessen.

English:

> Senior iOS developer with more than 15 years of experience building high-quality apps with Swift, SwiftUI and Combine. Key strengths include Swift Concurrency, Foundation, iOS platform APIs, and automated testing with Swift Testing and XCTest. Experienced in complex product environments, e-commerce and marketplaces, and reliable GitLab CI/CD delivery.

### Core Competencies

Show a focused set of eight competencies:

- Swift
- SwiftUI
- UIKit
- Combine
- Swift Concurrency
- Foundation
- XCTest
- GitLab CI/CD

Years are shown when present in the profile data.

### Recent Experience

Render the first five experience entries in detail:

1. EnBW
2. Chrono24
3. 1und1
4. RTL
5. Nexenio

Each entry includes role, company, location, period, app name when available, description, and the first eight technology tags. Entries cannot split across pages.

## Page 2

### Earlier Experience

Render Comdirect, Buhl, and Porsche with role, company, location, period, app name, and description. Omit their long technology lines.

Render the remaining experience entries as a compact career-history table with period, company, and role. This preserves the full career chronology without repeating low-value implementation details.

### Selected Projects

Render DevBar, Fast.io, OverlayLab, and S3XY Watch in a compact two-column grid. Each project includes name, period, a PDF-specific `cvDescription`, and the first six technology tags. Project cards cannot split.

Add localized `cvDescription` fields to the four project data entries. The website cards continue to use the full `description` fields.

German project summaries:

- DevBar: `Native macOS-26-Menüleisten-App zum Bereinigen von Xcode- und SPM-Caches, Steuern von Simulatoren und Ausführen von Git-Workflows mit lokaler Apple Intelligence.`
- Fast.io: `Intervallfasten-Timer für iPhone und Apple Watch mit Live Activities, Widgets, Apple Health und Hydration-Tracking.`
- OverlayLab: `Kamera-App für Wetter-, Standort- und Text-Overlays auf Fotos und Videos.`
- S3XY Watch: `iPhone- und Apple-Watch-App zur Steuerung und Überwachung eines Teslas mit Swift/Vapor-Backend.`

English project summaries:

- DevBar: `Native macOS 26 menu-bar app for cleaning Xcode and SPM caches, controlling simulators, and running Git workflows with local Apple Intelligence.`
- Fast.io: `Intermittent fasting timer for iPhone and Apple Watch with Live Activities, widgets, Apple Health, and hydration tracking.`
- OverlayLab: `Camera app for weather, location, and text overlays on photos and videos.`
- S3XY Watch: `iPhone and Apple Watch app for controlling and monitoring a Tesla with a Swift/Vapor backend.`

### Technical Skills

Render all skill categories in a compact two-column grid. Use category headings and comma-separated values, without years.

### Education

Render all education entries as concise one-line rows. Education rows cannot split.

## Portrait Handling

Before building the print document, resize the already loaded `#profileImg` into an approximately 320 x 320 JPEG data URL using a canvas.

- Preserve the center crop.
- Use JPEG quality around `0.88`.
- If the image is unavailable or canvas conversion fails, render an `SS` initials block with the same dimensions.
- Do not fetch the portrait from inside the blob document.

## Implementation Boundaries

- Replace the current `buildCvHtml()` document structure and inline style map.
- Add a small portrait-data helper and PDF-specific text normalization/selection helpers.
- Keep `downloadCv()` and the existing PDF buttons as the public interaction.
- Keep Markdown export behavior unchanged.
- Add only PDF-specific translation keys required for profile copy, compact headings, page labels, and location.
- Do not add external PDF or rendering dependencies.

## Verification

- Content tests assert exactly two `.cv-page` elements and the five/three/remaining experience split.
- Tests assert the privacy-sensitive fields are absent from generated PDF HTML.
- Tests assert DevBar and all skill categories remain present.
- Generate German and English test PDFs with headless Chrome.
- Require exactly two A4 pages for each language.
- Render all four pages to PNG with Poppler and inspect typography, alignment, whitespace, portrait rendering, section transitions, and clipping.
- Extract text with `pdfplumber` to verify headings, chronology, projects, and page labels.
- Browser checks verify both PDF buttons still open the print document without console errors.
