---
title: "App Structure"
type: reference
---

# App Structure

## Page Types

The app has 6 distinct page types. Every new screen must map to one of these. If it doesn't fit, discuss before adding a new type.

---

### 1. Course Catalog
**Nav:** No sidebar, top bar only
**Purpose:** Entry point to the platform. Shows all available courses with title, description, and enrollment/progress state. Not yet built — relevant once there is more than one course.
**Data source:** `courses/index.json` (future)

---

### 2. Dashboard
**Nav:** Full nav (sidebar + top links)
**Purpose:** Home screen for a single course. Shows all module cards with completion state, an overall progress widget, and a "resume" CTA that drops the user back where they left off.
**Data source:** Progress state (local) + all `lessons/0X-module/index.md` titles

---

### 3. Module Overview
**Nav:** Full nav (sidebar + top links)
**Purpose:** Landing screen when a user clicks a module card. Shows the module intro, a list of all lessons with done/not-done state, and a quiz card locked at the bottom until all lessons are complete.
**Data source:** `lessons/0X-module/index.md`

---

### 4. Lesson Page
**Nav:** Full nav (sidebar + top links)
**Purpose:** The content reading experience. Two-column layout: lesson markdown on the left, "How it works" steps + "Did you know" callout on the right. Inline simulation embedded in the left column where present. Previous/Next navigation at the bottom.
**Data source:** `lessons/0X-module/0Y-lesson.md` + `simulations.html` (if present)

---

### 5. Quiz Page
**Nav:** Stripped (logo + "Exit Quiz" link only, no sidebar)
**Purpose:** One question at a time. Four answer options. Explanation revealed after answering. Progress bar at top (e.g. Q2 of 5). Mentor tip sidebar on the right.
**Data source:** `lessons/0X-module/quiz.json`

---

### 6. Quiz Results
**Nav:** Stripped (logo + "Back to Module" link only)
**Purpose:** Shown after the last quiz question is submitted. Displays score (e.g. 4/5), a per-question correct/incorrect summary, and two CTAs: "Retry quiz" and "Continue to next module."
**Data source:** Derived from quiz answers in session state

---

## Navigation Flow

```
Course Catalog
  └── Dashboard
        └── Module Overview
              ├── Lesson Page (repeated per lesson)
              └── Quiz Page
                    └── Quiz Results
```

## Nav Variants by Page

| Page | Sidebar | Top nav links | Special action |
|---|---|---|---|
| Course Catalog | No | No | — |
| Dashboard | Yes | Modules, Simulations, Library | — |
| Module Overview | Yes | Modules, Simulations, Library | — |
| Lesson Page | Yes (collapsible) | Modules, Simulations, Library | — |
| Quiz Page | No | — | "Exit Quiz" |
| Quiz Results | No | — | "Back to Module" |

## Design Decisions

- **Platform:** Web app, desktop-first (min ~1024px wide)
- **Sidebar:** Collapsible. Default state is expanded. User can collapse to a narrow icon rail to give the lesson/simulation more horizontal space. Useful especially when interacting with simulations.
- **Figma:** All 6 page types have design frames on "Page 1". A "Screen Map" page in the same Figma file shows the full navigation flow visually.

## Data Sources

| Screen | File(s) |
|---|---|
| Course Catalog | `courses/index.json` (future) |
| Dashboard | Progress state (local) + all `lessons/0X-module/index.md` titles |
| Module Overview | `lessons/0X-module/index.md` |
| Lesson Page | `lessons/0X-module/0Y-lesson.md` + `simulations.html` (optional) |
| Quiz Page | `lessons/0X-module/quiz.json` |
| Quiz Results | Derived from quiz session state |
