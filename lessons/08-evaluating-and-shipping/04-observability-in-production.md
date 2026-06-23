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

## Monitoring for drift

Agent drift is when an agent's behavior gradually shifts from its intended behavior over time. It can happen through:

**Model drift:** AI providers occasionally update underlying models, and even small updates can shift output distribution at the margins. A refusal that was reliable becomes occasional. A tone that was consistent becomes variable. This is model drift. It is different from prompt drift, where a system prompt edit caused the shift, and different from distribution shift, where real user behavior diverged from test behavior. Comparing your key metrics before and after any provider model update is the standard way to catch it early.

**Prompt drift:** small changes to the system prompt accumulate and interact with each other in ways that weren't anticipated. Something that looked like a minor fix created an unintended effect downstream.

**Distribution shift:** real customer inputs are different from test inputs. As more real customers interact with Karel, patterns that weren't in the eval set emerge.

The way to catch drift is to run a sample of production conversations through the eval suite periodically, weekly, or continuously if volume allows. If eval pass rates are declining without any system change, drift is the likely cause.

## Feedback loops

Observability isn't just about detecting problems, it's about feeding observations back into improvements.

**Every output validation block** is a potential prompt improvement signal. These blocks are often called near-misses. The system did its job, the validation layer caught the response before the user saw it, but a near-miss means the prompt layer didn't stop it first. If Karel regularly produces responses that only get stopped at output validation, the system prompt needs work. Output validation should catch rare edge cases, not routine problems.

**Every escalated conversation** is a potential eval case. Add the scenario to the eval set so future prompt changes are tested against it.

**Every customer complaint** is a trace waiting to be analyzed. What did Karel actually do in that conversation?

The teams that maintain high-quality agents over time are not the ones who got the system perfect at launch. They're the ones who built feedback loops that continuously surface gaps and close them.

:::karel Karel in practice
Karel's production observability stack monitors five key metrics in a dashboard refreshed every hour: output validation block rate (target: <2%), escalation rate (target: 10-15%), conversation completion rate (target: >80%), tool call anomaly rate (target: <1%), and 7-day rolling customer satisfaction (target: >85%).

Weekly: a random sample of 50 conversations is reviewed by a human analyst against Karel's quality criteria. Results are compared to the previous week's sample to detect gradual drift.

Monthly: Karel's full eval suite is run against a sample of production conversations (anonymized). Any eval that fails on production data at a higher rate than in pre-launch testing triggers a prompt review.

A team member owns the Karel observability dashboard and reviews it each morning. When a metric crosses a threshold, there's a defined response protocol: trace a sample of the affected conversations, identify the pattern, determine root cause, fix (usually a prompt change), run the eval suite on the fix, and deploy.

Shipping an agent without observability is shipping without knowing what you shipped. The difference between a reliably high-quality agent and one that degrades unpredictably is almost always the quality of the feedback loop.
:::

:::takeaway Key takeaway
Passing pre-launch evals tells you the agent was ready at launch. Observability tells you whether it stays ready. Monitoring key signals, validation block rate, escalation rate, completion rate, tool patterns, satisfaction, with defined response protocols is what separates early drift detection from discovering problems via customer complaints.
:::
