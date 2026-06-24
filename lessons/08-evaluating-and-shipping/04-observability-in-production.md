---
title: "Observability in production"
module: 8
order: 4
---

Passing pre-launch evals means Karel was ready at the moment of launch. It doesn't mean he'll stay ready. Model behavior can shift with model updates. Customer behavior is different from test behavior. Edge cases that weren't in the eval set surface from real users. Scope drift accumulates through small changes that each seem minor but compound over time.

Observability in production is the practice of watching what's actually happening, not what you assumed would happen, so that you know when something changes and can respond before it becomes a serious problem.

## What to monitor

:::concept-cards
### Output validation block rate
What percentage of Karel's responses are being blocked by output validation before reaching the customer? A steady 0.5-1% might be acceptable. A sudden spike to 5% or a gradual creep from 1% to 3% over two weeks both indicate something has changed. Track this metric daily. Set alerts for sudden spikes and for slow creep.

### Escalation rate
What percentage of conversations end in escalation to a human agent? A healthy escalation rate depends on the product. A sudden increase suggests Karel is hitting a new class of scenario he can't handle. When escalation spikes, trace a random sample of the escalated conversations to find the pattern.

### Conversation completion rate
What percentage of conversations reach a natural conclusion, fraud report filed, issue resolved, or customer redirected to the right resource? A declining completion rate is often the first signal that something is wrong, before customer complaints, before visible errors. It's a leading indicator.

### Tool call patterns
Are tool calls happening in the expected order, with the expected frequency? An increase in duplicate tool calls suggests a prompt or context management issue. A decrease in expected tool calls suggests Karel might be skipping steps, potentially acting on assumptions rather than data.

### Refusal rate and false positive rate
Refusal rate measures how often the agent declines a request. False positive rate measures how often it declines a legitimate one incorrectly. The two move together in ways that matter: a spike in refusal rate with no corresponding increase in actual violations means something is over-triggering, and customers with valid requests are being turned away. Track both alongside block rate. High refusal rate plus declining customer satisfaction usually points to a prompt or validation layer that needs recalibration, not more rules.

### Customer satisfaction
Post-conversation surveys or implicit signals (did the customer return with the same issue? did they file a complaint?) provide the human perspective. Technical metrics can look healthy while customer experience degrades, and vice versa.
:::

:::deep-dive Understanding and catching agent drift
## Monitoring for drift

Agent drift is when an agent's behavior gradually shifts from its intended behavior over time. It can happen through:

**Model drift:** One day Karel's tone sounds slightly different and nothing in your system changed. Your AI provider quietly pushed a model update. A refusal that was reliable becomes occasional. A tone that was consistent becomes variable. Comparing your key metrics before and after any provider model update is the standard way to catch it early.

**Prompt drift:** A developer fixed a bug six weeks ago and added two sentences to the system prompt. Those sentences now conflict with an earlier instruction in ways nobody noticed at the time. Small changes accumulate and interact in ways that weren't anticipated.

**Distribution shift:** Your test conversations were all from internal testers who knew how the product works. Real customers phrase things very differently, and some of those phrasings trip the agent up in ways testing never caught.

The way to catch drift is to run a sample of production conversations through the eval suite periodically, weekly, or continuously if volume allows. If eval pass rates are declining without any system change, drift is the likely cause.
:::

## Feedback loops

Observability isn't just about detecting problems, it's about feeding observations back into improvements.

**Every output validation block** is a potential prompt improvement signal. These blocks are often called near-misses. The system did its job, the validation layer caught the response before the user saw it, but a near-miss means the prompt layer didn't stop it first. If Karel regularly produces responses that only get stopped at output validation, the system prompt needs work. Output validation should catch rare edge cases, not routine problems.

**Every escalated conversation** is a potential eval case. Add the scenario to the eval set so future prompt changes are tested against it.

**Every customer complaint** is a trace waiting to be analyzed. What did Karel actually do in that conversation?

The teams that maintain high-quality agents over time are not the ones who got the system perfect at launch. They're the ones who built feedback loops that continuously surface gaps and close them.

:::karel Karel in practice
**Scene:** Three weeks after launch, Karel's output validation block rate creeps from 1.2% to 2.8% over two weeks. No system prompt changes were made. No obvious incident triggered it.

**Karel acts:** A team member reviews the dashboard (refreshed hourly, reviewed each morning). The block rate crossed its threshold — and the defined response protocol kicks in: trace a sample of blocked conversations, identify the pattern, determine root cause, fix (usually a prompt change), run the eval suite on the fix, and deploy.

**But — this is the key risk:** The creep would be invisible without daily monitoring. Customer satisfaction metrics hadn't dropped yet. No complaints had come in. The observability layer caught it before it became a visible problem.

**Result:** The pattern is identified — model drift after a provider update shifted Karel's output distribution slightly. A targeted prompt adjustment brings the block rate back below 2%. Weekly human review of 50 conversations and monthly eval suite runs against production data are what make these patterns visible before they compound.

**Why this matters:** Shipping an agent without observability is shipping without knowing what you shipped. The difference between a reliably high-quality agent and one that degrades unpredictably is almost always the quality of the feedback loop — and that feedback loop has to be built from day one, not added after the first incident.
:::

:::takeaway Key takeaway
Passing pre-launch evals tells you the agent was ready at launch. Observability tells you whether it stays ready. Monitoring key signals, validation block rate, escalation rate, completion rate, tool patterns, satisfaction, with defined response protocols is what separates early drift detection from discovering problems via customer complaints.
:::
