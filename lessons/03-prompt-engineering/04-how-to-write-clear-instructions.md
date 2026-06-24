---
title: "How to write clear instructions"
module: 3
order: 4
---

A system prompt is only as good as the instructions inside it. Most agent failures aren't caused by the model being bad at reasoning, they're caused by instructions that are too vague, too general, or that leave gaps the model has to fill on its own.

Here's how to write instructions that actually work.

## The core rule: specific beats general

The most common mistake in prompt engineering is writing instructions at a level of abstraction that sounds reasonable but doesn't tell the model anything useful.

**Too vague:** "Be professional and helpful."
**Specific:** "When a customer is upset, acknowledge their frustration in one sentence, then immediately focus on what you can do to help. Don't apologize more than once."

**Too vague:** "Handle out-of-scope requests appropriately."
**Specific:** "If the customer asks for something you cannot do (such as reversing a transaction, issuing a refund, or providing investment advice), say: 'That's outside what I can help with, you'll need to [specific next step]. In the meantime, is there anything fraud-related I can look into for you?'"

The model doesn't read between the lines. If you want a specific behavior, describe it specifically.

## Use positive and negative instructions together

Tell the model what to do *and* what not to do. Positive instructions alone leave too many gaps.

**Positive only:** "Confirm the transaction details before flagging anything."
**Positive and negative:** "Confirm the transaction details before flagging anything. Do not flag a transaction unless the customer explicitly says they want it flagged. Do not guess at their intent."

This matters because the model will fill gaps with plausible behavior, and plausible behavior in edge cases often isn't what you intended.

## Give the model a decision tree for hard cases

Edge cases, the situations you didn't fully anticipate, are where agents fail most publicly. Write explicit logic for them.

Instead of: "Handle customer complaints professionally."

Write:
```
If a customer expresses frustration or anger:
1. Acknowledge their frustration in one sentence
2. Do not become defensive
3. Restate what you can help with right now
4. If they ask to escalate to a human, say: "I'll note that you'd like to speak with someone on our team. A specialist will follow up within 24 hours."
5. Do not make promises about timelines beyond what's in this prompt
```

This is longer. That's fine. The model can process it, and a few extra words in a prompt cost almost nothing — unpredictable agent behavior in production costs a lot.

## Be explicit about what "success" looks like

Many instructions tell the agent what to do but not what a good outcome looks like. Adding the target state removes ambiguity.

**Without success definition:** "Help the customer report their fraudulent transaction."

**With success definition:** "Help the customer report their fraudulent transaction. A successful interaction ends with: (a) the customer understanding which transactions were flagged, (b) knowing whether their card has been frozen, and (c) knowing that a human will review their report within 24 hours. If any of these three things haven't been communicated by the end of the conversation, find a way to include them before closing."

The model now has a checklist. It can verify its own output against it before responding.

## Use consistent terminology

If you use three different words for the same thing ("flagged," "reported," "marked"), the model may treat them as distinct concepts. Pick terms and stick to them.

In Karel's case, the operations are: **flag** (mark as suspicious), **freeze** (disable the card), **file a report** (send to the fraud team). These should appear consistently across the entire system prompt using exactly these words. Ambiguity in language becomes ambiguity in behavior.

## Length and structure

A longer system prompt is not a problem. A disorganized one is.

Use headers, sections, and numbered lists inside system prompts. The model handles structured text better than prose paragraphs for instruction-following tasks. Structure also makes it easier to update: if something breaks, you can find and fix the relevant section without rewriting everything.

:::deep-dive Recommended structure for an agent system prompt
A good structure for an agent system prompt:
1. **Role**, who is this agent?
2. **Capabilities**, what can it do?
3. **Constraints**, what can it never do?
4. **Process**, how should it handle the common case?
5. **Edge cases**, specific instructions for specific situations
6. **Tone and values**, how should it communicate?
:::

:::karel Karel in practice
**Scene:** Karel is given a vague instruction: "Help the customer with their fraud concern." A customer reports a charge they don't recognize.

**Karel acts:** With only "Help the customer with their fraud concern," Karel guesses. He might ask for information he already has in context, or freeze the card before the customer says they want that, or close out saying "I've noted your concern" without taking any action.

**But — this is the key risk:** Vague instructions leave Karel to pattern-match against training data. "Help with fraud concern" produces whatever a generic support agent would say — not what this bank's fraud workflow actually requires.

**Result:** Karel behaves unpredictably. He might make up transaction details he doesn't have, freeze cards without explicit permission, or falsely promise refunds are coming. Every one of these failure modes is a real production incident.

**Why this matters:** The "after" version of the instruction — a numbered seven-step process specifying what to confirm, which tool to call, what exact question to ask, and what never to promise — takes 10 seconds longer to read. In production, it prevents a category of failures that the vague version lets through. Every time Karel behaves unexpectedly in QA, the answer is almost always a missing or vague instruction. Treating system prompt writing with the same care as code review prevents the majority of agent failures before they reach users.
:::

:::takeaway Key takeaway
Specific instructions outperform general ones. Writing instructions that describe exact behaviors, provide decision trees for edge cases, and define what success looks like prevents the majority of agent failures before they reach users.
:::
