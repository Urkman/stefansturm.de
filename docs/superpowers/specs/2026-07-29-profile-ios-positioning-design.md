# Profile iOS Positioning Design

## Goal

Refocus Stefan Sturm's bilingual profile entirely on senior iOS engineering and align its content with the supplied project description. Remove all AI-specific positioning while integrating the requested competencies naturally and credibly.

## Scope

### Remove AI Positioning

Remove every AI-specific reference from the website and generated CV formats:

- `AI & Tools` navigation item and page section
- AI and agentic development data
- AI skill category and related skill items
- AI wording in the Fast.io project description
- AI renderer and AI content in PDF and Markdown exports
- AI-specific translation keys and CSS rules

Product names or technical terms that are unrelated to AI remain unchanged.

### Integrate Project Competencies

Update both German and English content with the following competencies:

- Swift
- SwiftUI and Combine
- Swift Concurrency, including async/await and Actors
- Swift Testing and XCTest
- Foundation and iOS platform APIs
- GitLab-based version control and CI/CD
- Professional English and German language proficiency
- E-commerce and marketplace experience

## Content Placement

### Profile Summary

Rewrite the summary to foreground modern iOS product development, declarative and reactive UI work, concurrency, testing, platform APIs, and reliable delivery. Mention marketplace experience as part of the project history rather than as an unsupported general claim.

### Skills

Adjust the existing skill cards:

- `iOS Development`: Swift, SwiftUI, Combine, Swift Concurrency, async/await, Actors, Foundation, and iOS platform APIs
- `Testing`: Swift Testing, XCTest, UI tests, unit tests, and snapshot tests
- `Tools & CI/CD`: GitLab, Git, CI/CD, Jenkins, Azure DevOps, Xcode Cloud, and relevant package tooling

Remove the AI skill card entirely. Preserve established skills that remain relevant.

### Experience

Strengthen the Chrono24 entry to identify it as practical e-commerce and marketplace experience. Keep the statement tied to the existing catalog redevelopment work and avoid implying responsibilities not supported by the current profile.

Where appropriate, add the supplied technical keywords to relevant experience technology lists without adding unsupported claims.

### Projects

Remove the AI-development framing from Fast.io. Retain the product description and its concrete iOS capabilities, including SwiftUI, Apple platform integrations, widgets, Live Activities, Apple Watch, and HealthKit.

## Bilingual Behavior

German remains the default language. English translations must convey the same claims and emphasis rather than introducing additional experience. The language switch continues to update:

- visible website content
- metadata managed by the renderer
- PDF output
- Markdown output

## Implementation Boundaries

Keep the existing static architecture and localized override model. Do not add a new section or framework. Limit structural changes to removing the AI section and its unused implementation.

## Verification

- Run JavaScript syntax checks for `js/data.js` and `js/main.js`.
- Render both German and English states with the existing offline render harness.
- Verify the requested competencies appear in both languages.
- Search the website, data, renderer, styles, PDF, and Markdown paths for remaining AI-specific references.
- Verify navigation links and section alternation remain coherent after removing the AI section.
- Verify the current local server returns the updated cache-busted assets.
