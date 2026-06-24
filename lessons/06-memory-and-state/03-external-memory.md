---
title: "External memory: vector stores and databases"
module: 6
order: 3
---

In-context memory is temporary and limited. External memory is the solution for everything an agent needs to know that doesn't fit, or shouldn't have to fit, inside a single context window.

External memory is any system that stores information outside the model and retrieves it when needed. Two main forms matter for agent design: databases and vector stores. Understanding the difference between them is what lets you choose the right one.

:::analogy The filing cabinet and the experienced colleague
A filing cabinet is for records you can name: account number, date, case ID. An experienced colleague who's read everything is for questions you can only describe: "find me anything relevant to the Johnson situation." Databases are filing cabinets — exact lookups, guaranteed accuracy. Vector stores are the experienced colleague — they understand meaning and surface what's relevant, even when you don't know exactly what to ask for.
:::

:::concept-cards
### Databases: exact retrieval
A database stores structured data, records with defined fields and relationships, and retrieves it by exact match. The right tool when you know exactly what you're looking for (an account ID, a transaction ID, a date range), when the data is structured, and when you need guaranteed accuracy. For Karel, all data retrieval is database-backed: transaction history, account information, prior fraud reports, structured records that need to be retrieved exactly, not approximately.

### Vector stores: meaning-based search
A vector store is a database that understands meaning rather than exact words. You search it the same way you'd search Google — by describing what you're looking for — and it returns the most relevant content, even if the wording doesn't exactly match. Under the hood, it converts documents and queries into lists of numbers that represent meaning (called vectors or embeddings), then finds the closest matches. The right tool when your data is unstructured (documents, policies, Q&As) and you need to find "something relevant about topic X," not look up a specific record by ID.
:::

:::deep-dive Retrieval tradeoffs: latency, relevance, and context bloat
## The retrieval step and its tradeoffs

Both databases and vector stores require a retrieval step, a tool call that happens before the model generates its response. This adds latency (the retrieval takes time), adds complexity (the retrieval logic can fail or return the wrong results), and consumes context window tokens (the retrieved content gets injected into the context).

**Latency:** a database lookup on a properly indexed table is fast, milliseconds. A vector similarity search can take longer, especially on large collections.

**Relevance failures:** meaning-based search isn't perfect. The "most similar" document isn't always the most useful one. Poor query phrasing or gaps in the knowledge base can pull up something adjacent but not quite right — so the model gets slightly wrong information to work from.

**Context bloat:** retrieving multiple large documents and injecting them all can fill the context window quickly. Good retrieval systems retrieve selectively, not "give me every relevant document" but "give me the three most relevant excerpts."
:::

## External memory for agent state

Beyond knowledge retrieval, external memory is also how agents maintain state across sessions. When Karel ends a session, important state can be written to a database:
- This customer's account ID
- The fraud report ID that was created
- The transactions that were flagged
- The card freeze status
- The session outcome (completed, escalated, abandoned)

When the customer returns in a new session, this state is retrieved and injected into Karel's context at the start, giving him continuity across sessions without relying on the inherently ephemeral context window.

This is the architecture that prevents "please explain your situation again from the start."

:::karel Karel in practice
**Scene:** A customer who filed a fraud report two weeks ago opens a new session. They want to know if there's been any update on the investigation.

**Karel acts:** He retrieves two things at session open: the customer's recent transaction history from the bank's transactional database (structured, exact, mandatory) and a case summary from the case management system ("This customer reported fraud on April 20th. A report was filed. Their card was frozen. The investigation is ongoing."). When the customer asks "how long does an investigation typically take?", Karel retrieves the relevant policy documents from the bank's policy database (a vector store — the meaning-based search system introduced above) and grounds his answer in the actual policy — not training data.

**But — this is the key risk:** Getting the memory architecture wrong produces an agent that technically works but fails on the use cases that matter most. Building a vector store when you need exact lookups produces approximate answers where precision is required. Relying on in-context memory when you need persistence means the customer has to re-explain themselves every time.

**Result:** Karel knows who this customer is, what happened before, and what the policy actually says — all without the customer having to repeat themselves.

**Why this matters:** The decision about which external memory architecture to use is fundamentally a product decision before it's a technical one. It starts with: what does this agent need to know that isn't in the current conversation? Answer that first — then choose the architecture.
:::

:::takeaway Key takeaway
External memory lets agents remember things across conversations. Databases retrieve exact records; vector stores retrieve semantically similar content. The choice depends on whether you need to look up something specific or find something conceptually relevant, and often you need both.
:::
