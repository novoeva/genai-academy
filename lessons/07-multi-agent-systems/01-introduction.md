---
title: "Introduction to Multi-Agent Systems"
module: 7
order: 1
---

So far, Karel has been working alone. One agent, one task, one customer at a time. This is the simplest form of agent deployment, and for many use cases, it's the right one.

But as agent use cases mature, a natural pressure emerges: some tasks are too complex for a single agent. Some require specialized capabilities that shouldn't all live in one system. Some need to run steps in parallel. Some require oversight — one agent checking the work of another.

This is where multi-agent systems come in.

## What you'll understand by the end

:::learning-outcomes
- Why would you split a task across multiple agents instead of giving it to one?
- How does an orchestrator know which subagent to trust with which task?
- What failure modes are unique to multi-agent systems that single agents don't have?
- Why is trust between agents a harder problem than trust in a single agent?
- When is a multi-agent system the wrong choice?
---
'Multi-agent isn't just a technical architecture — it's a way of thinking about specialization, trust, and resilience in AI systems.'
:::

## What we won't do

:::what-we-wont-do
We won't go into the engineering details of any specific multi-agent framework. LangGraph, CrewAI, AutoGen, and others all differ in implementation. What we'll give you is the conceptual foundation that applies to all of them.

We also won't pretend multi-agent systems are always the right answer. A significant part of this module is about when not to use them.

> Think of it like organizational design — understanding how to structure a team of people is useful regardless of which project management tool the team ends up using.
:::

## What is a multi-agent system?

:::concept-cards
### The orchestrator
The orchestrator receives a high-level goal and is responsible for figuring out how to achieve it. It decomposes the goal into subtasks, decides which subagent (or tool) handles each subtask, delegates those subtasks and collects results, and synthesizes results into a coherent final output.

### The subagent
A subagent receives a specific, scoped task from the orchestrator and executes it. It has its own system prompt defining its specific role, its own set of tools appropriate to its task, and limited scope — it handles one thing well rather than many things broadly. The subagent doesn't need to understand the full goal. It just needs to complete its specific task well and return a result the orchestrator can use.
:::

A multi-agent system is an architecture where multiple agents work together to accomplish a task that no single agent handles alone. Each agent has its own role, its own tools, its own context. They communicate, delegate, and share results.

Karel will appear again in this module, but in a different form. He becomes part of a larger system — one where he's not working alone, but with other agents that depend on him and that he depends on in return.
