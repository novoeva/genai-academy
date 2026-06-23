---
title: "Real-world multi-agent examples"
module: 7
order: 4
---

Multi-agent systems are most clearly understood through concrete examples. Abstract descriptions of orchestrators and subagents make intuitive sense in theory, but seeing how the pattern applies to real products makes the design decisions tangible.

Here are four real-world multi-agent patterns, with the key design insight each one illustrates.

## Example 1: Customer support triage

A large e-commerce company receives thousands of customer messages daily. Inquiries cover orders, returns, product questions, billing disputes, fraud, and technical issues.

A single generalist agent is bad at everything, its system prompt becomes unwieldy, and it can't maintain deep expertise in any one area.

**The multi-agent solution:** a Triage Orchestrator receives every incoming message, classifies the customer's intent, and routes to the appropriate specialist agent (Order Status, Returns and Refunds, Billing Disputes, Fraud Reporting, Technical Support, Escalation). Each specialist agent is small, well-scoped, and excellent at its specific domain.

**Key design insight:** specialization improves quality. A narrow agent with a well-crafted system prompt for one domain outperforms a generalist agent trying to handle everything. The orchestrator doesn't need to be smart about every domain, it just needs to be good at classification and routing.

## Example 2: Software development pipeline

An engineering organization wants agents to handle portions of their software development workflow, code review, test writing, documentation.

**The multi-agent solution:** when a developer opens a pull request, a Development Orchestrator triggers four agents in parallel: Code Review Agent (reads PR, identifies issues), Test Generation Agent (writes tests for new code), Documentation Agent (writes docstrings), and Security Scanner Agent (flags vulnerabilities). Each returns its results. The orchestrator synthesizes them into a single review response.

**Key design insight:** parallelism matters. These four tasks are independent, the security scanner doesn't need the test generator's output, and the documentation agent doesn't depend on the code reviewer. Running them in parallel reduces total time from the sum of individual run times to roughly the longest single run time.

## Example 3: Insurance claims processing

An insurance company wants to accelerate first-pass review of new claims, collecting documents, verifying policy coverage, checking for obvious red flags.

**The multi-agent solution:** a Claims Orchestrator kicks off the workflow when a claim is submitted. Document Collector and Policy Verification agents run in parallel. The Fraud Screening agent runs after basic document collection (it needs the documents to assess patterns). The Summarization agent runs last, generating a structured report for the human adjuster who makes the final decision.

**Key design insight:** human-in-the-loop at the right step. The agents handle information gathering and preliminary screening, the work that doesn't require judgment, just processing. The human adjuster receives a complete, organized summary and makes the decision. This is the right place to keep humans: at the decision point, with full information.

## Example 4: Financial research report

A financial analyst needs to generate weekly reports on specific market sectors, combining data from multiple sources.

**The multi-agent solution:** a Report Orchestrator kicks off at a scheduled time each week. Data Retrieval, Analysis, and Competitor Comparison agents can run partially in parallel. The Report Writer runs last, once all other agents have completed. The orchestrator manages sequencing and passes outputs between agents in the right order.

**Key design insight:** agent output as structured input. The Report Writer doesn't receive free-text results from the other agents, it receives structured data (trend findings as JSON, competitor data as a table, key events as a list). This structure makes the Report Writer's output more predictable and the overall system easier to debug.

## What all four have in common

- **Specialization over generalization.** Each agent has a narrow scope and does its job well.
- **Orchestrator as router, not executor.** The orchestrator understands the goal and manages flow. The work happens in the subagents.
- **Parallelism where tasks are independent.** Tasks that don't depend on each other run at the same time.
- **Human decisions at decision points, not throughout.** Agents handle processing and synthesis. Humans handle judgment and consequential choices.
- **Structured interfaces.** Agents communicate in structured formats, JSON, defined schemas, not free text.

:::karel Karel in practice
Karel's role in the banking fraud pipeline maps cleanly to Example 1. He's a specialist agent, narrow, well-scoped, excellent at his specific task. He doesn't route, classify, or synthesize across domains. He just handles fraud reporting, and does it well.

The Case Management Orchestrator is the intelligence that decides when to route to Karel, what context to give him, and what to do with his results. Karel doesn't need to understand the orchestrator's logic. The orchestrator doesn't need to understand Karel's customer interaction logic. They just need a clear, structured interface between them.

When evaluating whether a complex workflow should become multi-agent, look for these patterns. If the task naturally decomposes into specialized subtasks, if some steps can run in parallel, if there's a clear decision point where a human should stay in the loop, multi-agent is probably the right direction.
:::

:::takeaway Key takeaway
Multi-agent systems shine when tasks are parallelizable, require diverse specialization, or are too long for a single context window. The value comes from coordination, but only when each agent is independently reliable and the interfaces between them are well-defined.
:::
