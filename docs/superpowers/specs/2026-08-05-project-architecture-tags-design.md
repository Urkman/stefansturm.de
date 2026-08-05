# Project Architecture Tags

## Goal

Make architecture and modern Swift technologies visible on the correct profile entries. TCA belongs only to the two latest employment entries, EnBW and Chrono24; private projects must not claim TCA.

## Approved Mapping

- EnBW: Swift, SwiftUI, Combine, TCA, MVVM, Swift Concurrency, SwiftData, Foundation, XCTest, Swift Testing, GitLab CI/CD.
- Chrono24: Swift, SwiftUI, Combine, TCA, CleanSwift, Swift Concurrency, SwiftData, Foundation, XCTest, Swift Testing, REST/JSON, GraphQL, GitLab CI/CD.
- Devil: add MVVM; retain the existing technologies; do not include TCA.
- Fast.io: retain its existing MVVM tag; remove TCA.
- OverlayLab: retain its existing MVVM tag; do not add TCA.
- S3XY Watch for Tesla: retain its existing MVVM tag; do not add TCA.

## Data Flow

`js/data.js` remains the single source for experience and project technology arrays. The website and both PDF renderers already consume those arrays, so regenerated PDFs will reflect the mapping without renderer changes.

## Verification

- Add content assertions that EnBW and Chrono24 contain TCA and their approved stack tags.
- Assert every private project contains MVVM and no private project contains TCA.
- Run the existing JavaScript contracts and regenerate all four static PDFs.
- Validate that the compact PDFs remain two pages, expanded PDFs remain nine pages, and the regenerated PDFs contain the updated technology terms.
