---
title: "Introduction to From Model to Agent"
module: 4
order: 1
---

You now know how LLMs work, why they hallucinate, and how to write prompts that give them clear instructions. That's the foundation. This module is where things get interesting.

Up to this point, we've mostly talked about models as things that respond to messages. You put text in, you get text out. A chat interface is the simplest expression of this: one exchange at a time, the model generates an answer, and that's it.

An agent is different. An agent doesn't just respond; it acts.

## What you'll understand by the end

:::learning-outcomes
- What specifically makes something an "agent" rather than a chatbot?
- How does an agent decide what to do next when given a complex task?
- What happens under the hood when an agent "calls a tool"?
- Why do agents introduce failure modes that chatbots never have?
- What does it actually mean for an agent to take a "real-world action"?
---
'The moment a model can act — not just respond — everything about design, testing, and responsibility changes.'
:::

## What we won't do

:::what-we-wont-do
We won't build an agent from scratch or go deep into any specific framework. The goal is a mental model of how agents work — one that lets you reason about any agent architecture, evaluate engineering proposals, and ask the right questions.

Implementation details vary by tool and platform. The underlying concepts don't.

> Think of it like understanding how a car's engine converts fuel into motion — you don't need to be a mechanic to make good decisions about driving or maintaining one.
:::

## The shift from model to agent

A chatbot answers questions. An agent takes steps.

The difference isn't primarily technical. It's architectural. When you give a model tools — the ability to call an API, read a database, send an email, execute code, place an order — you've built something that can affect the world outside the conversation. That's an agent.

Karel is an agent. He doesn't just tell customers about fraud. He reads their transaction history. He flags transactions. He freezes cards. He files reports. These are real actions with real consequences, not just words.

The moment you make that shift, from model that talks to agent that acts, everything changes. The failure modes change. The design decisions change. What it means to "test" the system changes. What "done" looks like changes.

By the end of this module, Karel won't just be a useful metaphor. He'll be a concrete example you can use to reason about any agent system, including ones you might design or evaluate at work.
