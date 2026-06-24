---
title: "Introduction"
module: 1
order: 1
---

You've probably used ChatGPT, Claude, or Gemini. You've seen them write emails, explain code, summarise documents. They feel intelligent. Sometimes eerily so.

But if you're designing products with AI, or being asked in interviews to reason about AI systems, "it feels intelligent" is not enough. You need a mental model of what's actually happening under the hood, not at the level of a researcher, but at the level of someone who can make good decisions about how to use it, where to trust it, and where it will let you down.

That's what this module is for.

## What you'll understand by the end

:::learning-outcomes
- Why does an AI confidently state something that's completely false?
- Why does the same prompt sometimes give different answers?
- Why does the AI "forget" what you told it earlier in a long conversation?
- What does it actually mean when a model has a "knowledge cutoff"?
- Why can't you just "teach" the model by correcting it in chat?
---
'These aren't trivia questions. They come up in product reviews, in interviews, and in every serious conversation about building with AI.'
:::

## What we won't do

:::what-we-wont-do
We won't go into the mathematics. You don't need to understand backpropagation or transformer architectures to reason well about AI products.

The goal here is intuition and mental models, not academic depth.

> Think of it like understanding how a car engine works well enough to be a good driver and make smart decisions about maintenance, without needing to be a mechanic.
:::

:::karel Meet Karel
**Scene:** A bank has deployed an AI agent inside their internet banking app. A customer sees a suspicious charge on their account and opens the app to report it.

**Karel acts:** He's the agent they talk to. He can look up the customer's transaction history, flag a transaction as fraudulent, freeze their card, and file a formal fraud report with the bank's fraud team — all within a single conversation.

**But — this is the key risk:** Each of these capabilities is also a potential failure mode. Filing a report, freezing a card, flagging a transaction — these are real actions with real consequences.

**Result:** Karel will appear in every module. When we talk about hallucination: what happens if Karel says "your fraud report has been filed" when it hasn't? When we talk about scope: what should Karel never be allowed to do on his own? When we talk about evaluation: how do you test Karel before putting him in front of 2 million customers?

**Why this matters:** You don't need to understand how Karel works yet. Just keep him in mind — he'll make every abstract concept concrete by grounding it in decisions that product builders actually face.
:::

## What's coming in this module

First, we'll look at what an LLM actually is, and importantly, what it isn't. Then we'll dig into the single mechanism that drives everything: next-token prediction. And finally, we'll look at how training works and why the model has no memory between conversations.

Each lesson is short. There's an interactive simulation to make the concept concrete. And there's a quiz at the end to check your understanding before moving on.

Let's go.
