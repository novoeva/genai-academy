---
title: "How to reduce hallucination: grounding, RAG, and guardrails"
module: 2
order: 2
---

You can't fully eliminate hallucination from an LLM, but you can design systems that dramatically reduce it and catch it when it slips through. This is one of the most important practical skills in AI product design.

There are three main levers: grounding the model in real sources, constraining what it's allowed to say, and validating its output before it reaches the user.

## Lever 1: Grounding with RAG (Retrieval-Augmented Generation)

**The problem:** The model's knowledge is frozen at training time. If you ask it a question about your company's policies, last month's earnings, or anything specific to your product, it doesn't know, and may hallucinate an answer.

**The solution:** Before sending the user's question to the model, retrieve the relevant documents from a real source (a database, a knowledge base, a set of files), and include them in the prompt. The model then answers *based on those documents* rather than from memory.

This is called **RAG, Retrieval-Augmented Generation**. Retrieval = go get the real information. Augmented = add it to the prompt. Generation = the model answers using it.

Without RAG: the model invents a plausible-sounding answer from pattern-matching alone. With RAG: the model answers based on retrieved documents that are factually accurate.

RAG is the single most impactful technique for reducing hallucination in production systems. Most serious AI products use some form of it.

### How RAG Works

**Retrieval-Augmented Generation explained step by step**

**Step 1: User asks a question**

**Step 2: Retrieve relevant documents** from the Knowledge Base (Database, Files, APIs)

**Step 3: Augmented Prompt** — Question + Retrieved Documents are combined

**Step 4: LLM Generation** → Grounded Response (based on real sources)

**R** — Retrieval: Go get the real information from your knowledge base
**A** — Augmented: Add the retrieved documents to the prompt  
**G** — Generation: The model answers using the provided context

**Without RAG:**
- Model answers from training data only
- Knowledge is frozen at training time
- May hallucinate plausible-sounding answers
- Cannot access company-specific information
- No way to verify the response

**With RAG:**
- Model answers based on retrieved documents
- Can access current, specific information
- Grounded in factual sources
- Works with your company's data
- Responses are verifiable

## Lever 2: System prompt constraints

The system prompt is a set of instructions the model receives before the user's message. You can use it to constrain what the model is allowed to do.

Useful constraints include:

- **"Only answer based on the provided documents. If the answer is not in the documents, say so."** This tells the model to admit uncertainty rather than guess.
- **"Do not make up citations, URLs, or statistics."** Explicitly calling out known hallucination vectors.
- **"If you don't know the answer, say 'I don't have that information' rather than guessing."** Giving the model a safe fallback phrase.

These don't eliminate hallucination entirely, but they meaningfully reduce it and shape how the model handles uncertainty.

## Lever 3: Low temperature

:::definition Temperature
A number (usually between 0 and 1) that controls how randomly an LLM picks its next token. At **temperature 0**, the model always chooses the highest-probability option — deterministic and consistent. At **higher temperatures**, it samples more broadly, producing more varied output. For factual tasks like customer support or data extraction, lower temperature means fewer surprises and fewer hallucinations.
:::

For factual use cases, customer support, documentation assistants, data extraction, lower temperature reduces sampling randomness and keeps the model closer to its most confident, stable responses. This reduces creative drift but also reduces hallucination.

## Lever 4: Output validation

For high-stakes outputs, don't trust the model's self-report. Validate programmatically:

- If the model returns a date, check it's a real date.
- If it returns a product name, check it exists in your database.
- If it cites a source URL, check the URL resolves.

This is sometimes called a "guardrail layer", a separate step between the model's output and what the user sees.

## Lever 5: Letting the model say "I don't know"

One of the best hallucination interventions is cultural, not technical: design your prompts and UI so that "I don't know" is an acceptable answer. Many hallucinations happen because the model has been implicitly trained (or prompted) to always produce an answer. Explicitly giving it permission to express uncertainty is more effective than you'd expect.

## Putting it together: a simple anti-hallucination stack

For most production use cases, a combination of these levers is used:

1. RAG to anchor the model in real source material
2. System prompt instructions that tell it to stay grounded and admit uncertainty
3. Low temperature for consistency
4. Output validation for any structured or high-stakes data
5. UI caveats that don't present model outputs as infallible facts

:::karel Karel in practice

**RAG:** Karel receives the customer's actual transaction records from the database at the start of every conversation — no guessing, no fabrication from training data.

**System prompt constraints:** Karel's prompt says: "Never confirm an action unless you've received a success response from the tool. If a tool call fails, tell the customer a human will follow up." One instruction, closes the scariest gap.

**Output validation:** Before Karel tells a customer their fraud report has been filed, the system checks the tool returned a success code. If it didn't, the confirmation is blocked — the customer never sees a false response.

**Low temperature:** Karel runs at low temperature. Distressed customers need consistent, reliable responses — not creative variation.
:::

Together, these four decisions make the hallucination scenario from the previous lesson much less likely. Not impossible — but unlikely enough to ship.

:::takeaway Key takeaway
Hallucination is reduced through system design, not just model choice. The core techniques are: give the model real sources to work from (RAG), constrain its behavior through the system prompt, reduce randomness with low temperature, and validate outputs before they reach users.
:::
