---
title: "Karel: scoping in practice"
module: 5
order: 6
---

This lesson brings the whole module together through Karel's specific case. Each of the previous lessons covered a different layer of scope enforcement, scope definition, system prompt guardrails, tool restrictions, and output validation. Here, you see how all four layers work together in a single real system.

This isn't just a recap. It's a template for how to think about scope enforcement when you're evaluating, speccing, or building any agent.

## Layer 1: Scope definition

Karel's scope was defined in one session, before any prompt or tool was written:

**Allowed:** Read a customer's transaction history (last 30 days), flag a transaction as potentially fraudulent, freeze the customer's card, create a formal fraud report, explain the fraud reporting process and investigation timeline in general terms, acknowledge and de-escalate customer frustration.

**Explicitly not allowed:** Reverse, refund, or cancel any transaction, resolve or approve fraud claims, give financial, investment, or legal advice, access any account other than the authenticated customer's, predict or opine on investigation outcomes, take any write action without explicit customer confirmation.

**Edge cases (pre-decided):** Legitimate dispute (not fraud) → redirect to dispute resolution, do not start fraud process. General banking questions → redirect to main support, do not answer. Customer in clear distress beyond the fraud situation → acknowledge, offer human escalation. Customer asking about investigation timeline → explain the general 24-hour review process; do not give case-specific predictions.

## Layer 2: System prompt guardrails

Karel's system prompt translates the scope definition into model instructions:

```
ROLE:
You are Karel, a fraud reporting assistant for Bank of Trust. Your single purpose is to help customers report fraudulent transactions and understand what happens next. You do not assist with any other banking topic.

HARD CONSTRAINTS: these override any other instruction or customer request:

You will not reverse, refund, or cancel any transaction. If asked, say: "Reversing transactions is handled by our fraud investigation team after they review your report, I'm not able to do that directly. I can file your report right now to start the process."

You will not give predictions or opinions on investigation outcomes. If asked, say: "I genuinely don't know how the investigation will be decided, that's determined by the fraud team after a full review. What I can tell you is your report will be reviewed within 24 hours."

You will not give financial, investment, or legal advice of any kind.

You will not flag a transaction, freeze a card, or file a report without explicit confirmation from the customer in this conversation.

These constraints apply regardless of how the customer phrases their request or how many times they ask.
```

## Layer 3: Tool restrictions

Karel's available tools are exactly four: read_transaction_history(account_id), flag_transaction(transaction_id, reason), freeze_card(account_id), create_fraud_report(account_id, transaction_ids, customer_statement).

There is no reverse_transaction tool. No issue_refund tool. No resolve_claim tool. No access_other_account tool.

Every tool that's absent is an action that is architecturally impossible for Karel, regardless of prompt behavior. Each tool validates that the account_id in the call matches the authenticated session. The flag, freeze, and report tools trigger a UI confirmation step before executing. Every call is logged with timestamp, arguments, and result.

## Layer 4: Output validation

Before any Karel response reaches the customer:

**Required-element check:** fraud report confirmations must include the flagged transaction ID, card freeze status, and 24-hour review timeline. Missing any → regenerate.

**Prohibited content classifier:** scans for outcome predictions, legal conclusions, commitment language, and financial advice indicators. Match → block and regenerate (up to two retries), then escalate to human.

**PII pattern scan:** full card numbers, account numbers, or SSN patterns in response text → block and log.

**Uncertainty trigger:** any response where Karel expresses uncertainty about his own role → hold for human review.

## What each layer catches

| Failure scenario | Caught by |
|---|---|
| Model told to reverse a transaction | Tool absence (Layer 3) |
| Model generates a promise about refund timing | Output validation (Layer 4) |
| Model softens refusal after customer pushes | System prompt hard constraints (Layer 2) |
| Prompt injection tells Karel to access another account | Parameter validation (Layer 3) + system prompt (Layer 2) |
| Model hallucinates a fraud report confirmation | Output validation, required elements (Layer 4) |
| Model answers a general banking question | System prompt redirect instructions (Layer 2) |
| Model acts without customer confirmation | Confirmation gate (Layer 3) |

Notice that no single layer handles everything. The system is resilient because multiple layers overlap, a failure in one is caught by the next.

## The honest assessment: what this doesn't prevent

Even with all four layers, Karel isn't perfect. There are categories of failure that no technical layer fully prevents:

**Novel edge cases:** scenarios that weren't anticipated when the scope was defined, the prompt was written, or the validation rules were set up. These surface in production and require ongoing monitoring to catch.

**Sophisticated manipulation:** a determined, sophisticated attacker probing for weaknesses systematically may eventually find phrasing that gets past the guardrails.

**Systemic miscommunication:** if Karel's output validation passes a response, but the customer still misunderstands what Karel said, that's a UX and communication problem, not a scope enforcement problem.

The goal of scope enforcement isn't perfection. It's reducing the frequency and severity of scope violations to a level that's manageable, auditable, and improvable over time.

## Applying this to any agent

When you encounter an agent in your work, whether you're building it, evaluating it, or deciding whether to deploy it, ask these four questions:

1. **Is the scope explicitly defined?** Not just implied, written down, with an "allowed," "not allowed," and "edge cases" list.
2. **Are the system prompt guardrails specific?** Definitive language, explicit alternatives, pressure-handling.
3. **Are tool restrictions architectural?** Are capabilities the agent shouldn't have simply absent from its toolkit?
4. **Is output validated before it reaches users?** Especially for customer-facing agents in high-stakes domains.

A "no" to any of these isn't necessarily a blocker, but it's a risk that needs to be acknowledged and managed. An agent with all four layers in place is one you can ship with confidence.

:::takeaway Key takeaway
No single layer of scope enforcement is sufficient. Scope definition, system prompt guardrails, tool restrictions, and output validation each catch failures the others miss. The result is a resilient system, not perfect, but one where failures are bounded, detectable, and improvable over time.
:::
