---
title: "The PM's checklist before shipping"
module: 8
order: 5
---

This is the last lesson of the course. Not a recap, a practical tool you can use.

When you're standing at the go/no-ship decision for an AI agent, whether you built it yourself or you're reviewing something your team built, this is the checklist. It's built from everything in this course, distilled into the questions that actually matter at launch time.

Work through it in order. A "no" to any item in the must-have sections means the agent isn't ready. Not "isn't ready to be perfect", isn't ready to be in front of real users in a way you'd be comfortable defending.

:::analogy The preflight check
Pilots don't decide whether to run the preflight check based on how confident they feel. They run it every time, in the same order, and they don't take off until it's complete. The checklist exists because the cost of missing an item in the air is far higher than the two minutes it takes on the ground. This checklist works the same way.
:::

## Section 1: Scope and design

**Is the scope explicitly documented?**
Not implied, written down. Three columns: allowed, not allowed, edge cases with decisions. If it doesn't exist as a document, the agent's scope is defined by whatever the prompt engineer happened to write.

**Were legal, compliance, and operations involved in scope decisions?**
For any customer-facing agent in a regulated domain, scope without stakeholder input is scope that will surprise you later. If you're operating in the EU, the EU AI Act classifies certain applications (including some banking and financial services tools) as high-risk and imposes hard requirements around transparency, human oversight, and documentation. Building to those requirements from the start is substantially cheaper than retrofitting after launch.

**Do the tools the agent has match its intended scope, and nothing more?**
If a capability the agent shouldn't have corresponds to a tool that exists in its toolkit, fix that before launch. Tool absence is scope enforcement. Tool presence is scope risk.

## Section 2: Prompt engineering

**Are hard constraints written with definitive language?**
"Will not," "cannot," "never", not "try to avoid," "generally shouldn't," or "be careful about."

**Does every constraint have an explicit alternative?**
"Do not X" without "instead, do Y" leaves the model to improvise under pressure. Every hard constraint should have a prescribed alternative.

**Are critical constraints pressure-tested in the prompt?**
Does the prompt include explicit handling for persistent customers who push against constraints? If not, run adversarial tests now, before launch.

**Has the full system prompt been reviewed for internal consistency?**
Every instruction should be checked against every other instruction. One person should read the whole thing as a document, not just review the section that was recently edited.

## Section 3: Evaluation

**Have you defined explicit pass/fail success criteria before evaluation?**
Not directional goals, specific numeric thresholds with pass/fail outcomes. If success criteria were defined after looking at results, they aren't real criteria.

**Does the eval set include happy path, edge case, adversarial, and failure cases?**
Happy-path-only evals will pass an agent that fails on the cases that matter most.

**Has the agent been red-teamed?**
Someone with adversarial intent has tried to make the agent fail. If the answer is no, you don't know what the agent does when a user tries to break it.

**Does a system prompt change trigger an eval run?**
If not, you're deploying changes without knowing whether they regressed the agent's behavior. Every prompt change should run the full eval suite before deployment.

## Section 4: Trust and safety

**Is there a confirmation gate on every irreversible action?**
If the agent can take an action that can't be undone, or is hard to undo, a human must explicitly confirm before it executes. This is non-negotiable for customer-facing financial agents.

**Is every tool call logged with who called it, what arguments were used, and what was returned?**
If the answer is no, you can't reconstruct what happened when something goes wrong.

**Can you answer "what's the worst thing this agent could do, and how would we know?"**
For every tool the agent has, someone should be able to answer: worst case if called incorrectly, whether it's reversible, and what safeguards exist.

**Is AI safety ownership clearly assigned?**
Safety review needs named owners, not assumed ones. Without it, everyone assumes someone else is reviewing. Name an owner for the system prompt, someone who runs evals, and someone who checks the production dashboard daily. Those three things unowned is how agents degrade quietly.

## Section 5: Observability

**Are the five key production metrics being monitored from day one?**
Output validation block rate, escalation rate, conversation completion rate, tool call patterns, customer satisfaction. Not after a week, on launch day.

**Is there a defined response protocol for metric alerts?**
Who gets notified when block rate doubles? What's the first step? Who can deploy a prompt fix?

**Is there a plan for the first post-launch review?**
When does the team reconvene to look at the first real-world data? Name the date and the person responsible for leading it.

## Section 6: The human judgment check

**Is there a clear escalation path for the cases the agent can't handle?**
Every agent will encounter situations it can't resolve. There must be a human path, and the agent must know when and how to use it.

**Have you been honest about what the agent isn't good at yet?**
An agent that's 95% good and escalates the 5% it can't handle is ready to ship. An agent that's 95% good and tries to handle the 5% it can't is a liability.

**Can you explain, in plain language, what this agent will and won't do, and stake your reputation on that explanation?**
If the answer is no, the agent isn't ready. If the answer is yes, ship it.

:::karel Karel in practice
**Scene:** Karel is ready for go/no-ship review. The team works through all six checklist sections.

**Karel acts:** He passes all six sections — but not without work. Communication quality came in at 87% against an 85% target. Adversarial testing found two edge cases that required prompt fixes before he was cleared. Every must-have criterion is met before launch.

**But — this is the key risk:** The launch was not a bet that Karel would handle everything. It was a bet that he would handle the common cases reliably, fail gracefully on the uncommon ones, and get caught by the monitoring when something went wrong. A team that shipped without that bet being clearly made would be surprised by the first serious failure.

**Result:** The bet paid off. Not because Karel was perfect at launch — he wasn't. Because the team built a system where imperfect was sustainable: bounded failures, detectable problems, and a clear process to improve.

**Why this matters:** The checklist isn't about perfection. It's about shipping with enough safeguards that failures are bounded, catchable, and correctable. A "no" to any must-have item means the agent isn't ready — not "isn't ready to be perfect," but "isn't ready to be in front of real users in a way you'd be comfortable defending."
:::

:::takeaway Key takeaway
Shipping an agent responsibly means being able to answer specific questions about scope, guardrails, evaluation, trust, observability, and an honest assessment of gaps. The checklist isn't about perfection, it's about shipping with enough safeguards that failures are bounded, catchable, and correctable.

*This is the end of the course. You now have the mental models, vocabulary, and practical frameworks to think about agentic AI the way the people building it think about it. Use them on Monday.*
:::
