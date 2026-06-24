---
title: "What is an LLM?"
module: 1
order: 2
---

LLM stands for **Large Language Model**. Let's break that down, because each word matters.

:::concept-cards
### Large
The size is what makes it impressive. Modern LLMs have billions of internal numbers (called parameters) that shape how they respond. GPT-4 is estimated to have over a trillion. More parameters means the model can capture more patterns, more nuance, more "knowledge."

### Language
It works with text. It reads text in, it produces text out. Everything it knows, it learned from text.

### Model
A mathematical function. Given an input, it produces an output. There's no database it looks things up in; it's a giant set of numbers that together transform your input into an output.
:::

:::analogy A helpful analogy
Think of an LLM like a person who has read an almost incomprehensible amount of text, every book, Wikipedia, most of the internet, and absorbed the patterns of how language works, how ideas connect, how questions get answered. But they didn't *understand* any of it the way we do. They learned the *statistical patterns* of what words tend to follow other words, in what contexts. That's powerful, and it's also the source of every limitation you'll learn about in this course.
:::

:::not-grid What an LLM is NOT
- Not a Search Engine
- Not Sentient or Conscious
- Not a Database of Facts
- Not Capable of Real Feeling
:::

:::karel Karel in practice
**Scene:** A customer types "I see a charge from a shop I've never been to." Karel needs to respond helpfully about this transaction.

**Karel acts:** Karel generates a response based on statistical patterns from his training data about fraud, banking, and customer service — he doesn't look anything up. His prompt might say: "A customer has flagged a charge they don't recognise. Explain what a pending transaction is in plain language, using our bank's 3-day clearing policy."

**But — this is the key risk:** Karel has no idea what's actually in the customer's account unless the transaction data is handed to him explicitly in the prompt. He's not connected to a database by default.

**Result:** Without the injected transaction data, Karel would have to generate a response from patterns alone — unable to reference the specific charge the customer is asking about.

**Why this matters:** Karel is a mathematical function that transforms input text into output text. The transaction data has to be handed to him explicitly, every single time. This is a builder responsibility — if you forget to inject the real data, the agent will still respond confidently, just without any grounding in reality.
:::

:::takeaway Key takeaway
An LLM is a **mathematical function** trained on text that produces text. Its "knowledge" is baked in at training time and expressed through statistical patterns, not lookup or reasoning in the human sense.
:::
