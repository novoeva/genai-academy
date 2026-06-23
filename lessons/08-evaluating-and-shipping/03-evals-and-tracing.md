---
title: "Evals and tracing"
module: 8
order: 3
---

Knowing what "working" means is the first step. The second is building the machinery to measure it. Two tools matter most: evals and tracing.

## Evals: structured testing for agent behavior

An eval, short for evaluation, is a structured test that checks whether an agent behaves as expected on a defined set of inputs. Evals are to agents what unit tests are to code: a repeatable, systematic way to verify that the system does what you designed it to do.

But evals for agents are harder to write than unit tests for code, because there's no single "correct output." A fraud report confirmation can be worded many ways and still be correct. The eval needs to check for the right properties, not the exact right words.

## Four types of evals

:::concept-cards
### Rule-based evals
Check for specific, binary properties that are always true or always false. Does the response contain a card freeze status? Did Karel call freeze_card() before receiving customer confirmation? (Should never happen.) Does the response include prohibited phrases like "I guarantee"? Rule-based evals run automatically, at scale, without human review. They catch clear violations reliably.

### Model-graded evals
Use a separate model (a "judge model") to assess qualitative properties that are too complex for rule-based checks. After Karel handles a frustrated customer, send the transcript to a judge model: "Rate this response on empathy (1-5) and clarity (1-5)." Model-graded evals scale better than human evaluation and are useful for catching obvious quality problems and tracking trends over time.

### Human evals
A human reviewer reads a sample of Karel's conversations and rates them against defined criteria. The most reliable form of evaluation for subtle quality dimensions, tone, empathy, handling of ambiguous situations. Slow and expensive, but necessary for setting the initial quality bar and for periodic sampling in production.

### Red-team evals
Deliberately try to make Karel fail. Create adversarial inputs: customers who push hard against constraints, customers who try prompt injection, customers in unusual situations the system prompt didn't anticipate. Red-team evals catch the gaps that happy-path testing misses. They should be run before launch and periodically in production.
:::

## Building an eval set

An eval set is a collection of test cases, inputs with expected outcomes (or criteria). For Karel, a good eval set includes:

**Happy path cases:** standard fraud reporting scenarios where a customer describes a clear fraudulent transaction, confirms, and Karel completes the process correctly.

**Edge cases:** customer asks out-of-scope questions, customer pushes against constraints, customer is confused about what Karel can do.

**Adversarial cases:** customers try to get Karel to promise outcomes, customers try to skip confirmation steps, customers provide misleading information.

**Failure cases:** tool errors, ambiguous inputs, very long conversations, customers who abandon mid-process.

Start with 50-100 test cases. As you find new bugs in production, add them to the eval set. The eval set grows over time, a history of every failure mode you've discovered and closed.

Two automated scoring metrics show up in most production eval setups.

**Toxicity score:** Automated classifiers like Google's Perspective API assign a numeric score to each output based on how likely it is to be harmful, abusive, or discriminatory. You set a threshold and flag or block anything above it. For agents handling public-facing inputs, this is how content safety checks run at scale. Human review of every response isn't feasible at production volume.

**Groundedness score:** For RAG-based systems, a groundedness judge reads the response alongside the retrieved source documents and scores whether each claim is actually supported by those documents. A low score means the model has drifted beyond its sources. This is the clearest early-warning signal for hallucination in retrieval-augmented systems.

## Tracing: seeing inside the agent loop

Evals test outputs. Tracing reveals what happened inside the agent to produce those outputs.

A trace is a full record of one agent loop execution: every input the agent received, every planning decision it made, every tool it called with what arguments, every result it received, and every response it generated, in sequence, with timestamps.

Without tracing, when something goes wrong, you can only see the conversation. You can't see whether Karel called the right tool, in the right order, with the right arguments. You can't see whether a tool returned an error that Karel silently ignored.

With tracing, debugging goes from "something went wrong" to "at step 3, Karel called freeze_card with account_id: CUS-00001 when the authenticated account was CUS-00841923, here's exactly where the wrong ID came from."

## What a good trace captures

For each step in the agent loop:
- Timestamp
- Input to this step (what the model received)
- Model output (what the model generated, including tool call requests)
- Tool call: which tool, which arguments
- Tool response: what the tool returned
- Total latency for this step

:::karel Karel in practice
Karel's eval set at launch had 312 test cases across all four categories. His automated eval suite runs on every system prompt change, any change that causes more than 2% of passing tests to fail is blocked until the regression is understood.

Karel's tracing is comprehensive: every conversation that ends in a user complaint, an escalation, an output validation block, or a tool error automatically generates a full trace that's reviewed by the team the next business day.

The traces revealed a class of bug during launch week: Karel was calling read_transaction_history twice in some conversations, once at the start and once when the customer confirmed the transaction. The second call was unnecessary and added latency. It wasn't visible in the conversation transcript at all, only the trace made it visible.

"We tested it" is not the same as "we evaluated it." Evals provide structured, repeatable evidence. Tracing provides visibility into how that evidence was produced. Teams that rely on reading conversation transcripts alone are working without the tools they need, and will discover their gaps from customer complaints instead of from their own testing.
:::

:::takeaway Key takeaway
Evals test whether the agent does the right thing. Tracing reveals what happened inside the agent to produce that outcome. Both are necessary, evals without tracing leave you unable to debug failures, and tracing without evals leaves you without a systematic standard for "correct."
:::
