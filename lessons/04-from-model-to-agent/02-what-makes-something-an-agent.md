---
title: "What makes something an agent?"
module: 4
order: 2
---

The word "agent" is used loosely in AI. Sometimes it means any chatbot. Sometimes it means a fully autonomous system making decisions for hours without human input. Before we can design, evaluate, or use agents well, we need a crisp definition.

Here's a working one: **an agent is an AI system that perceives its environment, takes actions in response, and uses the results of those actions to decide what to do next.**

The key word is actions. A model that responds to messages and does nothing else is not an agent. A model that can read a database, send an email, or call an API, and then decides what to do next based on what those actions returned, is an agent.

## The three requirements

:::concept-cards
### Perception
The agent receives input about the world. This might be a user message, data from a database, the output of a previous tool call, or a combination. Without perception, the agent has nothing to act on.

### Action
The agent can do something that affects the world outside the conversation. Reading a file. Calling an API. Writing to a database. Sending a message. Placing an order. This is what distinguishes an agent from a chatbot.

### Feedback loop
The results of actions come back into the agent's context, shaping its next decision. This is what distinguishes an agent from a one-shot model call. The agent sees what happened and responds accordingly.
:::

## The spectrum: how agentic is it?

Agenticness isn't binary. It exists on a spectrum.

:::spectrum The spectrum: how agentic is it?
**Level 1: Model with no tools:** Responds to messages with text only. No actions, no feedback loop. A simple chatbot, a document summarizer.

**Level 2: Model with retrieval:** Can look things up (RAG), but only to inform its response. The retrieval is one-directional; the model reads, doesn't write. Slightly agentic.

**Level 3: Model with tools:** Can take actions, send messages, write to databases, trigger processes. The model's outputs have real-world effects. Genuinely agentic.

**Level 4: Multi-step agent:** Takes a sequence of actions over time, using each result to decide the next step. May run for minutes or hours. Highly agentic.

**Level 5: Multi-agent system:** Multiple agents working in coordination, each with their own tools and tasks, potentially overseeing each other. Maximally agentic.
:::

Karel sits at Level 3 to 4 depending on the interaction. He can take several distinct actions in a single conversation, reading transactions, flagging fraud, freezing a card, and filing a report, using the results of each to guide his next step.

## What makes agents different from chatbots in practice

:::concept-cards
### Stakes
A chatbot that gives a bad answer can be corrected. An agent that takes a wrong action may not be reversible. Karel freezing the wrong card, or filing a false report, has real consequences for a real customer. Stakes go up dramatically when actions are involved.

### Testing
A chatbot can be tested by reading transcripts. An agent must be tested by watching what it actually does, what it calls, in what order, with what arguments, and what happens when things go wrong.

### Failure modes
A chatbot fails by saying something wrong. An agent fails in all the ways a chatbot can fail, plus: taking the wrong action, failing to take a required action, taking the right action on the wrong data, and compounding errors across multiple steps.

### Observability
With a chatbot, you can read the conversation. With an agent, you need to see the tool calls too, what the agent did, not just what it said.
:::

:::karel Karel in practice
Karel's agenticness is exactly what makes him useful, and exactly what makes his design matter.

A model that just answers fraud questions has low value. "Was this transaction fraudulent?" could be handled by a FAQ. Karel's value comes from his ability to act: to confirm the transaction exists, to flag it in the system, to freeze the card before more fraud occurs, to file a report that starts a real investigation.

But the same properties that make him useful make him dangerous if designed poorly. A text-only model that says "your card has been frozen" has done nothing. Karel saying "your card has been frozen" means a real card freeze happened, or didn't, and he's hallucinating.

When evaluating whether to deploy an agent vs. a simpler AI system, the question isn't just "what can it do?" It's "what can it do wrong, and how will we know?" The more agentic the system, the more those failure modes need to be designed for explicitly.
:::

:::takeaway Key takeaway
An agent is defined by its ability to take actions in the world and use the results to decide what to do next. The more agentic a system, the higher the stakes, and the more explicitly you need to design for failure.
:::
