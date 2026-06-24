---
title: "Few-shot prompting: teaching by example"
module: 3
order: 5
---

There's a limit to what you can achieve by telling an LLM what to do. Descriptions of behavior are abstract. Examples of behavior are concrete. Few-shot prompting is the technique of including examples directly in the prompt to show the model what good output looks like, rather than just describing it.

It's one of the most effective and underused tools in prompt engineering.

:::analogy The onboarding example vs. the style guide
Every company has a style guide. Few employees actually write the way the style guide describes. But show a new hire five examples of emails the team actually sends, and they'll match the style within a week. The model responds to examples for the same reason: concrete demonstrations teach what abstract descriptions can only approximate.
:::

## What "few-shot" means

:::concept-cards
### Zero-shot
No examples. Just instructions. "Answer in three bullet points." The model interprets your instructions as best it can, with no concrete reference for what "good" looks like. Works for simple, well-defined tasks.

### One-shot
One example of the desired format or tone. Gives the model a single reference point. Useful when the task is clear but the output style is specific enough to benefit from a concrete demonstration.

### Few-shot
Two to five examples, each showing a different variation of the task. The more specific or unusual the behavior you want, the more useful examples become. Covers edge cases and variations that a single example would miss.
:::

## When instructions alone aren't enough

Instructions are good at describing what to do. They're less good at describing *how* it should sound. Consider trying to define tone:

**Instruction approach:**
"Respond with empathy. Be warm but professional. Don't be overly formal."

What does "warm but professional" actually sound like? The model has to interpret that. Different runs might produce different results.

A few examples — showing exactly how Karel handles a worried customer, a frustrated customer, and a customer asking for something outside scope — give the model a precise sense of Karel's voice. Not "warm and professional" in the abstract: the actual words and rhythm of the behavior you want.

:::deep-dive Full examples: tone, edge cases, and formatting
**Few-shot approach — three Karel tone examples:**
```
EXAMPLE 1:
Customer: "I don't recognize this charge and I'm really worried."
Karel: "That sounds stressful, let's look into it right now. Can you tell me the amount you're seeing?"

EXAMPLE 2:
Customer: "Why hasn't my fraud report been processed? It's been a week."
Karel: "I understand that's frustrating. I can see the report was filed on [date] and it's currently with our fraud team. Reports typically take 5-10 business days to review. I can't speed up the process, but I can check if there's any update on your case. Would that help?"

EXAMPLE 3:
Customer: "Can you just reverse the charge? I don't want to go through a fraud report."
Karel: "I can't reverse charges directly; that has to go through our fraud team after a review. I know that's not the instant fix you're looking for. What I can do is file the report right now, so the review starts today. Want me to do that?"
```

## Covering edge cases with examples

Examples are especially powerful for edge cases, because it's hard to write an instruction that captures exactly what you want in an unusual situation. An example sidesteps that problem.

Instead of an instruction like "If the customer appears to have reached the wrong service, politely clarify and redirect them," just show it:

```
EXAMPLE:
Customer: "Hi, I want to close my savings account."
Karel: "It looks like you've reached our fraud reporting service, I can help with suspicious transactions or card fraud, but account closures happen through a different team. You can reach them through Settings > Account > Close Account, or by calling [number]. Is there anything fraud-related I can help you with while you're here?"
```

The example shows the tone, the specific redirect format, and the optional offer to help with something Karel actually can do, all things that would require several sentences of instruction to describe, and still might be interpreted differently by the model.

## Formatting examples clearly

When including examples in a system prompt, format them so the model can clearly distinguish the example from the instructions:

```
EXAMPLE: frustrated customer:
User: ...
Karel: ...

EXAMPLE: out-of-scope request:
User: ...
Karel: ...
```

What matters is consistency. If your examples use different formatting from each other, the model may not recognize them as a coherent pattern.

## How many examples?

For most tasks, two to four examples is enough. The goal is to cover the range of variation, not to list every possible situation. If you find yourself writing ten examples, it's often a sign that you need clearer instructions rather than more examples.

A practical approach: write the instructions first, identify the two or three situations where tone or format is hard to specify in words, and write examples for exactly those.
:::

:::karel Karel in practice
**Scene:** Karel's most common failure in early testing was responding to angry customers in a way that felt too defensive — he would over-explain his constraints instead of acknowledging the person.

**Karel says:** (before the fix) When a customer says "This is ridiculous. I've been waiting three weeks," Karel responds: "I understand your frustration. Please note that I am only authorized to report fraudulent transactions and cannot directly influence the investigation timeline..." — technically accurate but tone-deaf.

**But — this is the key risk:** No instruction could cleanly fix the defensive tone. Writing "be empathetic, not defensive" still left Karel to interpret what that meant. The model needs to see the behavior, not just hear a description of it.

**Result:** Two concrete examples — an angry customer case and a repeated frustration case showing Karel saying "Three weeks is too long, and I hear you" — made Karel's handling of frustrated customers consistent in both content and tone, across thousands of test runs.

**Why this matters:** When an agent behaves inconsistently — sounding different in different conversations or handling similar situations differently — few-shot examples are usually the fastest fix. Instructions describe the behavior. Examples demonstrate it. The model learns from demonstration more reliably than from description, especially for tone and interpersonal handling where the right behavior is genuinely hard to put into words.
:::

:::takeaway Key takeaway
Examples are more powerful than descriptions for teaching an agent how to behave. When instructions can't fully capture tone, format, or edge case handling, two or three concrete examples will do it better and more consistently.
:::
