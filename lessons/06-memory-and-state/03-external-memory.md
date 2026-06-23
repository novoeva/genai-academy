---
title: "External memory: vector stores and databases"
module: 6
order: 3
---

In-context memory is temporary and limited. External memory is the solution for everything an agent needs to know that doesn't fit, or shouldn't have to fit, inside a single context window.

External memory is any system that stores information outside the model and retrieves it when needed. Two main forms matter for agent design: databases and vector stores. Understanding the difference between them is what lets you choose the right one.

:::concept-cards
### Databases: exact retrieval
A database stores structured data, records with defined fields and relationships, and retrieves it by exact match. The right tool when you know exactly what you're looking for (an account ID, a transaction ID, a date range), when the data is structured, and when you need guaranteed accuracy. For Karel, all data retrieval is database-backed: transaction history, account information, prior fraud reports, structured records that need to be retrieved exactly, not approximately.

### Vector stores: semantic retrieval
A vector store stores data as mathematical vectors, numerical representations of meaning. When you search a vector store, you're not searching for an exact match, you're searching for meaning similarity. Documents are converted to vectors by an embedding model; when a query comes in, it's also converted to a vector and the database returns the most semantically similar documents. The right tool when you're searching by meaning rather than by exact identifier, when the data is unstructured (documents, policies, Q&As), and when the collection is too large to fit in the context window at once.
:::

## The retrieval step and its tradeoffs

Both databases and vector stores require a retrieval step, a tool call that happens before the model generates its response. This adds latency (the retrieval takes time), adds complexity (the retrieval logic can fail or return the wrong results), and consumes context window tokens (the retrieved content gets injected into the context).

**Latency:** a database lookup on a properly indexed table is fast, milliseconds. A vector similarity search can take longer, especially on large collections.

**Relevance failures:** vector retrieval is probabilistic. The "most similar" document isn't always the most useful one. Poor query phrasing, low-quality embeddings, or a knowledge base with gaps can lead to retrievals that don't actually address the customer's question, a form of grounding failure.

**Context bloat:** retrieving multiple large documents and injecting them all can fill the context window quickly. Good retrieval systems retrieve selectively, not "give me every relevant document" but "give me the three most relevant excerpts."

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
Karel uses both types of external memory:

**Database retrieval:** every session begins by retrieving the customer's account information and recent transaction history from the bank's transactional database. Structured, exact, mandatory. This gives Karel the factual grounding he needs to avoid hallucinating transaction details.

**Session state persistence:** when Karel completes a session (files a report, freezes a card, closes the conversation), the outcome is written to a case management database. The next time this customer contacts fraud support, that record is retrieved and summarized in Karel's opening context: "This customer reported fraud on April 20th. A report was filed. Their card was frozen. The investigation is ongoing."

**Vector store (knowledge base):** Karel has access to a vector store containing the bank's fraud policies, investigation process documentation, and customer FAQ articles. When a customer asks a process question, "how long does an investigation take?", Karel retrieves the relevant policy documents and grounds his answer in the actual policy, rather than generating a plausible-sounding answer from training data.

The decision about which external memory architecture to use is fundamentally a product decision before it's a technical one. It starts with: what does this agent need to know that isn't in the current conversation? Getting this wrong, building a vector store when you need exact lookups, or relying on in-context memory when you need persistence, produces an agent that technically works but fails on the use cases that matter most.
:::

:::takeaway Key takeaway
External memory lets agents remember things across conversations. Databases retrieve exact records; vector stores retrieve semantically similar content. The choice depends on whether you need to look up something specific or find something conceptually relevant, and often you need both.
:::
