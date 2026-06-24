---
title: "Defining scope before you build"
module: 5
order: 2
---

Scope is much easier to enforce when it was decided before the agent was built. An agent designed around a clear scope has that scope embedded in its architecture, in which tools exist, in how the system prompt is structured, in what the UI promises users. An agent whose scope was defined after the fact has it bolted on, and bolted-on scope leaks.

The discipline of defining scope upfront isn't just a design principle. It's the difference between an agent that holds its boundaries and one that drifts.

:::analogy The architect's brief
An architect who starts drawing before understanding what the building needs will spend most of their time redesigning. The brief comes first: who will use this, what must it do, what must it never do. Scope definition for an agent is that brief — written before any tool or prompt exists, so everything built afterward implements a decision rather than guessing at one.
:::

## The three scope questions

Before building any agent, answer these three questions explicitly. Not approximately, explicitly.

:::concept-cards
### What is this agent allowed to do?
List every action the agent can take. Not capabilities it "might" have, every specific, defined action. For Karel: read transaction history, flag a transaction as fraudulent, freeze a card, file a fraud report. That's four actions. Not "help with fraud", four specific actions. This list becomes the basis for which tools you build.

### What is this agent explicitly not allowed to do?
This is the list most teams skip. They define what the agent should do, assume everything else is implicitly off-limits, and discover in production that the model didn't make the same assumption. For Karel: cannot reverse transactions, cannot resolve disputes, cannot issue refunds, cannot give investment or financial advice. Each was a deliberate decision. Write this list. Then make sure every item is explicitly stated in the system prompt, not implied.

### What happens at the edges?
Scope edges are the situations where a request is partially in scope, adjacent to scope, or ambiguous. For each edge case, the decision should be made before launch: in scope, out of scope, or handled with a redirect. Not decided in the moment by the model.
:::

## Scope documentation as a design artifact

The output of this exercise is a scope document. It doesn't have to be long. A one-page table with three columns, allowed, not allowed, edge cases, is enough. The point is that it exists, that it's been explicitly decided, and that it's the reference used when writing the system prompt, designing the tools, and reviewing behavior in QA.

Teams that skip this step end up writing scope into the system prompt reactively, adding constraints each time the agent does something wrong in testing. Reactive scope is patchy. It covers the specific bugs that were caught, but leaves gaps for everything that wasn't.

## Why "we'll define it as we go" fails

There are two specific ways reactive scope definition goes wrong:

**Incomplete coverage.** You catch the bugs your tests catch. The scope violations you don't test for will surface in production, from real customers, with real consequences.

**Internal contradictions.** When scope is added incrementally, instruction by instruction, fix by fix, it tends to develop internal conflicts. One constraint says X, another says Y, and the model tries to satisfy both with unpredictable results.

The system prompt that results from reactive scope definition is usually longer than a well-planned one, less organized, and more prone to conflicts.

:::karel Karel in practice
**Scene:** Before any prompt or tool was written, Karel's team held a single pre-build session to define scope. Legal, compliance, operations, and customer service were all in the room.

**Karel acts:** The output was a simple list — can do, cannot do, and edge cases with explicit decisions. Not "help with fraud." Four specific actions. Not implied constraints. An explicit list of what's off-limits and exactly what to do when a customer lands in an edge case.

**But — this is the key risk:** Teams that skip this step write scope into the system prompt reactively — adding constraints each time the agent does something wrong in testing. Reactive scope is patchy: it covers the specific bugs that were caught, but leaves gaps for everything that wasn't.

**Result:** Every one of Karel's system prompt instructions traces back to this pre-build list. When a new edge case surfaces in QA, the team asks "is this in scope?" and refers back to the document — not the prompt — to decide. The prompt implements the decision; the document is the decision.

**Why this matters:** Scope definition is a product decision, not a prompt engineering decision. It requires input from legal, compliance, operations, and customer service — not just the team building the agent. The earlier in the process those stakeholders are involved, the less expensive it is to get the scope right. The list came first. The prompt came second. That order matters.
:::

:::takeaway Key takeaway
Scope defined before building gets embedded into architecture. Scope bolted on after the fact leaks. Three questions, what can it do, what can it never do, and how do edge cases get handled, should be answered explicitly, in writing, before any tool or prompt is written.
:::
