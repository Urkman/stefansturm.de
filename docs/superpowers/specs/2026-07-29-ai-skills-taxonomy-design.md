# AI Skills Taxonomy Design

## Goal

Make the AI skills under `Kenntnisse` / `Skills` easier to scan and more credible by separating transferable workflow competencies from specific products.

## Scope

The standalone AI profile section, navigation entry, workflow narrative, model matrix, and tool descriptions remain removed. This change only affects the skills data rendered in the existing skills grid and CV exports.

## Skills Structure

### AI & Agentic Development

This card describes working methods:

- Agentic Development
- Prompt & Context Engineering
- Planning Skills (`brainstorming` / `grill-me`)
- PRD / Sprint Planning
- Worktree / PR Workflows
- AI-assisted Testing
- AI Code Review
- Model Selection

German labels are translated where useful while established technical terms remain in English.

### AI Tools

This card lists direct experience with AI products:

- Codex
- Claude
- ChatGPT
- GitHub Copilot
- Grok

### Tools & CI/CD

RocketSim and App Store Connect CLI move into the existing `Tools & CI/CD` card because they support UI verification and deployment rather than functioning as AI tools.

## Localization

German and English profiles must have the same category and item structure. Product names remain unchanged. Workflow labels receive explicit English overrides where the German base labels differ.

## Verification

- The bilingual content contract requires both AI categories and their expected items.
- The contract requires RocketSim and App Store Connect CLI under `Tools & CI/CD`.
- The standalone `profile.ai` data and AI presentation markup/rendering/styles remain absent.
- Browser checks cover German and English rendering, desktop and mobile width, overflow, and console health.
