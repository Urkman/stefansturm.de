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
  },

  summary: `Stefan Sturm ist ein erfahrener Senior iOS-Entwickler mit einer beeindruckenden
Karriere, die über 15 Jahre umfasst. Seine Expertise in der Entwicklung hochwertiger mobiler
Anwendungen spiegelt sich in seiner Arbeit für namhafte Unternehmen wie 1und1, RTL, Nexenio,
Porsche und viele weitere wider.
<br><br>
Er hat maßgeblich zur Entwicklung von Apps wie der 1und1 Mail App, RTL+, der Luca App und der
My Porsche App beigetragen. Stefan ist spezialisiert auf die Verwendung moderner Technologien
wie Swift, SwiftUI und Combine, und er beherrscht die Implementierung komplexer Architekturen
wie MVVM, CleanSwift und Viper. Stefan legt großen Wert auf qualitativ hochwertigen Code,
kontinuierliche Weiterbildung und eine enge Zusammenarbeit im Team.`,

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
      description: 'Bei EnBW habe ich beim KickOff einer neuen App Plattform geholfen.',
      tech: ['Swift', 'SwiftUI', 'Combine', 'REST (JSON)', 'Softwarearchitektur', 'CI/CD',
             'Jenkins', 'PullRequest', 'Gitlab', 'Git', 'Xcode', 'Azure DevOps',
             'UI Tests', 'Unit Tests', 'Snapshot Tests', 'SPM'],
    },
    {
      period:   '11/2024 – 02/2025',
      role:     'Senior iOS Developer',
      company:  'Chrono24',
      location: 'Karlsruhe',
      appName:  'Chrono24 App',
      appUrl:   'https://apps.apple.com/de/app/chrono24-luxusuhren-shoppen/id472912032',
      description: 'Bei Chrono24 habe ich die Neuentwicklung des Katalogs unterstützt.',
      tech: ['Swift', 'SwiftUI', 'Combine', 'REST (JSON)', 'CleanSwift', 'CI/CD',
             'Jenkins', 'Gitlab', 'Git', 'Xcode', 'Jira', 'Confluence',
             'UI Tests', 'Unit Tests', 'Snapshot Tests', 'SPM'],
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
        { name: 'Async/Await',    years: '3 Jahre' },
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
        { name: 'Xcode',            years: '15 Jahre' },
        { name: 'Git / Jenkins',    years: '15 Jahre' },
        { name: 'Jira / Confluence',years: '20 Jahre' },
        { name: 'Shell',            years: '20 Jahre' },
        { name: 'Gitlab' },
        { name: 'Azure DevOps' },
        { name: 'Xcode Cloud' },
        { name: 'SPM' },
        { name: 'Cocoapods' },
      ],
    },
    {
      category: 'Testing',
      icon: 'fas fa-vial',
      items: [
        { name: 'Unit Tests',     years: '10 Jahre' },
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
        { name: 'Codex (Agentic)' },
        { name: 'Claude' },
        { name: 'ChatGPT' },
        { name: 'GitHub Copilot' },
        { name: 'Grok' },
        { name: 'Prompt Engineering' },
        { name: 'PRD / Sprintplanung' },
        { name: 'AI-gestütztes Testing' },
      ],
    },
  ],

  // ──────────────────────────────────────────────
  // PROJECTS
  // Add new personal projects here.
  // ──────────────────────────────────────────────
  projects: [
    {
      name:   'Fast.io – Fasting Timer',
      period: '2025 – bis jetzt',
      url:    'https://apps.apple.com/de/app/fast-io-fasting-timer/id6755233993',
      description: 'Komplett mit AI entwickelt – von Planung und Design über Implementierung bis hin zu Tests. Ein wunderschön einfacher Intervallfasten-Timer für iPhone und Apple Watch. Fast.io hilft dabei, Fastenziele konsequent zu verfolgen – mit Echtzeit-Tracking, Hydration-Log, Live Activities, Dynamic Island, Home Screen Widgets und Apple Health Integration. Unterstützt populäre Fasten-Schemata wie 16:8, 18:6 und OMAD. Als Einmalkauf erhältlich – kein Abo.',
      tech: ['Swift', 'SwiftUI', 'HealthKit', 'Live Activities', 'WidgetKit',
             'Apple Watch', 'Dynamic Island', 'Xcode Cloud', 'MVVM'],
    },
    {
      name:   'OverlayLab – Weather Camera & Text Overlays',
      period: '2025 – bis jetzt',
      url:    'https://apps.apple.com/de/app/overlaylab/id6749015733',
      description: 'Verwandelt jedes Foto in eine Geschichte mit Live-Wetter-, Standort- und Text-Overlays. Fotos aufnehmen oder aus der Bibliothek importieren, mit Wetter (Temperatur, Luftfeuchtigkeit, Wind), Datum, Uhrzeit und eigenem Text versehen, Stile anpassen und direkt teilen. Pro-Version: 5-Sekunden-Videos mit Overlays und Export ohne Branding.',
      tech: ['Swift', 'SwiftUI', 'CoreLocation', 'WeatherKit', 'Photos',
             'AVFoundation', 'Xcode Cloud', 'MVVM'],
    },
    {
      name:   'S3XY Watch for Tesla',
      period: '12/2022 – bis jetzt',
      url:    'https://apps.apple.com/de/app/s3xy-watch/id6444442058',
      description: 'Entwicklung einer App zur Steuerung und Überwachung eines Teslas. Die App ist komplett mit den neusten Frameworks von Apple entwickelt, da ich sie als Lernobjekt für neuste Technologien nutze. Sie besteht aus der App selbst sowie einer REST-API-Schnittstelle, die ebenfalls mit Swift / Vapor entwickelt wurde.',
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
  // AI EXPERIENCE
  // Source: https://fastio.sturm-dev.de/blog-post.html?slug=fast-io-ai-build-report-de-2026-02-27
  // ──────────────────────────────────────────────
  ai: {
    intro: 'Ich habe Fast.io als iOS-App für Intervallfasten komplett mit AI als primärem Engineering-Motor entwickelt – kein klassisches "AI als Assistenz", sondern AI als Hauptantrieb. Dabei bin ich von Vibe Coding zu Agentic Coding gewechselt und habe dabei viel über Struktur, Context-Management und Modellauswahl gelernt.',
    blogUrl: 'https://fastio.sturm-dev.de/blog-post.html?slug=fast-io-ai-build-report-de-2026-02-27&lang=de',

    journey: [
      {
        phase:    'Phase 1 – Vibe Coding',
        icon:     'fas fa-bolt',
        color:    'orange',
        desc:     'Schnell MVP zusammenstecken, iterieren, weiter. Der MVP war flott da, fühlte sich aber wackelig an – zu große Schritte, zu wenig Struktur, später viele kleine Reibungen.',
      },
      {
        phase:    'Phase 2 – Agentic Coding',
        icon:     'fas fa-robot',
        color:    'accent',
        desc:     'PRD überarbeitet, in Sprints runtergebrochen, Entwicklung in kleinsten Inkrementen: Designsystem → Homescreen → Persistenz → Features → Polish. Alles über PRs mit klaren Checks und Review-Loops.',
        highlight: true,
      },
    ],

    learnings: [
      'Skills und Guidelines sind nicht Deko – sie machen aus AI-Output wiederholbar guten Output.',
      'Context-Management ist entscheidend: kleiner, sauberer Kontext schlägt riesige Dumps.',
      'Nicht jedes Modell ist für jede Aufgabe gut – mehr Reasoning ist nicht immer effizient.',
      'Agentic Workflows funktionieren nur, wenn Aufgaben sauber geschnitten sind: Definition of Done, Tests, PR-Grenzen.',
    ],

    workflow: [
      {
        title: 'Planung mit Skills',
        icon:  'fas fa-clipboard-list',
        desc:  'Für Produktideen, technische Konzepte und Sprint-Schnitte nutze ich Skills wie brainstorming und grill-me. Erst wird die Richtung geschärft, dann werden Annahmen aktiv hinterfragt, bevor Codex in die Umsetzung geht.',
      },
      {
        title: 'Worktree- und PR-Flow',
        icon:  'fas fa-code-branch',
        desc:  'Implementierung läuft isoliert in Worktrees und wird über Pull Requests gesteuert. Jede Aufgabe bekommt klare Grenzen, nachvollziehbare Commits, Reviews und einen sauberen Rückweg, falls ein Ansatz nicht trägt.',
      },
      {
        title: 'UI-Tests mit RocketSim',
        icon:  'fas fa-mobile-screen-button',
        desc:  'Für iOS-Oberflächen nutze ich RocketSim zusammen mit dem passenden Skill, um Simulator-Zustand, Accessibility-Elemente, Screenshots und Interaktionen schnell zu prüfen. So wird UI-Feedback Teil des Agentic Workflows.',
      },
      {
        title: 'Deployment über ASC CLI',
        icon:  'fab fa-app-store-ios',
        desc:  'App Store Connect CLI nutze ich für Release-orientierte Arbeit: Build- und TestFlight-Flows, Metadaten, Screenshots, Lokalisierungen und Submission-Checks werden reproduzierbar aus dem Repo heraus angestoßen.',
      },
    ],

    modelMatrix: [
      {
        category: 'Planung / PRD / Struktur',
        icon:     'fas fa-diagram-project',
        models:   ['ChatGPT', 'Grok'],
        desc:     'PRD, Sprint-Planung, Architekturentscheidungen, Gap-Checks, Brainstorming.',
      },
      {
        category: 'Implementierung',
        icon:     'fas fa-code',
        models:   ['GPT Codex', 'Claude Opus', 'Grok Code', 'Gemini Pro'],
        desc:     'Feature-Entwicklung, Refactoring und komplexe Implementierungsaufgaben.',
      },
      {
        category: 'Bugfixing / UI-Polish',
        icon:     'fas fa-magnifying-glass-arrow-right',
        models:   ['Codex low (schnelle Fixes)', 'Claude Opus (tiefere Ursachen)'],
        desc:     'Mix je nach Tiefe des Problems – schnelle Surface-Fixes vs. Root-Cause-Analyse.',
      },
    ],

    tools: [
      {
        name: 'Codex',
        icon: 'fas fa-terminal',
        desc: 'Hauptwerkzeug für die Implementierung. Läuft als Agentic Workflow direkt im Repo – Aufgaben werden als PR-Beschreibung übergeben, Codex implementiert, öffnet einen PR und ich reviewe. Sehr gut für klar definierte Features mit sauberem Kontext.',
      },
      {
        name: 'Claude',
        icon: 'fas fa-wand-magic-sparkles',
        desc: 'Besonders stark bei UI-Arbeit und komplexem SwiftUI-Code. Claude versteht den visuellen Kontext sehr gut und liefert bei Design-System-Fragen, Layout-Logik und State-Management konsistent guten Output. Auch für Code-Reviews und tiefere Ursachenanalyse bei Bugs mein erstes Werkzeug.',
      },
      {
        name: 'GitHub Copilot',
        icon: 'fab fa-github',
        desc: 'Direkt in VS Code und Xcode – ideal für repetitive Muster, Boilerplate und schnelle In-Editor-Completions. Spart besonders viel Zeit bei Tests und Datenmodellen, bei denen die Struktur klar ist, aber das Ausformulieren ermüdend wäre.',
      },
      {
        name: 'Xcode',
        icon: 'fas fa-hammer',
        desc: 'Build-Reality-Check und letztes Qualitätstor: Unit Tests, UI Tests, Simulator-Runs und Profiling mit Instruments. Kein AI-Tool ersetzt das echte Build-Feedback – Xcode bleibt der Ground Truth.',
      },
      {
        name: 'RocketSim',
        icon: 'fas fa-mobile-screen-button',
        desc: 'Schnelle Simulator-Inspektion mit Accessibility-Snapshot, Screenshots und UI-Aktionen. Besonders hilfreich, wenn ein Agent eine Änderung gebaut hat und die Oberfläche direkt verifiziert werden muss.',
      },
      {
        name: 'App Store Connect CLI',
        icon: 'fab fa-app-store-ios',
        desc: 'CLI-gestützter Release-Workflow für TestFlight, Metadaten, Screenshots, Lokalisierung und Submission-Checks. Dadurch bleibt Deployment dokumentiert, wiederholbar und gut reviewbar.',
      },
      {
        name: 'ChatGPT',
        icon: 'fas fa-comments',
        desc: 'PRDs schreiben, Sprint-Planung, Architekturentscheidungen diskutieren und Gap-Analysen durchführen. ChatGPT eignet sich gut als "erster Gesprächspartner", wenn eine Idee noch Struktur braucht, bevor man in die Implementierung geht.',
      },
      {
        name: 'Grok',
        icon: 'fas fa-brain',
        desc: 'Zweite Meinung und Brainstorming-Partner. Gut wenn ChatGPT eine Richtung vorgibt und ich prüfen will, ob es alternative Ansätze gibt. Auch für schnelle technische Gegenchecks – "stimmt diese Architekturentscheidung wirklich?"',
      },
    ],
  },

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
    navProjects: 'Projekte',
    navEducation: 'Ausbildung',
    navContact: 'Kontakt',
    heroTagline: '15+ Jahre iOS-Entwicklung',
    downloadPdf: 'Download as PDF',
    downloadMd: 'Download as MD',
    downloadPdfText: 'Download as PDF',
    downloadMdText: 'Download as MD',
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
    aiWorkflowTitle: 'Mein Agentic Workflow',
    aiStabilityTitle: 'Was den Workflow stabil macht',
    aiModelTitle: 'Model-Matrix: Welches Modell für was',
    aiModelShort: 'Model-Matrix',
    aiToolsTitle: 'Tool-Stack',
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
    cvWorkflowPrinciples: 'Workflow-Prinzipien',
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
    navProjects: 'Projects',
    navEducation: 'Education',
    navContact: 'Contact',
    heroTagline: '15+ years of iOS development',
    downloadPdf: 'Download as PDF',
    downloadMd: 'Download as MD',
    downloadPdfText: 'Download as PDF',
    downloadMdText: 'Download as MD',
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
    aiWorkflowTitle: 'My Agentic Workflow',
    aiStabilityTitle: 'What makes the workflow stable',
    aiModelTitle: 'Model matrix: which model for what',
    aiModelShort: 'Model Matrix',
    aiToolsTitle: 'Tool stack',
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
    cvWorkflowPrinciples: 'Workflow principles',
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
    summary: `Stefan Sturm is an experienced senior iOS developer with a career spanning more than 15 years. His expertise in building high-quality mobile applications is reflected in his work for well-known companies such as 1&1, RTL, Nexenio, Porsche and many others.
<br><br>
He has made major contributions to apps such as the 1&1 Mail App, RTL+, the Luca App and the My Porsche App. Stefan specializes in modern technologies such as Swift, SwiftUI and Combine, and is experienced in implementing complex architectures such as MVVM, CleanSwift and Viper. He values high-quality code, continuous learning and close collaboration within teams.`,
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
        description: 'At EnBW, I helped with the kickoff of a new app platform.',
        tech: ['Swift', 'SwiftUI', 'Combine', 'REST (JSON)', 'Software architecture', 'CI/CD',
               'Jenkins', 'Pull requests', 'GitLab', 'Git', 'Xcode', 'Azure DevOps',
               'UI tests', 'Unit tests', 'Snapshot tests', 'SPM'],
      },
      {
        description: 'At Chrono24, I supported the redevelopment of the catalog experience.',
        tech: ['Swift', 'SwiftUI', 'Combine', 'REST (JSON)', 'CleanSwift', 'CI/CD',
               'Jenkins', 'GitLab', 'Git', 'Xcode', 'Jira', 'Confluence',
               'UI tests', 'Unit tests', 'Snapshot tests', 'SPM'],
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
          { years: '20 years' },
          { years: '20 years' },
        ],
      },
      {
        category: 'Testing',
        items: [
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
        items: [
          {},
          {},
          {},
          {},
          {},
          {},
          { name: 'PRD / sprint planning' },
          { name: 'AI-assisted testing' },
        ],
      },
    ],
    projects: [
      {
        period: '2025 – present',
        description: 'Built completely with AI, from planning and design through implementation and testing. A beautifully simple intermittent fasting timer for iPhone and Apple Watch. Fast.io helps users consistently track fasting goals with real-time tracking, hydration logging, Live Activities, Dynamic Island, Home Screen widgets and Apple Health integration. It supports popular fasting schedules such as 16:8, 18:6 and OMAD. Available as a one-time purchase, no subscription.',
      },
      {
        period: '2025 – present',
        description: 'Turns every photo into a story with live weather, location and text overlays. Users can capture photos or import them from the library, add weather details such as temperature, humidity and wind, include date, time and custom text, customize styles and share directly. The Pro version supports 5-second videos with overlays and export without branding.',
      },
      {
        period: '12/2022 – present',
        description: 'Development of an app for controlling and monitoring a Tesla. The app is built entirely with the latest Apple frameworks because I use it as a learning project for new technologies. It consists of the app itself plus a REST API, also developed with Swift / Vapor.',
      },
    ],
    ai: {
      intro: 'I built Fast.io, an iOS app for intermittent fasting, completely with AI as the primary engineering engine. This was not classic "AI as assistance", but AI as the main driver. In the process, I moved from vibe coding to agentic coding and learned a lot about structure, context management and model selection.',
      journey: [
        {
          phase: 'Phase 1 – Vibe Coding',
          desc: 'Quickly assemble the MVP, iterate, move on. The MVP arrived quickly, but felt fragile: steps were too large, structure was too thin and many small frictions appeared later.',
        },
        {
          phase: 'Phase 2 – Agentic Coding',
          desc: 'The PRD was revised and broken down into sprints, with development in the smallest useful increments: design system, home screen, persistence, features and polish. Everything ran through PRs with clear checks and review loops.',
        },
      ],
      learnings: [
        'Skills and guidelines are not decoration; they turn AI output into repeatably good output.',
        'Context management is critical: small, clean context beats huge dumps.',
        'Not every model is good for every task; more reasoning is not always more efficient.',
        'Agentic workflows only work when tasks are clearly scoped: definition of done, tests and PR boundaries.',
      ],
      workflow: [
        {
          title: 'Planning with skills',
          desc: 'For product ideas, technical concepts and sprint slices, I use skills such as brainstorming and grill-me. First the direction is sharpened, then assumptions are challenged before Codex moves into implementation.',
        },
        {
          title: 'Worktree and PR flow',
          desc: 'Implementation runs isolated in worktrees and is driven through pull requests. Each task gets clear boundaries, traceable commits, reviews and a clean fallback if an approach does not hold up.',
        },
        {
          title: 'UI testing with RocketSim',
          desc: 'For iOS interfaces, I use RocketSim together with the matching skill to quickly inspect simulator state, accessibility elements, screenshots and interactions. This makes UI feedback part of the agentic workflow.',
        },
        {
          title: 'Deployment through ASC CLI',
          desc: 'I use App Store Connect CLI for release-oriented work: build and TestFlight flows, metadata, screenshots, localization and submission checks are started reproducibly from the repository.',
        },
      ],
      modelMatrix: [
        {
          category: 'Planning / PRD / structure',
          desc: 'PRDs, sprint planning, architecture decisions, gap checks and brainstorming.',
        },
        {
          category: 'Implementation',
          desc: 'Feature development, refactoring and complex implementation tasks.',
        },
        {
          category: 'Bug fixing / UI polish',
          models: ['Codex low (quick fixes)', 'Claude Opus (deeper root causes)'],
          desc: 'A mix depending on problem depth: quick surface fixes versus root-cause analysis.',
        },
      ],
      tools: [
        {
          desc: 'Main tool for implementation. It runs as an agentic workflow directly in the repository: tasks are passed in as PR descriptions, Codex implements, opens a PR and I review it. Very strong for clearly defined features with clean context.',
        },
        {
          desc: 'Especially strong for UI work and complex SwiftUI code. Claude understands visual context very well and produces consistently good output for design-system questions, layout logic and state management. It is also my first choice for code reviews and deeper bug root-cause analysis.',
        },
        {
          desc: 'Integrated directly into VS Code and Xcode: ideal for repetitive patterns, boilerplate and quick in-editor completions. It saves a lot of time for tests and data models where the structure is clear but writing everything out is tedious.',
        },
        {
          desc: 'Build reality check and final quality gate: unit tests, UI tests, simulator runs and profiling with Instruments. No AI tool replaces real build feedback; Xcode remains the ground truth.',
        },
        {
          desc: 'Fast simulator inspection with accessibility snapshots, screenshots and UI actions. Especially useful when an agent has built a change and the interface needs to be verified directly.',
        },
        {
          desc: 'CLI-driven release workflow for TestFlight, metadata, screenshots, localization and submission checks. This keeps deployment documented, repeatable and easy to review.',
        },
        {
          desc: 'Writing PRDs, sprint planning, discussing architecture decisions and running gap analyses. ChatGPT works well as the first conversation partner when an idea still needs structure before implementation starts.',
        },
        {
          desc: 'Second opinion and brainstorming partner. Useful when ChatGPT suggests one direction and I want to check whether alternative approaches exist. Also helpful for quick technical counter-checks: does this architecture decision really hold up?',
        },
      ],
    },
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
