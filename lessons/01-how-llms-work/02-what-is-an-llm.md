---
title: "What is an LLM?"
module: 1
order: 2
---

LLM stands for **Large Language Model**. Let's break that down, because each word matters.

:::concept-cards
### Large
The size is what makes it impressive. Modern LLMs have billions of parameters. GPT-4 is estimated to have over a trillion. More parameters means the model can capture more patterns, more nuance, more "knowledge."

### Language
It works with text. It reads text in, it produces text out. Everything it knows, it learned from text.

### Model
A mathematical function. Given an input, it produces an output. There's no database it looks things up in; it's a giant set of numbers (called parameters or weights) that together transform your input into an output.
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
Karel is built on an LLM. When a customer types "I see a charge from a shop I've never been to," Karel doesn't look that up anywhere; he generates a response based on statistical patterns from his training data about fraud, banking, and customer service.

PROMPT: "A customer has flagged a charge they don't recognise. Explain what a pending transaction is in plain language, using our bank's 3-day clearing policy."

This is why Karel needs to be given the customer's actual transaction data in the prompt. Without it, he has no idea what's in their account. He's not connected to a database by default; he's a mathematical function that transforms input text into output text. The transaction data has to be handed to him explicitly, every single time.
:::

:::takeaway Key takeaway
An LLM is a **mathematical function** trained on text that produces text. Its "knowledge" is baked in at training time and expressed through statistical patterns, not lookup or reasoning in the human sense.
:::
