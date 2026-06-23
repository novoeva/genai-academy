---
title: "When not to use multi-agent"
module: 7
order: 5
---

Multi-agent systems are powerful. They're also complex, expensive to build, expensive to maintain, and harder to debug than single-agent systems. The right question is never "how do we build a multi-agent system for this?", it's "does this problem actually need multi-agent, or is there a simpler solution?"

Most agent problems don't need multi-agent. This lesson is about recognizing when you're reaching for a sledgehammer when a hammer would do.

## Signs you probably don't need multi-agent

:::concept-cards
### The task is narrow and sequential
If the task has one clear focus area and each step depends on the previous one, a single well-designed agent with good memory architecture is almost certainly sufficient. Karel handling a fraud report is a sequential, focused task, not a good candidate for multi-agent.

### The specialization benefit is small
Multi-agent earns its cost when each agent is meaningfully better at its domain than a generalist would be. If you're splitting a task into three agents and each agent's system prompt looks basically the same, just with different variable names, you're adding complexity without gaining quality.

### You can't clearly define the interface between agents
If the team can't articulate exactly what each agent receives and what it returns, the multi-agent architecture isn't well enough understood to build. A vague multi-agent system is significantly worse than a vague single-agent system, errors compound across agents.

### The task volume doesn't justify the overhead
Multi-agent systems have higher operational overhead: more prompts to maintain, more interfaces to test, more failure modes to monitor. For a tool that runs once a day or handles hundreds rather than thousands of interactions, the overhead may not be worth it.

### Latency matters and the tasks are sequential
If all the subtasks depend on each other and must run in order, a multi-agent system doesn't reduce latency, it may actually increase it through coordination overhead. The benefit of multi-agent (parallel execution, specialization) only materializes when tasks can run independently.
:::

## The anti-patterns: what multi-agent doesn't fix

**"The single agent is unreliable, let's add more agents to check each other."**
If the underlying agent is unreliable, it's usually a prompt engineering or data quality problem. Adding more agents to cross-check each other creates a system where errors compound, not cancel. Fix the root cause.

**"The system prompt is too long, let's split it into multiple agents."**
A long system prompt is a symptom, not the cause. If the system prompt is long because it's badly organized or contains redundant instructions, the fix is prompt engineering, not architecture.

**"The single agent is too slow, let's parallelize across agents."**
True parallelism in multi-agent requires independent tasks. If the bottleneck is in a task that's sequential by nature, splitting it across agents won't speed it up.

**"The model isn't smart enough, let's use multiple models."**
If the task requires reasoning capabilities the model doesn't have, adding more instances of the same model doesn't help. Either the task needs a more capable model, or it needs to be simplified.

## The cost of unnecessary complexity

Multi-agent systems have specific costs that single-agent systems don't:

- **More failure modes.** Every interface between agents is a potential failure point.
- **Harder to debug.** You reconstruct the full chain of agent interactions across multiple services, not just one set of logs.
- **Harder to test.** You have to test each agent in isolation and the full system together.
- **More expensive.** More agents mean more model calls, more tokens, more infrastructure.

## The decision framework

Before proposing a multi-agent architecture, answer these questions honestly:

1. Does the task naturally break into distinct subtasks with well-defined interfaces between them?
2. Are any of those subtasks independent enough to run in parallel?
3. Would specialized agents be meaningfully better at their subtask than a well-designed generalist?
4. Is the operational complexity of maintaining multiple agents justified by the improvement in output quality or efficiency?

If the honest answer to most of these is "no", a single agent with good prompt engineering, memory design, and tool configuration is probably the right choice.

:::karel Karel in practice
Karel, in his basic form, is the right architecture for Karel's task, and it's not multi-agent. He's a single, well-scoped agent with clear tools, a clear system prompt, and clear memory design.

He becomes a subagent when placed inside a larger banking fraud pipeline, but that's because the broader system (fraud detection, compliance routing, case management) benefits from specialization and the separation of concerns. The decision to make Karel part of a multi-agent system comes from the surrounding system's needs, not from Karel's individual task.

The question that led to the multi-agent design wasn't "how do we make Karel into a multi-agent system?" It was "what does the bank's overall fraud management workflow look like, and where does Karel fit within it?"

When an engineering team proposes a multi-agent architecture, the right product question is: "what specific capability or quality improvement does this architecture provide that a well-designed single agent doesn't?" If the answer is clear and compelling, genuine parallelism, meaningful specialization, the architecture is justified. If the answer is vague or defaults to "it's more scalable" without a concrete example, push back.
:::

:::takeaway Key takeaway
Multi-agent complexity is a cost that needs to be earned. If a single well-designed agent can do the job reliably, use it. Add agents only when you need genuine parallelism, specialization beyond one context window, or independent verification, not to solve problems that better prompts would fix.
:::
