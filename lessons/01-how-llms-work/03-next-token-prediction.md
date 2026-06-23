---
title: "Next-token prediction: the engine behind everything"
module: 1
order: 3
---

Here is the single most important sentence in this entire course:

**A language model is trained to predict the most likely next token given all the tokens that came before.**

Everything else, the apparent intelligence, the helpfulness, the creativity, and yes, the hallucinations, is a consequence of this one mechanism.

## What is a token?

A token is roughly a word or a word fragment. The sentence "The cat sat on the mat" is about 7 tokens. The model doesn't see letters or words the way we do; it sees tokens, which are chunks of text that its vocabulary recognizes.

## How prediction works

:::figure-aside /images/prediction-flow.jpg
What's striking about this process is how **local** it is. The model never drafts a sentence and then revises it. There is no plan. Each token is a one-way door: once committed, it shapes every token that follows.

This creates a fascinating constraint: if the model starts down a factually wrong path, it can't backtrack. It will follow the probability distribution it has already created, which is a big part of why hallucinations happen.

Notice the loop in Step 4. Because every new token becomes part of the context for the next prediction, the model's output is self-referential — earlier words pull later words toward them. Longer inputs give the model richer signal to predict from, which is why more context generally produces better answers.

The randomness in Step 3 is not a bug. It's what makes the same prompt produce different outputs on different runs — and it's tunable. That's the **temperature** setting, covered in the next section.
:::

:::analogy The autocomplete that got out of hand
Think of it like autocomplete. Your phone's keyboard does a simple version; it suggests the next word based on what you've typed. An LLM does an extraordinarily sophisticated version of this, trained on vastly more data with a vastly larger model.

The difference is degree, not kind. Your phone suggests "the" after "I went to". An LLM suggests a coherent, nuanced paragraph, because it has seen enough examples of how humans write paragraphs that it can replicate the pattern.
:::

## The "temperature" knob

Remember how the model "picks a token with some randomness"? That randomness is controlled by a setting called **temperature**.

:::concept-cards
### Low temperature (near 0)
The model almost always picks the single most likely next token. Responses are predictable, consistent, a bit dry. Good for customer support bots where consistency matters.

### High temperature (near 1 or above)
The model samples more broadly from the probability distribution. Responses are more varied, creative, and more likely to go off the rails. Better suited to creative writing assistants.
:::

As a PM, temperature is a product decision. A customer support bot should have low temperature (consistent, safe). A creative writing assistant might have higher temperature (surprising, varied).

## Why this explains so much

- **Why LLMs are good at writing?** Because they've seen millions of examples of good writing and learned its patterns.
- **Why they sometimes make things up?** Because they're optimizing for "what sounds right next," not "what is factually true."
- **Why longer context helps?** Because the model predicts the next token based on *all* prior tokens, more context means better-informed predictions.
- **Why they can feel inconsistent?** Because the same prompt can produce different outputs depending on the sampling randomness.

:::karel Karel in practice
When a customer tells Karel "I'd like to report a fraudulent charge," Karel doesn't retrieve a script from a database. He generates his response token by token, "I" → "understand" → "that" → "must" → "be" → "stressful", each word influenced by the one before it, shaped by patterns from millions of customer service conversations in his training data.

This also explains why Karel's temperature setting matters. A banking agent handling fraud reports should have low temperature; you want him to say the same careful, consistent things every time, not get creative. High temperature Karel might one day open with "Yikes, that sounds rough!" That's not the tone a fraud victim needs.
:::

:::takeaway Key takeaway
The model is an extremely sophisticated "what comes next" engine. It produces text that is statistically coherent and pattern-matched to human writing, which is both its superpower and the root of its failure modes.
:::
