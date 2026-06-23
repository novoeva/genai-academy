---
title: "Introduction to Memory and State"
module: 6
order: 1
---

Every time you start a new conversation with an AI, it doesn't remember you. It doesn't remember what you talked about last week, last month, or five minutes ago in a different window. This isn't a bug; it's a fundamental architectural property of how LLMs work. And it creates one of the most important design problems in building agents: how do you give an agent the memory it needs to do its job?

This module is about that problem. What kinds of memory an agent can have, how each type works, what the tradeoffs are, and how to make the right choices for the agent you're building.

## What you'll understand by the end

:::learning-outcomes
- Why doesn't an AI remember you between conversations — and what can be done about it?
- What's the difference between an agent that forgets and one that remembers across sessions?
- How do vector stores work, and when do you actually need one?
- What does fine-tuning actually do to a model's "memory"?
- How do you decide which type of memory is right for the agent you're building?
---
'Memory isn't a feature you add on — it's an architecture decision that shapes everything the agent can and can't do.'
:::

## What we won't do

:::what-we-wont-do
We won't go deep into the database engineering or machine learning required to implement these systems. A product manager doesn't need to know how a vector index is built to make good decisions about when to use one.

The goal is the intuition to evaluate tradeoffs and ask the right questions of the team building the system.

> Think of it like understanding the difference between RAM and a hard drive — you don't need to know how NAND flash works to make smart decisions about storage.
:::

## Why memory matters for agents

A chatbot that forgets the conversation every time you close the window is annoying. An agent that forgets is something more serious.

Consider Karel. If Karel has no memory:
- He can't remember a customer's previous fraud report from last week
- He can't know that a customer's card was already frozen in a prior session
- He can't recognize a customer who has reported multiple fraudulent transactions in a short window (a pattern that might indicate a compromised account)
- He has to ask the customer to re-explain their situation from the beginning every time

For a fraud reporting agent, that's a real failure. Some fraud patterns only become visible over time. Some customers have multi-session issues. Some actions in one session affect what's appropriate in the next.

## The three types of memory

:::concept-cards
### In-context memory
Everything that's currently in the model's context window, the conversation so far, plus any data that's been injected into it. This is the only memory the model can natively access. It's fast and precise, but limited in size and temporary by nature. When the session ends, it's gone.

### External memory
Information stored outside the model, in databases, vector stores, or files, and retrieved when needed. It can be vast and permanent, but requires a retrieval step that adds complexity and latency. The right choice when the agent needs to remember across sessions or access large knowledge bases.

### Fine-tuning as procedural memory
Training the model itself on specific behaviors or knowledge, embedding it into the model's weights. It's the most permanent form of memory, but the hardest to update and the least precise. Well-suited to baking in tone and behavior patterns, not factual knowledge that changes.
:::

Karel provides the practical anchor throughout. His memory design — what he knows in the moment, what he can look up, and what's embedded in how he behaves — is a useful template for thinking about any agent's memory needs.
