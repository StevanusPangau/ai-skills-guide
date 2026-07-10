---
name: level-up
description: Use when the user says "level up", "level-up session", "quiz me", "gauge my knowledge", or wants a new assessment round. Runs a 7-question adaptive assessment of technical + product knowledge, logs verbatim answers with honest ratings, and grows a learning plan from the gaps found.
version: 1.0.0
author: Stevanus Pangau
license: MIT
metadata:
  hermes:
    tags: [learning, assessment, knowledge-gaps, thinking-and-docs]
    related_skills: []
---

# Level Up

Adapted from David Ondrej's `level-up` (MIT). Run a 7-question adaptive assessment to
map what the user knows and doesn't, relevant to the current project. The output is
two files future sessions rely on.

## When to Use

- User wants a knowledge assessment / gap-mapping round.
- Don't use to teach a topic — this finds and maps gaps; a teaching skill delivers
  the lessons on them.

## Files

Default paths (confirm or let the user override at the start):

- `notes/learning/knowledge.md` — verbatim Q&A pairs + ratings, one section per question, rounds appended.
- `notes/learning/LEARNING-PLAN.md` — one concise bullet per genuine gap found.

State-check first: read both files in full if they exist. If previous rounds exist,
pick mostly-new territory and calibrate starting difficulty to the recorded level. If
missing, create the folder and both files (the plan starts as just a header).

## Question rules

- 7 questions, strictly one at a time, plain text — never a questions UI.
- Start easy, adapt each answer: good answer → harder; weak answer → sideways or down.
- Focus on the user's actual working level — systems, architecture, failure modes,
  security, data, scaling, product strategy, unit economics. Match question depth to
  what the user actually does; don't quiz on syntax trivia if they work at the
  architecture level.
- Anchor questions in the current project's real stack and features. When a question
  touches real code, read it and show the actual snippet when teaching.
- Cover different territory across rounds.

## After every single answer

1. Rate honestly 1–10. No flattery — the user wants calibration, not comfort.
2. Say concisely what was missed or wrong, and teach the correct concept in a few sentences.
3. Immediately save the verbatim answer + rating + gap notes to the knowledge file.
4. If a genuine gap surfaced, append one concise bullet to `LEARNING-PLAN.md`. Skip minor misses.
5. If the user pushes back on a rating and it's genuinely deserved, bump it and record the bump with its reason.
6. When the user says they've since learned a plan item, mark its bullet: strikethrough + `✓ learned YYYY-MM-DD`.

## After question 7

Append a final summary to the knowledge file: per-question ratings, overall score,
the recurring pattern across answers, strengths to build on, and gaps added. Give the
user the same summary in chat, concise.

## Verification Checklist

- [ ] Both learning files were read (or created) before question 1.
- [ ] Exactly 7 questions, one at a time, plain text.
- [ ] Every answer got an honest 1–10 rating saved verbatim with gap notes.
- [ ] Genuine gaps (not minor misses) were appended to `LEARNING-PLAN.md`.
- [ ] A final summary was written to the file and given in chat.
