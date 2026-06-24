---
title: "Designing memory for your agent"
module: 6
order: 5
---

The three memory types, in-context, external, and fine-tuning, aren't competing options. They're complementary layers, each handling a different category of what an agent needs to know. Good memory architecture combines them intentionally.

This lesson is about how to make those design decisions, starting not from technology, but from questions about the agent's actual needs.

:::analogy The architect asks who lives here first
A good architect asks who will live in a house before deciding how many bedrooms to add or where to put the storage. Memory design works the same way: understand what the agent needs to know, how often, for how long, and what it must never retain — then choose the architecture. Starting with technology choices instead of needs questions is the design equivalent of building rooms and then wondering who'll use them.
:::

## The five memory design questions

:::concept-cards
### What does this agent need to know right now?
This is in-context memory territory. Things the agent needs in every response: its role and constraints (system prompt), the current conversation (history), and any data directly relevant to the current request (transaction records, customer information).

### What does this agent need to remember across sessions?
This is where session state persistence matters. If the agent is handling ongoing cases, multi-session workflows, or customers who return repeatedly, important state needs to survive between conversations. Map out what that state is and where it will be stored.

### What does this agent need to look up?
This is the retrieval question. What knowledge is too large or too variable to live in the system prompt? Policies, FAQs, product documentation, case histories, these belong in a retrievable store. The choice between database (exact lookup) and vector store (semantic search) depends on how structured the data is and how the queries are formed.

### What behavior does this agent need that's too subtle to fully specify in a prompt?
If the answer is "nothing" or "not much," you don't need fine-tuning. If the answer involves consistent tone, reliable format compliance, or scope behavior that prompt engineering hasn't fully solved, fine-tuning is worth evaluating.

### What does this agent absolutely must not remember?
Privacy and compliance have the final word on memory design. Customer PII should not persist beyond what's legally permitted. Session logs need defined expiry. Memory architecture has a deletion and expiry design as much as a storage design.
:::

:::deep-dive Memory design template and common pitfalls
## A memory design template

For most customer-facing agents, a practical memory architecture looks like this:

**Session context (in-context):**
- System prompt: role, tools, hard constraints, tone
- Customer context: authenticated account info, retrieved at session start
- Prior case summary: brief structured summary of relevant history, retrieved at session start
- Current conversation: full history for the current session

**Persistent state (database):**
- Customer profile: account ID, fraud case history, contact preferences
- Case records: all fraud reports, statuses, actions taken, outcomes
- Session logs: for compliance and debugging

**Knowledge retrieval (vector store):**
- Bank policies and investigation procedures
- Process documentation and FAQs
- Escalation paths and contacts

**Behavioral embedding (fine-tuning, if needed):**
- Tone and communication style (only if persistent inconsistency after prompting)
- Task-specific format compliance (only if prompt engineering is insufficient)

## What to avoid

**Memory for everything:** building a memory system that stores every detail of every interaction creates data bloat and compliance risk. Design for the minimum necessary memory to support the agent's function.

**Single-layer memory:** relying entirely on in-context memory (no retrieval, no persistence) produces agents that can't grow with user relationships. Relying entirely on retrieval without in-context structure produces slow, confused agents.

**Retrieval without validation:** adding a retrieval layer doesn't add reliability unless the retrieval is reliable. Monitor retrieval failures as a specific class of bug.

**Memory without deletion:** every memory system needs a deletion and expiry policy. What happens to session data after 90 days? What happens to fraud case summaries when a customer's account is closed? These are product decisions, not technical afterthoughts.
:::

:::karel Karel in practice
**Scene:** Karel's memory architecture needs to be designed before any code is written. The team starts with the five memory design questions, not with technology choices.

**Karel acts:** The answers drive specific design decisions. What he needs right now → system prompt, authenticated customer context, and selective transaction data in-context each session. What he needs across sessions → case management database persisting fraud reports, statuses, and outcomes. What he needs to look up → vector store of fraud policies and FAQ docs. What behavior he needs that prompts can't fully specify → under evaluation, not yet deployed.

**But — this is the key risk:** Memory without deletion is a compliance and privacy risk. What happens to session data after 90 days? What happens to fraud case summaries when a customer's account is closed? Every memory system needs a deletion and expiry policy — these are product decisions, not technical afterthoughts.

**Result:** Karel knows what he needs to know, when he needs to know it, without holding onto data he shouldn't keep, and without asking customers to repeat themselves.

**Why this matters:** Memory design is one of the most consequential early-stage decisions in building an agent. The five questions at the start of this lesson are the fastest path to getting the design right — start there, not with technology choices.
:::

:::takeaway Key takeaway
Memory architecture is a product decision, not a technical afterthought. What to remember, for how long, how to retrieve it, and what to do when memory conflicts with current context, these questions need answers before any implementation begins.
:::
