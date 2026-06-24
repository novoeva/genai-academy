---
title: "Trust between agents"
module: 7
order: 3
---

When you deploy a single agent, trust is relatively straightforward: you trust the system prompt you wrote, the tools you built, and the output validation you designed. The agent's behavior is a direct product of your design choices.

When you deploy multiple agents, something more complex emerges. Agents send messages to each other. Subagents receive instructions from orchestrators. Orchestrators receive results from subagents. Each of these exchanges is a potential point of failure, not just technical failure, but trust failure.

Trust between agents is one of the hardest problems in multi-agent system design, and it's the one most often underestimated.

:::analogy Telephone in a high-stakes environment
The children's game of telephone is harmless because it doesn't matter if the message arrives intact. In a multi-agent system, each agent's output becomes the next agent's input — and if you play telephone with customer account data or fraud reports, the drift accumulates into decisions that affect real people. Agents shouldn't trust each other's outputs for the same reason you shouldn't play telephone with anything that matters.
:::

## The fundamental problem: agents are not inherently trustworthy

An LLM-based agent is a probabilistic system. It can hallucinate. It can be manipulated through its inputs. Its behavior can drift. When one agent's output becomes another agent's input, errors and manipulations can propagate, amplified by each step in the chain.

A single agent making a mistake affects one interaction. In a multi-agent system, a mistake from a subagent becomes part of the orchestrator's context, which can then affect every subsequent decision the orchestrator makes.

:::deep-dive How trust between agents breaks down
## How trust between agents breaks down

:::concept-cards
### Hallucinated results from subagents
Karel files a fraud report and returns to the orchestrator with a report ID. But the filing failed silently and that report ID doesn't exist. The orchestrator proceeds as if the report was filed, routes the case to "pending investigation" status, and no one follows up, because the system believes a human is already reviewing a report that was never created.

### Prompt injection through agent outputs
A subagent that processes external content (customer messages, emails, documents) might be fed content containing injected instructions. If that subagent's output is trusted by the orchestrator as clean instructions, the injection propagates upstream.

### Scope drift compounding across agents
A subagent operates slightly outside its intended scope and returns a result that's slightly wrong. The orchestrator, trusting the subagent, builds on that result. Two more agents downstream inherit the drift. By the time the output reaches a human, the accumulated drift has produced something meaningfully wrong.

### Trust asymmetry
An orchestrator might be designed with the assumption that all subagent outputs are trustworthy. In practice, a subagent can be compromised, misconfigured, or simply wrong. An orchestrator that validates subagent outputs is more resilient than one that trusts them unconditionally.
:::
:::

## Designing for trust

**Treat subagent outputs as untrusted data.** Just as user input should be validated before use, subagent outputs should be validated before being acted upon. Don't assume a subagent returned what it was supposed to return, verify the structure and plausibility of the output before proceeding.

**Use explicit confirmation for consequential handoffs.** When an orchestrator is about to take a significant action based on a subagent's result, the handoff should be logged and, for the highest-stakes decisions, reviewed by a human.

**Design subagents to fail gracefully.** A subagent that can't complete its task should return a clear error state, not a partial result that looks like success. "I was unable to file the report because the transaction ID was not found" is more useful than a success response with nothing filed.

**Separate privilege levels.** Not all agents need the same access. An orchestrator that routes cases doesn't need to read customer PII. A subagent that reads transaction data doesn't need to file compliance reports. Give each agent only the access it needs. That way, if one agent goes wrong, the damage stays contained.

**Audit everything across the full chain.** In a multi-agent system, you need to be able to reconstruct the full sequence of agent interactions for any given outcome, which agent sent what to which other agent, in what order, with what results. Without this, debugging and accountability are nearly impossible.

:::karel Karel in practice
**Scene:** Karel files a fraud report and returns to the Case Management Orchestrator with a report ID. But the filing silently failed — the report ID doesn't exist.

**Karel acts:** The orchestrator receives Karel's status report. It doesn't trust it. Before marking the case as "report filed," it independently verifies that the report ID Karel returned actually exists in the case management system.

**But — this is the key risk:** If the orchestrator trusted Karel's status report unconditionally, a hallucinated or silently-failed report ID would route the case to "pending investigation" status — and no human would follow up, because the system believes a report is already being reviewed.

**Result:** Four trust rules prevent this: output validation (independent verification of Karel's report ID), structured output only (Karel returns a JSON object, not free text), escalation flags (Karel signals observations a human should review, routed automatically), and privilege separation (Karel can only act on the delegated case ID).

**Why this matters:** When evaluating a multi-agent system, ask: "what happens if one agent returns a wrong answer?" If the answer is "everything downstream breaks and we won't know until a customer complains," the trust architecture needs work. Agents in a multi-agent system should not trust each other by default — each must validate its own inputs, regardless of who sent them.
:::

:::takeaway Key takeaway
Agents in a multi-agent system should not trust each other by default. Each agent must validate its own inputs, enforce its own scope, and treat instructions from other agents with the same scrutiny it applies to user messages, regardless of who sent them.
:::
