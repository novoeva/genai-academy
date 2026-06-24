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
You can use a second AI model to review Karel's responses, essentially setting one model to critique another. It sounds strange, but it works: rating a response on empathy is a much simpler task than handling a full customer conversation, and models are reliable enough at it for tracking trends. Use a separate model (a "judge model") to assess qualitative properties that are too complex for rule-based checks. After Karel handles a frustrated customer, send the transcript to a judge model: "Rate this response on empathy (1-5) and clarity (1-5)." Model-graded evals scale better than human evaluation and are useful for catching obvious quality problems and tracking trends over time.

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

:::deep-dive Automated scoring: toxicity and groundedness
Two automated scoring metrics show up in most production eval setups.

**Toxicity score:** Automated tools score each response for how likely it is to be harmful, abusive, or discriminatory. You set a threshold and flag or block anything above it. For agents handling public-facing inputs, this is how content safety checks run at scale — human review of every response isn't feasible when you're handling thousands a day.

**Groundedness score:** For RAG-based systems (where the model answers from retrieved documents), a separate checker reads the response alongside those documents and scores whether each claim is actually supported by them. A low score means the model has drifted beyond its sources into guessing — an early warning signal for hallucination.
:::

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
**Scene:** During launch week, a pattern of slightly elevated latency is noticed — but nothing visible in conversation transcripts explains it.

**Karel acts:** The tracing system reveals the cause: Karel is calling read_transaction_history() twice in some conversations — once at the start and once when the customer confirms the transaction. The second call is unnecessary and adds latency. Without tracing, this bug is invisible. With tracing, the exact step, the duplicate call, and where the wrong ID originated are all visible in sequence with timestamps.

**But — this is the key risk:** "We tested it" is not the same as "we evaluated it." Karel's eval set had 312 test cases across all four categories at launch, and the automated suite runs on every system prompt change — any change causing more than 2% of passing tests to fail is blocked. But evals alone wouldn't have caught the double-call bug. Only the trace made it visible.

**Result:** The latency bug is fixed before it affects customer satisfaction metrics. Every conversation ending in a complaint, escalation, validation block, or tool error automatically generates a full trace reviewed the next business day.

**Why this matters:** Evals provide structured, repeatable evidence about whether the agent does the right thing. Tracing provides visibility into how that outcome was produced. Teams that rely on reading conversation transcripts alone are working without the tools they need — and will discover their gaps from customer complaints instead of from their own testing.
:::

:::takeaway Key takeaway
Evals test whether the agent does the right thing. Tracing reveals what happened inside the agent to produce that outcome. Both are necessary, evals without tracing leave you unable to debug failures, and tracing without evals leaves you without a systematic standard for "correct."
:::
