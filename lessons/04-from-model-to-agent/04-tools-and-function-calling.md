---
title: "Tools and function calling"
module: 4
order: 4
---

The thing that turns a model into an agent is the ability to call tools. Understanding how this works, mechanically, not just conceptually, gives you the mental model to reason about what agents can and can't do, and where things break.

## What a tool is

A tool is a function the model can request to be executed. It's not the model itself running code, the model can't do that. Instead, the model generates a structured request that says "please run this function with these arguments," and the surrounding system (your application code) actually executes it and returns the result.

This distinction matters. The model is a text predictor. It doesn't connect to databases, call APIs, or freeze bank cards. It generates a description of what should happen, and your code does the actual work.

## How function calling works

When tools are made available to a model, they're described in the prompt, typically in the system prompt or alongside it. Each tool has a **name**, a **description** of what it does, and a list of **parameters** it accepts.

The model reads these descriptions and decides, during the planning stage of the loop, whether to use a tool and which one. When it decides to call a tool, instead of generating a text response, it generates a structured output:

```json
{
  "tool": "freeze_card",
  "arguments": {
    "account_id": "CUS-00841923"
  }
}
```

Your application code receives this, executes `freeze_card("CUS-00841923")` against the real bank system, and returns the result to the model:

```json
{
  "status": "success",
  "card_id": "CARD-44821",
  "frozen_at": "2026-04-22T14:32:00Z"
}
```

That result gets added to the conversation context, the Observe stage, and the loop continues.

## The tool description is a prompt

Here's the insight most people miss: tool descriptions are part of the prompt. The model decides whether to use a tool, how to use it, and what arguments to pass based entirely on the description you wrote.

**Vague tool description:**
```
freeze_card: Freezes the customer's card.
```

**Good tool description:**
```
freeze_card(account_id: string): Immediately disables all card transactions for the card linked to the given account ID. This action takes effect within seconds and cannot be reversed by this agent, the customer must call the bank to unfreeze. Only call this tool if the customer has explicitly asked to freeze their card. Returns: {status: "success" | "error", card_id: string, frozen_at: timestamp}.
```

The good description tells the model when to use the tool, what it does, what the consequence is (irreversible by this agent), the constraint (explicit customer request required), and what the return value means. All of that shapes the model's behavior.

## Parallel vs. sequential tool calls

In some interactions, an agent needs to call multiple tools. This can happen in two ways:

**Sequential:** The agent calls one tool, waits for the result, then decides whether to call another. Required when the output of one tool determines what to do next.

**Parallel:** The agent calls multiple tools at the same time, waits for all results, then continues. Appropriate when the tools are independent and the results don't depend on each other.

In Karel's case: reading transaction history and confirming the account are independent, they could be called in parallel. But flagging a transaction and then filing a report is sequential, the report should only be filed once the flag is confirmed.

Designing tool call order matters for both efficiency (parallel where possible) and safety (sequential where one step must confirm before the next).

## What the model cannot do with tools

- **The model cannot decide to create new tools.** It can only call tools it's been told about. If it encounters a situation that requires a capability it doesn't have, it should tell the user, not improvise.
- **The model cannot see the tool's implementation.** It only sees the description. This means if the tool does something different from what the description says, the model won't know.
- **The model cannot verify tool results.** If `freeze_card()` returns `{"status": "success"}` but the card wasn't actually frozen (because of a downstream system error), the model has no way to know. It will proceed as if the freeze succeeded.

:::karel Karel in practice
Karel has four tools: read_transaction_history(account_id), flag_transaction(transaction_id, reason), freeze_card(account_id), and create_fraud_report(account_id, transaction_ids, customer_statement).

Each tool description in Karel's system prompt specifies what it does, when to use it, and what the return value means. Critically, each destructive action (flag, freeze, report) includes a constraint: only call this if the customer has explicitly consented.

When Karel calls create_fraud_report, his application code validates the arguments before executing, ensuring the transaction IDs actually exist on the account, and that the customer statement field is populated. The model can only generate the request; the application decides whether to honor it.

From a product perspective, the tools an agent has are its actual capabilities, not what the system prompt says it can do. If Karel's system prompt says "I can file a fraud report" but the create_fraud_report tool doesn't exist or is broken, Karel will still claim to have done it. Maintaining alignment between what the system prompt describes and what the tools actually do is an ongoing operational responsibility, not a one-time setup.
:::

:::takeaway Key takeaway
Tools are what turn a model into an agent. The model generates requests; your code executes them. Tool descriptions are part of the prompt, vague descriptions produce vague behavior. And because the model cannot verify tool results, validating them in your application layer is essential.
:::
