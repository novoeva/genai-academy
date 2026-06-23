---
title: "What is hallucination and why does it happen?"
module: 2
order: 1
---

Ask an LLM about a made-up book and it will often describe it in confident detail. Ask it to cite a source and it might invent a paper that doesn't exist, with a plausible author name and journal. Ask it what happened in the news last week and it might give you a coherent but entirely fabricated story.

This is hallucination: the model generating content that sounds right but is factually wrong.

## Why it happens (the honest answer)

Go back to next-token prediction. The model's goal, at every step, is to produce the token that is most statistically plausible given the context. It is not asking "is this true?"; it has no mechanism for truth-checking. It is asking "what would a helpful, knowledgeable response look like here?"

If the training data contained many examples of people confidently answering questions, the model learned to confidently answer questions. If it didn't have the specific fact you're asking about, it doesn't "admit" that gap the way a human might; it generates the most plausible-sounding response anyway.

:::analogy The pub quiz bluffer
It's a bit like asking someone a question on a pub quiz who doesn't know the answer but doesn't want to lose face. They'll produce a confident answer that sounds right, based on vague pattern-matching to things they do know.
:::

## Three common types of hallucination

:::concept-cards
### Factual hallucination
The model states something false as fact. "The Eiffel Tower was built in 1892" (it was 1889). "The CEO of Anthropic is Sam Altman" (that's OpenAI). These errors can be hard to spot because they're delivered with the same confident tone as correct information.

### Citation hallucination
The model invents sources, papers, URLs, or quotes that don't exist. This is especially common when you ask it to "cite your sources." The citations look real, plausible author names, realistic journal titles, but the references don't exist.

### Reasoning hallucination
The model produces a logically flawed chain of reasoning but presents it with full confidence. The steps sound plausible but the conclusion is wrong. Each step seems to follow from the last, which makes the error hard to catch.
:::

## Why it's worse than just "being wrong"

The dangerous thing about hallucination is the confidence. A model that said "I'm not sure, but I think..." would be manageable. Instead, hallucinated content often reads as more authoritative than correct content, because the model is optimizing for what a confident, helpful answer looks like.

This is why hallucination is a product problem, not just a model problem. If your UI presents model outputs as facts without any caveats, you're amplifying the risk.

## What makes hallucination more or less likely?

:::likelihood-factors
### more likely
- Questions outside the training data
- High temperature (more randomness)
- Long reasoning chains
- Lack of grounding / no source material
### less likely
- Well-covered topics in training data
- Low temperature (more deterministic)
- Short, focused tasks
- Grounded with retrieved sources (RAG)
:::

:::karel Karel in practice
This is the scariest failure mode for Karel. A customer finishes describing their fraudulent transactions and Karel responds: "I've filed your fraud report and frozen your card. You'll receive a confirmation email within 24 hours."

The customer feels relieved and stops worrying. But Karel hallucinated. He didn't actually call the tool to file the report; he generated a response that sounds like what a successful fraud report confirmation looks like, because he's seen thousands of those in his training data. The report was never filed. The card was never frozen.

The customer waits. The fraudulent charges keep coming. They call the bank four days later and discover nothing was done.

This is why hallucination in an agent context is categorically different from hallucination in a chatbot. When a chatbot hallucinates a fact, you might look something up and correct it. When an agent hallucinates an action, real consequences follow before anyone notices.
:::

:::takeaway Key takeaway
Hallucination is a direct consequence of how LLMs work, they generate statistically plausible text, not verified facts. The solution isn't to hope the model doesn't hallucinate; it's to design systems that reduce the opportunity for hallucination and catch it when it happens.
:::
