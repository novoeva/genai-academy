---
title: "Orchestrators and subagents"
module: 7
order: 2
---

The core pattern of most multi-agent systems is simple: one agent that directs, and one or more agents that execute. The director is the orchestrator. The executors are subagents.

Understanding how these roles work, and how work flows between them, is the foundation for understanding any multi-agent design.

:::concept-cards
### The orchestrator's job
The orchestrator receives a high-level goal and is responsible for figuring out how to achieve it. It decomposes the goal into subtasks, decides which subagent (or tool) handles each subtask, delegates those subtasks and collects results, and synthesizes results into a coherent final output. The orchestrator typically doesn't do the detailed work itself, it directs, plans, and synthesizes. Think of it as the project manager of the agent system.

### The subagent's job
A subagent receives a specific, scoped task from the orchestrator and executes it. It has its own system prompt defining its specific role, its own set of tools appropriate to its task, and limited scope, it handles one thing well rather than many things broadly. The subagent doesn't need to understand the full goal. It just needs to complete its specific task well and return a result the orchestrator can use.
:::

## How work flows

The basic flow in an orchestrator-subagent system:

1. User submits a goal to the orchestrator
2. Orchestrator analyzes the goal and creates a plan
3. Orchestrator delegates subtask 1 to Subagent A
4. Subagent A executes, using its tools, and returns a result
5. Orchestrator receives the result, possibly delegates subtask 2 to Subagent B (or the same subagent)
6. When all subtasks are complete, orchestrator synthesizes and returns the final output

This flow can be sequential (one subtask at a time) or parallel (multiple subagents working simultaneously when their tasks are independent).

## The interface between orchestrator and subagent

The most important thing to design carefully in a multi-agent system is the interface between agents, what information flows between them and in what format.

An orchestrator delegates a task to a subagent by sending it a message. That message needs to contain everything the subagent needs to complete the task, and nothing it doesn't need.

**Weak delegation:** "Handle this customer's fraud case."

**Strong delegation:** "Handle fraud case FRD-004821. Customer account: CUS-00841923. Suspicious transaction: TXN-7723 (€47, GlobalMerch Ltd, April 21). Customer has already confirmed they don't recognize this charge. Goal: complete the fraud reporting workflow (flag, freeze if requested, file report). Return: case status, actions taken, report ID if filed."

The strong delegation is specific about the case, the context, the goal, and the expected output format. The subagent has everything it needs and knows exactly what to return.

## A concrete example: the banking fraud pipeline

Imagine the bank expanding Karel's role as part of a larger fraud detection system. Instead of one agent handling everything, the system has three:

**Fraud Detection Agent (subagent):** continuously monitors transaction streams looking for anomalous patterns. When it detects something suspicious, it generates an alert with the relevant transaction data.

**Karel, Fraud Reporting Agent (subagent):** receives a specific fraud case and manages the customer-facing workflow: confirming the transaction, taking the customer through the reporting process, flagging and freezing if approved, filing the report.

**Case Management Orchestrator:** oversees the full fraud workflow. When a fraud detection alert comes in, it decides whether to surface it to the customer through Karel, route it directly to the fraud team for silent investigation, or flag it for compliance review.

In this system, Karel is a subagent. He does his job (customer-facing fraud reporting) and returns a result to the orchestrator (case opened, report filed, card frozen). The orchestrator decides what to do next.

:::karel Karel in practice
**Scene:** The Case Management Orchestrator receives a fraud alert and needs to route it to Karel for the customer-facing workflow.

**Karel acts:** He receives a structured input from the orchestrator — case ID, customer account ID, pre-confirmed suspicious transaction(s), prior screening done, and what the orchestrator expects back. He does his job and returns a structured output: session status (completed, escalated, or abandoned), actions taken (flagged: yes/no, frozen: yes/no, report filed: yes/no), report ID if filed, and any escalation flags the orchestrator should know about.

**But — this is the key risk:** Karel doesn't need to know about the fraud detection agent or the compliance routing logic — and the orchestrator doesn't need to understand Karel's customer interaction logic. They just need a clear, structured interface. Vague interfaces between agents are where multi-agent systems break down.

**Result:** The interface works because it was explicitly designed: what Karel receives, what he returns, in what format, with what fields. If the team can't clearly specify that interface, the architecture isn't ready to build. The customer on the other end gets a consistent answer, regardless of which part of the system handled their case.

**Why this matters:** When a multi-agent architecture is proposed, the most important design review question isn't "which agents do we need?" — it's "what does the interface between agents look like?" That question, answered clearly, is what makes the difference between a multi-agent system that works and one that degrades unpredictably.
:::

:::takeaway Key takeaway
Multi-agent systems split work between an orchestrator that coordinates and subagents that execute. Clean interfaces, what each agent receives, what it returns, are what makes the system reliable. If you can't specify the interface clearly, the architecture isn't ready to build.
:::
