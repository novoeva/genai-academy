---
title: "Output validation"
module: 5
order: 5
---

The system prompt and tool restrictions address what the agent plans and does. Output validation addresses what the agent says, the text that actually reaches the user. This is the final layer of scope enforcement, and it catches failures that the earlier layers missed.

Output validation is a check that runs between the model's response and the user interface. It inspects what the agent is about to say and decides: is this response compliant, or does it need to be blocked, modified, or flagged?

## Why output validation is necessary

System prompt guardrails work most of the time. Tool restrictions work all of the time for actions. But the model can still generate text that violates scope, text that makes predictions it shouldn't make, promises it can't keep, or statements that expose the bank to liability.

These text-level violations are invisible to the tool layer. No tool was called. The model just wrote something it shouldn't have.

**Example violations that require output validation:**
- Karel says "your fraud report looks like a strong case, I'd expect a full refund" (prediction of outcome, promise of refund)
- Karel says "based on what you've told me, it sounds like the merchant committed fraud" (legal determination)
- Karel says "I'll make sure this gets resolved quickly" (promise he can't back up)
- Karel quotes a specific transaction amount incorrectly (factual error on financial data)
- Karel includes the customer's full card number in his response (data exposure)

None of these involve tool calls. All of them could harm the customer or the bank.

## What output validation can check

**Automated structural checks:** For responses that should follow a specific format (summaries, confirmations, structured data), validate that the output has the right shape. A fraud report confirmation should include: transaction ID flagged, whether the card was frozen, that the fraud team will review within 24 hours. If any element is missing, the response is rejected and Karel is asked to regenerate.

**Pattern-based filtering:** A separate classification layer, which can be another model, scans Karel's output for prohibited content before it's shown to the user. This layer looks for:
- Prohibited commitments ("I'll make sure," "this will be," "you'll definitely")
- Investigation outcome language ("this is fraud," "this should qualify," "you'll get a refund")
- Out-of-scope domain language (investment terms, legal conclusions)
- Sensitive data patterns (full account numbers, card numbers, SSN patterns)

When the classifier flags a response, it can be blocked (Karel is asked to try again), modified (the flagged phrase is removed and replaced with a safe default), or escalated (a human reviews before the response is sent).

For agents with broader scope than Karel, this layer also checks for harmful or toxic content and policy violations: language that is abusive, discriminatory, or violates your product's acceptable use policies. This is a different category from scope violations. A scope violation is the agent doing something outside its job description. Harmful or toxic content is something the agent should never produce in any response, no matter what it was asked. Automated toxicity classifiers score outputs at scale and give you a numeric threshold to act on, rather than relying on keyword lists that miss variations.

## The cost-benefit of output validation

Output validation adds latency. Every response runs through at least one additional check before being shown to the user.

The question to ask is: what's the cost of the failure it prevents?

For Karel, generating text that predicts an investigation outcome could create customer expectations that lead to formal complaints, regulatory scrutiny, or litigation. The cost of output validation, a few hundred milliseconds, is not comparable to those consequences.

Not every agent needs aggressive output validation. A low-stakes internal tool where errors have minimal consequences might not need it. A customer-facing financial agent processing thousands of conversations a day almost certainly does.

:::analogy The manufacturing quality check
Think of output validation as the quality check at the end of a manufacturing line. If the quality check is catching defects constantly, the problem is in the manufacturing process, not in the quality check. Output validation should catch the rare edge case that slipped past a well-written prompt, not be filtering routine errors because the prompt is too vague to prevent them.
:::

:::karel Karel in practice
Karel's output validation layer runs on every response before display. It checks:

**Required elements:** Every fraud report confirmation must include the specific transaction flagged, confirmation that the fraud team was notified, and the 24-hour review timeline. Missing any element → regenerate.

**Prohibited phrases:** A classifier trained on Karel's domain scans for outcome predictions ("your claim will," "you should receive," "this looks like it will"), legal conclusions ("this is clearly fraud," "the merchant violated"), and commitment language ("I promise," "I guarantee," "I'll make sure").

**Data protection:** A pattern matcher checks that no full account numbers, card numbers, or other PII appear in Karel's response text. These fields should only appear in the UI elements populated directly from the database, not in Karel's generated text.

**Escalation trigger:** If Karel's response expresses any uncertainty about whether he should help with something ("I'm not sure if I'm supposed to..."), the response is held and reviewed by a human before being sent. This signals an edge case the system prompt didn't fully handle, an opportunity to improve the prompt.

Output validation is a living system, not a one-time configuration. The patterns it checks for should evolve based on what's actually observed in production, new forms of scope drift, new customer scenarios, new edge cases.
:::

:::takeaway Key takeaway
Output validation is the last line of defense before a response reaches the user. It catches text-level violations (promises, predictions, legal conclusions, sensitive data) that tool restrictions cannot. It should catch rare edge cases, not routine failures. If it's blocking frequently, the system prompt needs work first.
:::
