---
title: "Trust between agents"
module: 7
order: 3
---

When you deploy a single agent, trust is relatively straightforward: you trust the system prompt you wrote, the tools you built, and the output validation you designed. The agent's behavior is a direct product of your design choices.

When you deploy multiple agents, something more complex emerges. Agents send messages to each other. Subagents receive instructions from orchestrators. Orchestrators receive results from subagents. Each of these exchanges is a potential point of failure, not just technical failure, but trust failure.

Trust between agents is one of the hardest problems in multi-agent system design, and it's the one most often underestimated.

## The fundamental problem: agents are not inherently trustworthy

An LLM-based agent is a probabilistic system. It can hallucinate. It can be manipulated through its inputs. Its behavior can drift. When one agent's output becomes another agent's input, errors and manipulations can propagate, amplified by each step in the chain.

A single agent making a mistake affects one interaction. In a multi-agent system, a mistake from a subagent becomes part of the orchestrator's context, which can then affect every subsequent decision the orchestrator makes.

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

## Designing for trust

**Treat subagent outputs as untrusted data.** Just as user input should be validated before use, subagent outputs should be validated before being acted upon. Don't assume a subagent returned what it was supposed to return, verify the structure and plausibility of the output before proceeding.

**Use explicit confirmation for consequential handoffs.** When an orchestrator is about to take a significant action based on a subagent's result, the handoff should be logged and, for the highest-stakes decisions, reviewed by a human.

**Design subagents to fail gracefully.** A subagent that can't complete its task should return a clear error state, not a partial result that looks like success. "I was unable to file the report because the transaction ID was not found" is more useful than a success response with nothing filed.

**Separate privilege levels.** Not all agents need the same access. An orchestrator that routes cases doesn't need to read customer PII. A subagent that reads transaction data doesn't need to file compliance reports. Least-privilege design limits the blast radius when any single agent behaves unexpectedly.

**Audit everything across the full chain.** In a multi-agent system, you need to be able to reconstruct the full sequence of agent interactions for any given outcome, which agent sent what to which other agent, in what order, with what results. Without this, debugging and accountability are nearly impossible.

:::karel Karel in practice
When Karel operates as a subagent in the banking fraud pipeline, the Case Management Orchestrator applies the following trust rules:

**Output validation:** the orchestrator never assumes Karel's status report is accurate. It independently verifies that the report ID Karel returned exists in the case management system before marking the case as "report filed."

**Structured output only:** Karel is required to return a structured JSON object with specific fields (session_status, actions_taken, report_id, escalation_flags). Free-text responses from Karel are not accepted, they must be parsed from the structured output.

**Escalation flags:** Karel's output includes a field for escalation_flags, observations that should be reviewed by a human (customer expressed extreme distress, Karel encountered an unexpected tool failure). The orchestrator doesn't attempt to handle these automatically; it routes them to a human reviewer.

**Privilege separation:** Karel can only act on the specific case ID he was delegated. He cannot browse other cases, access other accounts, or modify the orchestrator's case routing logic.

When evaluating a multi-agent system, ask: "what happens if one agent returns a wrong answer?" If the answer is "everything downstream breaks and we won't know until a customer complains," the trust architecture needs work.
:::

:::takeaway Key takeaway
Agents in a multi-agent system should not trust each other by default. Each agent must validate its own inputs, enforce its own scope, and treat instructions from other agents with the same scrutiny it applies to user messages, regardless of who sent them.
:::
