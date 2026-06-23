---
title: "Outcome-Driven PRD: Agentic AI Learning App"
date: 2026-04-16
framework: MAVEN LIVE
status: draft
---

# Outcome-Driven PRD: Agentic AI Learning App

**Date:** 2026-04-16
**Source framework:** MAVEN LIVE — Ship Outcomes, Not Features
**Status:** Draft

---

## 1. Stakeholder Ask

Build an interactive, first-principles learning app for non-technical and semi-technical people (PMs, operators, builders) who want to go deep on agentic AI — not stay at the surface level of "generative AI is predictive" — so they can apply it practically in their daily work, including building and evaluating agents themselves.

**Context:** Eva is both the stakeholder and a primary target user. The app is scoped to agentic AI specifically, with two foundational modules on generative AI for context. The initial audience is personal and small-circle. The format is a desktop-first web app with interactive simulations, quizzes, and a single running example threading through the entire course.

---

## 2. Target Behavior Change

Users progress through three stages, in order:

**Stage 1 — Speak the language**
They stop nodding along in technical conversations and start contributing. They can discuss hallucination, context windows, grounding, and agent design without needing an engineer to translate.

**Stage 2 — Make better decisions**
They evaluate AI use cases with a framework, not instinct. They ask "what's the behavior change we're betting on?" and "what's the hallucination risk?" rather than "can we add AI to this?"

**Stage 3 — Actually build things**
They can scope, design, prompt, and ship a basic agent themselves — without needing a technical partner for every step.

**Ultimate aspiration (#5):** They become the person their team turns to on AI decisions. Not because they're the most technical, but because they have the sharpest mental models.

The product bets that all three stages are achievable progressively through the same course, and that Stage 3 is what makes Stages 1 and 2 stick — doing something real is what converts knowledge into confidence.

---

## 3. The One Thing That Must Be True

**Every module must have a "Monday moment" — a point where the user sees the concept applied to something concrete enough that they could use it at work that week.**

The mechanism for this is a single running example that appears in every module:

> *A bank wants to deploy an agent in their internet banking app that can perform actions on behalf of customers — transfer money, dispute a charge, freeze a card.*

This example is referenced from the first module to the last. When the lesson covers hallucination, the example asks: "what happens if the banking agent confidently moves money to the wrong account?" When it covers scope, it asks: "what should this agent be allowed to do, and what should it always refuse?" Users don't have to do the translation work from abstract concept to real situation — the course does it for them, every time.

**If this condition isn't met — if users finish a module and can't connect it to a real decision — the product will build knowledge without building confidence, and knowledge alone doesn't change behavior.**

**Reality check:** Think about the last time something you read about AI actually changed how you made a decision at work. It was probably a specific example that mapped to something you'd already faced — not a definition.

---

## 4. Pre-Build Experiment

**What we'll do:** Build a small version — Module 1 fully written with the banking agent example woven in — and share it with 1 to 3 people who match the target persona.

**Timeline:** 2 weeks.

**The one question that matters:** After going through this, is there something you'd do differently at work this week?

Not "did you find it useful?" — that gets a polite yes. The behavioral question forces them to translate the content into an action, which is exactly the behavior the product is betting on. A vague or empty answer is the signal to iterate before building more.

---

## 5. Success Metrics (Behavioral)

| Horizon | Signal |
|---|---|
| Week 1 | Someone who went through Module 1 references a concept from it in a real work conversation — not "I learned about hallucination" but "should we think about grounding here?" in an actual meeting or Slack thread. |
| Month 1 | 60%+ of users who complete 3 or more modules can correctly scope a simple agent use case unprompted — spontaneously raising hallucination risk, memory needs, and evaluation criteria when presented with a new AI problem. |
| 90 days | At least one user has shipped or materially shaped an agent at their company and attributes part of their confidence to the course. They tell you without being asked. |

---

## 6. Scope

### In scope
- **Foundational modules:** How LLMs work, hallucination, what makes something an agent (context only — not the main focus)
- **Core curriculum:** What agents are, how they work, how to build them, how to scope them, how to evaluate them
- **Running example:** Banking agent thread through every module
- **Interactive simulations:** One per module, making abstract concepts tangible
- **Knowledge quizzes:** One per module, testing application not recall
- **Platform:** Desktop-first web app, reading from structured markdown and JSON files

### Out of scope (for now)
- Mobile experience
- User accounts, authentication, or progress sync across devices
- Community or social features
- AI-generated content or live model calls within the app
- General generative AI content beyond the foundational modules

---

## 7. Content Structure

Each module lives in a numbered folder (`01-how-llms-work/`, `02-hallucination/`, etc.) and contains: `index.md` (module overview), numbered lesson `.md` files, `quiz.json`, and `simulations.html` where applicable. The banking agent running example is woven into every module.

| Module | Title | Lessons | Status |
|---|---|---|---|
| 1 | How LLMs Actually Work | 01 Introduction, 02 What is an LLM?, 03 Next-token prediction, 04 Training and memory | Written |
| 2 | The Hallucination Problem | 01 Introduction, 02 What is hallucination and why does it happen?, 03 How to reduce it: grounding, RAG, and guardrails | Written |
| 3 | Prompt Engineering | 01 Introduction, 02 What is a prompt really?, 03 System prompts vs. user prompts, 04 How to write clear instructions, 05 Few-shot prompting, 06 Common mistakes | Placeholder |
| 4 | From Model to Agent | 01 Introduction, 02 What makes something an agent?, 03 The agent loop: perceive, plan, act, observe, 04 Tools and function calling, 05 Where new failure modes come in | Placeholder |
| 5 | Keeping Agents in Scope | 01 Introduction, 02 Defining scope before you build, 03 System prompt guardrails, 04 Tool restrictions, 05 Output validation, 06 Banking agent: scoping in practice | Placeholder |
| 6 | Memory and State | 01 Introduction, 02 In-context memory, 03 External memory (vector stores, databases), 04 Fine-tuning as procedural memory, 05 Designing memory for your agent | Placeholder |
| 7 | Multi-Agent Systems | 01 Introduction, 02 Orchestrators and subagents, 03 Trust between agents, 04 Real-world examples, 05 When not to use multi-agent | Placeholder |
| 8 | Evaluating and Shipping Agents | 01 Introduction, 02 What does "working" mean for an agent?, 03 Evals and tracing, 04 Observability in production, 05 The PM's checklist before shipping | Placeholder |

---

## 8. Next Steps

- [ ] Weave banking agent example into Modules 1 and 2 content
- [ ] Write Module 3: Prompt Engineering
- [ ] Write Module 4: From Model to Agent
- [ ] Write Module 5: Keeping Agents in Scope (most directly relevant to the interview use case)
- [ ] Run pre-build experiment: share Module 1 with 1-3 target users
- [ ] Gather signal on the "Monday moment" question
- [ ] Decide go/no-go on building the full web app based on results
