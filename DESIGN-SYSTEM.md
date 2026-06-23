---
title: "Design System — Content Blocks"
type: reference
last_updated: 2026-04-23
---

# Content Block Design System

This document is the source of truth for:
- Which blocks appear on each page type, and what goes in them
- The markdown callout syntax used to author each block
- How the React app parses and renders blocks
- Notes on Vercel deployment and future backend

---

## Terminology reminder

- **Module** — one of the 8 top-level units (e.g. "How LLMs Work")
- **Lesson** — an individual content file within a module
- **Block** — a named, styled unit of content within a page
- **Callout syntax** — the `:::block-name` ... `:::` fencing used in `.md` files to declare a block

---

## 1. Block definitions by page type

### Required vs optional

- **req** — must be present; the page is considered incomplete without it
- **opt** — include when the content calls for it; not every lesson needs every block

---

### Lesson Page

The most content-rich page. Two-column layout: main content column on the left, contextual sidebar on the right. Authors control which optional blocks appear and in what order in the main column. Sidebar blocks are always declared at the top of the file via frontmatter.

| Block | Required? | Position | What goes in it |
|---|---|---|---|
| **Body Text** | req | Top of main col | Plain prose paragraphs. The core explanation. 1–3 paragraphs, one concept at a time. No special syntax needed — plain markdown. |
| **Concept Grid** | opt | After body text | 2–4 columns. Each entry: icon + term + 2-sentence definition. Use when a concept breaks into named parallel parts (e.g. Large / Language / Model). |
| **Analogy** | opt | After concept grid | Icon + bold analogy headline + 2–3 sentence explanation. Bridges an abstract concept to something familiar. |
| **Simulation** | opt | Inline, any point | Embedded interactive component. Preceded by a 1-sentence prompt. Never dropped in without context. |
| **Karel in Practice** | req | After main content | Branded card. Title + scenario text (2–3 sentences) + optional prompt snippet in code style + 1-sentence product takeaway. Always Karel-specific. |
| **Contrast Grid** | opt | After Karel | Titled "What X is NOT". 2×2 grid of misconceptions, each with a short phrase. Counters the most common wrong mental models. |
| **Key Takeaway** | req | Bottom of main col | Dark-background callout. 1–2 sentences max. Bold the key term. The one thing to remember if they remember nothing else. |
| **How It Works** *(sidebar)* | req | Right sidebar, top | 3–5 numbered steps breaking down the mechanism. Each: bold term + 1-sentence explanation. |
| **Did You Know** *(sidebar)* | opt | Right sidebar, below steps | One surprising, concrete fact. Makes the concept feel tangible. |

---

### Dashboard

Data-driven page. All blocks are always present; content comes from progress state and `index.md` files.

| Block | Required? | Position | What goes in it |
|---|---|---|---|
| **Resume Hero** | req | Top left | Current module title + description + "Continue Module X" CTA. Module-themed image background. |
| **Mastery Card** | req | Top right | % overall completion + X/Y modules + contextual encouragement line. Derived from local progress state. |
| **Module Grid** | req | Below hero | Bento grid of all 8 modules. Each card: icon + title + 1-line description + state badge (Complete / In Progress / Locked). |

---

### Module Overview

Data-driven page. All blocks are always present; content comes from `index.md` and progress state.

| Block | Required? | Position | What goes in it |
|---|---|---|---|
| **Module Header** | req | Top | Module number + title (H1) + 1–2 sentence description + meta line (lesson count, estimated time, "Quiz at end"). |
| **Lesson List** | req | Middle | Numbered rows. Each: number badge with state colour + lesson title + status (Completed / In progress / Not started) + arrow CTA. |
| **Quiz Card** | req | Bottom | Locked until all lessons complete. Shows title + unlock condition + question count. Unlocked state has a CTA button. |

---

### Quiz Page

One question at a time. Stripped nav. All blocks always present.

| Block | Required? | Position | What goes in it |
|---|---|---|---|
| **Progress Bar** | req | Top | Module title + "Question X of Y" + linear progress bar. |
| **Question Card** | req | Main area | Question stem (H1-weight) + optional sub-prompt in smaller text. Scenario-based, never definition-based. |
| **Answer Options** | req | Below question | 4 options (A–D). Letter badge + answer text. States: default / selected / correct / incorrect. Explanation revealed after answering. |
| **Mentor Tip** | opt | Right sidebar | Appears after answering. References which lesson covered this + 1-sentence extra context. Links back to the lesson. |

---

### Quiz Results

All blocks always present.

| Block | Required? | Position | What goes in it |
|---|---|---|---|
| **Score Hero** | req | Top center | Large X/Y display + contextual label ("Well done!" / "Keep practicing"). Module name above. |
| **Answer Summary** | req | Middle | List of all questions. Each row: coloured dot (green/red) + truncated question text + tick/cross. |
| **Action CTAs** | req | Bottom | Two buttons: "Retry quiz" (secondary) + "Continue to Module X" (primary). Always both options. |

---

## 2. Markdown callout syntax

Lessons are authored in `.md` files using `:::block-name` fenced callouts. This syntax is processed by the `remark-directive` plugin.

Plain body text needs no special syntax — write it as normal markdown.

### Body Text
Just write plain markdown paragraphs. No wrapper needed.

```md
At its core, an LLM (Large Language Model) is a type of artificial
intelligence trained to understand, generate, and manipulate human language.
```

---

### Concept Grid

```md
:::concept-grid
- Large | Refers to the massive scale of parameters and the vast datasets (millions of words) used for training.
- Language | The primary domain of operation. These models specialise in the rules, nuances, and context of human speech.
- Model | A complex mathematical representation or algorithm that has "learned" patterns from the data.
:::
```

Each line: `- Term | Description`. 2–4 items supported. The app renders them as equal-width columns with an auto-assigned icon per item (or a specified one).

---

### Analogy

```md
:::analogy{title="The Universal Library Analogy"}
"Imagine a librarian who has not just read every book in existence, but has memorized
the statistical probability of which word follows another in every context. When you ask
them a question, they aren't 'thinking' — they are predicting the most likely expert
response based on everything ever written."
:::
```

The `title` attribute is required. The body is rendered as a blockquote-style paragraph.

---

### Simulation

```md
:::simulation{id="temperature-dial"}
Try adjusting the temperature slider and watch how the model's word choices change.
:::
```

The `id` attribute maps to the simulation component registered in `src/data/simulations.js`. The body text is the prompt shown above the simulation.

---

### Karel in Practice

```md
:::karel{title="Building Karel's Support Bot"}
In our running example, Karel (a fintech product manager) wants to use an LLM to automate
customer support tickets. Instead of hard-coding every possible "if-then" rule, Karel uses an LLM.

```prompt
"A user is asking why their transaction is 'Pending'. Explain this in a friendly
tone using our bank's 3-day clearing policy."
```

The LLM doesn't "know" the user; it uses its training in **Language** and the **Model** of bank
policies to generate a perfect response.
:::
```

The `title` attribute is required. The optional inner ` ```prompt ``` ` block renders as a styled code snippet inside the Karel card.

---

### Contrast Grid

```md
:::contrast-grid{title="What an LLM is NOT"}
- Not a Search Engine
- Not Sentient or Conscious
- Not a Database of Facts
- Not Capable of Real Feeling
:::
```

4 items, displayed in a 2×2 grid with red/warning icons. The `title` attribute is required.

---

### Key Takeaway

```md
:::key-takeaway
An LLM isn't a brain; it's a **statistical prediction engine** for human language. Its
power comes from its scale (Large) and its ability to model complex relationships between concepts.
:::
```

1–2 sentences. Bold the term the reader should remember. Rendered as a dark-background callout at the bottom of the main column.

---

### Sidebar blocks (How It Works + Did You Know)

Sidebar content is declared in the lesson file's YAML frontmatter, not inline in the body. This keeps the main content flow clean and lets the app render the sidebar independently.

```yaml
---
title: "1.1 What is an LLM?"
sidebar:
  how_it_works:
    - term: "Tokenization"
      text: "Text is broken down into small chunks called 'tokens'."
    - term: "Vectorization"
      text: "Tokens are converted into complex mathematical vectors."
    - term: "Prediction"
      text: "The model predicts the next token in the sequence."
  did_you_know: >
    GPT-3 was trained on roughly 45 terabytes of text data. That's equivalent to
    reading the entire Wikipedia library over 6,000 times.
---
```

`how_it_works` is required (3–5 items). `did_you_know` is optional — omit the key if there is no fact for this lesson.

---

## 3. How the React app parses and renders blocks

### Parsing stack

Install these packages:

```bash
npm install unified remark-parse remark-directive remark-frontmatter remark-extract-frontmatter remark-rehype rehype-react
```

| Package | Role |
|---|---|
| `unified` | Processing pipeline runner |
| `remark-parse` | Parses markdown to mdast |
| `remark-frontmatter` | Recognises YAML frontmatter block |
| `remark-extract-frontmatter` | Pulls frontmatter into `vfile.data` |
| `remark-directive` | Adds support for `:::name` callout syntax |
| `remark-rehype` | Converts mdast to hast (HTML AST) |
| `rehype-react` | Converts hast to React elements |

### Processor setup

Create `src/lib/lessonParser.js`:

```js
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkFrontmatter from 'remark-frontmatter'
import remarkExtractFrontmatter from 'remark-extract-frontmatter'
import remarkDirective from 'remark-directive'
import remarkRehype from 'remark-rehype'
import rehypeReact from 'rehype-react'
import { createElement, Fragment } from 'react'
import { yaml } from 'js-yaml'

// Import block components
import ConceptGrid from '../components/blocks/ConceptGrid'
import Analogy from '../components/blocks/Analogy'
import KarelInPractice from '../components/blocks/KarelInPractice'
import ContrastGrid from '../components/blocks/ContrastGrid'
import KeyTakeaway from '../components/blocks/KeyTakeaway'
import SimulationEmbed from '../components/blocks/SimulationEmbed'

// Map directive names to React components
const directiveComponents = {
  'concept-grid': ConceptGrid,
  'analogy': Analogy,
  'karel': KarelInPractice,
  'contrast-grid': ContrastGrid,
  'key-takeaway': KeyTakeaway,
  'simulation': SimulationEmbed,
}

export function parseLesson(markdownString) {
  const result = unified()
    .use(remarkParse)
    .use(remarkFrontmatter, ['yaml'])
    .use(remarkExtractFrontmatter, { yaml: yaml.load })
    .use(remarkDirective)
    .use(directivesToComponents) // custom plugin — see below
    .use(remarkRehype)
    .use(rehypeReact, { createElement, Fragment, components: directiveComponents })
    .processSync(markdownString)

  return {
    content: result.result,        // React element tree for main column
    frontmatter: result.data,      // { title, sidebar: { how_it_works, did_you_know } }
  }
}
```

### Custom remark plugin

The `directivesToComponents` plugin converts `:::name{attrs}` nodes so that `rehype-react` can render them as named React components:

```js
function directivesToComponents() {
  return (tree) => {
    tree.children.forEach((node) => {
      if (node.type === 'containerDirective') {
        node.data = node.data || {}
        node.data.hName = node.name          // e.g. 'concept-grid'
        node.data.hProperties = node.attributes || {}
      }
    })
  }
}
```

### Using it in LessonPage

```jsx
// src/screens/LessonPage.jsx
import { parseLesson } from '../lib/lessonParser'

export default function LessonPage({ markdownString }) {
  const { content, frontmatter } = parseLesson(markdownString)
  const { how_it_works, did_you_know } = frontmatter.sidebar || {}

  return (
    <div className="lesson-layout">
      <main className="lesson-main">
        {content}
      </main>
      <aside className="lesson-sidebar">
        <HowItWorks steps={how_it_works} />
        {did_you_know && <DidYouKnow fact={did_you_know} />}
      </aside>
    </div>
  )
}
```

---

## 4. Loading lesson files

### Current setup (Vite, static)

With Vite, markdown files can be imported as raw strings using the `?raw` suffix:

```js
import lessonMd from '../../lessons/01-how-llms-work/01-what-is-an-llm.md?raw'
```

Or loaded at runtime via `fetch()` from the `public/` folder — useful if you don't want to bundle all lessons upfront:

```js
const res = await fetch(`/lessons/01-how-llms-work/01-what-is-an-llm.md`)
const markdown = await res.text()
```

For the `fetch()` approach, copy lesson files into `public/lessons/` or configure Vite to serve the `lessons/` directory.

---

## 5. Vercel deployment and future backend

### Static deployment (current)

When deployed to Vercel as a Vite app with no backend, everything runs in the browser:
- Lesson files are either bundled (via `?raw` imports) or fetched from Vercel's CDN (`public/` folder)
- Markdown parsing happens client-side on every page load
- Progress state lives in `localStorage`

This works fine for the current scope. No backend needed yet.

### When a backend is added

The most natural path for this app on Vercel is **Vercel Serverless Functions** (no separate server needed):

```
genai-academy/
  api/                        ← Vercel auto-detects this as serverless functions
    lessons/[module]/[lesson].js   ← serves a lesson's markdown
    progress.js                    ← reads/writes user progress (needs a DB)
  src/                        ← React app as before
  lessons/                    ← markdown files (accessed by the API functions)
```

Each function in `api/` is a Node.js handler. For example:

```js
// api/lessons/[module]/[lesson].js
import fs from 'fs'
import path from 'path'

export default function handler(req, res) {
  const { module, lesson } = req.query
  const filePath = path.join(process.cwd(), 'lessons', module, `${lesson}.md`)
  const content = fs.readFileSync(filePath, 'utf8')
  res.status(200).send(content)
}
```

The React app then fetches from `/api/lessons/01-how-llms-work/01-what-is-an-llm` instead of directly from `/lessons/`.

**Benefits of moving parsing server-side when adding the backend:**
- Faster page loads (HTML arrives pre-rendered, no client-side parse delay)
- Easier to add search, caching, and content versioning later
- Can use Next.js `getStaticProps` or `getServerSideProps` if you ever migrate to Next.js

**Recommendation:** Keep everything client-side until a backend is genuinely needed (e.g. user accounts, progress sync across devices, or content that shouldn't be publicly readable). Vercel serverless functions make the migration low-effort when the time comes.

---

## 6. File naming reference

| Block | Directive name | React component |
|---|---|---|
| Body Text | *(plain markdown)* | *(default markdown rendering)* |
| Concept Grid | `:::concept-grid` | `src/components/blocks/ConceptGrid.jsx` |
| Analogy | `:::analogy` | `src/components/blocks/Analogy.jsx` |
| Simulation | `:::simulation` | `src/components/blocks/SimulationEmbed.jsx` |
| Karel in Practice | `:::karel` | `src/components/blocks/KarelInPractice.jsx` |
| Contrast Grid | `:::contrast-grid` | `src/components/blocks/ContrastGrid.jsx` |
| Key Takeaway | `:::key-takeaway` | `src/components/blocks/KeyTakeaway.jsx` |
| How It Works | *(frontmatter)* | `src/components/blocks/HowItWorks.jsx` |
| Did You Know | *(frontmatter)* | `src/components/blocks/DidYouKnow.jsx` |

---

## Next steps

- [ ] Define the visual design of each block in Figma (visual system, spacing, colours, states)
- [ ] Implement the React block components once Figma blocks are locked
- [ ] Revise existing lesson `.md` files to use the callout syntax
- [ ] Add `sidebar` frontmatter to all existing lessons
