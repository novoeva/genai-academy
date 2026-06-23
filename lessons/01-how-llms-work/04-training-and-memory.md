---
title: "Training, parameters, and why the model has no memory"
module: 1
order: 4
---

You now know that an LLM predicts the next token based on patterns in text. But where did those patterns come from? And why does the model forget everything between conversations?

## How training works (the short version)

Training is the process of showing the model enormous amounts of text and having it repeatedly answer the question: "What token comes next here?"

Every time it gets it wrong, the parameters (the numbers inside the model) are adjusted slightly to make that answer more likely in the future. Do this billions of times across trillions of tokens of text, and the model gradually gets very good at predicting language.

What emerges from this process isn't a lookup table of right answers. It's a complex set of numerical weights that encode statistical patterns, patterns about how language works, how concepts relate, how questions tend to be answered.

## Training data: where the "knowledge" lives

The model's knowledge is entirely determined by what it was trained on. If a fact wasn't in the training data, the model doesn't know it. If the training data had biases or errors, the model reflects those too.

This is why models have a **knowledge cutoff date**. Training data has to be collected at some point. Anything that happened after that point, the model simply doesn't know about, unless you tell it in the conversation.

This is also why the same question about current events can get a confident but wrong answer: the model doesn't know it doesn't know. It just produces the most statistically plausible response.

## Parameters: the model's frozen knowledge

After training, the parameters are frozen. The model you interact with today is not learning from your conversations. Every chat you have, every correction you give, none of it changes the underlying model.

This is a crucial product design implication: **the model's knowledge is static.** You can give it new information in the conversation (the context window), but you cannot update what it fundamentally knows without retraining.

## The context window: the model's working memory

Here's the thing that surprises most people: an LLM has no memory between conversations.

When you close a chat and start a new one, the model has no idea who you are, what you discussed before, or what it said. Each conversation starts completely fresh.

Within a conversation, the model can see everything that has been said, this is called the **context window**. It's essentially a scroll of text: your messages, the model's replies, and anything else that was added (like documents or system instructions). The model uses all of this to predict its next response.

But when the conversation ends, the context window is gone.

:::analogy The consultant with amnesia
Think of it like working with a consultant who has a photographic memory during your meeting, but walks out the door with complete amnesia every time. Brilliant in the moment, completely blank the next day.
:::

## Why this matters for product design

| Concept | Product implication |
|---|---|
| Knowledge cutoff | For anything time-sensitive, you must provide current information in the prompt |
| Frozen parameters | You cannot "teach" the model by chatting with it, you need RAG, fine-tuning, or prompt engineering |
| No cross-session memory | If you want the app to remember users, you need to build that memory layer yourself |
| Context window limit | Very long conversations or documents can exceed what the model can "see" at once |

:::karel Karel in practice
Karel was trained on general text, customer service transcripts, banking documentation, fraud guidelines. But he wasn't trained on your bank's specific policies, and his training data has a cutoff. If a new type of fraud scheme emerged last month, Karel doesn't know about it.

More importantly: Karel has no memory between sessions. A customer who reported fraud with Karel on Monday and comes back on Wednesday to follow up will have to explain everything again from scratch, unless the bank builds a system that loads the previous case into Karel's context window at the start of each new conversation. That memory layer doesn't come built-in. It's a product decision the team has to deliberately design and build.
:::

:::takeaway Key takeaway
The model learned everything it knows during training, and that knowledge is now frozen. Within a conversation it has a working memory (the context window), but between conversations it forgets everything. Memory, for an AI product, is something you have to design and build; it doesn't come for free.
:::
