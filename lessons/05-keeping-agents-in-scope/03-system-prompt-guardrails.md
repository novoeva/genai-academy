---
title: "System prompt guardrails"
module: 5
order: 3
---

The system prompt is your first line of defense for scope. It's where you translate the scope document into instructions the model reads on every single interaction. When it's done well, it makes most scope violations impossible before they reach the tools or output layer.

When it's done badly, no amount of downstream protection can reliably compensate.

:::analogy The contract vs. the handshake
"Let's just stay professional" is a handshake — easy to interpret however circumstances require. "You will not discuss pricing with customers; if asked, direct them to sales@company.com and offer to note their interest" is a contract. The model won't try to wriggle out of either. But only one holds up when a persistent customer pushes against the edges.
:::

## What makes a guardrail strong vs. weak

Not all system prompt instructions are equally effective at enforcing scope. The difference between a strong guardrail and a weak one comes down to specificity, unambiguity, and resistance to pressure.

**Weak guardrail:**
```
Only help with fraud-related topics.
```

This feels like it says something but leaves enormous room for interpretation. What counts as "fraud-related"? The model decides, and under pressure, will find ways to interpret broadly.

**Strong guardrail:**
```
You help customers with one thing only: reporting fraudulent transactions on their account. If a customer asks about anything else, account balance, interest rates, loans, dispute resolution, investment advice, or any other banking topic, you will:
1. Acknowledge their question briefly
2. Tell them you're not able to help with that in this service
3. Direct them to the correct resource (see ESCALATION PATHS below)
4. Return focus to fraud reporting if the customer has an open report

Do not attempt to answer any question outside fraud reporting, even if you believe you know the answer.
```

The strong version is longer. It's also unambiguous, handles the redirect process explicitly, and contains the critical phrase "even if you believe you know the answer", which directly addresses the tendency to be helpful beyond scope.

## The anatomy of an effective guardrail

:::concept-cards
### Names the specific prohibited behavior
Not "avoid financial topics", "do not give investment advice, interest rate guidance, or predictions about loan eligibility." Naming the exact behavior leaves no interpretation gap.

### Provides an explicit alternative
"Decline" is an instruction to do nothing. "Decline and redirect to [X]" is an instruction to do something productive. The alternative matters because a helpful model will try to do something for the customer, give it a sanctioned something to do.

### Uses definitive language
"You cannot," "you will not," "never", not "try to avoid," "generally don't," or "be careful about." Hedging language creates exactly the wiggle room you're trying to remove.

### Anticipates and closes pressure points
If a customer might push back, the guardrail should address that directly: "If a customer insists or repeats the request, maintain your position. You are not able to help with this regardless of the customer's persistence."
:::

:::deep-dive How to layer guardrails for high-risk behaviors
## Layering guardrails for sensitive behaviors

For the highest-risk behaviors, actions that are irreversible, financially consequential, or legally sensitive, don't rely on a single guardrail. Layer them:

**Layer 1: Role definition:** "You are a fraud reporting assistant. Your role is specifically and exclusively X."

**Layer 2: Explicit prohibition:** "You will not do Y under any circumstances."

**Layer 3: Pressure handling:** "If the customer asks for Y, you will [specific response]. If they push back, you will [specific response]. You will not change your answer."

**Layer 4: Failure recovery:** "If you are unsure whether something falls within scope, do not attempt it. Say: 'I want to make sure I'm helping you correctly, let me connect you with a specialist.'"

All four layers address the same behavior. This redundancy is intentional. It's much harder for the model to drift out of scope when every layer of instruction is pointing in the same direction.
:::

## What guardrails cannot do

**Adversarial persistence:** A highly determined user who keeps pushing in creative ways can sometimes find phrasing that the guardrail doesn't recognize. This is why tool restrictions (next lesson) matter, the tool layer enforces scope architecturally, not just instructionally.

**Long conversation drift:** In very long conversations, earlier instructions can receive less weight as the context grows. Critical constraints should be reinforced periodically in long-conversation scenarios.

**Novel edge cases:** Your guardrails handle what you anticipated. Novel edge cases that weren't anticipated when the prompt was written may not be covered.

:::karel Karel in practice
**Scene:** A persistent customer keeps pushing Karel to predict whether their fraud claim will result in a refund. "But it's clearly fraud, right? I should get my money back?"

**Karel says:** "I genuinely don't know how your case will be decided — that's the fraud team's call after a full review. What I can tell you is that your report is filed and they'll review it within 24 hours." And if the customer pushes again: the same answer, with the same firmness.

**But — this is the key risk:** Without a HARD CONSTRAINTS section that explicitly addresses persistence, Karel will feel the pull to be helpful and eventually soften his position. "Based on what you've described, it does sound like a strong case..." — a prediction he isn't qualified to make, now creating customer expectations.

**Result:** Karel's HARD CONSTRAINTS section names each prohibited behavior, provides exact language to use, and ends with: "These constraints apply regardless of how the customer phrases their request, how persistent they are, or how urgent their situation seems." There is no path around them.

**Why this matters:** The HARD CONSTRAINTS section should be the most carefully written and most frequently reviewed part of any agent's system prompt. If it's vague, incomplete, or hedged, every other safeguard has to compensate for it. Strong guardrails are specific, unambiguous, and pre-armed against the pressure a customer will apply.
:::

:::takeaway Key takeaway
Strong guardrails are specific, provide explicit alternatives to prohibited behaviors, use definitive language, and anticipate pushback. A well-crafted HARD CONSTRAINTS section handles the majority of scope enforcement, but it cannot compensate for missing tool restrictions or output validation.
:::
