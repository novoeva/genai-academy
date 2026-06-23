---
title: "Tool restrictions"
module: 5
order: 4
---

System prompt guardrails tell the model what it should and shouldn't do. Tool restrictions make it architecturally impossible to do certain things, regardless of what the model decides.

This is an important distinction. Instructions can be ignored, misinterpreted, or overridden under pressure. Tools that don't exist can't be called. Tools that reject unauthorized requests can't be misused. Architecture enforces what prompts can only suggest.

## The principle: don't trust the model to enforce its own constraints

An agent's system prompt says Karel cannot reverse transactions. Karel cannot reverse transactions because there is no `reverse_transaction` tool in his toolkit. Both are true, but only one of them is reliable.

If a `reverse_transaction` tool existed but Karel's system prompt said not to call it, there would be a gap: Karel's instructions vs. Karel's capabilities. In production, that gap can be exploited, by edge cases the prompt didn't anticipate, by prompt injection attacks, by model updates that slightly shift behavior. System prompt instructions work most of the time. Architectural restrictions work all of the time.

The design principle is: don't give an agent tools it shouldn't use. If Karel shouldn't reverse transactions, there's no reversal tool. Full stop.

## Types of tool restrictions

:::concept-cards
### Absence, the tool doesn't exist
The simplest restriction: if Karel shouldn't do something, there's no tool for it. No issue_refund, no reverse_transaction, no access_other_account. The absence of a tool makes the action impossible regardless of how the model reasons.

### Access control, the tool exists but Karel can't call it
In larger systems, tools may exist for other agents or for human operators, but Karel is not authorized to call them. The architecture restricts which agents can access which tools. Even if Karel's prompt tried to call reverse_transaction, the system would reject the call.

### Parameter validation, the tool exists but rejects invalid calls
The tool is callable, but it validates inputs before executing. For Karel's freeze_card tool, the application code checks: is this customer's account the one currently authenticated in this session? A mismatch rejects the call, preventing the model from generating plausible-looking but incorrect arguments.

### Confirmation gates, the tool exists but requires human approval before executing
For the highest-stakes actions, the tool can accept a request from the model but hold it for explicit human confirmation before executing. When the model calls create_fraud_report, the application presents the report details to the customer in a confirmation UI step. Only when the customer actively clicks "Submit Report" does the backend actually file it.
:::

## Designing tools for safety, not just functionality

Every tool in an agentic system should have:

**Scope validation:** does this call fall within what this agent is authorized to do?
**Parameter validation:** are the inputs well-formed and within expected ranges?
**Identity validation:** is this agent authorized to act on behalf of this user?
**Rate limiting:** is this agent trying to call this tool an unusual number of times? (Catches infinite loops and injection attempts.)
**Audit logging:** every tool call should be logged with: which agent called it, with what arguments, at what time, and what the result was.

## The defense-in-depth model

The strongest agentic systems enforce scope at multiple layers simultaneously:

```
User message
    ↓
System prompt guardrails, instruct the model not to take out-of-scope actions
    ↓
Model planning, model decides which tools to call
    ↓
Tool access control, model can only call authorized tools
    ↓
Tool parameter validation, tool rejects malformed or unauthorized inputs
    ↓
Confirmation gate (for irreversible actions), human approves before execution
    ↓
Output validation, response is checked before being shown to user
    ↓
Audit logging, everything recorded for review
```

No single layer is sufficient. Each layer catches what the layer above missed. This is defense in depth: the assumption that any single safeguard can fail, and building systems that are still safe when one does.

:::karel Karel in practice
Karel's tool architecture enforces scope in three ways:

**Tool absence:** Karel has no tool for transaction reversal, refunds, dispute resolution, or financial advice. These don't exist in his toolkit because they were excluded at scope definition time. No instruction is needed to stop Karel from doing these things; he literally cannot.

**Parameter validation:** Every tool call Karel makes is validated against the authenticated session. When Karel calls read_transaction_history(account_id), the backend checks that the account_id matches the currently authenticated customer. A mismatch returns an error, regardless of how the model generated the argument.

**Confirmation gates:** Karel's three write actions, flag, freeze, report, each trigger a UI confirmation step before the backend executes them. The model initiates. The customer confirms. The system executes. This means even if Karel's reasoning were somehow manipulated, a human explicitly signs off on every consequential action.

Tool restrictions are not a technical afterthought, they're a product design decision. Which tools exist, which agents can access them, what validation they run, and which require confirmation before executing: all of these need to be decided during the design phase.
:::

:::takeaway Key takeaway
Tool restrictions enforce scope architecturally. An agent can't call a tool that doesn't exist, regardless of what the system prompt says. Layer this with access control, parameter validation, and confirmation gates for the strongest scope enforcement, especially for irreversible actions.
:::
