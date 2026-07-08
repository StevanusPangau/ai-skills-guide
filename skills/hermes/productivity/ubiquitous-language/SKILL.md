---
name: ubiquitous-language
description: "Extract a DDD-style ubiquitous language glossary from the"
version: 1.0.0
author: Matt Pocock (adapted for Hermes)
license: MIT
platforms: [macos, linux, windows]
metadata:
  hermes:
    tags: [ddd, glossary, domain-model]
    category: productivity
---
# Ubiquitous Language

Extract and formalize domain terminology from the current conversation into
a consistent glossary, saved to a local file.

## Process

1. **Scan the conversation** for domain-relevant nouns, verbs, and concepts
2. **Identify problems**:
   - Same word used for different concepts (ambiguity)
   - Different words used for the same concept (synonyms)
   - Vague or overloaded terms
3. **Propose a canonical glossary** with opinionated term choices
4. **Write to `UBIQUITOUS_LANGUAGE.md`** in the working directory using the
format below
5. **Output a summary** inline in the conversation

## Output Format

Write a `UBIQUITOUS_LANGUAGE.md` file with this structure:

```md
# Ubiquitous Language

## Order lifecycle

| Term        | Definition                                              |
Aliases to avoid      |
| ----------- | ------------------------------------------------------- |
--------------------- |
| **Order**   | A customer's request to purchase one or more items      |
Purchase, transaction |
| **Invoice** | A request for payment sent to a customer after delivery |
Bill, payment request |

## People

| Term         | Definition                                  | Aliases to
avoid       |
| ------------ | ------------------------------------------- |
---------------------- |
| **Customer** | A person or organization that places orders | Client,
buyer, account |
| **User**     | An authentication identity in the system    | Login,
account         |

## Relationships

- An **Invoice** belongs to exactly one **Customer**
- An **Order** produces one or more **Invoices**

## Example dialogue

> **Dev:** "When a **Customer** places an **Order**, do we create the
**Invoice** immediately?"

... (44 more lines)