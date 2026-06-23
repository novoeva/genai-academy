---
title: "The agent loop: perceive, plan, act, observe"
module: 4
order: 3
---

At the core of every agent is a loop. The agent doesn't just receive one message and respond once. It cycles through a repeating process until the task is complete, or until something goes wrong.

The loop has four stages: **perceive, plan, act, observe**. Understanding this loop is the clearest way to understand how agents work, where they can go wrong, and how to design them to be reliable.

:::concept-cards
### Stage 1: Perceive
The agent receives input. This might be a message from the user, the result of a previous tool call, data retrieved from a database, or a system notification. Perception fills the agent's context window, this is everything the agent "knows" at this point in the loop.

### Stage 2: Plan
The agent decides what to do next. It looks at everything in its context, the conversation history, the system prompt, the results of any previous actions, and predicts the most appropriate next step. This is where the LLM does its core work: deciding whether to ask a clarifying question, call a tool, or generate a final response.

### Stage 3: Act
The agent takes action. This might be generating text to send to the user, calling a tool (an API, a function, a database query), or both at the same time. When the agent calls a tool, it sends a structured request and waits for a response; the agent itself doesn't "run" the tool, it just requests that it be run.

### Stage 4: Observe
The results of the action come back into the agent's context. If the agent called a tool, the tool's response is added to the conversation history. The agent now has new information: what happened. From here, the loop starts again.
:::

:::karel Karel in practice
Here's what the agent loop looks like for a typical Karel interaction:

**Turn 1:** Perceive, Customer says "I don't recognize a charge for €47 from yesterday." Plan, look at their transaction history. Act, call read_transaction_history(). Observe, returns a list including a €47 charge from an unrecognized merchant.

**Turn 2:** Perceive, Transaction data now in context. Plan, show the customer the matching transaction and ask how to proceed. Act, "I found a €47 charge from 'GlobalMerch Ltd' on April 21st. Is this the transaction you're concerned about? I can flag it for review and/or freeze your card right now." Observe, Customer replies "Yes, and please freeze my card."

**Turn 3:** Perceive, Customer confirmed the transaction and requested a freeze. Plan, flag the transaction and freeze the card. Act, call flag_transaction(id) and freeze_card() in sequence. Observe, Both tools return success responses.

**Turn 4:** Perceive, Both actions completed successfully. Plan, confirm what happened, explain next steps, close the conversation. Act, "Done. I've flagged that transaction and frozen your card. I'll file a formal fraud report now, a specialist will review it within 24 hours."

The loop ran four times to complete this task. Each iteration was shaped by what came before it.
:::

## What happens when the loop goes wrong

The agent loop creates failure modes that don't exist in single-turn models:

**Compounding errors:** A wrong decision in Turn 1 shapes every subsequent turn. If Karel incorrectly identifies the transaction in Turn 1, everything that follows, flagging, freezing, reporting, happens on the wrong transaction.

**Infinite loops:** If the agent is poorly designed and doesn't have a clear stopping condition, it can keep taking actions indefinitely, burning tokens and possibly causing damage.

**Lost context:** If the conversation grows very long, older parts of the loop can fall out of the context window. The agent may forget what it decided in Turn 1 by the time it reaches Turn 8.

**Hallucinated completion:** The agent might decide it has completed a task, and tell the user so, before receiving confirmation that the last tool call succeeded. This is one of the most dangerous failure modes in agentic systems.

## Why the loop matters for product people

**Latency:** Each turn of the loop takes time. An agent that runs five loops before responding to the user is slower than one that runs two. When scoping an agent, think about how many steps are genuinely necessary.

**Cost:** Each loop processes tokens. Multi-step agents are more expensive than single-turn ones. Design loops to be as short as they need to be.

**Reliability:** More loops means more chances for something to go wrong. Designing agents to accomplish tasks in the fewest reasonable loops improves reliability.

Karel's loop is intentionally designed to be short: read transactions, confirm with the customer, take actions, confirm completion. The actions that could cause harm (flagging, freezing, filing) all require explicit customer confirmation before they execute. The loop's design isn't just for efficiency, it's a safety mechanism. Each confirmation step is a human checkpoint inside the agent loop.

:::takeaway Key takeaway
Every agent operates through a repeating perceive-plan-act-observe loop. Understanding this cycle explains where agents can go wrong, how errors compound across steps, and why design choices like confirmation steps function as safety mechanisms, not just UX niceties.
:::
