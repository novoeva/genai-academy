---
title: "System prompts vs. user prompts"
module: 3
order: 3
---

We've talked about prompts as one unified token stream, which is true from the model's perspective. But for practical purposes, you as a builder need to think of prompts in two parts: the system prompt and the user prompt.

These serve different purposes, and understanding the distinction is critical for building reliable agents.

:::concept-cards
### System prompt
The part you write as the developer, invisible to the end user. It defines who the agent is, what it can do, what it cannot do, how to behave, and how to handle edge cases. It's stable. It rarely changes. It's the contract between you (the developer) and the model (the agent).

### User prompt
What the customer types. It arrives from the real world and changes every single time. It's unpredictable. The customer might say "I want to report fraud," or "Can you reverse this charge?" or something completely off-topic. The agent has to handle all of it gracefully.
:::

## Why this distinction matters

Most agent failures come from one of two things:
1. The system prompt is vague or incomplete, so the model doesn't know how to handle real-world customer messages
2. The system prompt and the user message contradict each other, and the model tries to satisfy both

Here's a practical example: if your system prompt says "always be helpful and try to answer any question," but the user asks Karel "Can you tell me about cryptocurrency investments?" Karel will try to be helpful and give investment advice, even though the system constraints say he's not allowed to do that. The model sees both instructions and tries to balance them.

A well-written system prompt doesn't say "try to do X unless Y." It says "you will do X, and when Y happens, you will do Z instead."

## A realistic Karel system prompt

Here's what a well-written system prompt for Karel might look like (simplified):

```
You are Karel, a fraud reporting assistant for Bank of Trust. Your role is to help customers identify fraudulent transactions and report them to our fraud team.

CAPABILITIES:
You can:
- Review the customer's recent transaction history
- Flag specific transactions as fraudulent
- Immediately freeze the customer's card if they request it
- File a formal fraud report that will be reviewed by a human specialist within 24 hours

HARD CONSTRAINTS:
You cannot and will not:
- Reverse or refund transactions (only the fraud team can do this after investigation)
- Resolve disputes about legitimate charges (refer to dispute resolution process)
- Provide investment advice or financial planning guidance
- Access or discuss any customer information beyond their own account

TONE:
- Be empathetic. Fraud is stressful.
- Be clear and direct. Don't confuse the customer.
- Be honest about limitations. Don't promise something you can't deliver.

PROCESS:
When a customer reports a suspicious transaction:
1. Acknowledge their concern
2. Confirm the transaction details
3. Ask if they want to flag it or freeze their card
4. Explain what happens next (fraud team review, timeline)
5. Don't make promises about outcomes (the investigation team decides if it's fraud)

If a customer asks you to do something outside your scope (like reverse a charge or give investment advice):
- Politely but firmly decline
- Explain why you can't do it
- Route them to the right department if possible
- Always offer to file a fraud report if it's fraud-related
```

Notice what this does:
- It's specific, not vague ("you cannot provide investment advice" not "try to avoid financial topics")
- It has a clear process for the common case
- It handles edge cases explicitly ("if they ask you to do X, you will do Y")
- It sets the tone and values clearly
- It reminds the model about constraints every time it's loaded

## The danger of vague system prompts

Compare that to a vague system prompt: "You are Karel, a helpful fraud assistant. Help customers report fraud."

With this, what happens when a customer says:
- "Can you reverse this charge?", The model guesses. Maybe it says yes because it wants to be helpful.
- "I need investment advice.", The model might try because it's instructed to be helpful, and nothing says it shouldn't.
- "My card is frozen and I need to make a purchase in 2 hours.", The model might offer to unfreeze it, even though that requires human approval.

The vague system prompt leaves the model to pattern-match, and pattern-matching on financial or support tasks is dangerous.

:::karel Karel in practice
When a customer opens the fraud reporting feature in the app, the system prompt sets Karel's entire operating context. It tells him what he is, what he's good at, what he absolutely cannot do, and what to do when the customer asks for something unexpected.

The user message is what the customer types. Karel's job is to take that message and respond in a way that's consistent with both the system prompt and the user's actual needs.

If the system prompt is well-written, Karel will confidently handle edge cases because he knows exactly what to do. If it's vague, he'll improvise, and that's when mistakes happen.
:::

:::takeaway Key takeaway
The system prompt is your specification. The user prompt is the real world. A good system prompt anticipates edge cases and is specific enough that the model doesn't have to guess. A vague system prompt invites hallucination and scope creep.
:::
