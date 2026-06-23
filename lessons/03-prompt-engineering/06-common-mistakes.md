---
title: "Common prompt engineering mistakes"
module: 3
order: 6
---

Most prompt engineering failures come from a small set of recurring mistakes. Recognizing them is faster than learning through trial and error. Here are the most common ones, what they look like, and how to fix them.

## Mistake 1: Writing instructions you'd give a person, not a model

People write prompts the way they'd brief a new employee: using shared assumptions, implied context, and shorthand.

"Use your best judgment" works with a human who has professional training and real-world experience. It doesn't work with a model that has no persistent memory, no understanding of your organization's values, and no way to ask a manager. "Best judgment" becomes whatever seems statistically plausible in the training data.

**Fix:** Write every instruction as if the reader has no context about your company, your product, or what "appropriate" looks like in your domain. Explicit always beats implied.

## Mistake 2: Relying on negatives without positives

"Don't be rude." "Don't make up information." "Don't promise things you can't deliver."

These are all correct constraints. But they leave a gap: the model still needs to know what to do instead. A negative instruction without a positive alternative forces the model to guess, and guessing under constraint produces inconsistent behavior.

**Fix:** Every time you write "don't do X," follow it immediately with "instead, do Y." For Karel: "Don't promise a refund will be issued, if the customer asks about a refund, say: 'Refunds are decided by our fraud team after the investigation. I can't promise an outcome, but I can make sure your report is filed today.'"

## Mistake 3: Underspecifying edge cases

Most system prompts handle the happy path well. "Help the customer report a fraudulent transaction" is clear enough for the typical case. But agents meet unusual situations constantly, angry customers, customers asking for things they're not supposed to get, customers in completely the wrong place.

These edge cases are where agents fail publicly. And they're usually predictable. The developer just didn't write for them.

**Fix:** Before deploying any agent, run a brainstorm: "What are the five weirdest things a user might say or ask?" Write explicit handling for each of those. If you can't think of five, you haven't thought hard enough.

## Mistake 4: Prompt drift during iteration

Prompts get edited over time as bugs are found and behavior is adjusted. Without discipline, this leads to contradictions. A constraint added in week one might conflict with a fix added in week six. The model tries to satisfy both, and the resulting behavior is unpredictable.

**Fix:** Treat the system prompt like code. Keep it in version control. When you make a change, ask: "Does this conflict with anything already in the prompt?" Review the whole prompt periodically for internal consistency, not just the section you're editing.

## Mistake 5: Confusing the model's persona with its capability

A system prompt that says "you are Karel, a fraud expert who knows everything about our bank's systems" implies Karel has capabilities he doesn't have. The model can't actually access your bank's systems; it will generate plausible-sounding information instead.

This is a particularly dangerous mistake in customer-facing agents. The model will speak with the confidence of an expert even when it's pattern-matching to training data.

**Fix:** Only describe capabilities the agent actually has. If Karel can only access transaction history for the past 30 days, say that explicitly. "You have access to the customer's transaction history for the past 30 days. You do not have access to account history beyond this window. If the customer asks about older transactions, tell them you can only see the past 30 days."

## Mistake 6: Treating the first working prompt as the final prompt

A prompt that passes basic testing isn't finished. It's a starting point. Real users generate edge cases that no developer anticipated. The prompts that hold up in production are the ones that were tested, broken, fixed, and tested again.

**Fix:** Red-team your own prompt. Try to make the agent fail. Ask it to do things it shouldn't do. See if it holds its constraints. Then fix what broke. Repeat before launch, and keep iterating post-launch as real user behavior surfaces new edge cases.

:::karel Karel in practice
Most of Karel's early failures came from exactly these mistakes:

**Persona vs. capability:** The first version of Karel's system prompt said he was "a specialist in banking fraud with full knowledge of the bank's systems." He was given no such access. When customers asked questions about their account history, he invented plausible-sounding answers because the prompt implied he should know. Fixing this required explicitly listing what Karel could and couldn't see.

**Missing positive alternatives:** When Karel was told "don't promise refunds," he would sometimes respond with nothing, just declining, without offering the customer a next step. Adding "instead, offer to file the fraud report immediately so the investigation can start today" gave him a path forward that kept the customer engaged without false promises.

**Underspecified edge case:** Nothing in the original system prompt addressed customers who were confused about what Karel was for (thinking they could use him to dispute a legitimate charge, not a fraudulent one). Karel would try to help anyway, sometimes flagging non-fraudulent transactions. Adding one explicit instruction, "if the customer is asking about a legitimate charge they want to dispute rather than a fraudulent one, tell them this is the wrong service and direct them to dispute resolution", fixed it entirely.

The mistakes that sink agent deployments are rarely technical. They're prompt engineering oversights, things that were never written down because they felt obvious, or edge cases that weren't considered. Treating the system prompt as a living specification, one that gets reviewed and hardened before launch and after every incident, is the difference between an agent that holds up and one that quietly fails.
:::

:::takeaway Key takeaway
Most prompt engineering failures trace back to a small set of recurring mistakes: instructions that work for humans but not models, constraints without alternatives, underspecified edge cases, and drift from iterative edits. Knowing the patterns is most of the fix.
:::
