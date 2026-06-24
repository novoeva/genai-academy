---
title: "Introduction to Prompt Engineering"
module: 3
order: 1
---

You now understand how LLMs work. They predict tokens. They have no memory between conversations. They're trained on statistical patterns, not facts. This means they can hallucinate, they can be inconsistent, and they need very careful handling.

So how do you actually control one?

This is where prompt engineering comes in. Prompt engineering is the practice of writing the text that goes into the model in a way that shapes its behavior. And here's the thing that most people get wrong about it: it's not magic, it's not trial-and-error tweaking, and it's not just "being nice" to the model.

Prompt engineering is how you tell the model what to do, what not to do, what constraints to respect, what format to use, and how to handle edge cases. It's the practical lever that PMs and builders pull most often when controlling agent behavior. More often than retraining the model. More often than changing the architecture. And more often than any other technique for reducing hallucination or keeping agents in scope.

## What you'll understand by the end

:::learning-outcomes
- What is a prompt, really — and why is it more than just a question?
- Why do vague instructions cause agents to fail in unpredictable ways?
- How do system prompts and user prompts work differently?
- What makes some prompts produce consistent results while others behave randomly?
- How do you teach a model by example instead of just telling it what to do?
---
'Prompt engineering is your most powerful lever for controlling agent behavior — more often used than retraining the model, more often than architecture changes.'
:::

## What we won't do

:::what-we-wont-do
We won't explore every prompting technique or chase the latest tricks. The field changes quickly, but the fundamentals that make prompts work have stayed consistent. This module focuses on those.

We also won't treat prompt engineering as an art or a mystery. It's a discipline with clear principles — and knowing those principles is more valuable than memorizing templates.

> Think of it like learning grammar. You don't need to memorize every rule — you need enough of a model to write clearly and catch when something is wrong.
:::

:::karel Karel's mission
**Scene:** Karel is an AI agent that helps bank customers report fraud. He has access to tools: he can read transaction history, flag transactions, freeze cards, and file formal reports. But he has hard constraints — he cannot reverse transactions, resolve disputes, issue refunds, or give investment advice.

**Karel acts:** Karel handles a fraud case end-to-end — but only within his defined scope. What keeps him there isn't the model itself; it's the prompt engineering.

**But — this is the key risk:** Without precise instructions, Karel improvises. A vague prompt like "help customers with fraud" leaves him to guess how to handle edge cases — a customer asking for a refund, or pushing for investment advice. The model will try to be helpful, and helpful without constraints is dangerous.

**Result:** Karel oversteps. He promises outcomes he can't deliver, or attempts actions outside his authorized scope.

**Why this matters:** When we talk about prompt engineering in this module, we're really talking about how to make Karel reliably do his job and stay in his lane — how to prevent him from overstepping, how to make him consistent, transparent, and trustworthy. Prompt engineering is the practical lever that makes the difference.
:::
