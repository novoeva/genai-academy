---
title: "Introduction to Keeping Agents in Scope"
module: 5
order: 1
---

Of all the challenges in building agents, scope is the one that causes the most visible failures. An agent that hallucinates a fact is wrong. An agent that drifts out of scope can be actively harmful — telling customers things they shouldn't be told, taking actions they didn't authorize, making promises the business can't keep.

Scope is the set of things an agent is supposed to do, and nothing else. Keeping an agent in scope means designing systems where the boundaries hold, not just in ideal conditions, but when customers push, when instructions are ambiguous, and when edge cases arise that no one anticipated.

## What you'll understand by the end

:::learning-outcomes
- Why do agents drift out of scope even when given clear instructions?
- How do you enforce constraints at the architecture level, not just in the prompt?
- What happens when a user persistently pushes an agent to do something it shouldn't?
- Why does scope tend to erode over time in production systems?
- How do you validate what an agent says before it reaches the user?
---
'Scope isn't a policy you write once. It's an engineering problem you maintain continuously.'
:::

## What we won't do

:::what-we-wont-do
We won't cover every possible attack vector or adversarial technique in depth. Security research on LLMs is evolving fast, and the specifics change. What we will give you is the layered design thinking that holds even as the details shift.

We also won't promise that scope can be perfectly enforced. It can't. But it can be robust enough to fail safely.

> Think of it like fire safety in a building — you can't guarantee a fire will never start, but you can design so that when it does, it doesn't take the whole building down.
:::

## Why scope is hard

Scope feels like it should be simple. Write down what the agent can and can't do. Ship it. Done.

The problem is that an LLM isn't a rule-following machine. It's a pattern-matching system trained to be helpful. When a constraint conflicts with a customer's insistent request, the model doesn't automatically choose the constraint. It tries to satisfy both, and in trying to satisfy both, it often drifts.

Scope also tends to erode over time. A product launches with clear constraints. Then an edge case arises and someone adds an instruction to handle it. Then another edge case. Then a new team member edits the system prompt without reviewing the whole thing. Gradually, the agent's behavior diverges from what was intended.

The through-line of this module is a simple idea: scope isn't just a policy. It's an engineering problem. The most robust agents enforce scope at multiple layers simultaneously, so that no single failure point can cause a scope violation.

:::karel Karel's scope in brief
**Scene:** Karel is deployed to thousands of customers. Some ask about fraud. Some ask about investments. Some push back when he can't help. Some try to get him to do things he's not authorized to do.

**Karel acts:** His response is always the same: help with fraud, and nothing else — not because the model is told to resist, but because the scope is enforced at three independent layers: tools define what he can do mechanically, the system prompt defines what he should do given a customer's request, and output validation defines what he's allowed to say.

**But — this is the key risk:** Any single layer can fail. The model can be persuaded. A tool can be called with the wrong arguments. Output validation can miss a novel phrasing. No single layer is sufficient.

**Result:** The combination of all three keeps Karel reliably in scope across thousands of conversations with customers who have thousands of different requests.

**Why this matters:** Scope isn't a policy you write once. It's an engineering problem you maintain continuously — and this module is about how to do that.
:::
