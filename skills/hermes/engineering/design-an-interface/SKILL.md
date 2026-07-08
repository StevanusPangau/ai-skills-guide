---
name: design-an-interface
description: "Generate multiple radically different interface designs for a"
version: 1.0.0
author: Matt Pocock (adapted for Hermes)
license: MIT
platforms: [macos, linux, windows]
metadata:
  hermes:
    tags: [design, api, interface, modules]
    category: engineering
---
# Design an Interface

Based on "Design It Twice" from "A Philosophy of Software Design": your
first idea is unlikely to be the best. Generate multiple radically different
designs, then compare.

## Workflow

### 1. Gather Requirements

Before designing, understand:

- [ ] What problem does this module solve?
- [ ] Who are the callers? (other modules, external users, tests)
- [ ] What are the key operations?
- [ ] Any constraints? (performance, compatibility, existing patterns)
- [ ] What should be hidden inside vs exposed?

Ask: "What does this module need to do? Who will use it?"

### 2. Generate Designs (Parallel Sub-Agents)

Spawn 3+ subagents via `delegate_task(tasks=[...])`. Each must produce a
**radically different** approach.

```
Prompt template for each sub-agent:

Design an interface for:

Requirements:

Constraints for this design:
- Agent 1: "Minimize method count - aim for 1-3 methods max"
- Agent 2: "Maximize flexibility - support many use cases"
- Agent 3: "Optimize for the most common case"
- Agent 4: "Take inspiration from "

Output format:
1. Interface signature (types/methods)
2. Usage example (how caller uses it)
3. What this design hides internally
4. Trade-offs of this approach
```

### 3. Present Designs

Show each design with:

... (45 more lines)