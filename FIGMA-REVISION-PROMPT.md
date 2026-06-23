# Design Brief for Google Stitch — GenAI Academy Content Blocks

## The one thing to understand before reading anything else

**Do not redesign anything that already exists.** This app has five screens with a polished, finished design. Screenshots of all five are attached. All five are good and should stay exactly as they are. The only job here is to design a library of content block components that match the existing visual style, and then show one updated Lesson Page frame that uses those blocks. Everything else — navigation, sidebars, typography, color — stays untouched.

Study the attached screenshots carefully before designing anything.

---

## What the existing design looks like (match this exactly)

The screenshots attached to this brief show all five existing screens. Every new component must match these characteristics precisely.

**Background and surfaces:**
- Page background: white (#FFFFFF)
- Left sidebar background: white, with a very subtle right border
- Cards and contained elements: white, with a 1px light gray border (~#E5E7EB), border-radius ~8–12px
- No drop shadows on cards. Depth comes only from borders and background color fills.
- The overall feel is "clean SaaS product" — like Notion or Linear, not like an educational platform or textbook.

**Colors:**
- Primary accent: indigo/purple, approximately #6366F1
- Active/selected sidebar link: solid indigo fill (#6366F1) with white text
- Progress dots and status indicators: green (~#22C55E) for complete, indigo (#6366F1) for in-progress, light gray for not started
- The "In Progress" module card on the Dashboard has a solid indigo/purple background
- The Key Takeaway block has a very dark near-black background (~#1E1B2E or similar dark navy)
- Warning/error elements (Contrast Grid): red (~#EF4444) icons on white background
- "Did You Know" accent: golden/amber (~#F59E0B)
- All other blocks: white or very light indigo tint (~#F5F3FF) for secondary surfaces

**Typography:**
- Font: clean modern sans-serif (Inter or similar)
- H1 (lesson title): ~32–36px, bold, near-black
- H2/H3 (block titles): ~20–24px, semibold
- Body text: ~14–15px, regular, line-height ~1.6, near-black (~#1F2937)
- Small labels/meta text: ~12px, uppercase, letter-spacing ~0.08em, medium indigo or gray
- The "KAREL IN PRACTICE" label and "HOW IT WORKS" label are small-caps uppercase in the accent color

**Navigation chrome (do not touch):**
- Top nav bar: white, logo left, nav links center, icons right
- Left sidebar: white, ~256px wide, module/lesson links with icon + text, "Resume Learning" button at bottom in solid indigo
- The sidebar on the Lesson Page has a collapsible state but is shown expanded by default
- Previous/Next lesson navigation: sits at the very bottom of the lesson content, left arrow + "PREVIOUS LESSON" label + lesson title on the left, same pattern on the right

---

## The five existing screens — what exists and what needs work

### 1. Dashboard — COMPLETE, DO NOT CHANGE
See attached screenshot. Contains: Resume Hero card (dark neural-network image with module title + "Continue Module" CTA button), Mastery Card (top right, white card with bold % stat + encouragement text), Module Grid (bento layout of 8 module cards with Complete/In Progress/Locked states — the in-progress card has a solid indigo fill).
Action: None. Use the attached screenshot as the reference. Do not alter this screen.

### 2. Module Overview — COMPLETE, DO NOT CHANGE
See attached screenshot. Contains: Module Header (small indigo "MODULE X OF 8" label, H1 title, description paragraph, meta line with lesson count and time), Lesson List (numbered rows — green badge for complete, indigo badge for in-progress, gray for not started), Quiz Card locked at the bottom.
Action: None. Do not alter this screen.

### 3. Quiz Page — COMPLETE, DO NOT CHANGE
See attached screenshot. Contains: Progress bar at top (indigo fill, module title + "Question X of Y"), Question Card (white, large bold question text), Answer Options (4 rows, letter badge, selected state has indigo border and fill + checkmark), Mentor Tip panel on the right.
Action: None. Do not alter this screen.

### 4. Quiz Results — COMPLETE, DO NOT CHANGE
See attached screenshot. Contains: Score Hero (indigo card, large X/Y score, "Well done!" label), Answer Summary list (green/red dot per question + tick/cross), two CTA buttons.
Action: None. Do not alter this screen.

### 5. Lesson Page — NEEDS REVISION
See attached screenshot. The existing Lesson Page is good. The top nav bar, the left sidebar, the lesson title and breadcrumb area at the top, and the Previous/Next lesson footer at the bottom must all stay exactly as they are in the screenshot. The only change: the main content column needs to be rebuilt using the 9 named block components defined below.
Action: Design the 9 content block components, then produce one updated Lesson Page frame showing them composed in sequence.

---

## Page types and their blocks

This table shows every block per page, whether it is required or optional, and where it sits. For the Lesson Page specifically, this is the composition order for the revised frame.

### Lesson Page

| Block | Required? | Position |
|---|---|---|
| Body Text | Required | Top of main column |
| Concept Grid | Optional | After Body Text |
| Analogy | Optional | After Concept Grid |
| Simulation Embed | Optional | Inline, anywhere in main column |
| Karel in Practice | Required | After main content |
| Contrast Grid | Optional | After Karel in Practice |
| Key Takeaway | Required | Bottom of main column |
| How It Works | Required | Right sidebar, top |
| Did You Know | Optional | Right sidebar, below How It Works |

### Dashboard (already designed)

| Block | Required? | Position |
|---|---|---|
| Resume Hero | Required | Top left |
| Mastery Card | Required | Top right |
| Module Grid | Required | Below hero |

### Module Overview (already designed)

| Block | Required? | Position |
|---|---|---|
| Module Header | Required | Top |
| Lesson List | Required | Middle |
| Quiz Card | Required | Bottom |

### Quiz Page (already designed)

| Block | Required? | Position |
|---|---|---|
| Progress Bar | Required | Top |
| Question Card | Required | Main area |
| Answer Options | Required | Below question |
| Mentor Tip | Optional | Right sidebar |

### Quiz Results (already designed)

| Block | Required? | Position |
|---|---|---|
| Score Hero | Required | Top center |
| Answer Summary | Required | Middle |
| Action CTAs | Required | Bottom |

---

## The 9 content block components to design

Each component must use the visual language described above. Populate every component with realistic content from the "1.1 What is an LLM?" lesson visible in the existing Figma file.

---

### Block 1 — Body Text
**What it is:** Plain reading text. No container, no border, no background fill. This is not a card — it is text sitting directly on the white page background, exactly like a well-typeset article.
**Visual spec:** Body text, ~14–15px, line-height 1.6–1.7, near-black. Paragraph spacing ~16px. The measure (line length) should be comfortable — approximately 65–70 characters. No wrapper element whatsoever.
**Variants:** None.
**Example:** "At its core, an LLM (Large Language Model) is a type of artificial intelligence trained to understand, generate, and manipulate human language. To truly understand it, we must break down the acronym."

---

### Block 2 — Concept Grid
**What it is:** A row of 2–4 equal-width cards, each defining one named component of a concept.
**Visual spec:** Cards sit on a very light background — either white with a 1px ~#E5E7EB border, or a very pale indigo tint (~#F5F3FF) with no border. Border-radius ~8px. Each card contains: a small line-style icon (20–24px, indigo color) at the top, followed by a bold term (~15px semibold), followed by 2–3 sentences of body text (~13px regular, slightly softer color ~#6B7280). Cards are the same height, content is top-aligned. No shadows.
**Variants:** 2-column, 3-column, 4-column.
**Example (3-column):**
- Large (database/stack icon): "Refers to the massive scale of parameters and the vast datasets (millions of words) used for training."
- Language (translate/speech icon): "The primary domain of operation. These models specialise in the rules, nuances, and context of human speech."
- Model (node graph icon): "A complex mathematical representation or algorithm that has 'learned' patterns from the data."

---

### Block 3 — Analogy
**What it is:** A metaphor block that bridges an abstract concept to a familiar image.
**Visual spec:** A 3px left border in the primary indigo accent color (#6366F1). White or very light tint background. No outer border on the other three sides. Inside: a small indigo icon (lightbulb or link symbol, 16px) and a bold headline ("The Universal Library Analogy") on the same line, ~16px semibold. Below, the analogy text in regular weight, slightly italicised, ~14px, line-height 1.6. Internal padding ~20–24px. No image — text only.
**Variants:** None.
**Example:** Title: "The Universal Library Analogy". Body (italicised): "Imagine a librarian who has not just read every book in existence, but has memorised the statistical probability of which word follows another in every context. When you ask them a question, they aren't 'thinking' — they are predicting the most likely expert response based on everything ever written."

---

### Block 4 — Simulation Embed
**What it is:** A frame that houses an interactive simulation component inline in the lesson.
**Visual spec:** A contained region with a 1px border (~#E5E7EB), border-radius ~8px, very light gray or light indigo-tint background. At the top: a 1-sentence italic prompt in ~13px body text ("Try adjusting the temperature slider and watch how the model's word choices change."). Below the prompt: a fixed-height dark/medium background area (~200–300px height) acting as a placeholder for the simulation — use a simple centered label "Interactive Simulation" in light text. A small pill badge in the top-right corner of the outer frame reading "Interactive" in white on an indigo fill, ~11px.
**Variants:** Placeholder (what to design), Loaded (just note this state exists, no need to design it).
**States:** Loading skeleton, Active.

---

### Block 5 — Karel in Practice
**What it is:** The most important block in every lesson. Shows the concept applied to Karel, a fraud-reporting banking agent. Must be the most visually distinctive block on the page.
**Visual spec:**
- Outer card: white background, 1px border in a light indigo (~#C7D2FE), border-radius ~12px, internal padding 24px.
- Left border: 4px solid indigo accent (#6366F1) — this is the strongest left-border accent on the page.
- Top-left: a small chip/badge reading "KAREL IN PRACTICE" — ~11px, uppercase, letter-spacing 0.08em, indigo text (#6366F1) on very light indigo background (#EEF2FF), border-radius 4px.
- Top-right: a small robot/bot icon illustration, line-style, ~40px, indigo color. Simple, not decorative.
- Title: bold, ~18px, near-black, directly below the chip.
- Scenario text: body text, ~14px, regular weight.
- Prompt snippet (optional): a contained code-style inset box — dark background (~#1E1B2E), monospace font, ~13px, white or light text, border-radius ~6px, padding 12–16px. Label "PROMPT" above it in ~10px uppercase gray.
- Closing sentence: ~13px, slightly softer color (~#6B7280).
**Variants:** With prompt snippet, without prompt snippet.
**Example:**
- Chip: "KAREL IN PRACTICE"
- Title: "Building Karel's Support Bot"
- Scenario: "In our running example, Karel (a fintech product manager) wants to use an LLM to automate customer support tickets. Instead of hard-coding every possible 'if-then' rule, Karel uses an LLM."
- Prompt: `"A user is asking why their transaction is 'Pending'. Explain this in a friendly tone using our bank's 3-day clearing policy."`
- Closing: "The LLM doesn't 'know' the user; it uses its training in Language and the Model of bank policies to generate a perfect response."

---

### Block 6 — Contrast Grid
**What it is:** Immediately follows a definition to pre-empt misconceptions. Always titled "What X is NOT."
**Visual spec:** A heading line — small red/orange warning icon (🚫 or ⊗, ~16px) followed by "What an LLM is NOT" in ~16px semibold near-black. Below: a 2×2 grid of cells. Each cell: white background, 1px border (~#E5E7EB), border-radius ~8px, padding ~12–16px. Inside each cell: a small red circle-slash or X icon (~14px, #EF4444) + a short phrase in ~13px semibold near-black (~4–6 words). No body text inside the cells — just the icon and phrase.
**Variants:** None (always 4 items, always 2×2).
**Example phrases:** "Not a Search Engine", "Not Sentient or Conscious", "Not a Database of Facts", "Not Capable of Real Feeling".

---

### Block 7 — Key Takeaway
**What it is:** The final block in every lesson. One memorable statement. Must feel conclusive.
**Visual spec:** Full-width block (same width as the content column). Background: very dark near-black or dark navy (~#1E1B2E). White text throughout. Internal padding ~24px. Left side: a small green checkmark icon (~20px, #22C55E) and "KEY TAKEAWAY" label in ~11px uppercase, letter-spacing 0.1em, light gray/muted white. Below: the takeaway sentence in ~16–18px, regular weight, white. The key term within the sentence is bold AND slightly brighter white or a very light indigo (#C7D2FE) to make it stand out within the dark background. Border-radius ~12px.
**Variants:** None.
**Example:** "An LLM isn't a brain; it's a **statistical prediction engine** for human language. Its power comes from its scale (Large) and its ability to model complex relationships between concepts." (Bold "statistical prediction engine" in the final design.)

---

### Block 8 — How It Works (sidebar)
**What it is:** Right sidebar block. Always visible. Shows the lesson mechanism as 3–5 short numbered steps.
**Visual spec:** No card container — this sits directly in the sidebar column, not in a box. Header: "HOW IT WORKS" in ~11px uppercase, letter-spacing 0.1em, indigo accent color (#6366F1), ~12px semibold. Below: 3–5 items. Each item: a small filled circle in indigo with a white number inside (~18px diameter) on the left, then bold term (~12px semibold near-black) on the same line, then the explanation sentence directly below in ~12px regular, color ~#6B7280, line-height 1.5. Items separated by ~12–16px spacing. No borders, no cards, no background.
**Variants:** 3-step, 4-step, 5-step.
**Example:**
1. Tokenization — "Text is broken down into small chunks called 'tokens'."
2. Vectorization — "Tokens are converted into complex mathematical vectors."
3. Prediction — "The model predicts the next token in the sequence."

---

### Block 9 — Did You Know (sidebar)
**What it is:** Right sidebar block below How It Works. Optional. One surprising fact.
**Visual spec:** A small contained card with a 3px left border in golden amber (#F59E0B). Very light warm background (~#FFFBEB) or white with that left border only. Internal padding ~12–16px. Header: a small ✦ or star icon in amber + "DID YOU KNOW?" label in ~10px uppercase, letter-spacing 0.08em, amber color (#D97706). Below: the fact in ~12px regular, near-black, line-height 1.5. Border-radius on the right side ~6px, flat on the left (because of the border). The whole block should feel like a margin note — informative, not dominant.
**Variants:** None.
**Example:** "GPT-3 was trained on roughly 45 terabytes of text data — equivalent to reading the entire Wikipedia library over 6,000 times."

---

## The revised Lesson Page frame

After designing the 9 components, produce one full Lesson Page frame. Use the existing Lesson Page from the Figma file as the base — keep the top nav, the left sidebar, the lesson title/breadcrumb, and the Previous/Next footer exactly as they are. Replace only the main content column with blocks composed in this order:

1. Lesson title + breadcrumb + learner avatars + progress (existing — keep as-is)
2. Body Text (2 short paragraphs)
3. Concept Grid (3 columns: Large, Language, Model)
4. Analogy ("The Universal Library Analogy")
5. Karel in Practice (with prompt snippet)
6. Contrast Grid ("What an LLM is NOT")
7. Key Takeaway
8. Previous/Next lesson navigation (existing — keep as-is)

Right sidebar (fixed alongside main column):
- How It Works (3 steps: Tokenization, Vectorization, Prediction)
- Did You Know (GPT-3 training data fact)

---

## Deliverables

1. A Figma component for each of the 9 blocks listed above, with all named variants
2. One revised Lesson Page frame using those components as described above
3. All components in a new "Content Blocks" page within the existing Figma file
4. The existing 5 screen frames reproduced identically — no changes to Dashboard, Module Overview, Quiz Page, or Quiz Results
