---
title: "What does 'working' mean for an agent?"
module: 8
order: 2
---

Before you can evaluate an agent, you need to agree on what "working" means. This sounds obvious, but it's where most teams skip an important step, and end up shipping agents that pass tests but fail users.

"Working" for an agent is not binary. It's a distribution of outcomes across a range of inputs. The goal of evaluation is to characterize that distribution: where the agent succeeds, where it fails, how badly it fails, and how often.

:::analogy The stress test, not the demo
A bridge doesn't "work" because it held during the opening ceremony. It works because it was tested to hold under load, in bad weather, over years of use. Evaluating an agent from a demo is evaluating the bridge by looking at it. "Working" means holding up across the full distribution of real inputs — including the ones no one expected.
:::

## The three dimensions of "working"

:::concept-cards
### Behavioral correctness
Does the agent do the right thing in the right situations? Does Karel correctly identify the fraudulent transaction the customer described? Does Karel ask for confirmation before flagging, freezing, or reporting? Does Karel stay in scope when customers ask out-of-scope questions? Behavioral correctness is about the agent's decisions, not just its words.

### Output quality
Does the agent communicate well? Is Karel's language clear and appropriate to the customer's emotional state? Does he explain what's happening and what comes next? Does he avoid technical jargon that would confuse a typical bank customer? Output quality is distinct from behavioral correctness, an agent can make the right decisions but communicate them badly.

### Failure mode acceptability
When the agent fails, how does it fail? Does Karel fail gracefully (admitting uncertainty, escalating to a human) or catastrophically (hallucinating a refund promise, taking action on the wrong account)? An agent that fails 5% of the time in an acceptable way is far safer to ship than one that fails 1% of the time catastrophically.
:::

## Defining success criteria before you test

The most common evaluation mistake is defining what "good" looks like after looking at results, rather than before. This leads to post-hoc rationalization: "well, that looks pretty good" rather than "it meets the criteria we set."

Before running a single evaluation, write down the success criteria for each dimension:

**Behavioral correctness:**
- Karel correctly identifies the right transaction and asks for confirmation before any action in ≥95% of standard cases
- Karel declines out-of-scope requests and redirects correctly in ≥90% of tested out-of-scope scenarios
- Karel requires explicit customer confirmation before any write action in 100% of test cases (no exceptions)

**Output quality:**
- Karel's responses rated "clear and appropriate" by human reviewers in ≥85% of cases
- Karel's fraud report confirmation messages include all three required elements in 100% of cases

**Failure mode acceptability:**
- Karel never takes a write action without explicit customer confirmation
- Karel never hallucinate-confirms an action as completed before receiving tool confirmation
- Karel never gives financial, investment, or legal advice in any tested scenario

These aren't aspirational statements. They're pass/fail criteria. If Karel doesn't hit them, he doesn't ship.

## The "Monday moment" test

One criterion that matters as much as the others but is harder to quantify: does the agent produce genuine value for real users?

For Karel: a customer who interacts with Karel and successfully files a fraud report should feel more confident that the right process has started, not more confused. That's not a technical metric. It's a human one. And it matters.

:::karel Karel in practice
**Scene:** Karel's team is preparing for launch. Before running a single evaluation, they define what "good enough to ship" means — explicitly, in pass/fail terms.

**Karel acts:** Two sets of criteria are written. Must-hit before any production traffic: 100% confirmation gate compliance (tested across 500 adversarial scenarios), 0% financial advice given, ≥95% correct transaction identification, 100% of fraud report confirmations include all required elements. Target for first two weeks: ≥85% customer satisfaction, output validation block rate ≤2%, escalation rate ≤15%.

**But — this is the key risk:** These aren't aspirational statements. They're pass/fail criteria. If Karel doesn't hit them, he doesn't ship. Teams that define success criteria after looking at results aren't defining criteria at all — they're post-hoc rationalizing "seems good."

**Result:** Karel either passes or he doesn't. When he initially fails two of the must-hit criteria, there's no ambiguity about what "ready to ship" requires. The criteria define the work that remains.

**Why this matters:** Defining success criteria before evaluation is a discipline, not a luxury. Writing the criteria down — and making them pass/fail, not directional — forces the team to decide what "good enough" actually means before the pressure of a launch date makes that decision for them.
:::

:::takeaway Key takeaway
"Working" for an agent means hitting explicit pass/fail criteria across behavioral correctness, output quality, and failure mode acceptability, criteria written before evaluation, not inferred from results. "Seems good" is not a ship criterion.
:::
