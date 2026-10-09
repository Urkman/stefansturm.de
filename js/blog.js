/**
 * Bilingual blog. Publish a post only when both editorial versions are ready.
 * Each post has a slug, date (YYYY-MM-DD), and de/en versions containing
 * title, excerpt, and sections: [{ heading, paragraphs: [], items: [] }].
 * Text is escaped on output; article content is never interpreted as HTML.
 */
const BLOG_POSTS = [
  {
    slug: 'cross-platform-ohne-cross-platform',
    date: '2026-09-30',
    de: {
      title: 'Cross-Plattform ohne Cross-Plattform: Von iOS zu Android mit KI',
      excerpt: 'Wie eine präzise Produktdokumentation und wiederverwendbare KI-Skills eine eigenständige native Android-App aus einer iOS-App entstehen ließen.',
      sections: [
        {
          heading: 'Die Idee: dasselbe Produkt, native Apps',
          paragraphs: [
            'Ich bin kein großer Freund von Cross-Plattform-Frameworks. Viele Apps, die ich ausprobiert habe, wirken auf iOS schlecht umgesetzt und fühlen sich für mich nicht wie native iOS-Apps an. Auch bei guten Apps fehlen mir oft Details. Bei Flutter fallen mir zum Beispiel die Animationen beim Anzeigen von Sheets und beim Zurückwischen in der Navigation auf: Sie fühlen sich für mich auf iOS häufig falsch an. Ich entwickle deshalb gerne nativ und möchte die Möglichkeiten der jeweiligen Plattform direkt nutzen. Gleichzeitig suche ich einen praktikablen Weg, meine iOS-Apps auch für Android anzubieten.',
            'Mit KI ergibt sich dafür eine interessante Möglichkeit: Eine bestehende iOS-App wird so vollständig beschrieben, dass eine KI daraus eine eigenständige, native Android-App entwickeln kann. Beide Apps teilen das Produktkonzept und die Anforderungen. Ihre Implementierungen bleiben unabhängig.',
            'Genau das wollte ich ausprobieren. Mein Testprojekt dafür heißt **Ripple**.',
            'Ripple ist eine App zum Erfassen der täglichen Trinkmenge. Für dieses Experiment brauchte ich ein überschaubares Produkt, dessen Grundidee ohne lange Erklärung verständlich ist: Wasser eintragen, ein Tagesziel verfolgen, vergangene Einträge ansehen und Statistiken auswerten.',
            'Trotzdem sollte die App genug mitbringen, um mehr als einen einzelnen Bildschirm zu konvertieren. Deshalb gehörten von Anfang an iPhone, iPad, Apple Watch und Widgets zum geplanten Umfang. Dazu kamen Datenspeicherung, Synchronisierung und die unterschiedlichen Bedienkonzepte der Geräte. Eine einfache Produktidee mit genügend technischer Substanz für einen aussagekräftigen Versuch.',
          ],
        },
        {
          heading: 'Eine native iOS-Basis schaffen',
          paragraphs: [
            'Zunächst habe ich die Funktionen zusammengestellt und die Architektur festgelegt. Meine Wahl fiel auf **MVVM+C**: Model, View, ViewModel und ein Coordinator für die Navigation der iOS-App. Oberfläche, Zustand, fachliche Regeln und Navigation sollten klare Zuständigkeiten haben.',
            'Als technische Grundlage habe ich Swift als Programmiersprache, SwiftUI für die Oberfläche und SwiftData für die Speicherung gewählt. Die Synchronisierung innerhalb des Apple-Ökosystems läuft über iCloud beziehungsweise CloudKit.',
            'Auf dieser Basis habe ich Ripple mit Unterstützung von KI entwickelt und anschließend bei Apple eingereicht. Die [iOS-App ist inzwischen im App Store verfügbar](https://apps.apple.com/us/app/ripple-water-tracker/id6808143149). Damit gab es eine konkrete, funktionierende Anwendung als Ausgangspunkt für den nächsten Schritt.',
            'Nun ging es um den eigentlichen Versuch: die Konvertierung nach Android.',
            'Eine zentrale Voraussetzung für die Übertragung der Oberfläche ist ein vorher definiertes **DesignSystem**. Darin stehen die gemeinsamen Regeln für Farbrollen, Typografie, Abstände, Formen, wiederverwendbare Komponenten und Bewegung. Die KI soll diese Rollen für jede Android-Oberfläche auf native Ressourcen und Komponenten abbilden können. Ohne diese Grundlage müsste sie das Erscheinungsbild aus einzelnen Screenshots immer wieder neu ableiten. Das DesignSystem gehört deshalb in die Produktdokumentation und muss feststehen, bevor die Android-UI umgesetzt wird.',
          ],
        },
        {
          heading: 'Vier wiederverwendbare Skills',
          paragraphs: [
            'Dafür habe ich mehrere wiederverwendbare Skills entwickelt. Ein Skill ist in diesem Zusammenhang ein Paket aus Arbeitsanweisungen für die KI, ergänzt um Vorlagen, Referenzen oder Prüfskripte. Er beschreibt, welche Informationen benötigt werden, wie die Aufgabe bearbeitet werden soll und woran sich das Ergebnis prüfen lässt.',
            'Im Repository liegen vier solcher Skills:',
          ],
        },
        {
          heading: '1. ios-app-setup: Die Grundlage vorbereiten',
          paragraphs: [
            'Dieser Skill kümmert sich um das Fundament eines neuen oder bereits bestehenden iOS-Projekts. Er prüft Projektstruktur, Targets, gemeinsame Ressourcen und Tests und sorgt dafür, dass ein vorhandenes Designsystem genutzt oder eine fehlende Grundlage ergänzt wird.',
            'Dazu gehören auch Regeln für die weitere Entwicklung: Wenn sich Funktionen, Oberflächen oder Datenmodelle ändern, muss die dazugehörige Dokumentation mitgeändert werden.',
            'Für die Wiederverwendung des gesamten Ansatzes ist das wichtig. Eine spätere Konvertierung braucht eine konsistente Ausgangsbasis. Der Skill bereitet diese Basis vor; die eigentlichen Produktfunktionen werden anschließend in eigenen Entwicklungsschritten umgesetzt.',
          ],
          items: [
            '[ios-app-setup auf GitHub](https://github.com/Urkman/ripple/tree/main/skills/ios-app-setup)',
          ],
        },
        {
          heading: '2. cross-platform-product-documentation: Das Produkt vollständig beschreiben',
          paragraphs: [
            'Dieser Skill erstellt und pflegt die Dokumentation, aus der eine andere Plattform das Produkt nachbauen können soll. Dazu gehören die Anforderungen, die einzelnen Screens und Sheets, das DesignSystem, das Datenmodell und die Zuordnung zu den jeweiligen Plattformen. Besonders wichtig ist, dass das DesignSystem die gemeinsamen visuellen Rollen und Komponenten festlegt, bevor die Android-Oberflächen entstehen.',
            'Jeder Bildschirm erhält eine eindeutige Kennung und eine eigene Beschreibung: Welche Informationen werden angezeigt? Welche Aktionen sind möglich? Was passiert bei leeren Daten, Fehlern oder fehlenden Berechtigungen? Wie verändert sich die Darstellung auf unterschiedlichen Bildschirmgrößen?',
            'Wireframes und visuelle Referenzen ergänzen diese Beschreibungen. Die Dokumentation soll sowohl das sichtbare Ergebnis als auch das Verhalten erklären. Ein Screenshot allein kann beispielsweise nicht zeigen, wie ein gelöschter Eintrag wiederhergestellt wird.',
          ],
          items: [
            '[cross-platform-product-documentation auf GitHub](https://github.com/Urkman/ripple/tree/main/skills/cross-platform-product-documentation)',
          ],
        },
        {
          heading: '3. android-conversion-readiness: Die Übergabe prüfen',
          paragraphs: [
            'Bevor die Android-Implementierung beginnt, prüft dieser Skill, ob die Grundlage vollständig und widerspruchsfrei genug ist.',
            'Sind alle Oberflächen beschrieben? Gibt es die erforderlichen Wireframes? Haben Farben, Abstände und Komponenten eindeutige Definitionen? Sind Datenhaltung und fachliche Regeln verständlich? Ist festgelegt, wie Navigation, Widgets und andere Systemfunktionen unter Android umgesetzt werden sollen?',
            'Der Skill kombiniert ein Prüfskript mit einer inhaltlichen Prüfung. Das Ergebnis lautet **READY**, **READY WITH WARNINGS** oder **BLOCKED**, jeweils mit konkreten Fundstellen und nächsten Schritten. Fehlende Produktentscheidungen sollen dadurch sichtbar werden, bevor sie während der Implementierung zu zufälligen Annahmen werden.',
          ],
          items: [
            '[android-conversion-readiness auf GitHub](https://github.com/Urkman/ripple/tree/main/skills/android-conversion-readiness)',
          ],
        },
        {
          heading: '4. android-app-from-documentation: Android aus der Dokumentation entwickeln',
          paragraphs: [
            'Dieser Skill übernimmt die eigentliche Umsetzung im Android-Projekt. Seine Grundlage sind die gemeinsamen Produktunterlagen und die Regeln des Android-Repositorys.',
            'Er ordnet die beschriebenen Oberflächen der Implementierung zu, baut die fachlichen Regeln und die Datenhaltung auf und setzt anschließend die Benutzeroberfläche sowie die vorgesehenen Systemfunktionen um. Dabei müssen die dokumentierten Zustände, Aktionen und Designregeln erhalten bleiben.',
            'Zur Aufgabe gehören außerdem Tests und die Überprüfung im Emulator. Ein erfolgreicher Build ist ein Zwischenschritt. Ob sich ein Ablauf tatsächlich bedienen lässt, muss an der laufenden App überprüft werden.',
          ],
          items: [
            '[android-app-from-documentation auf GitHub](https://github.com/Urkman/ripple/tree/main/skills/android-app-from-documentation)',
          ],
        },
        {
          heading: 'Die Dokumentation als Übergabe',
          paragraphs: [
            'Mit diesen Skills habe ich anschließend die technische und fachliche Dokumentation der bestehenden iOS-App durch KI erstellen lassen. Die gemeinsamen Unterlagen wurden als Übergabepaket gesammelt.',
            'Für mich ist das der entscheidende Teil des Ansatzes. Die Dokumentation muss ausreichend präzise sein, damit die Android-Implementierung daraus entstehen kann. Sie beschreibt etwa, was ein Trinkeintrag bedeutet, welche Einheit intern verwendet wird, welche Informationen ein Bildschirm benötigt und welche Regeln beim Bearbeiten oder Löschen gelten. Die Plattformunterlagen ergänzen, wie diese Anforderungen jeweils nativ umgesetzt werden.',
            'Danach habe ich einen neuen Ordner für das Android-Projekt angelegt und die gemeinsamen Dokumente hineinkopiert.',
            'Der Android-Entwicklungsschritt bekam damit die Beschreibung des Produkts als Eingabe. Der iOS-Quellcode musste dafür nicht in das neue Projekt übernommen werden. Die KI sollte aus den Unterlagen eine eigenständige Android-Anwendung erstellen.',
            'So entstand die [Android-Umsetzung von Ripple mit Kotlin und Jetpack Compose](https://github.com/Urkman/ripple-android). Auch dort gibt es eigene Zuständigkeiten für Oberfläche, fachliche Regeln und Speicherung. Android verwendet seine eigenen technischen Möglichkeiten; Apples Frameworks werden durch passende native Lösungen ersetzt.',
            'Die entstandene App habe ich im Android-Emulator getestet. Ein physisches Android-Gerät besitze ich nicht. Meine eigenen Tests beziehen sich deshalb auf die dort geprüften Abläufe und Darstellungen.',
          ],
        },
        {
          heading: 'Erste Runde abgeschlossen',
          paragraphs: [
            'Anschließend habe ich die Android-App bei Google eingereicht. Nach der Freigabe ist sie jetzt im Google Play Store verfügbar. Damit war die erste Runde des Experiments abgeschlossen: von der Idee über eine mit KI entwickelte iOS-App bis zur durch KI umgesetzten Android-Version.',
            '„Vollständig durch KI konvertiert“ beschreibt dabei die Umsetzung der Android-App. Die Entscheidungen über Produktumfang, Architektur und Anforderungen habe weiterhin ich getroffen. Ich habe die Grundlage geschaffen, den Ablauf gesteuert und das Ergebnis geprüft.',
            'Für mich liegt der interessante Teil dieses Projekts darin, dass die Beschreibung des Produkts zu einem praktisch nutzbaren Entwicklungsartefakt wird. Die Skills geben der KI einen wiederverwendbaren Arbeitsablauf, und die Dokumentation verbindet zwei eigenständige native Implementierungen.',
            'Ripple ist bewusst ein kleines Beispiel. Wie gut sich dieser Ansatz auf größere Apps mit mehr Integrationen und komplizierteren Abläufen übertragen lässt, möchte ich weiter untersuchen. Die Skills und beide Projekte sind öffentlich, damit sich der Versuch nachvollziehen und auf andere Apps übertragen lässt.',
          ],
        },
        {
          heading: 'Ripple und das Experiment ansehen',
          paragraphs: [
            'Die iOS-App für iPhone, iPad und Apple Watch ist im App Store verfügbar. Die Android-App ist jetzt bei Google Play erhältlich.',
          ],
          items: [
            '[Ripple für iPhone, iPad und Apple Watch im App Store](https://apps.apple.com/us/app/ripple-water-tracker/id6808143149)',
            '[Ripple für Android bei Google Play](https://play.google.com/store/apps/details?id=de.stefansturm.ripple)',
            '[iOS-Repository auf GitHub](https://github.com/Urkman/ripple)',
            '[Android-Repository auf GitHub](https://github.com/Urkman/ripple-android)',
            '[Alle vier Skills im iOS-Repository](https://github.com/Urkman/ripple/tree/main/skills)',
          ],
        },
      ],
    },
    en: {
      title: 'Cross-platform without a cross-platform framework: From iOS to Android with AI',
      excerpt: 'How detailed product documentation and reusable AI skills turned an iOS app into a separate, native Android app.',
      sections: [
        {
          heading: 'The idea: one product, native apps',
          paragraphs: [
            'I am not a big fan of cross-platform frameworks. Many apps I have tried feel poorly implemented on iOS and do not feel like native iOS apps to me. Even well-made apps often miss details. Flutter is one example: its sheet presentation and interactive back-swipe navigation animations often feel wrong to me on iOS. That is why I enjoy building apps natively and want to use each platform’s capabilities directly. At the same time, I am looking for a practical way to bring my iOS apps to Android.',
            'AI offers an interesting possibility: describe an existing iOS app in enough detail for AI to build a separate, native Android app from that description. Both apps share the same product concept and requirements, while their implementations remain independent.',
            'That is exactly what I wanted to try. My test project is called **Ripple**.',
            'Ripple is an app for tracking daily water intake. For this experiment, I needed a product with a straightforward idea that takes little explanation: log water, track a daily goal, review past entries, and explore statistics.',
            'The app still needed enough scope to make this more than a single-screen conversion. From the start, the plan included iPhone, iPad, Apple Watch, and widgets. Data storage, synchronization, and the different interaction patterns of each device were part of it, too. A simple product idea with enough technical depth to make for a meaningful experiment.',
          ],
        },
        {
          heading: 'Building a native iOS foundation',
          paragraphs: [
            'First, I mapped out the features and chose an architecture. I settled on **MVVM+C**: Model, View, ViewModel, and a Coordinator for navigation in the iOS app. The interface, state, product rules, and navigation each needed a clear responsibility.',
            'I chose Swift as the programming language, SwiftUI for the interface, and SwiftData for storage. Within the Apple ecosystem, data synchronization runs through iCloud and CloudKit.',
            'With that foundation, I built Ripple with help from AI and submitted it to Apple. The [iOS app is now available on the App Store](https://apps.apple.com/us/app/ripple-water-tracker/id6808143149). That gave me a real, working app to use as the starting point for the next step.',
            'Now for the actual experiment: converting it to Android.',
            'A defined **DesignSystem** is an essential prerequisite for translating the interface. It establishes shared rules for color roles, typography, spacing, shapes, reusable components, and motion. AI can then map these roles to native Android resources and components for each screen. Without this foundation, it would have to infer the visual style anew from individual screenshots. That is why the DesignSystem belongs in the product documentation and needs to be finalized before the Android UI is implemented.',
          ],
        },
        {
          heading: 'Four reusable skills',
          paragraphs: [
            'For this, I developed several reusable skills. Here, a skill is a bundle of instructions for AI, supplemented with templates, references, or verification scripts. It describes the information needed, how to approach the task, and how to check the result.',
            'The repository contains four skills:',
          ],
        },
        {
          heading: '1. ios-app-setup: Prepare the foundation',
          paragraphs: [
            'This skill handles the foundation of a new or existing iOS project. It checks the project structure, targets, shared resources, and tests, and makes sure an existing design system is used or a missing foundation is put in place.',
            'It also sets rules for ongoing development: when features, interfaces, or data models change, their documentation must change along with them.',
            'That is important if the approach is to be reused. A later conversion needs a consistent starting point. This skill prepares that foundation; the actual product features are implemented in separate development steps.',
          ],
          items: [
            '[ios-app-setup on GitHub](https://github.com/Urkman/ripple/tree/main/skills/ios-app-setup)',
          ],
        },
        {
          heading: '2. cross-platform-product-documentation: Describe the product in full',
          paragraphs: [
            'This skill creates and maintains the documentation another platform can use to recreate the product. It covers requirements, individual screens and sheets, the DesignSystem, the data model, and how each part maps to the relevant platforms. In particular, the DesignSystem defines the shared visual roles and components before the Android interfaces are built.',
            'Every screen gets a unique identifier and its own description: What information does it show? What actions are available? What happens when data is empty, an error occurs, or a permission is missing? How does the layout change across screen sizes?',
            'Wireframes and visual references add context to the descriptions. The documentation is meant to explain both what the user sees and how the app behaves. A screenshot alone, for example, cannot show how a deleted entry can be restored.',
          ],
          items: [
            '[cross-platform-product-documentation on GitHub](https://github.com/Urkman/ripple/tree/main/skills/cross-platform-product-documentation)',
          ],
        },
        {
          heading: '3. android-conversion-readiness: Check the handoff',
          paragraphs: [
            'Before Android development begins, this skill checks whether the foundation is complete and consistent enough.',
            'Are all the interfaces documented? Are the required wireframes available? Are colors, spacing, and components clearly defined? Are data storage and product rules understandable? Is there a plan for navigation, widgets, and other system features on Android?',
            'The skill combines a validation script with a content review. The result is **READY**, **READY WITH WARNINGS**, or **BLOCKED**, with specific findings and next steps. This makes missing product decisions visible before they turn into ad hoc assumptions during implementation.',
          ],
          items: [
            '[android-conversion-readiness on GitHub](https://github.com/Urkman/ripple/tree/main/skills/android-conversion-readiness)',
          ],
        },
        {
          heading: '4. android-app-from-documentation: Build Android from the documentation',
          paragraphs: [
            'This skill takes on the Android implementation itself. It uses the shared product documentation and the Android repository’s own rules as its foundation.',
            'It maps the described interfaces to the implementation, sets up the product rules and data storage, and then builds the user interface and planned system features. The documented states, actions, and design rules all need to be preserved.',
            'The work also includes tests and checks in the emulator. A successful build is only an intermediate step. The running app still needs to be checked to see whether its flows actually work.',
          ],
          items: [
            '[android-app-from-documentation on GitHub](https://github.com/Urkman/ripple/tree/main/skills/android-app-from-documentation)',
          ],
        },
        {
          heading: 'Documentation as a handoff',
          paragraphs: [
            'I then used AI and these skills to create the technical and product documentation for the existing iOS app. I collected the shared documents into a handoff package.',
            'To me, this is the crucial part of the approach. The documentation needs to be precise enough to build the Android implementation from. It explains, for example, what a water entry means, which unit is used internally, what information each screen needs, and which rules apply when editing or deleting an entry. Platform-specific documents add guidance on how to implement those requirements natively on each platform.',
            'Next, I created a new folder for the Android project and copied the shared documents into it.',
            'That gave the Android development step a description of the product as its input. The iOS source code did not need to be copied into the new project. AI was meant to build a standalone Android app from the documentation.',
            'That is how the [Android version of Ripple, built with Kotlin and Jetpack Compose](https://github.com/Urkman/ripple-android), came about. It has its own responsibilities for the interface, product rules, and storage. Android uses its own capabilities, replacing Apple frameworks with suitable native solutions.',
            'I tested the resulting app in the Android emulator. I do not own a physical Android device, so my testing was limited to the flows and layouts I checked there.',
          ],
        },
        {
          heading: 'First round complete',
          paragraphs: [
            'I then submitted the Android app to Google. After approval, it is now available on Google Play. That completed the first round of the experiment: from the idea, to an iOS app built with AI, to an Android version implemented with AI.',
            '“Converted entirely by AI” refers to the implementation of the Android app. I still made the decisions about product scope, architecture, and requirements. I established the foundation, guided the process, and reviewed the result.',
            'The interesting part for me is that a description of the product becomes a practical development artifact. The skills give AI a reusable workflow, and the documentation connects two independent native implementations.',
            'Ripple is intentionally a small example. I want to keep exploring how well this approach works with larger apps, more integrations, and more complex flows. The skills and both projects are public so others can follow the experiment and adapt the approach to their own apps.',
          ],
        },
        {
          heading: 'Explore Ripple and the experiment',
          paragraphs: [
            'The iOS app for iPhone, iPad, and Apple Watch is available on the App Store. The Android app is now available on Google Play.',
          ],
          items: [
            '[Ripple for iPhone, iPad, and Apple Watch on the App Store](https://apps.apple.com/us/app/ripple-water-tracker/id6808143149)',
            '[Ripple for Android on Google Play](https://play.google.com/store/apps/details?id=de.stefansturm.ripple)',
            '[iOS repository on GitHub](https://github.com/Urkman/ripple)',
            '[Android repository on GitHub](https://github.com/Urkman/ripple-android)',
            '[All four skills in the iOS repository](https://github.com/Urkman/ripple/tree/main/skills)',
          ],
        },
      ],
    },
  },
];

function blogEsc(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderBlogText(value) {
  return blogEsc(value)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\[([^\]]+)\]\((https:\/\/[^)\s]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
}

function getBlogLanguage() {
  return typeof currentLang !== 'undefined'
    ? currentLang
    : (localStorage.getItem('language') === 'en' ? 'en' : 'de');
}

function renderBlogSections(content) {
  return content.sections.map(section => `
    ${section.heading ? `<h2>${blogEsc(section.heading)}</h2>` : ''}
    ${(section.paragraphs || []).map(paragraph => `<p>${renderBlogText(paragraph)}</p>`).join('')}
    ${section.items?.length ? `<ul>${section.items.map(item => `<li>${renderBlogText(item)}</li>`).join('')}</ul>` : ''}
  `).join('');
}

function renderBlog() {
  const container = document.getElementById('blog-posts');
  if (!container) return;
  const posts = BLOG_POSTS.filter(post => post.de && post.en)
    .slice().sort((a, b) => b.date.localeCompare(a.date));
  const lang = getBlogLanguage();

  container.innerHTML = posts.length ? posts.map(post => {
    const content = post[lang];
    const id = `blog-${post.slug}`;
    const url = `blog.html?post=${encodeURIComponent(post.slug)}`;
    const date = new Intl.DateTimeFormat(lang === 'en' ? 'en-GB' : 'de-DE', {
      day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
    }).format(new Date(`${post.date}T12:00:00Z`));
    return `<article class="blog-post" aria-labelledby="${blogEsc(id)}-title">
      <div class="blog-meta"><time datetime="${blogEsc(post.date)}">${blogEsc(date)}</time><span>Stefan Sturm</span></div>
      <h3 id="${blogEsc(id)}-title"><a href="${blogEsc(url)}">${blogEsc(content.title)}</a></h3>
      <p class="blog-excerpt">${blogEsc(content.excerpt)}</p>
      <a class="blog-permalink" href="${blogEsc(url)}">${blogEsc(I18N[lang].blogReadMore)}<span class="sr-only">: ${blogEsc(content.title)}</span></a>
    </article>`;
  }).join('') : `<p class="blog-empty">${blogEsc(I18N[lang].blogEmpty)}</p>`;
}

function renderBlogArticlePage() {
  const container = document.getElementById('blog-article');
  if (!container) return;

  const lang = getBlogLanguage();
  const slug = new URLSearchParams(window.location.search).get('post');
  const post = BLOG_POSTS.find(entry => entry.slug === slug && entry.de && entry.en);
  document.documentElement.lang = lang;
  const skipLink = document.getElementById('blogSkipLink');
  if (skipLink) skipLink.textContent = lang === 'en' ? 'Skip to article' : 'Zum Beitrag springen';
  document.querySelector('.language-toggle')?.setAttribute('aria-label', I18N[lang].languageToggle);
  const footerLocation = document.querySelector('.footer-sub');
  if (footerLocation) footerLocation.textContent = lang === 'en' ? 'Willich, Germany' : 'Willich, Deutschland';
  const footerYear = document.getElementById('footer-year');
  if (footerYear) footerYear.textContent = new Date().getFullYear();

  if (!post) {
    const title = lang === 'en' ? 'Article not found' : 'Beitrag nicht gefunden';
    const message = lang === 'en'
      ? 'This blog post may have moved or is no longer available.'
      : 'Dieser Blogbeitrag wurde verschoben oder ist nicht verfügbar.';
    container.innerHTML = `<article class="blog-article"><h1>${title}</h1><p>${message}</p><a class="blog-permalink" href="index.html#blog">${blogEsc(I18N[lang].blogBack)}</a></article>`;
    document.title = `${title} | Stefan Sturm`;
    return;
  }

  const content = post[lang];
  const date = new Intl.DateTimeFormat(lang === 'en' ? 'en-GB' : 'de-DE', {
    day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
  }).format(new Date(`${post.date}T12:00:00Z`));
  const canonicalUrl = new URL(`blog.html?post=${encodeURIComponent(post.slug)}`, window.location.href).href;
  container.innerHTML = `<article class="blog-article">
    <a class="blog-back-link" href="index.html#blog">← ${blogEsc(I18N[lang].blogBack)}</a>
    <header class="blog-article-header">
      <div class="blog-meta"><time datetime="${blogEsc(post.date)}">${blogEsc(date)}</time><span>Stefan Sturm</span></div>
      <h1>${blogEsc(content.title)}</h1>
      <p class="blog-excerpt">${blogEsc(content.excerpt)}</p>
    </header>
    <div class="blog-body">${renderBlogSections(content)}</div>
    <a class="blog-back-link blog-back-link-bottom" href="index.html#blog">← ${blogEsc(I18N[lang].blogBack)}</a>
  </article>`;

  document.title = `${content.title} | Stefan Sturm`;
  document.querySelector('meta[name="description"]')?.setAttribute('content', content.excerpt);
  document.querySelector('meta[property="og:title"]')?.setAttribute('content', content.title);
  document.querySelector('meta[property="og:description"]')?.setAttribute('content', content.excerpt);
  document.querySelector('link[rel="canonical"]')?.setAttribute('href', canonicalUrl);
  document.querySelector('meta[property="og:url"]')?.setAttribute('content', canonicalUrl);
}

function setupBlogArticlePage() {
  const themeButton = document.getElementById('themeToggle');
  const applyTheme = dark => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    localStorage.setItem('theme', dark ? 'dark' : 'light');
    if (themeButton) {
      themeButton.setAttribute('aria-label', I18N[getBlogLanguage()][dark ? 'themeToggleLight' : 'themeToggle']);
      const icon = themeButton.querySelector('i');
      if (icon) icon.className = dark ? 'fas fa-sun' : 'fas fa-moon';
    }
  };

  if (themeButton) {
    themeButton.addEventListener('click', () => {
      applyTheme(document.documentElement.getAttribute('data-theme') !== 'dark');
    });
    applyTheme(document.documentElement.getAttribute('data-theme') === 'dark');
  }

  document.querySelectorAll('.language-option').forEach(button => {
    const active = button.dataset.lang === getBlogLanguage();
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
    button.addEventListener('click', () => {
      const lang = button.dataset.lang === 'en' ? 'en' : 'de';
      localStorage.setItem('language', lang);
      document.querySelectorAll('.language-option').forEach(option => {
        const active = option.dataset.lang === lang;
        option.classList.toggle('active', active);
        option.setAttribute('aria-pressed', String(active));
      });
      renderBlogArticlePage();
      applyTheme(document.documentElement.getAttribute('data-theme') === 'dark');
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  if (!document.getElementById('blog-article')) return;
  renderBlogArticlePage();
  setupBlogArticlePage();
});
