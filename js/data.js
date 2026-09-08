/**
 * data.js — All CV content for Stefan Sturm's website.
 *
 * To add a new job:    push an object into `experience`
 * To add a new project: push an object into `projects`
 * To add a new skill category: push into `skills`
 */

const CV = {

  personal: {
    name:          'Stefan Sturm',
    title:         'Senior iOS Developer',
    tagline:       '15+ Jahre iOS-Entwicklung · Swift · SwiftUI · Combine',
    address:       'Albert-Brülls Str. 1, Willich, 47877',
    email:         'stefan.sturm@me.com',
    phone:         '01778911950',
    nationality:   'Deutsch',
    maritalStatus: 'Verheiratet',
    birthplace:    'Willich-Anrath',
    github:        'https://github.com/Urkman',
    linkedin:      'https://www.linkedin.com/in/sturmstefan/',
    twitter:       'https://x.com/StefanSturm_dev',
    website:       'https://stefansturm.de',
  },

  heroSummary: 'Ich entwickle hochwertige iOS-Apps mit Swift und SwiftUI und verbinde technische Tiefe mit klaren, reaktiven Benutzeroberflächen.',

  summary: `Stefan Sturm ist Senior iOS-Entwickler mit mehr als 15 Jahren Erfahrung in der
Entwicklung hochwertiger mobiler Anwendungen mit Swift. Sein Schwerpunkt liegt auf reaktiven
und deklarativen Benutzeroberflächen mit SwiftUI und Combine, Swift Concurrency mit async/await
und Actors sowie der Arbeit mit Foundation und den iOS-Plattform-APIs.
<br><br>
Er sichert seine Arbeit mit automatisierten Tests in Swift Testing und XCTest ab und setzt auf
verlässliche GitLab-CI/CD-Prozesse. Seine Projekterfahrung bei Unternehmen wie Chrono24, 1und1, RTL, Nexenio und
Porsche umfasst komplexe Produktlandschaften sowie ein internationales E-Commerce- und
Marktplatzumfeld. Sehr gute Deutsch- und Englischkenntnisse unterstützen die enge Zusammenarbeit
in interdisziplinären Teams.`,

  websiteSummary: `Ich bin Senior iOS-Entwickler mit mehr als 15 Jahren Erfahrung in der
Entwicklung hochwertiger mobiler Anwendungen mit Swift. Mein Schwerpunkt liegt auf reaktiven
und deklarativen Benutzeroberflächen mit SwiftUI und Combine, Swift Concurrency mit async/await
und Actors sowie der Arbeit mit Foundation und den iOS-Plattform-APIs.
<br><br>
Ich sichere meine Arbeit mit automatisierten Tests in Swift Testing und XCTest ab und setze auf
verlässliche GitLab-CI/CD-Prozesse. Meine Projekterfahrung bei Unternehmen wie Chrono24, 1und1, RTL, Nexenio und
Porsche umfasst komplexe Produktlandschaften sowie ein internationales E-Commerce- und
Marktplatzumfeld. Meine sehr guten Deutsch- und Englischkenntnisse unterstützen die enge Zusammenarbeit
in interdisziplinären Teams.`,

  stats: [
    { value: '15+', label: 'Jahre iOS' },
    { value: '12+', label: 'Unternehmen' },
    { value: '10+', label: 'Apps live' },
  ],

  languages: [
    { name: 'Deutsch', level: 'C2', note: 'Muttersprache' },
    { name: 'Englisch', level: 'C2', note: '' },
  ],

  // ──────────────────────────────────────────────
  // EXPERIENCE
  // Add new jobs at the TOP of this array.
  // Fields:
  //   period      – display string, e.g. "01/2026 – bis jetzt"
  //   current     – true if this is the current job (shows pulsing dot)
  //   role        – job title
  //   company     – company name
  //   location    – city
  //   appName     – optional app name
  //   appUrl      – optional App Store / product URL
  //   description – HTML-safe description string
  //   tech        – array of technology strings
  // ──────────────────────────────────────────────
  experience: [
    {
      period:   '03/2025 – bis jetzt',
      current:  true,
      role:     'Senior iOS Developer',
      company:  'EnBW',
      location: 'Karlsruhe',
      description: 'Bei EnBW unterstütze ich den Aufbau einer neuen App-Plattform. Dabei nutze ich AI-gestützte Workflows für Planung, technische Überprüfung, Implementierung, automatisierte Tests und Code Reviews unter eigener fachlicher Verantwortung.',
      tech: ['Swift', 'SwiftUI', 'Combine', 'TCA', 'MVVM', 'Swift Concurrency', 'SwiftData',
             'Foundation', 'XCTest', 'Swift Testing', 'GitLab CI/CD', 'REST (JSON)', 'Softwarearchitektur', 'CI/CD',
             'Jenkins', 'PullRequest', 'Gitlab', 'Git', 'Xcode', 'Azure DevOps',
             'UI Tests', 'Unit Tests', 'Snapshot Tests', 'SPM', 'Agentic Coding', 'AI-assisted Development'],
    },
    {
      period:   '11/2024 – 02/2025',
      role:     'Senior iOS Developer',
      company:  'Chrono24',
      location: 'Karlsruhe',
      appName:  'Chrono24 App',
      appUrl:   'https://apps.apple.com/de/app/chrono24-luxusuhren-shoppen/id472912032',
      description: 'Bei Chrono24 habe ich die Neuentwicklung des Katalogs in einem internationalen E-Commerce- und Marktplatzumfeld unterstützt.',
      tech: ['Swift', 'SwiftUI', 'Combine', 'TCA', 'CleanSwift', 'Swift Concurrency', 'SwiftData',
             'Foundation', 'XCTest', 'Swift Testing', 'GitLab CI/CD', 'REST (JSON)', 'GraphQL', 'CI/CD',
             'Jenkins', 'GitLab', 'Git', 'Xcode', 'Jira', 'Confluence',
             'UI Tests', 'Unit Tests', 'Snapshot Tests', 'SPM', 'E-Commerce', 'Marketplace'],
    },
    {
      period:   '03/2024 – 10/2024',
      role:     'Senior iOS Entwickler',
      company:  '1und1',
      location: 'München',
      appName:  '1und1 Mail Apps (z.B. GMX)',
      appUrl:   'https://apps.apple.com/de/app/gmx-mail-cloud/id417352269',
      description: 'Bei 1und1 habe ich an der Cloud Interaktion in den Mail Apps mitgearbeitet. Wir haben in dieser Zeit einen größeren Umstieg von UIKit auf SwiftUI fertiggestellt. Außerdem habe ich den Einbau von Attachments in der Mailliste fertiggestellt.',
      tech: ['Swift', 'UIKit', 'SwiftUI', 'Combine', 'REST (JSON)', 'Viper', 'CI/CD',
             'Jenkins', 'Gitlab', 'Git', 'Xcode', 'Jira', 'Confluence',
             'UI Tests', 'Unit Tests', 'Snapshot Tests', 'Cocoapods', 'SPM'],
    },
    {
      period:   '02/2022 – 09/2023',
      role:     'Senior iOS Developer',
      company:  'RTL',
      location: 'Köln',
      appName:  'RTL+ App',
      appUrl:   'https://apps.apple.com/de/app/rtl-musik/id1621290455',
      description: 'Bei RTL habe ich zuerst im Magazine Tema gearbeitet und dieses vom Anfang bis zum Public Release begleitet. Während der Entwicklung haben wir diverse UIKit Komponenten entwickelt, welche auch von anderen Teams in der gesamten RTL+ App genutzt wurden. Später haben wir die Live Events an den bereits vorhandenen Bereich Streaming angebunden – komplett in SwiftUI in die bestehende UIKit Application eingebunden.',
      tech: ['Swift', 'UIKit', 'SwiftUI', 'Combine', 'REST (JSON)', 'GraphQL', 'CleanSwift',
             'CI/CD', 'Jenkins', 'Gitlab', 'Git', 'Xcode', 'Jira', 'Confluence',
             'UI Tests', 'Unit Tests', 'Snapshot Tests', 'Cocoapods', 'SPM'],
    },
    {
      period:   '06/2021 – 01/2022',
      role:     'Senior iOS Developer',
      company:  'Nexenio (Luca App)',
      location: 'Berlin',
      appName:  'Luca App',
      appUrl:   'https://apps.apple.com/de/app/luca-app/id1531742708',
      description: 'Während der Corona Zeit habe ich an der Luca App mitgearbeitet. Hier gab es einen besonderen Fokus auf die Sicherheit der App und das Verschlüsseln der Daten. So haben wir ein komplexes System zum Speichern und Transport der verschlüsselten Daten entwickelt, so dass man abgleichen konnte wer zu welchem Zeitpunkt an einem bestimmten Ort war – ohne zu wissen wer genau dort war.',
      tech: ['Swift', 'UIKit', 'RXSwift', 'REST (JSON)', 'GraphQL', 'MVVM+C', 'CI/CD',
             'Jenkins', 'BitBucket', 'Git', 'Xcode', 'Jira', 'Confluence',
             'UI Tests', 'Unit Tests', 'Snapshot Tests', 'Cocoapods', 'SPM',
             'CryptoKit', 'CryptoSwift'],
    },
    {
      period:   '01/2021 – 05/2021',
      role:     'Senior iOS Developer',
      company:  'Comdirect',
      location: 'Rostock',
      appName:  'Comdirect Phototan App',
      appUrl:   'https://apps.apple.com/de/app/comdirect-phototan-app/id623841273',
      description: 'Bei Comdirekt habe ich an der Phototan App gearbeitet. Hier war hauptsächlich der Umstieg von vielen Bereichen von UIKit zu SwiftUI auf dem Programm. Außerdem musste eine reibungslose Zusammenarbeit mit der Comdirekt Banking App sichergestellt werden.',
      tech: ['Swift', 'UIKit', 'SwiftUI', 'RXSwift', 'REST (JSON)', 'Viper', 'CI/CD',
             'Jenkins', 'BitBucket', 'Git', 'Xcode', 'Jira', 'Confluence',
             'Unit Tests', 'Snapshot Tests', 'Cocoapods', 'SPM'],
    },
    {
      period:   '04/2020 – 12/2020',
      role:     'Senior iOS Developer',
      company:  'Buhl',
      location: 'Mannheim',
      appName:  'Steuer:Phone App',
      appUrl:   'https://apps.apple.com/de/app/id1464163709',
      description: 'Bei Buhl bin ich in die laufende Entwicklung der Steuer:Phone App eingestiegen. Die erste große Aufgabe bestand darin die bestehende Architektur von MVC auf MVVM+C umzubauen. Das Besondere an der App ist, dass die ganzen Dialoge auf Serverseite generiert und als JSON an den Client gesendet werden. Der Client wandelt dieses komplexe JSON in UIKit-Dialoge um.',
      tech: ['Swift', 'UIKit', 'REST (JSON)', 'MVVM+C', 'CI/CD', 'Jenkins', 'Gitlab', 'Git',
             'Xcode', 'Jira', 'Confluence', 'UI Tests', 'Unit Tests', 'Snapshot Tests',
             'Cocoapods', 'SPM'],
    },
    {
      period:   '06/2019 – 03/2020',
      role:     'Senior iOS Developer',
      company:  'Porsche',
      location: 'Ludwigsburg',
      appName:  'My Porsche iOS App',
      appUrl:   'https://apps.apple.com/de/app/my-porsche/id1410059174',
      description: 'Entwicklung und Weiterentwicklung der My Porsche iOS App für Porsche-Fahrer.',
      tech: ['Swift', 'UIKit', 'RXSwift', 'REST (JSON)', 'MVVM+C', 'CI/CD', 'Jenkins',
             'Gitlab', 'Git', 'Xcode', 'Jira', 'Confluence',
             'UI Tests', 'Unit Tests', 'Snapshot Tests', 'Cocoapods', 'SPM'],
    },
    {
      period:   '04/2017 – 05/2019',
      role:     'Senior iOS Developer',
      company:  'iWelt',
      location: 'Würzburg',
      description: 'Bei der iWelt App handelt es sich um eine nur intern von Verkäufern genutzte reine iPad App. Das Besondere war die mehrstufige Navigation, bei der über Swipe-Gesten mehrere Ebenen auf- und zugeklappt werden konnten.',
      tech: ['Swift', 'UIKit', 'CouchDB', 'Realm', 'REST (JSON)', 'CleanSwift', 'CI/CD',
             'Jenkins', 'Gitlab', 'Git', 'Xcode', 'Jira', 'Confluence',
             'Unit Tests', 'Cocoapods'],
    },
    {
      period:   '11/2016 – 03/2017',
      role:     'Senior iOS Developer',
      company:  'Tallence',
      location: 'Hamburg',
      appName:  'Miles & More Worldshop Discover',
      appUrl:   'https://www.worldshop.eu/weblws/wsdiscover/de',
      description: 'Bei der Entwicklung der Worldshop Discover App stand auch der Umbau von MVC auf MVVM und der Umstieg von Objective-C auf Swift im Vordergrund.',
      tech: ['Swift', 'Objective-C', 'UIKit', 'CouchDB', 'Realm', 'REST (JSON)', 'MVVM',
             'CI/CD', 'Jenkins', 'Gitlab', 'Git', 'Xcode', 'Jira', 'Unit Tests', 'Cocoapods'],
    },
    {
      period:   '03/2015 – 10/2016',
      role:     'Senior iOS Developer',
      company:  'DRF',
      location: 'Koblenz',
      appName:  'DRF-TV Streaming App',
      appUrl:   'https://itunes.apple.com/de/app/drf-tv/id990927341',
      description: 'Die App war eine komplette Neuentwicklung und stellte das erste Swift-Projekt dar. Alles wurde mit der gerade vorgestellten Swift Version 1.0 entwickelt. Wir haben diverse 3rd-Party-Frameworks intern in Swift neu entwickelt, was beim Thema Video Streaming eine große Herausforderung war.',
      tech: ['Swift', 'UIKit', 'REST (JSON)', 'MVVM', 'Gitlab', 'Git', 'Xcode',
             'Unit Tests', 'Cocoapods', 'Streaming'],
    },
    {
      period:   '01/2015 – 02/2015',
      role:     'Senior iOS Developer',
      company:  'Vodafone',
      location: 'Düsseldorf',
      appName:  'Secure Net Wifi V 2.0',
      appUrl:   'https://itunes.apple.com/de/app/secure-net-wifi/id948735400?mt=8',
      description: 'Entwicklung der iOS (Universal) Applikation Secure Net Wifi V 2.0.',
      tech: ['Objective-C', 'UIKit', 'CouchDB', 'Realm', 'REST (XML)', 'MVC',
             'Gitlab', 'Git', 'Xcode', 'Unit Tests', 'Cocoapods'],
    },
    {
      period:   '01/2014 – 08/2014',
      role:     'Senior iOS Developer',
      company:  'Bosch',
      location: 'Viersen',
      appName:  'Confectionery App',
      appUrl:   'https://itunes.apple.com/de/app/confectionery/id863110297?mt=8',
      description: 'Entwicklung der iOS (Universal) Applikation Confectionery.',
      tech: ['Objective-C', 'UIKit', 'REST (JSON)', 'MVC',
             'Gitlab', 'Git', 'Xcode', 'Unit Tests', 'Cocoapods'],
    },
    {
      period:   '2004 – 2013',
      role:     'PHP/Frontend Developer',
      company:  'Diverse',
      location: 'Deutschland',
      description: 'Diverse Projekte als PHP / Frontend-Entwickler.',
      tech: ['PHP', 'HTML', 'CSS', 'JavaScript'],
    },
  ],

  // ──────────────────────────────────────────────
  // SKILLS
  // Add new skill categories or items here.
  // ──────────────────────────────────────────────
  skills: [
    {
      category: 'iOS Entwicklung',
      icon: 'fab fa-apple',
      items: [
        { name: 'Swift',          years: '10 Jahre' },
        { name: 'SwiftUI',        years: '5 Jahre' },
        { name: 'UIKit',          years: '15 Jahre' },
        { name: 'Combine',        years: '5 Jahre' },
        { name: 'Swift Concurrency', years: '3 Jahre' },
        { name: 'async/await',       years: '3 Jahre' },
        { name: 'Actors',            years: '3 Jahre' },
        { name: 'Foundation',        years: '15 Jahre' },
        { name: 'iOS-Plattform-APIs', years: '15 Jahre' },
        { name: 'Widgets / Siri', years: '5 Jahre' },
        { name: 'Apple Watch',    years: '10 Jahre' },
        { name: 'iPhone / iPad',  years: '15 Jahre' },
      ],
    },
    {
      category: 'Architektur',
      icon: 'fas fa-sitemap',
      items: [
        { name: 'MVVM' },
        { name: 'MVVM+C' },
        { name: 'CleanSwift' },
        { name: 'Viper' },
        { name: 'MVC' },
        { name: 'TCA' },
      ],
    },
    {
      category: 'Backend & APIs',
      icon: 'fas fa-server',
      items: [
        { name: 'REST/JSON',  years: '20 Jahre' },
        { name: 'GraphQL',    years: '6 Jahre' },
        { name: 'Vapor',      years: '6 Jahre' },
      ],
    },
    {
      category: 'Tools & CI/CD',
      icon: 'fas fa-wrench',
      items: [
        { name: 'Xcode',             years: '15 Jahre' },
        { name: 'Git',               years: '15 Jahre' },
        { name: 'Jenkins',           years: '15 Jahre' },
        { name: 'Jira / Confluence', years: '20 Jahre' },
        { name: 'Shell',             years: '20 Jahre' },
        { name: 'GitLab CI/CD' },
        { name: 'Azure DevOps' },
        { name: 'Xcode Cloud' },
        { name: 'SPM' },
        { name: 'CocoaPods' },
        { name: 'RocketSim' },
        { name: 'App Store Connect CLI' },
      ],
    },
    {
      category: 'Agile Arbeitsmethoden',
      icon: 'fas fa-arrows-spin',
      items: [
        { name: 'Scrum' },
        { name: 'Kanban' },
      ],
    },
    {
      category: 'Testing',
      icon: 'fas fa-vial',
      items: [
        { name: 'Swift Testing' },
        { name: 'XCTest',         years: '10 Jahre' },
        { name: 'UI Tests',       years: '10 Jahre' },
        { name: 'Snapshot Tests', years: '10 Jahre' },
      ],
    },
    {
      category: 'Sicherheit & Crypto',
      icon: 'fas fa-shield-halved',
      items: [
        { name: 'CryptoKit' },
        { name: 'CryptoSwift' },
        { name: 'Bluetooth' },
        { name: 'Verschlüsselungen' },
      ],
    },
    {
      category: 'AI & Agentic Development',
      icon: 'fas fa-microchip',
      items: [
        { name: 'Agentic Coding' },
        { name: 'Prompt & Context Engineering' },
        { name: 'Planungs- & Ausführungs-Skills' },
        { name: 'AI-gestütztes Testing' },
        { name: 'AI Code Review' },
        { name: 'Modell- & Reasoning-Auswahl' },
        { name: 'MCP-Integration' },
      ],
    },
    {
      category: 'AI Harnesses & Tools',
      icon: 'fas fa-wand-magic-sparkles',
      items: [
        { name: 'Codex' },
        { name: 'Grok' },
        { name: 'Claude Code' },
        { name: 'XcodeBuildMCP' },
      ],
    },
  ],

  ai: {
    title: 'AI-gestützte Entwicklung',
    introduction: 'Ich verbinde langjährige iOS-Erfahrung mit AI-gestützter und agentischer Entwicklung. AI dient dabei nicht als Autopilot, sondern als präzise gesteuertes Engineering-Werkzeug: Ich strukturiere den Kontext, wähle Modell und Reasoning passend zur Aufgabe und überprüfe jedes Ergebnis mit Code, Tests und fachlicher Erfahrung.',
    workflowTitle: 'Workflow',
    workflow: [
      { step: '01', title: 'Planung', description: 'Ziel, Kontext, Risiken und Akzeptanzkriterien mit brainstorming und writing-plans präzisieren.' },
      { step: '02', title: 'Überprüfung', description: 'Codebasis, APIs, Anforderungen und Annahmen prüfen, bevor Änderungen entstehen.' },
      { step: '03', title: 'Implementierung', description: 'Fokussierte Tasks mit passenden Skills und MCPs umsetzen und direkt durch Tests absichern.' },
      { step: '04', title: 'Code Review & Auslieferung', description: 'Diffs, Tests, Regressionen, Performance und Sicherheit prüfen; Änderungen kontrolliert ausliefern.' },
    ],
    agentsTitle: 'Harnesses / Coding-Agenten',
    agents: [
      { name: 'Codex', role: 'Planung & Business-Logik', description: 'Für Specs, Implementierungspläne, Architekturentscheidungen und die strukturierte Umsetzung komplexer Business-Logik.' },
      { name: 'Grok', role: 'Planung, Gegenprüfung & Business-Logik', description: 'Für alternative Lösungswege, technische Gegenprüfung und die Entwicklung anspruchsvoller Business-Logik.' },
      { name: 'Claude Code', role: 'UI & Kreativität', description: 'Für UI-Konzeption, visuelle Ausarbeitung, kreative Exploration und die Umsetzung hochwertiger Benutzeroberflächen.' },
    ],
    skillsTitle: 'Skills',
    skills: [
      { category: 'Planung & Ausführung', items: ['brainstorming', 'writing-plans', 'executing-plans'] },
      { category: 'Apple-Plattformen', items: ['swiftui-expert-skill', 'swift-concurrency', 'swiftdata-pro', 'swiftui-liquid-glass'] },
      { category: 'Qualität & Auslieferung', items: ['swiftui-performance-audit', 'test-triage', 'asc-release-flow'] },
    ],
    mcpsTitle: 'MCPs',
    mcps: [
      { name: 'XcodeBuildMCP', status: 'Im Einsatz', state: 'active', description: 'Builds, Tests, Simulator-Läufe, Logs, Debugging und visuelle UI-Prüfung für Apple-Plattformen.' },
      { name: 'Browser / Computer Use', status: 'Im Einsatz', state: 'active', description: 'Dokumentationsrecherche, Browser-Automation und visuelle Verifikation von Web- und App-Abläufen.' },
      { name: 'Devil MCP Server', status: 'In Entwicklung', state: 'building', description: 'Ein eigener MCP-Server ist im Aufbau, um ausgewählte Devil-Funktionen für AI-Agenten zugänglich zu machen.' },
    ],
    reasoningTitle: 'Reasoning & Token-Effizienz',
    reasoningNote: 'Modell und Reasoning-Tiefe wähle ich nach Arbeitsphase und Risiko: Planung und Review erhalten bewusst mehr Denktiefe, während ein abgestimmter Plan mit deutlich weniger Tokens umgesetzt werden kann. Diese Logik ist modellübergreifend und lässt sich beispielsweise auf Codex Sol und Luna ebenso anwenden wie auf Claude Opus und Fable.',
    reasoning: [
      { level: 'Max', use: 'Planung', description: 'Anforderungen, Risiken und Architektur mit maximaler Reasoning-Tiefe analysieren und daraus Specs sowie einen belastbaren Implementierungsplan erstellen.', weight: 4 },
      { level: 'Low', use: 'Implementierung', description: 'Den abgestimmten Plan fokussiert und token-effizient abarbeiten; die wesentlichen Entscheidungen sind bereits getroffen.', weight: 1 },
      { level: 'Low / High', use: 'Bugfixing', description: 'Low für einfache UI- und Layoutfehler; High für komplexe Logik-, State-, Daten- oder Concurrency-Bugs.', weight: 3 },
      { level: 'High', use: 'Code Review', description: 'Diffs, Tests, Regressionen, Performance und Sicherheit gründlich und unabhängig prüfen.', weight: 3 },
    ],
    proofTitle: 'Praxis',
    proof: [
      { project: 'Devil – Apple Developer Toolkit', description: 'End-to-end mit AI-gestützten, agentischen Workflows unter eigener technischer Leitung entwickelt.' },
      { project: 'Fast.io – Fasting Timer', description: 'End-to-end mit AI-gestützten, agentischen Workflows unter eigener technischer Leitung entwickelt.' },
      { project: 'EnBW – Neue App-Plattform', description: 'AI-gestützte Workflows für Planung, technische Überprüfung, Implementierung, Tests und Code Reviews.' },
    ],
    compactSummary: 'Agentic Coding mit den Harnesses Codex, Grok und Claude Code: Planung und Business-Logik mit Codex und Grok, UI und kreative Umsetzung mit Claude Code; Workflow aus Planung, Überprüfung, Implementierung und Code Review; spezialisierte Skills und XcodeBuildMCP; phasen- und risikogerechte Reasoning-Auswahl von Planung über Implementierung und Bugfixing bis zum Review. Ein eigener Devil MCP Server ist in Entwicklung.',
  },

  // ──────────────────────────────────────────────
  // PROJECTS
  // Add new personal projects here.
  // ──────────────────────────────────────────────
  projects: [
    {
      name: 'Devil – Apple Developer Toolkit',
      period: '2026 – bis jetzt',
      url: 'https://devbar.netlify.app',
      linkType: 'website',
      description: 'Eine native macOS-26-Menüleisten-App für Apple-Plattform-Entwickler. Devil bereinigt Xcode- und SPM-Caches, steuert Simulatoren, unterstützt Git-Workflows mit Diffs, Commits, Push und Pull Requests und bündelt Referenzen sowie Entwicklerwerkzeuge. Die App arbeitet sandboxed und weitgehend offline; Commit-Nachrichten entstehen lokal mit Apple Intelligence. Ein eigener MCP-Server für Devil befindet sich in Entwicklung. End-to-end mit AI-gestützten, agentischen Workflows unter eigener technischer Leitung entwickelt.',
      cvDescription: 'Native macOS-26-Menüleisten-App zum Bereinigen von Xcode- und SPM-Caches, Steuern von Simulatoren und Ausführen von Git-Workflows mit lokaler Apple Intelligence. Ein eigener MCP-Server für Devil befindet sich in Entwicklung. End-to-end mit AI-gestützten, agentischen Workflows unter eigener technischer Leitung entwickelt.',
      tech: [
        'Swift',
        'SwiftUI',
        'Swift Concurrency',
        'Foundation',
        'AppKit',
        'Apple Intelligence',
        'macOS 26',
        'GitHub',
        'XCTest',
        'Xcode Cloud',
        'MVVM',
        'MCP',
      ],
    },
    {
      name:   'Fast.io – Fasting Timer',
      period: '2025 – bis jetzt',
      url:    'https://apps.apple.com/de/app/fast-io-fasting-timer/id6755233993',
      description: 'Ein einfach zu bedienender Intervallfasten-Timer für iPhone und Apple Watch. Fast.io hilft dabei, Fastenziele konsequent zu verfolgen – mit Echtzeit-Tracking, Hydration-Log, Live Activities, Dynamic Island, Home Screen Widgets und Apple Health Integration. Unterstützt populäre Fasten-Schemata wie 16:8, 18:6 und OMAD. Als Einmalkauf erhältlich – kein Abo. End-to-end mit AI-gestützten, agentischen Workflows unter eigener technischer Leitung entwickelt.',
      cvDescription: 'Intervallfasten-Timer für iPhone und Apple Watch mit Live Activities, Widgets, Apple Health und Hydration-Tracking. End-to-end mit AI-gestützten, agentischen Workflows unter eigener technischer Leitung entwickelt.',
      tech: ['Swift', 'SwiftUI', 'Swift Concurrency', 'Foundation', 'Swift Testing', 'XCTest',
             'HealthKit', 'Live Activities', 'WidgetKit', 'Apple Watch', 'Dynamic Island',
             'Xcode Cloud', 'MVVM'],
    },
    {
      name:   'OverlayLab – Weather Camera & Text Overlays',
      period: '2025 – bis jetzt',
      url:    'https://apps.apple.com/de/app/overlaylab/id6749015733',
      description: 'Verwandelt jedes Foto in eine Geschichte mit Live-Wetter-, Standort- und Text-Overlays. Fotos aufnehmen oder aus der Bibliothek importieren, mit Wetter (Temperatur, Luftfeuchtigkeit, Wind), Datum, Uhrzeit und eigenem Text versehen, Stile anpassen und direkt teilen. Pro-Version: 5-Sekunden-Videos mit Overlays und Export ohne Branding.',
      cvDescription: 'Kamera-App für Wetter-, Standort- und Text-Overlays auf Fotos und Videos.',
      tech: ['Swift', 'SwiftUI', 'CoreLocation', 'WeatherKit', 'Photos',
             'AVFoundation', 'Xcode Cloud', 'MVVM'],
    },
    {
      name:   'S3XY Watch for Tesla',
      period: '12/2022 – bis jetzt',
      url:    'https://apps.apple.com/de/app/s3xy-watch/id6444442058',
      description: 'Entwicklung einer App zur Steuerung und Überwachung eines Teslas. Die App ist komplett mit den neusten Frameworks von Apple entwickelt, da ich sie als Lernobjekt für neuste Technologien nutze. Sie besteht aus der App selbst sowie einer REST-API-Schnittstelle, die ebenfalls mit Swift / Vapor entwickelt wurde.',
      cvDescription: 'iPhone- und Apple-Watch-App zur Steuerung und Überwachung eines Teslas mit Swift/Vapor-Backend.',
      tech: ['Swift', 'SwiftUI', 'Vapor', 'REST (JSON)', 'MVVM', 'Xcode Cloud',
             'Tesla API', 'Bluetooth', 'CryptoKit', 'CryptoSwift'],
    },
    // ── Add more projects below ──
    // {
    //   name: 'My Next App',
    //   period: '01/2026 – bis jetzt',
    //   url: 'https://apps.apple.com/...',
    //   description: 'Description...',
    //   tech: ['Swift', 'SwiftUI'],
    // },
  ],

  // ──────────────────────────────────────────────
  // EDUCATION
  // ──────────────────────────────────────────────
  education: [
    { period: '1993 – 1995', degree: 'Informationstechnik',       institution: 'Fachhochschule, 4 Semester Elektrotechnik' },
    { period: '1991 – 1993', degree: 'Fachhochschulreife',         institution: 'Fachoberschule, Kempen' },
    { period: '1995 – 1996', degree: 'Softwareentwicklung',        institution: 'Dekra, Düsseldorf' },
    { period: '1987 – 1991', degree: 'Kommunikationselektroniker', institution: 'Deutsche Bahn, Krefeld/Wuppertal' },
    { period: '1986 – 1987', degree: 'Elektrotechnik',             institution: 'Berufsfachschule, Kempen' },
    { period: '1980 – 1986', degree: 'Fachoberschulreife',         institution: 'Hauptschule, Willich' },
  ],

};

const I18N = {
  de: {
    skipLink: 'Zum Hauptinhalt springen',
    mainNav: 'Hauptnavigation',
    menuToggle: 'Menü öffnen/schließen',
    themeToggle: 'Dark mode umschalten',
    themeToggleLight: 'Light mode umschalten',
    languageToggle: 'Sprache wählen',
    navAbout: 'Über mich',
    navExperience: 'Erfahrung',
    navSkills: 'Skills',
    navAI: 'AI',
    navProjects: 'Projekte',
    navEducation: 'Ausbildung',
    navContact: 'Kontakt',
    heroTagline: '15+ Jahre iOS-Entwicklung',
    downloadPdf: 'Download as PDF',
    downloadMd: 'Download as MD',
    downloadPdfText: 'Download as PDF',
    downloadMdText: 'Download as MD',
    pdfExportMenu: 'PDF-Export auswählen',
    compactCvTitle: 'Kompakter CV',
    compactCvDescription: 'Professioneller Lebenslauf auf zwei Seiten',
    expandedCvTitle: 'Ausführlicher CV',
    expandedCvDescription: 'Vollständiger Lebenslauf mit allen Details',
    heroExperience: 'Meine Erfahrung',
    aboutTitle: 'Über mich',
    experienceTitle: 'Beruflicher Werdegang',
    skillsTitle: 'Kenntnisse',
    projectsTitle: 'Projekte',
    educationTitle: 'Ausbildung',
    contactTitle: 'Kontakt',
    footerLocation: 'Willich, Deutschland',
    pdfCreating: 'CV wird erstellt…',
    current: 'Aktuell',
    appStoreView: 'Im App Store ansehen',
    websiteView: 'Website ansehen',
    cvPrint: 'Als PDF speichern',
    cvContact: 'Kontakt',
    cvCoreSkills: 'Kernkompetenzen',
    cvLanguages: 'Sprachen',
    cvPersonal: 'Persönlich',
    cvNationality: 'Nationalität',
    cvBirthplace: 'Geburtsort',
    cvMaritalStatus: 'Familienstand',
    cvProfile: 'Profil',
    cvExperience: 'Beruflicher Werdegang',
    cvProjects: 'Projekte',
    cvSkills: 'Kenntnisse',
    cvEducation: 'Ausbildung',
    cvProfileSummary: 'Senior iOS-Entwickler mit mehr als 15 Jahren Erfahrung in der Entwicklung hochwertiger Apps mit Swift, SwiftUI und Combine. Schwerpunkte sind Swift Concurrency, Foundation, iOS-Plattform-APIs sowie automatisierte Tests mit Swift Testing und XCTest. Erfahrung in komplexen Produktlandschaften, E-Commerce- und Marktplatzumfeldern sowie verlässlichen GitLab-CI/CD-Prozessen.',
    cvLocation: 'Willich, Deutschland',
    cvEarlierExperience: 'Frühere Berufserfahrung',
    cvAdditionalExperience: 'Weitere Stationen',
    cvSelectedProjects: 'Ausgewählte Projekte',
    cvTechnicalSkills: 'Technische Kenntnisse',
    cvPage: 'Seite',
    cvExpandedLabel: 'Ausführlicher Lebenslauf',
    cvStatistics: 'Profil in Zahlen',
    markdownProfile: 'Profil',
  },
  en: {
    skipLink: 'Skip to main content',
    mainNav: 'Main navigation',
    menuToggle: 'Open/close menu',
    themeToggle: 'Toggle dark mode',
    themeToggleLight: 'Toggle light mode',
    languageToggle: 'Choose language',
    navAbout: 'About',
    navExperience: 'Experience',
    navSkills: 'Skills',
    navAI: 'AI',
    navProjects: 'Projects',
    navEducation: 'Education',
    navContact: 'Contact',
    heroTagline: '15+ years of iOS development',
    downloadPdf: 'Download as PDF',
    downloadMd: 'Download as MD',
    downloadPdfText: 'Download as PDF',
    downloadMdText: 'Download as MD',
    pdfExportMenu: 'Choose PDF export',
    compactCvTitle: 'Compact CV',
    compactCvDescription: 'Professional two-page resume',
    expandedCvTitle: 'Expanded CV',
    expandedCvDescription: 'Complete resume with every detail',
    heroExperience: 'My experience',
    aboutTitle: 'About me',
    experienceTitle: 'Professional Experience',
    skillsTitle: 'Skills',
    projectsTitle: 'Projects',
    educationTitle: 'Education',
    contactTitle: 'Contact',
    footerLocation: 'Willich, Germany',
    pdfCreating: 'Creating CV…',
    current: 'Current',
    appStoreView: 'View on the App Store',
    websiteView: 'View website',
    cvPrint: 'Save as PDF',
    cvContact: 'Contact',
    cvCoreSkills: 'Core skills',
    cvLanguages: 'Languages',
    cvPersonal: 'Personal',
    cvNationality: 'Nationality',
    cvBirthplace: 'Place of birth',
    cvMaritalStatus: 'Marital status',
    cvProfile: 'Profile',
    cvExperience: 'Professional Experience',
    cvProjects: 'Projects',
    cvSkills: 'Skills',
    cvEducation: 'Education',
    cvProfileSummary: 'Senior iOS developer with more than 15 years of experience building high-quality apps with Swift, SwiftUI and Combine. Key strengths include Swift Concurrency, Foundation, iOS platform APIs, and automated testing with Swift Testing and XCTest. Experienced in complex product environments, e-commerce and marketplaces, and reliable GitLab CI/CD delivery.',
    cvLocation: 'Willich, Germany',
    cvEarlierExperience: 'Earlier Experience',
    cvAdditionalExperience: 'Additional Experience',
    cvSelectedProjects: 'Selected Projects',
    cvTechnicalSkills: 'Technical Skills',
    cvPage: 'Page',
    cvExpandedLabel: 'Expanded Resume',
    cvStatistics: 'Profile at a Glance',
    markdownProfile: 'Profile',
  },
};

const CV_TRANSLATIONS = {
  en: {
    personal: {
      tagline: '15+ years of iOS development · Swift · SwiftUI · Combine',
      address: 'Albert-Brülls Str. 1, Willich, 47877, Germany',
      nationality: 'German',
      maritalStatus: 'Married',
      birthplace: 'Willich-Anrath',
    },
    heroSummary: 'I build high-quality iOS apps with Swift and SwiftUI, combining technical depth with clear, reactive user interfaces.',
    summary: `Stefan Sturm is a senior iOS developer with more than 15 years of experience building high-quality mobile applications with Swift. His focus includes reactive and declarative user interfaces with SwiftUI and Combine, Swift Concurrency with async/await and Actors, and practical work with Foundation and iOS platform APIs.
<br><br>
He safeguards delivery with automated tests in Swift Testing and XCTest and relies on robust GitLab CI/CD processes. His project experience at companies such as Chrono24, 1&1, RTL, Nexenio and Porsche covers complex product environments as well as an international e-commerce and marketplace setting. Professional German and English support close collaboration in interdisciplinary teams.`,
    websiteSummary: `I am a senior iOS developer with more than 15 years of experience building high-quality mobile applications with Swift. My focus includes reactive and declarative user interfaces with SwiftUI and Combine, Swift Concurrency with async/await and Actors, and practical work with Foundation and iOS platform APIs.
<br><br>
I safeguard delivery with automated tests in Swift Testing and XCTest and rely on robust GitLab CI/CD processes. My project experience at companies such as Chrono24, 1&1, RTL, Nexenio and Porsche covers complex product environments as well as an international e-commerce and marketplace setting. My strong German and English skills support close collaboration in interdisciplinary teams.`,
    stats: [
      { label: 'years iOS' },
      { label: 'companies' },
      { label: 'apps live' },
    ],
    languages: [
      { name: 'German', note: 'Native language' },
      { name: 'English' },
    ],
    experience: [
      {
        period: '03/2025 – present',
        description: 'At EnBW, I support the development of a new app platform. I use AI-assisted workflows for planning, technical verification, implementation, automated testing, and code reviews while retaining engineering ownership.',
        tech: ['Swift', 'SwiftUI', 'Combine', 'TCA', 'MVVM', 'Swift Concurrency', 'SwiftData',
               'Foundation', 'XCTest', 'Swift Testing', 'GitLab CI/CD', 'REST (JSON)', 'Software architecture', 'CI/CD',
               'Jenkins', 'Pull requests', 'GitLab', 'Git', 'Xcode', 'Azure DevOps',
               'UI tests', 'Unit tests', 'Snapshot tests', 'SPM', 'Agentic Coding', 'AI-assisted Development'],
      },
      {
        description: 'At Chrono24, I supported the redevelopment of the catalog in an international e-commerce and marketplace environment.',
        tech: ['Swift', 'SwiftUI', 'Combine', 'TCA', 'CleanSwift', 'Swift Concurrency', 'SwiftData',
               'Foundation', 'XCTest', 'Swift Testing', 'GitLab CI/CD', 'REST (JSON)', 'GraphQL', 'CI/CD',
               'Jenkins', 'GitLab', 'Git', 'Xcode', 'Jira', 'Confluence',
               'UI tests', 'Unit tests', 'Snapshot tests', 'SPM', 'E-Commerce', 'Marketplace'],
      },
      {
        role: 'Senior iOS Developer',
        location: 'Munich',
        appName: '1&1 Mail Apps (e.g. GMX)',
        description: 'At 1&1, I worked on cloud interactions in the mail apps. During that time, we completed a larger migration from UIKit to SwiftUI. I also completed attachment support in the mail list.',
        tech: ['Swift', 'UIKit', 'SwiftUI', 'Combine', 'REST (JSON)', 'Viper', 'CI/CD',
               'Jenkins', 'GitLab', 'Git', 'Xcode', 'Jira', 'Confluence',
               'UI tests', 'Unit tests', 'Snapshot tests', 'CocoaPods', 'SPM'],
      },
      {
        location: 'Cologne',
        description: 'At RTL, I first worked on the magazine team and accompanied that area from the beginning through to public release. During development, we built several UIKit components that were also used by other teams across the RTL+ app. Later, we connected live events to the existing streaming area, implemented completely in SwiftUI and embedded into the existing UIKit application.',
      },
      {
        description: 'During the Covid period, I worked on the Luca App. The project had a strong focus on app security and data encryption. We built a complex system for storing and transporting encrypted data so it was possible to match who had been at a specific place at a specific time without knowing exactly who was there.',
        tech: ['Swift', 'UIKit', 'RxSwift', 'REST (JSON)', 'GraphQL', 'MVVM+C', 'CI/CD',
               'Jenkins', 'Bitbucket', 'Git', 'Xcode', 'Jira', 'Confluence',
               'UI tests', 'Unit tests', 'Snapshot tests', 'CocoaPods', 'SPM',
               'CryptoKit', 'CryptoSwift'],
      },
      {
        appName: 'Comdirect PhotoTAN App',
        description: 'At Comdirect, I worked on the PhotoTAN app. The main topic was migrating many areas from UIKit to SwiftUI. We also had to ensure smooth collaboration with the Comdirect banking app.',
      },
      {
        appName: 'Steuer:Phone App',
        description: 'At Buhl, I joined ongoing development of the Steuer:Phone app. The first major task was migrating the existing architecture from MVC to MVVM+C. A special aspect of the app is that the dialogs are generated on the server side and sent to the client as JSON. The client transforms this complex JSON into UIKit dialogs.',
      },
      {
        description: 'Development and continued improvement of the My Porsche iOS app for Porsche drivers.',
      },
      {
        location: 'Wuerzburg',
        description: 'The iWelt app was an internal iPad-only app used by sales staff. Its defining feature was multi-level navigation where several layers could be opened and closed via swipe gestures.',
      },
      {
        description: 'During development of the Worldshop Discover app, the main focus was migrating from MVC to MVVM and moving from Objective-C to Swift.',
      },
      {
        description: 'The app was a complete new development and the first Swift project. Everything was built with the newly introduced Swift 1.0. We reimplemented several third-party frameworks internally in Swift, which was a major challenge for video streaming.',
      },
      {
        location: 'Duesseldorf',
        description: 'Development of the iOS universal application Secure Net Wifi V 2.0.',
        tech: ['Objective-C', 'UIKit', 'CouchDB', 'Realm', 'REST (XML)', 'MVC',
               'GitLab', 'Git', 'Xcode', 'Unit tests', 'CocoaPods'],
      },
      {
        description: 'Development of the iOS universal application Confectionery.',
        tech: ['Objective-C', 'UIKit', 'REST (JSON)', 'MVC',
               'GitLab', 'Git', 'Xcode', 'Unit tests', 'CocoaPods'],
      },
      {
        company: 'Various',
        location: 'Germany',
        description: 'Various projects as a PHP / frontend developer.',
        tech: ['PHP', 'HTML', 'CSS', 'JavaScript'],
      },
    ],
    skills: [
      {
        category: 'iOS Development',
        items: [
          { years: '10 years' },
          { years: '5 years' },
          { years: '15 years' },
          { years: '5 years' },
          { years: '3 years' },
          { years: '3 years' },
          { years: '3 years' },
          { years: '15 years' },
          { name: 'iOS platform APIs', years: '15 years' },
          { years: '5 years' },
          { years: '10 years' },
          { years: '15 years' },
        ],
      },
      { category: 'Architecture' },
      {
        category: 'Backend & APIs',
        items: [
          { years: '20 years' },
          { years: '6 years' },
          { years: '6 years' },
        ],
      },
      {
        category: 'Tools & CI/CD',
        items: [
          { years: '15 years' },
          { years: '15 years' },
          { years: '15 years' },
          { years: '20 years' },
          { years: '20 years' },
        ],
      },
      {
        category: 'Agile Ways of Working',
        items: [
          { name: 'Scrum' },
          { name: 'Kanban' },
        ],
      },
      {
        category: 'Testing',
        items: [
          {},
          { years: '10 years' },
          { years: '10 years' },
          { years: '10 years' },
        ],
      },
      {
        category: 'Security & Crypto',
        items: [
          {},
          {},
          {},
          { name: 'Encryption' },
        ],
      },
      {
        category: 'AI & Agentic Development',
        items: [
          {},
          {},
          { name: 'Planning & Execution Skills' },
          { name: 'AI-assisted Testing' },
          {},
          { name: 'Model & Reasoning Selection' },
          { name: 'MCP Integration' },
        ],
      },
      { category: 'AI Harnesses & Tools' },
    ],
    ai: {
      title: 'AI-Supported Development',
      introduction: 'I combine extensive iOS experience with AI-supported and agentic development. AI is not an autopilot; it is a precisely directed engineering tool. I structure the context, select the model and reasoning depth for the task, and verify every result through code, tests, and engineering experience.',
      workflowTitle: 'Workflow',
      workflow: [
        { title: 'Planning', description: 'Clarify goals, context, risks, and acceptance criteria with brainstorming and writing-plans.' },
        { title: 'Verification', description: 'Inspect the codebase, APIs, requirements, and assumptions before changes are made.' },
        { title: 'Implementation', description: 'Execute focused tasks with suitable Skills and MCPs, backed immediately by tests.' },
        { title: 'Code Review & Delivery', description: 'Review diffs, tests, regressions, performance, and security; deliver changes in a controlled way.' },
      ],
      agentsTitle: 'Harnesses / Coding Agents',
      agents: [
        { role: 'Planning & Business Logic', description: 'For specifications, implementation plans, architecture decisions, and the structured implementation of complex business logic.' },
        { role: 'Planning, Cross-checking & Business Logic', description: 'For alternative approaches, technical cross-checking, and the development of demanding business logic.' },
        { role: 'UI & Creative Work', description: 'For UI concepts, visual refinement, creative exploration, and the implementation of high-quality interfaces.' },
      ],
      skillsTitle: 'Skills',
      skills: [
        { category: 'Planning & Execution' },
        { category: 'Apple Platforms' },
        { category: 'Quality & Delivery' },
      ],
      mcpsTitle: 'MCPs',
      mcps: [
        { status: 'In use', description: 'Builds, tests, simulator runs, logs, debugging, and visual UI verification for Apple platforms.' },
        { status: 'In use', description: 'Documentation research, browser automation, and visual verification of web and app flows.' },
        { status: 'In development', description: 'A custom MCP server is being built to expose selected Devil capabilities to AI agents.' },
      ],
      reasoningTitle: 'Reasoning & Token Efficiency',
      reasoningNote: 'I choose the model and reasoning depth according to the work phase and risk: planning and review deliberately receive more reasoning, while an agreed plan can be implemented with far fewer tokens. This logic is model-agnostic and applies, for example, to Codex Sol and Luna just as it does to Claude Opus and Fable.',
      reasoning: [
        { use: 'Planning', description: 'Analyze requirements, risks, and architecture with maximum reasoning depth, then produce the specification and a robust implementation plan.' },
        { use: 'Implementation', description: 'Execute the agreed plan efficiently and with low token usage; the key decisions have already been made.' },
        { use: 'Bug Fixing', description: 'Use Low for simple UI and layout issues; use High for complex logic, state, data, or concurrency bugs.' },
        { use: 'Code Review', description: 'Thoroughly and independently review diffs, tests, regressions, performance, and security.' },
      ],
      proofTitle: 'In Practice',
      proof: [
        { description: 'Developed end to end using AI-supported, agentic workflows under my technical direction.' },
        { description: 'Developed end to end using AI-supported, agentic workflows under my technical direction.' },
        { project: 'EnBW – New App Platform', description: 'AI-assisted workflows for planning, technical verification, implementation, tests, and code reviews.' },
      ],
      compactSummary: 'Agentic Coding with the Codex, Grok, and Claude Code harnesses: planning and business logic with Codex and Grok, UI and creative implementation with Claude Code; a workflow spanning planning, verification, implementation, and code review; specialized Skills and XcodeBuildMCP; phase- and risk-aware reasoning selection across planning, implementation, bug fixing, and review. A custom Devil MCP Server is in development.',
    },
    projects: [
      {
        period: '2026 – present',
        description: 'A native macOS 26 menu-bar app for Apple-platform developers. Devil cleans Xcode and SPM caches, controls simulators, supports Git workflows with diffs, commits, pushes and pull requests, and bundles references and everyday developer utilities. The app is sandboxed and mostly offline; commit messages are generated locally with Apple Intelligence. A custom MCP server for Devil is currently in development. Developed end to end using AI-supported, agentic workflows under my technical direction.',
        cvDescription: 'Native macOS 26 menu-bar app for cleaning Xcode and SPM caches, controlling simulators, and running Git workflows with local Apple Intelligence. A custom MCP server for Devil is currently in development. Developed end to end using AI-supported, agentic workflows under my technical direction.',
      },
      {
        period: '2025 – present',
        description: 'An easy-to-use intermittent fasting timer for iPhone and Apple Watch. Fast.io helps users consistently track fasting goals with real-time tracking, hydration logging, Live Activities, Dynamic Island, Home Screen widgets and Apple Health integration. It supports popular fasting schedules such as 16:8, 18:6 and OMAD. Available as a one-time purchase, no subscription. Developed end to end using AI-supported, agentic workflows under my technical direction.',
        cvDescription: 'Intermittent fasting timer for iPhone and Apple Watch with Live Activities, widgets, Apple Health, and hydration tracking. Developed end to end using AI-supported, agentic workflows under my technical direction.',
      },
      {
        period: '2025 – present',
        description: 'Turns every photo into a story with live weather, location and text overlays. Users can capture photos or import them from the library, add weather details such as temperature, humidity and wind, include date, time and custom text, customize styles and share directly. The Pro version supports 5-second videos with overlays and export without branding.',
        cvDescription: 'Camera app for weather, location, and text overlays on photos and videos.',
      },
      {
        period: '12/2022 – present',
        description: 'Development of an app for controlling and monitoring a Tesla. The app is built entirely with the latest Apple frameworks because I use it as a learning project for new technologies. It consists of the app itself plus a REST API, also developed with Swift / Vapor.',
        cvDescription: 'iPhone and Apple Watch app for controlling and monitoring a Tesla with a Swift/Vapor backend.',
      },
    ],
    education: [
      { degree: 'Information Technology', institution: 'University of Applied Sciences, 4 semesters electrical engineering' },
      { degree: 'University of Applied Sciences entrance qualification', institution: 'Fachoberschule, Kempen' },
      { degree: 'Software Development', institution: 'Dekra, Duesseldorf' },
      { degree: 'Communication Electronics Technician', institution: 'Deutsche Bahn, Krefeld/Wuppertal' },
      { degree: 'Electrical Engineering', institution: 'Vocational school, Kempen' },
      { degree: 'Secondary school certificate', institution: 'Hauptschule, Willich' },
    ],
  },
};
