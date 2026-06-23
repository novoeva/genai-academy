---
title: "Introduction"
module: 2
order: 1
---

In Module 1, you built a mental model of how LLMs actually work. You learned that a model doesn't "know" things the way a person does. It predicts the next token, over and over, based on patterns in training data. It's a statistical engine, not a knowledge database.

That distinction matters enormously — because it leads directly to the most important failure mode in AI products: hallucination.

## What you'll understand by the end

:::learning-outcomes
- Why does an AI confidently invent facts, citations, and events that never happened?
- Is hallucination a bug that will eventually be fixed, or something more fundamental?
- What can you actually do about it as a product designer or PM?
- What's the difference between hallucination in a chatbot and hallucination in an agent?
---
'These aren't academic questions. They come up in design reviews, in engineering conversations, and in every serious discussion about AI reliability.'
:::

## What we won't do

:::what-we-wont-do
We won't treat hallucination as a model team problem that will eventually be fixed. It's a structural consequence of how LLMs work — and whether it causes harm depends almost entirely on how the product is designed.

We also won't go deep into the research on mitigation techniques. The focus is on the mental model you need to make good design decisions.

> Think of it like understanding why a car skids on ice — you don't need a physics degree, but you do need enough intuition to drive differently in those conditions.
:::

## Why hallucination is a product problem, not just a model problem

It's tempting to think of hallucination as the model team's problem. They'll fix it in the next version. Until then, you just warn users.

That framing is wrong, for two reasons.

First, hallucination is a structural consequence of how LLMs work. The same mechanism that lets a model write fluent prose and generalise across topics also lets it generate fluent, confident nonsense. You can reduce it. You can't eliminate it.

Second, whether hallucination causes real harm depends almost entirely on how the product is designed. A chatbot that hallucinates a historical date is annoying. An agent that hallucinates a completed action — "I've filed your report" when it hasn't — causes real consequences before anyone notices something went wrong.

Understanding hallucination is how you design systems that fail safely, not catastrophically.

:::karel Meet Karel again
You met Karel in Module 1. He's the fraud-reporting agent deployed inside a bank's internet banking app. He can read transaction history, flag transactions, freeze cards, and file fraud reports.

In this module, Karel becomes our main example of why hallucination in agents is categorically different from hallucination in a chatbot. When a chatbot hallucinates a fact, a user might double-check it. When Karel hallucinates a completed action, a customer stops worrying about fraud that hasn't actually been reported. The consequences play out in the real world before anyone in the product team even knows something went wrong.
:::

## What's coming

There are two lessons in this module.

First, we'll look at what hallucination actually is, why it happens at a mechanical level, and why it's so dangerous specifically because of the confidence with which models deliver incorrect information.

Then we'll look at what you can do about it: the techniques that reduce hallucination, from grounding and retrieval-augmented generation to output validation and guardrails.
