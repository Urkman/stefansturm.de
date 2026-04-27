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
