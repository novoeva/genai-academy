---
title: "Content Standards"
type: reference
---

# Content Standards

This file defines the required structure for every lesson in the course. When building a new module or adding a lesson to one, use this as your checklist. Every lesson must have all four parts before it is considered complete.

**Terminology reminder:** a **module** is the top-level unit (e.g. "How LLMs Work"). A **lesson** is an individual content file within a module. Never use "chapter" or "sub-chapter".

---

## The four parts of every lesson

### 1. Content (`{id}.md`)
The main lesson text. Written in Markdown. Explains the concept clearly and concisely, using plain language accessible to a non-technical or semi-technical PM.

- Start with the core idea, not background context
- Use concrete language — avoid jargon unless you define it immediately
- Keep lessons focused: one concept per lesson
- Length guide: 400-800 words

### 2. Karel example (`{id}.md`, "Karel in practice" section)
A section at the end of the content file that applies the lesson's concept to Karel — the fraud reporting agent deployed by a bank. This is what bridges theory to practice.

- Must be a specific, concrete scenario — not a general statement
- Should make the user think "I could use this on Monday"
- Karel's tools: read transaction history, flag transaction as fraudulent, freeze card, create fraud report
- Karel's constraints: cannot resolve claims, reverse transactions, or issue refunds

### 3. Quiz (`{id}.quiz.json`)
3-5 multiple choice questions testing the lesson's concepts. Questions should be scenario-based, not definition-based — test application, not recall.

**Structure:**
```json
{
  "lesson": "lesson-id",
  "title": "Lesson title",
  "questions": [
    {
      "id": 1,
      "question": "...",
      "options": ["A", "B", "C", "D"],
      "correct": 0,
      "explanation": "Why this is correct and the others aren't."
    }
  ]
}
```

Rules:
- At least one question per lesson must reference Karel directly
- Explanations are mandatory — they do the teaching, not just the marking
- Wrong answers should be plausible, not obviously silly
- `correct` is the zero-based index of the correct option

### 4. Simulation (`{id}.sim.json` or referenced in `manifest.json`)
An interactive component that makes the concept visceral. Not every lesson needs one, but every module should have at least one. Mark `simulation: false` in the manifest if a lesson intentionally has none.

Simulation types used so far:
- **The Predictor** — next-token probability visualiser (lesson: next-token prediction)
- **The Temperature Dial** — shows how temperature changes word distribution (lesson: next-token prediction)
- **The Context Window** — visualises messages filling and dropping out of the window (lesson: training and memory)

When designing a new simulation, ask: "What moment makes this concept impossible to forget?"

---

## The manifest (`manifest.json`)

Every module folder must have a `manifest.json`. This is the source of truth the app uses to build navigation and know what to render. It also serves as a completion checklist.

**Structure:**
```json
{
  "module": 1,
  "title": "Module title",
  "lessons": [
    {
      "id": "01-introduction",
      "title": "Introduction",
      "file": "01-introduction.md",
      "parts": {
        "content": true,
        "example": true,
        "quiz": false,
        "simulation": false
      }
    }
  ]
}
```

Rules:
- Introduction lessons do not require a quiz or simulation — set both to `false`
- Every other lesson must have `content`, `example`, and `quiz` set to `true` before the module is considered shippable
- `simulation` is encouraged but not mandatory for every lesson

---

## The Karel running example

Karel is a fraud reporting agent deployed inside a bank's internet banking app. He appears in every module as the practical anchor for every concept.

**Karel's tools:**
- Read customer transaction history
- Flag a transaction as potentially fraudulent
- Freeze the card linked to the account
- Create a formal fraud report (sent to the bank's fraud team)

**Karel's constraints (what he cannot do):**
- Resolve or approve fraud claims
- Reverse transactions or issue refunds
- Give investment or financial advice
- Transfer money on the customer's behalf

**How to use Karel in lessons:**
- Apply the lesson's concept to a specific Karel scenario
- Make the failure mode concrete — what goes wrong if this concept is ignored?
- The Karel section should always end with a product implication, not just a description

---

## Folder structure per module

```
0X-module-name/
  manifest.json                        ← required
  index.md                             ← module overview
  01-introduction.md                   ← no quiz, no simulation
  02-lesson-name.md                    ← content + Karel example
  02-lesson-name.quiz.json             ← per-lesson quiz
  03-lesson-name.md
  03-lesson-name.quiz.json
  03-lesson-name.sim.json              ← if simulation exists
  ...
```
