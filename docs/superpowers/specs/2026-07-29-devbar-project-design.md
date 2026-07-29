# DevBar Project Card Design

## Goal

Add DevBar as the newest personal project and present it as a native, privacy-conscious macOS toolkit for Apple-platform developers.

## Source

Product details come from `https://devbar.netlify.app`.

## Placement and Identity

- DevBar is the first item in the projects list.
- Name: `DevBar – Apple Developer Toolkit`
- German period: `2026 – bis jetzt`
- English period: `2026 – present`
- URL: `https://devbar.netlify.app`

## German Copy

Eine native macOS-26-Menüleisten-App für Apple-Plattform-Entwickler. DevBar bereinigt Xcode- und SPM-Caches, steuert Simulatoren, unterstützt Git-Workflows mit Diffs, Commits, Push und Pull Requests und bündelt Referenzen sowie Entwicklerwerkzeuge. Die App arbeitet sandboxed und weitgehend offline; Commit-Nachrichten entstehen lokal mit Apple Intelligence.

## English Copy

A native macOS 26 menu-bar app for Apple-platform developers. DevBar cleans Xcode and SPM caches, controls simulators, supports Git workflows with diffs, commits, pushes and pull requests, and bundles references and everyday developer utilities. The app is sandboxed and mostly offline; commit messages are generated locally with Apple Intelligence.

## Technology Tags

- Swift
- SwiftUI
- Swift Concurrency
- Foundation
- AppKit
- Apple Intelligence
- macOS 26
- GitHub
- XCTest
- Xcode Cloud

## Link Behavior

DevBar uses `Website ansehen` in German and `View website` in English with a globe icon. Existing App Store projects keep their current App Store CTA and icon.

DevBar receives `linkType: 'website'`. The renderer uses the `websiteView` translation key for that value and falls back to the existing App Store CTA for projects without a link type.

## Verification

- The bilingual content contract requires DevBar to be the first project.
- German and English copy, periods, URL, link type, and technology tags are asserted.
- Existing App Store projects remain unchanged.
- Browser checks cover both languages, CTA text, external URL, desktop/mobile layout, overflow, and console health.
