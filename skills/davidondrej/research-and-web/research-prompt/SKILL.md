---
name: research-prompt
description: Use when the user wants a research brief, a "deep research prompt", a one-paragraph task for a researcher, or asks "what should our researcher look for". Produces ONE tight self-contained paragraph with full context, numbered sub-questions, source hierarchy, and a per-finding output format.
version: 1.0.0
author: Stevanus Pangau
license: MIT
metadata:
  hermes:
    tags: [research, prompt-engineering, brief, research-and-web]
    related_skills: []
---

# Research Prompt

Adapted from David Ondrej's `research-prompt` (MIT). Turn a vague research need into
ONE self-contained paragraph a researcher (human or a deep-research AI) can act on
with zero back-and-forth. Provider-neutral: the paragraph is the deliverable; how you
run it (Hermes `web_search`/`web_extract`, a human, or any deep-research service) is
a separate choice.

## When to Use

- User wants a research brief / one-paragraph task for a researcher.
- Don't use when you should just do the research yourself with available tools and
  report findings — this produces the *brief*, not the answer.

## Rules

- **One paragraph.** No headers, no bullet list in the deliverable.
- **Prompt the job, not the topic.** Give search handles (timeframe, ranking, source type, decision logic) — not just a subject.
- **Assume zero prior knowledge.** Open by explaining, in plain language, what the project/product is, why it exists, and the current situation.
- **Lead with the goal + decision.** State the single question the research must answer and the decision it informs.
- **Embed all context.** Names, dates, product, prior known facts, constraints — the researcher must not need to ask anything.
- **Number sub-questions inline** (1, 2, 3…). Keep to 3–6. One mission per prompt.
- **State constraints.** What to include, what to avoid.
- **Source hierarchy.** Prefer primary sources (official docs, GitHub, papers, filings, changelogs); treat forums/social as weak signal only, never factual proof.
- **Contradiction handling.** If sources conflict, separate confirmed fact / inference / unresolved uncertainty. Flag low-confidence claims.
- **Completion bar.** Don't stop at the first plausible answer; corroborate each key claim with multiple independent primary sources where they exist, and say so explicitly where they don't. Cover every numbered sub-question to this bar.
- **Gap round before finishing.** Require a final self-critique pass listing gaps, contradictions, and single-source claims, then another search round to close them — repeat until clean.
- **Fixed output per finding:** source link + specific claim + one-line "why it matters".
- Verifiable, citable facts only. No opinions, no marketing fluff.
- **Last sentence:** instruct output into a single detailed markdown file.

## Process

1. Pull context from project files/conversation (dates, names, known facts, audience, end use); write a 1–2 sentence plain-language explainer.
2. Identify the ONE question the research answers.
3. Draft 3–6 numbered sub-questions that fully cover it.
4. Add include/avoid constraints + the per-finding output format.
5. Compress to one clean paragraph. Cut filler.

## Template

> [For a reader with zero prior knowledge: in 1–2 plain sentences, what the project is, why it exists, and the current situation.] Research [TOPIC + key identifying facts] to answer one question: [THE QUESTION] — for [DECISION / END USE]. Find: (1) …; (2) …; (3) …; (4) …. [Constraints: include X, avoid Y.] Prefer primary sources; treat forums/social as weak signal only; if sources conflict, separate fact from inference and flag what needs verification. Don't stop at the first plausible answer: corroborate each key claim with multiple independent primary sources where they exist (and say so explicitly where they don't), continuing until every numbered question is covered to that bar. Before finishing, do a self-critique pass — list gaps, contradictions, and single-source claims, then run another search round to close them, repeating until clean. For each point, give the source link, the specific claim, and a one-line "why it matters". No marketing fluff — verifiable, citable facts only. Output everything into a single detailed markdown file.

## Verification Checklist

- [ ] Deliverable is exactly one paragraph, self-contained, zero prior knowledge assumed.
- [ ] 3–6 numbered sub-questions cover the single research question.
- [ ] Source hierarchy, contradiction handling, completion bar, and gap round are all stated.
- [ ] Per-finding output format (link + claim + why-it-matters) is specified.
- [ ] Final sentence directs output into one markdown file.
