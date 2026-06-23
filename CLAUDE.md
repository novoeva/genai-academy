# GenAI Academy – Project Context

## What this is
A web-based learning app teaching agentic AI basics. Built as a hands-on project to learn agentic AI concepts.

## Terminology

- **Module** — one of the 8 top-level units of the course (e.g. "How LLMs Work"). Shown as cards on the Dashboard. Lives in `lessons/0X-module-name/`. Contains an `index.md`, several lesson files, a `quiz.json`, and a `manifest.json`.
- **Lesson** — an individual piece of content within a module (e.g. "What is an LLM?"). Lives as `0Y-lesson-name.md` inside a module folder. Opens in the Lesson Page.

Never use "chapter" or "sub-chapter" — those terms are retired.

## Repo layout

```
Agentic AI/
├── lessons/               # Content only – markdown + quiz JSON, no app code
│   ├── 01-how-llms-work/
│   ├── 02-hallucination/
│   ├── 03-prompt-engineering/
│   ├── 04-from-model-to-agent/
│   ├── 05-keeping-agents-in-scope/
│   ├── 06-memory-and-state/
│   ├── 07-multi-agent-systems/
│   └── 08-evaluating-and-shipping/
│       Each module: index.md, 0Y-lesson.md files, quiz.json, manifest.json
│
└── genai-academy/         # The React app (Vite + Tailwind)
    └── src/
        ├── screens/       # Dashboard, ModuleOverview, LessonPage, QuizPage
        ├── components/    # Sidebar, TopNav
        └── data/          # curriculum.js, lessonLoader.js
```

## Key reference files
- `app-structure.md` – screen designs, navigation flow, which file feeds which screen
- `PRD-Agentic-AI-Learning-App.md` – product requirements
- `CONTENT-STANDARDS.md` – writing/content rules for lessons

## App screens and their data sources
| Screen          | Component                        | Data source                              |
|-----------------|----------------------------------|------------------------------------------|
| Home/Dashboard  | `screens/Dashboard.jsx`          | progress (local) + all `index.md` titles |
| Module Overview | `screens/ModuleOverview.jsx`     | `lessons/0X-module/index.md`             |
| Lesson Page     | `screens/LessonPage.jsx`         | `lessons/0X-module/0Y-lesson.md`         |
| Quiz            | `screens/QuizPage.jsx`           | `lessons/0X-module/quiz.json`            |

## Dev setup
```bash
cd genai-academy
npm install
npm run dev
```
