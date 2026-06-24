---
title: "What is hallucination and why does it happen?"
module: 2
order: 1
---

:::analogy The pub quiz bluffer
Imagine someone on a pub quiz team who doesn't know the answer — but doesn't want to admit it. So they say something confident that *sounds* right, based on things they vaguely know.

That's an LLM hallucinating.
:::

**Hallucination** is when an AI generates content that sounds correct but is factually wrong — and says it with total confidence.

## Why does it happen?

LLMs don't look things up. They predict what a good answer *sounds like*.

If the model doesn't know a fact, it doesn't say "I don't know." It generates the most plausible-sounding response anyway — because that's what it was trained to do.

## Three types of hallucination

:::concept-cards
### Factual hallucination
States something false as fact — delivered with the same confident tone as correct information.

*"The Eiffel Tower was built in 1892."* (It was 1889.)

### Citation hallucination
Invents sources, papers, or URLs that don't exist. The references look real — plausible authors, realistic journal titles — but they're made up.

### Reasoning hallucination
Each step sounds logical. But the conclusion is wrong. The confident chain of reasoning makes the error hard to catch.
:::

## Why confidence makes it dangerous

A model that said *"I'm not sure, but..."* would be manageable.

Instead, hallucinated content often reads as *more* authoritative than correct content — because the model is optimising for what a confident, helpful answer looks like.

:::karel Karel in practice
**Scene:** A customer has just finished describing fraudulent transactions on their account.

**Karel says:** "I've filed your fraud report and frozen your card. You'll receive a confirmation email within 24 hours."

**But — this is the hallucination:** Karel never actually called the tool to file the report. He skipped the action entirely and jumped straight to generating what a confirmation *sounds like* — confident, detailed, believable. The action never happened.

**Result:** Four days later, the customer calls back. The report was never filed. The card was never frozen. The fraudulent charges kept coming.

**Why this matters:** When a chatbot hallucinates a fact, you might look it up and correct it. When an agent hallucinates an *action*, real consequences follow before anyone notices.
:::

:::deep-dive What makes hallucination more or less likely?
:::likelihood-factors
### more likely
- Questions outside the training data
- High temperature (more randomness)
- Long reasoning chains
- Lack of grounding / no source material
### less likely
- Well-covered topics in training data
- Low temperature (more deterministic)
- Short, focused tasks
- Given real source documents to refer to (RAG)
:::
:::

:::takeaway Key takeaway
LLMs generate plausible text — not verified facts. Design your systems to reduce the chance of hallucination, and catch it when it happens.
:::
