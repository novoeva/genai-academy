---
title: "What is a prompt, really?"
module: 3
order: 2
---

Most people think of a prompt as just the message they type. "What's the capital of France?" That's a prompt.

But in the context of building AI agents, a prompt is everything the model sees before it generates a response. All of it. In one continuous stream of tokens.

## The full picture

When you send something to an LLM, here's what actually goes into the model:

1. **System prompt** (set by you, the builder), instructions about the agent's role, constraints, and behavior
2. **Conversation history** (everything the user said before, and everything the agent said before)
3. **User message** (what the customer just typed)
4. **Injected data** (if you've pulled information from a database or API and put it in the prompt)

The model sees all of this as one continuous sequence of tokens. It doesn't distinguish between "this is the system message" and "this is the user message." To the model, it's all context. The model's job is to predict the next token given all of it.

## Why this matters

This has huge implications. If your system prompt is vague, the model will treat vagueness as part of the input and will try to complete it. If you forgot to include critical information in the injected data, the model will make something up. If the conversation history contradicts the system prompt, the model will balance both rather than choosing one.

The model is not reading your prompt and executing it like code. The model is looking at all the text you put in front of it and predicting what a reasonable continuation would be.

## A concrete example: Karel's full prompt

When a customer opens the fraud reporting feature and says "I don't recognize this charge from yesterday," here's what Karel actually receives (simplified):

```
You are Karel, a fraud reporting assistant for Bank of Trust. Your role is to help customers report and respond to fraudulent transactions.

TOOLS YOU HAVE:
- read_transaction_history(): returns the customer's transactions for the past 30 days
- flag_transaction(id): marks a transaction as fraudulent
- freeze_card(): immediately disables the customer's card
- create_formal_report(): files an official fraud report with the bank's fraud investigation team

WHAT YOU CANNOT DO:
- You cannot reverse or refund transactions
- You cannot resolve disputes about legitimate charges
- You cannot provide investment or financial advice
- You cannot access the customer's personal information beyond their transaction history

TONE:
- Be empathetic but professional
- Acknowledge the customer's concern
- Be clear about what you can and cannot do

CUSTOMER'S TRANSACTIONS (last 5 days):
- $45.20 at Greenlight Coffee on April 20
- $120.00 at Whole Foods on April 20
- $850.00 at Electronics Plus on April 19 (flagged by customer as unrecognized)
- $52.00 at Starbucks on April 18

CUSTOMER MESSAGE:
I don't recognize this $850 charge from yesterday. It says Electronics Plus but I haven't bought anything there.
```

All of that is the "prompt" from the model's perspective. The model now predicts the next token. It might say "I understand, that must be concerning. Let me help you..." because that pattern is consistent with everything it just received.

This is why precision matters. The injected data (the transaction list), the system instructions (the tools and constraints), and the message (the customer's words) all shape the response together.

## What you control

When you engineer a prompt, you're controlling:
- **System prompt**: The model's role, capabilities, constraints, and tone
- **Injected data**: What real information the model can work with
- **Conversation structure**: How many turns of history to include
- **The message format**: Whether to use numbered lists, bullet points, or prose

What you cannot control: the model's internal reasoning or its probability distribution. You can only shape the input and hope for reasonable output.

:::karel Karel in practice
When a customer messages Karel about fraud, the system prompt tells Karel exactly what he can and cannot do. The injected data gives him the real transactions to analyze. The conversation history (if any) reminds him of what was discussed before. The customer's message gives him the specific request.

If the system prompt says "you can reverse transactions" but you know the bank's system doesn't allow that, the model will confidently tell customers something false. If you forget to include the customer's transaction history in the injected data, Karel will make up numbers or transactions that don't exist. If you make the instructions too vague, Karel might freeze a card when the customer only wanted to dispute a charge.

The prompt is not decoration. It's the specification.
:::

:::takeaway Key takeaway
A prompt is not just the user's message. It's the complete text context that goes to the model: system instructions, conversation history, real data, and the message. Everything together shapes the response.
:::
