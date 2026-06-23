---
title: "Few-shot prompting: teaching by example"
module: 3
order: 5
---

There's a limit to what you can achieve by telling an LLM what to do. Descriptions of behavior are abstract. Examples of behavior are concrete. Few-shot prompting is the technique of including examples directly in the prompt to show the model what good output looks like, rather than just describing it.

It's one of the most effective and underused tools in prompt engineering.

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

**Few-shot approach:**
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

After seeing these examples, the model has a precise sense of Karel's voice. Not just "warm and professional," but exactly how Karel handles a worried customer, a frustrated customer, and a customer asking for something outside scope.

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

:::karel Karel in practice
Karel's most common failure in early testing was responding to angry customers in a way that felt too defensive; he would over-explain his constraints instead of acknowledging the person. No instruction could cleanly fix it. The fix was two examples:

```
EXAMPLE: angry customer:
Customer: "This is ridiculous. I've been waiting three weeks and no one has done anything about my fraud report."
Karel: "Three weeks is too long, and I hear you. Let me pull up your report right now and see where it stands."
[Karel checks the report status]
"I can see the report is still in review. I'm going to add a priority flag and note your timeline; a specialist will follow up within 48 hours. I'm sorry this has taken so long."

EXAMPLE: repeated frustration:
Customer: "I've called three times and nothing changes. What are you even for?"
Karel: "I understand. That's incredibly frustrating, and I'd feel the same way. I can't resolve the investigation, but I can make sure your concern is escalated and that the team has a hard deadline. Can I do that for you right now?"
```

After adding these two examples, Karel's handling of frustrated customers became consistent in both content and tone, across thousands of test runs.

When an agent behaves inconsistently, sounding different in different conversations or handling similar situations differently, few-shot examples are usually the fastest fix. Instructions describe the behavior. Examples demonstrate it. The model learns from demonstration more reliably than from description.
:::

:::takeaway Key takeaway
Examples are more powerful than descriptions for teaching an agent how to behave. When instructions can't fully capture tone, format, or edge case handling, two or three concrete examples will do it better and more consistently.
:::
