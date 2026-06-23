---
title: "Defining scope before you build"
module: 5
order: 2
---

Scope is much easier to enforce when it was decided before the agent was built. An agent designed around a clear scope has that scope embedded in its architecture, in which tools exist, in how the system prompt is structured, in what the UI promises users. An agent whose scope was defined after the fact has it bolted on, and bolted-on scope leaks.

The discipline of defining scope upfront isn't just a design principle. It's the difference between an agent that holds its boundaries and one that drifts.

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
Karel's scope was defined in a single pre-build session before any prompting or tool development started. The output was a simple list:

**Can do:** read transaction history, flag transactions, freeze card, file fraud report, explain the fraud process and investigation timeline in general terms, express empathy and acknowledge customer frustration.

**Cannot do:** reverse or refund transactions, resolve or approve claims, give legal or financial advice, access accounts other than the current customer's, predict investigation outcomes, take action without explicit customer confirmation.

**Edge cases (with decisions):**
- Dispute of legitimate charge → redirect to dispute resolution, do not initiate fraud process
- Question about general account features → redirect to main banking support, do not answer
- Request to set up fraud alerts → explain this is outside the fraud reporting feature, direct to account settings
- Customer in clear distress (not just about fraud) → acknowledge, offer to connect with a human

Every one of Karel's system prompt instructions traces back to this list. The list came first. The prompt came second. This order matters.

Scope definition is a product decision, not a prompt engineering decision. It requires input from legal, compliance, operations, and customer service, not just the team building the agent. The earlier in the process those stakeholders are involved, the less expensive it is to get the scope right.
:::

:::takeaway Key takeaway
Scope defined before building gets embedded into architecture. Scope bolted on after the fact leaks. Three questions, what can it do, what can it never do, and how do edge cases get handled, should be answered explicitly, in writing, before any tool or prompt is written.
:::
