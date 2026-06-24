---
title: "Fine-tuning as procedural memory"
module: 6
order: 4
---

In-context memory is temporary. External memory requires retrieval. Fine-tuning is different: it bakes knowledge or behavior directly into the model itself by training it further on a specific dataset. The result is a model that has internalized patterns from that dataset — not just as text it can retrieve, but as part of how it generates responses by default, without any extra instructions needed.

:::analogy Reference manual vs. experience
Think of it as the difference between writing something on a whiteboard (external memory, easy to erase and rewrite) vs. having it tattooed (fine-tuning, permanent, expensive to change, and you really need to be sure before you commit).
:::

## What fine-tuning actually changes

Fine-tuning doesn't add new storage capacity to the model. It doesn't give the model access to new facts the way a database does. What it changes is the model's default behavior, its tendencies, its tone, its reflexes when encountering familiar patterns.

**Good uses of fine-tuning:**
- Teaching the model a specific communication style or persona that should be consistent across all interactions
- Embedding domain-specific behavior patterns (not facts, behavior) that are hard to specify in a system prompt
- Improving reliability on a narrow task when general-purpose behavior is inconsistent
- Reducing the length and complexity of a system prompt by pre-embedding common behaviors

**Poor uses of fine-tuning:**
- Teaching the model specific facts that need to stay current (prices, policies, case statuses, these change)
- Replacing a knowledge base, fine-tuning is for behavior, not for factual memory
- Fixing a prompt engineering problem, if the system prompt is wrong, fine-tuning on top of it is expensive and fragile

## The trap: fine-tuning on facts

The most common fine-tuning mistake is using it to embed factual knowledge into the model. "We'll train Karel on all our fraud policies so he knows them."

This fails for a predictable reason: facts change. Policies update. Investigation timelines shift. Regulatory requirements evolve. A fine-tuned model has that knowledge frozen in its weights, updating it requires retraining, which is expensive and slow. Meanwhile, a vector store with the same policies can be updated in minutes.

## When fine-tuning makes sense

:::concept-cards
### Consistent tone
Karel's communication style, empathetic, clear, direct, could be reinforced through fine-tuning on example conversations. The style is stable (it won't change quarter to quarter) and hard to fully specify in a system prompt. Fine-tuning on verified examples of Karel at his best produces a model that defaults to that style without needing to be reminded.

### Task reliability
If Karel's task has a very specific format, a structured fraud summary that needs to output fields in a particular order with particular phrasing, fine-tuning on examples of correct outputs can make that format more reliable than prompt instructions alone.

### Scope behavior
If Karel needs to reliably refuse certain requests, fine-tuning on examples of well-handled refusals can strengthen that refusal behavior, making it more consistent under adversarial pressure than a system prompt instruction alone.
:::

:::deep-dive Fine-tuning vs. the alternatives: decision framework
## Fine-tuning vs. the alternatives: a decision framework

Before choosing fine-tuning, consider what else could solve the problem:

| The problem | Cheaper solution first | Fine-tuning when |
|---|---|---|
| Model gives wrong facts | RAG / database retrieval | Facts don't change and retrieval adds too much latency |
| Model uses wrong tone | System prompt + few-shot examples | Tone is critical and still inconsistent after prompting |
| Model keeps going out of scope | Better guardrails + tool restrictions | Scope drift persists under adversarial testing despite good prompts |
| Model formats output incorrectly | Output formatting instructions | Format is complex and still unreliable after extensive prompting |

Fine-tuning is generally the last resort, not the first. Start with prompt engineering and retrieval. Graduate to fine-tuning when those approaches are exhausted or insufficient.
:::

:::karel Karel in practice
**Scene:** Production data shows Karel sometimes responds to frustrated customers defensively — over-explaining his constraints instead of acknowledging the person — even after multiple system prompt iterations trying to fix it.

**Karel acts:** The team considers fine-tuning. The proposal: train on verified examples of Karel at his best — empathetic, direct, non-defensive — to embed that tone more deeply than a prompt can.

**But — this is the key risk:** The same team also suggests fine-tuning Karel's knowledge of bank fraud policies so he "just knows them." This is the wrong use of fine-tuning. Policies change. Fine-tuned knowledge can't be quickly updated — unlike a vector store, which can be updated in minutes.

**Result:** Karel is not fine-tuned in his current version, and intentionally so. His behavior is controlled through a well-crafted system prompt, few-shot examples, tool restrictions, and output validation — all of which can be updated quickly as the product evolves. Fine-tuning remains on the roadmap only for the tone consistency problem, and only if prompt-based approaches are exhausted first.

**Why this matters:** Fine-tuning is often proposed as the solution to agent reliability problems before simpler solutions have been exhausted. The question to ask first is: "have we maxed out what better prompting, retrieval, and tool restrictions can do?" In most cases, the answer is no — and the cheaper fix should come first.
:::

:::takeaway Key takeaway
Fine-tuning changes how a model behaves, not what facts it knows. It's well suited to baking in tone, style, and domain-specific response patterns, not to injecting current or frequently changing information. For most memory needs, RAG or external storage is faster, cheaper, and easier to keep accurate.
:::
