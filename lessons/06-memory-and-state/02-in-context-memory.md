---
title: "In-context memory"
module: 6
order: 2
---

The simplest and most immediate form of memory an agent has is the context window, the running sequence of everything the model currently sees. This includes the system prompt, the conversation history, any data that's been retrieved and injected, and the current user message.

In-context memory is what makes it possible for an agent to refer to something said three messages ago, notice a contradiction between what the user said at the start and what they're saying now, or build understanding across the turns of a multi-step task.

:::analogy The context window as a scroll
Think of the context window as a scroll of text that the model reads from top to bottom every time it generates a response. Everything on the scroll influences the output. Nothing outside the scroll exists, from the model's perspective.

The scroll has three important properties: everything on it is equally "readable" (though items closer to the end tend to receive more attention), it has a maximum length (when the conversation grows past the limit, older content falls off the beginning), and it's reset every session (when a new conversation starts, the scroll starts completely fresh).
:::

## What this means in practice

**Conversations feel continuous but aren't.** A customer talking to Karel across three sessions feels like they're continuing a conversation. From Karel's perspective, each session is a fresh start. Karel doesn't remember what they discussed yesterday unless yesterday's information is retrieved and added to today's context.

**Long tasks are vulnerable to early forgetting.** An agent running a complex multi-step task over many turns may lose sight of instructions given at the beginning by the time it reaches the end. This is why critical instructions should be reinforced throughout a long task, and why agent tasks should be designed to be as short as they need to be.

**Context fills up with content, not just conversation.** Every tool call result, every retrieved document, every injected data record takes up tokens. An agent that retrieves large amounts of data, Karel reading 30 days of transaction history, fills a significant portion of the context window with that data, leaving less room for conversation history.

## Designing for context limits

:::concept-cards
### Summarization
Instead of keeping the full conversation history, periodically summarize it and replace the full history with the summary. The summary is shorter, preserving the key facts while freeing up tokens. This requires deciding what to summarize and when, typically at natural break points in the task.

### Selective injection
Instead of putting all retrieved data into context, be selective. If Karel is looking at a customer's transaction history, inject only the transactions relevant to the current question, not all 30 days. Relevance filtering reduces context size without losing the information the model actually needs.

### Structured context management
Maintain a structured representation of the agent's state, key facts, decisions made, current step in the task, that's compact but complete. Refresh this structure at the start of each new session rather than injecting the full conversation history.
:::

## What stays, what goes

Think of in-context memory as working memory. It's what the agent has available right now, in this interaction. It's precise, immediate, and structured, but temporary and limited.

Anything the agent needs to know across sessions, or anything too large to fit in the context, needs a different kind of memory. That's where external memory comes in.

:::karel Karel in practice
In Karel's current session, his context window contains: his system prompt (about 600 tokens), the customer's authentication context (account ID, current session info), the conversation history for this session, and any transaction data he has retrieved and injected.

When a customer opens a new fraud session, Karel's context is reset. He doesn't know whether this customer has reported fraud before, whether their card was frozen in a previous session, or whether this is the third time this week they've called about the same issue.

All of that is in the bank's database, but Karel has to retrieve it explicitly and add it to his context. Without retrieval, he starts fresh every time.

Every time you see an AI system ask a customer to "re-explain their situation" at the start of a session, you're seeing in-context memory limits in action. Whether that's acceptable depends on the use case; for a simple FAQ bot, it doesn't matter. For a fraud reporting agent that builds context over time, it's a gap worth closing with external memory.
:::

:::takeaway Key takeaway
The context window is the model's only working memory within a conversation. It's a scroll with a hard length limit, where older content fades in influence and nothing persists between sessions. Understanding these properties is the foundation for every memory design decision.
:::
