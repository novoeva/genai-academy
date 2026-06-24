# Content comprehensibility review

Target persona: uses ChatGPT/Claude daily, no engineering background, curious but time-poor.

---

## Fixed inline (minor issues corrected directly)

- `lessons/01-how-llms-work/02-what-is-an-llm.md` — "billions of parameters" is jargon the first time it lands. Added a brief plain-English gloss ("internal numbers that shape how they respond") on first use, then removed the redundant "(called parameters or weights)" from the Model card since the concept had already been introduced.

- `lessons/01-how-llms-work/03-next-token-prediction.md` — Opening sentence used "token" before defining it. Replaced "predict the most likely next token given all the tokens that came before" with "predict the most likely next word (or word-fragment) given everything that came before it" so the core idea lands before the jargon does. The "What is a token?" section that follows still defines the term properly.

- `lessons/01-how-llms-work/04-training-and-memory.md` — The product implications table listed "RAG, fine-tuning, or prompt engineering" as alternatives in a single table cell with no explanation. This is the first mention of RAG and fine-tuning in the course, both undefined at this point. Expanded to brief plain-English descriptions of each approach so the table is readable on its own.

- `lessons/02-hallucination/01-what-is-hallucination.md` — "Grounded with retrieved sources (RAG)" in the likelihood factors list assumed the reader knows RAG. Changed to "Given real source documents to refer to (RAG)" so the item is self-explanatory.

- `lessons/02-hallucination/02-how-to-reduce-it.md` — The RAG acronym expansion was overly academic ("Retrieval = go get the real information. Augmented = add it to the prompt. Generation = the model answers using it."). Replaced with a single parenthetical that gives the gist without the lecture: "(a fancy name for a simple idea: go get the real information, add it to the prompt, and let the model answer from it)".

- `lessons/03-prompt-engineering/04-how-to-write-clear-instructions.md` — "you're not paying for tokens, you're paying for unpredictable agent behavior" is jargon-flavoured framing (the reader doesn't think in terms of "paying for tokens"). Replaced with "a few extra words in a prompt cost almost nothing — unpredictable agent behavior in production costs a lot."

- `lessons/06-memory-and-state/01-introduction.md` — Learning outcome listed "How do vector stores work?" — the term "vector store" is undefined at this point and meaningless to a non-technical reader. Added a plain-English gloss in the learning outcome: "AI-powered search stores (vector stores)". Also replaced the RAM/NAND flash analogy ("you don't need to know how NAND flash works") — NAND flash is itself jargon. Replaced with a desk/filing-cabinet analogy that requires no technical knowledge.

- `lessons/06-memory-and-state/03-external-memory.md` — The vector store concept card was dense with unexplained technical terms ("mathematical vectors", "numerical representations of meaning", "embedding model"). Rewrote the card to lead with what it does for the user (meaning-based search, like Google) and explain the mechanics in one plain sentence at the end. Also rewrote the "Relevance failures" item in the deep dive to remove "probabilistic" and "grounding failure" in favour of plain English.

- `lessons/06-memory-and-state/04-fine-tuning-as-memory.md` — "bakes knowledge or behavior directly into the model's weights, the parameters that determine how the model responds" used "weights" and "parameters" as if familiar. Removed the jargon and restructured the sentence to communicate the idea directly.

- `lessons/08-evaluating-and-shipping/03-evals-and-tracing.md` — The toxicity/groundedness deep dive mentioned "Perspective API" as an example and used "groundedness judge" and "retrieval-augmented systems" without explanation. Replaced with plain-English descriptions that don't require prior knowledge of specific tools.

- `lessons/08-evaluating-and-shipping/05-the-pm-checklist.md` — "A RACI model lays out who is Responsible, Accountable, Consulted, and Informed" is corporate jargon that breaks the voice. The surrounding sentence ("Name an owner for...") already conveys the practical message. Removed the RACI sentence. Also added a concrete example to the EU AI Act mention (clarified that banking tools are one of the high-risk categories) so readers understand it applies to them.

---

## Needs discussion (bigger changes, review with user)

### Module 1, Lesson 3 — Next-token prediction: the "figure-aside" section

- **Issue:** The figure-aside block describes a multi-step prediction flow with "Step 4" and a feedback loop — but there's no actual figure shown (it references `/images/prediction-flow.jpg`). The prose tries to describe the image but reads as disconnected without it. The section says "Notice the loop in Step 4" but a reader without the image has no idea what loop is being referenced.
- **Suggestion:** Either ensure the image is loading properly in the app, or rewrite this section to stand alone without relying on a figure. A short numbered list describing the four steps directly would work. This is a comprehension risk: the core mechanism of the entire course is explained in a block that may be broken for some readers.

### Module 1, Lesson 3 — Temperature knob placement and the "as a PM" framing

- **Issue:** The temperature section ends with "As a PM, temperature is a product decision." The course is for a broad non-technical audience, not specifically PMs. The "as a PM" framing appears occasionally (modules 1, 8) and mildly excludes readers who are practitioners, founders, or just curious users. Minor, but worth noting.
- **Suggestion:** Either replace "As a PM" with "As someone building with AI" throughout, or make a deliberate choice about the target audience label and use it consistently. The rest of the content is perfectly accessible to non-PMs; the label is the only friction.

### Module 2, Lesson 2 — "Lever 3: Low temperature" ordering and context

- **Issue:** Temperature was introduced and explained in Module 1 with a good definition. Here it reappears as "Lever 3" with a repeated definition block. The definition in the deep-dive is good, but the placement creates a subtle problem: by the time the reader hits Lever 3, they've just read two substantial levers (RAG, system prompt). Lever 3 feels like a different type of thing — a model setting, not a design layer — and it's not obvious why it ranks above output validation (Lever 4). The "so what" for a non-technical reader is weak: "reduces sampling randomness" doesn't tell them how to act on it.
- **Suggestion:** Keep the temperature lever but reframe it around the product decision rather than the mechanism: "For any task where consistency matters more than creativity — like a customer support bot — set temperature low. This is usually a single configuration setting your engineering team controls." This is more actionable for the target persona.

### Module 3, Lesson 2 — "What you control" section endpoint

- **Issue:** The lesson ends with "What you cannot control: the model's internal reasoning or its probability distribution. You can only shape the input and hope for reasonable output." The phrase "hope for reasonable output" is discouraging and slightly inaccurate — the whole module is about how good prompt engineering produces reliable (not hoped-for) results. This undercuts the module's premise.
- **Suggestion:** Change "hope for reasonable output" to something like "predict its behavior based on what you put in." The lesson is specifically about how to shape inputs to get reliable outputs — the ending shouldn't imply that's futile.

### Module 4, Lesson 4 — JSON code blocks in tools and function calling

- **Issue:** The lesson includes two raw JSON code blocks showing the model's tool call format and the response. These are the right concept to convey, but the JSON syntax (curly braces, quoted keys, ISO timestamps) will be unfamiliar and slightly intimidating to a non-technical reader. The content before and after explains the concept clearly — the code blocks may not be adding value for this audience.
- **Suggestion:** Either remove the JSON blocks and describe what the message looks like in plain English ("the model says: 'please freeze card for account CUS-00841923' and your application says back: 'done, frozen at 2:32pm'"), or add a brief callout before each block explicitly saying "don't worry about the format — the important part is the concept." Currently the blocks appear without any framing for a non-technical reader.

### Module 5, Lesson 4 — "Defense-in-depth" diagram as ASCII art

- **Issue:** The defense-in-depth model is presented as an ASCII flow diagram inside a code block. ASCII diagrams render unpredictably depending on font and screen size, and some of the labels are truncated ("instruct the model not to take out-of-scope actions" inside a diagram line). The concept is important and this is a key visual moment in the module.
- **Suggestion:** Replace the ASCII diagram with prose or a concept-cards block listing the layers in order. The same information is more reliably readable as a numbered list: "1. System prompt guardrails → 2. Tool access control → ..." The key insight (no single layer is sufficient) comes through more clearly in prose anyway.

### Module 6, Lesson 3 — "Vector store" intro is still jargon-heavy in the Karel story

- **Issue:** Despite the inline fix to the concept card, the Karel story still references "a vector store" and "a case management system" without the reader having a clear mental model of what either is. The story says "when the customer asks 'how long does an investigation typically take?', Karel retrieves the relevant policy documents from a vector store" — at this point in the flow, the reader just had the concept introduced for the first time and is immediately seeing it in action in a story. It moves quickly.
- **Suggestion:** Add one sentence of grounding in the Karel story: "Karel retrieves the relevant policy documents from the bank's policy database (a vector store — the meaning-based search system described above) and grounds his answer in the actual policy." The parenthetical links back to the concept without requiring the reader to hold it all in working memory.

### Module 6, Lesson 4 — Fine-tuning analogy clarity

- **Issue:** The analogy "reference manual vs. experience" is good but subtly breaks down. A reference manual (external memory) is something you consult when you need it; two years of field experience (fine-tuning) is something you carry everywhere. The analogy works for the permanence distinction but not for the update distinction (you can update a manual easily; you can't update experience as easily). The lesson's main practical point is that fine-tuning is expensive to update, which is exactly what the analogy obscures.
- **Suggestion:** Either extend the analogy ("you can update a manual in an afternoon, but unlearning two years of habit takes a long time and a lot of repetition") or swap to one that foregrounds the update cost more clearly: "Think of it as the difference between writing something on a whiteboard (RAG — easy to erase and update) vs. having it tattooed (fine-tuning — permanent, expensive to change)."

### Module 7, Lesson 3 — "Least-privilege design" phrase

- **Issue:** "Least-privilege design limits the blast radius when any single agent behaves unexpectedly." Both "least-privilege design" and "blast radius" are technical/security jargon that the target persona won't recognise. The concept is simple (don't give agents more access than they need) but the terminology makes it sound advanced.
- **Suggestion:** Rewrite as: "Give each agent only the access it actually needs to do its job. That way, if one agent goes wrong, the damage stays contained — it can't affect parts of the system it was never supposed to touch."

### Module 8, Lesson 3 — "Model-graded evals" section and the concept of a "judge model"

- **Issue:** "Use a separate model (a 'judge model') to assess qualitative properties" introduces a new concept (an AI judging AI) that many non-technical readers will find confusing. The lesson doesn't explain why a model can do this or how to trust its judgment — it just introduces it and moves on. The quote marks around "judge model" signal that this is novel but don't explain it.
- **Suggestion:** Add one sentence before "judge model" is introduced: "You can use another AI model to review Karel's responses — essentially setting one model to critique another. It sounds recursive, but it works: a judge model asked to rate a response on empathy (1-5) is doing a simpler task than Karel's and tends to be reliable enough for trend-tracking." Without this framing, readers may find the concept confusing or untrustworthy.

### Module 8, Lesson 4 — "Distribution shift" and "model drift" without clear "so what"

- **Issue:** The drift section introduces three distinct types of drift (model drift, prompt drift, distribution shift) with accurate definitions but weak "so what" for a non-technical reader. "AI providers occasionally update underlying models, and even small updates can shift output distribution at the margins" is technically accurate but abstract. A product person's question would be: "What does this actually look like? How would I notice?" The lesson answers this partially but not clearly enough.
- **Suggestion:** Add a one-sentence concrete example for each type. Model drift: "One day Karel's tone starts sounding slightly different, and nothing in your system changed — your AI provider quietly pushed a model update." Prompt drift: "A developer fixed a bug six weeks ago and added two sentences to the system prompt; those sentences now conflict with an earlier instruction." Distribution shift: "Your test conversations were all from internal testers; real customers phrase things very differently." These make the abstract tangible.

### Karel character — overall note

- **Issue:** Karel is a consistently good anchor throughout the course. The scenarios are realistic and the "why this matters" cards are almost always effective. One pattern worth watching: several Karel stories end with a "Result" that describes a positive outcome from good design (things go right), but the "Why this matters" card then restates the lesson principle rather than landing a human consequence. In the most powerful Karel stories (e.g., the hallucinated fraud report in Module 2), the "Result" lands an emotionally resonant real-world outcome. In weaker ones (e.g., Module 5 Lesson 4, Module 7 Lesson 2), the "Result" is more abstract: "The interface works because it was explicitly designed." 
- **Suggestion:** Review Karel stories where the "Result" is about the system working correctly rather than a human outcome. Ask: what does this mean for the customer on the other end of the conversation? Even one sentence — "The customer's card gets frozen in time. The fraud stops." — transforms a technical observation into a felt consequence.
