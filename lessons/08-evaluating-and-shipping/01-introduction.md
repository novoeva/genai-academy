---
title: "Introduction to Evaluating and Shipping Agents"
module: 8
order: 1
---

You've built Karel. You've written a careful system prompt, designed the right tools, set up memory architecture, constrained his scope, and added output validation. Now comes the hardest question: is he ready to ship?

This module is about how to answer that question — honestly, rigorously, and with the right tools.

Evaluating and shipping agents is different from shipping traditional software. A function that converts Fahrenheit to Celsius behaves identically every time. Karel doesn't. He's a probabilistic system whose behavior emerges from the interaction of a prompt, a model, data, and an unpredictable stream of customer inputs. You can test 1,000 conversations and still be surprised by conversation 1,001.

This doesn't mean you can't ship with confidence. It means you need a different kind of confidence — one built on probabilistic thinking, good evaluation methodology, and robust observability after launch.

## What you'll understand by the end

:::learning-outcomes
- How do you test a system that behaves differently every time?
- What does "good enough to ship" actually mean for a probabilistic agent?
- How do you know when something has gone wrong in production?
- What's the difference between a model that fails gracefully and one that doesn't?
- What questions must be answered before any agent goes live?
---
'Confidence in an agent isn't built by hoping it works — it's built by designing evaluations that prove it does.'
:::

## What we won't do

:::what-we-wont-do
We won't give you a single checklist that applies to every AI product. Context matters too much. What we'll give you is the framework for building the right checklist for your specific agent and use case.

We also won't cover the full academic literature on LLM evaluation — that's a research area in itself. The focus here is practical: what gives a product team genuine confidence before ship.

> Think of it like a pre-flight checklist — pilots don't memorize one universal list. They use a checklist designed for their specific aircraft, conditions, and route.
:::

## The mindset shift

:::analogy Probabilistic confidence, not binary correctness
Traditional software is either correct or it isn't. For agents, the question is: what percentage of the time is it correct, in what kinds of situations, and are the failures acceptable?

Karel doesn't have to be perfect. He has to be good enough at the cases that matter, fail gracefully when he can't handle something, and surface his failures in ways that humans can catch and correct. Those are achievable goals. "Never makes a mistake" is not.
:::
