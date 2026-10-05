import { m } from '@/paraglide/messages.js'

// Workflow cards for the Matt Pocock collection (shared by Overview + Workflows).
export function getWorkflows() {
  return [
    {
      title: m.workflow_1_title(),
      description: m.workflow_1_description(),
      mengapa: m.workflow_1_why(),
      steps: ['grill-with-docs', 'to-spec', 'to-tickets', 'implement (tdd)', 'code-review', 'pr', 'retro'],
    },
    {
      title: m.workflow_2_title(),
      description: m.workflow_2_description(),
      mengapa: m.workflow_2_why(),
      steps: ['diagnosing-bugs (6 phases)', 'fix + regression test', 'code-review', '/retro (same session, once the fix is in)'],
    },
    {
      title: m.workflow_3_title(),
      description: m.workflow_3_description(),
      mengapa: m.workflow_3_why(),
      steps: ['improve-codebase-architecture', 'pick a candidate', 'grill-with-docs', 'to-spec', 'to-tickets', 'implement', 'code-review'],
    },
    {
      title: m.workflow_4_title(),
      description: m.workflow_4_description(),
      mengapa: m.workflow_4_why(),
      steps: ['triage (state machine)', 'ready-for-agent → implement', 'ready-for-human → manual'],
    },
    {
      title: m.workflow_5_title(),
      description: m.workflow_5_description(),
      mengapa: m.workflow_5_why(),
      steps: ['grill-with-docs (short)', 'implement (tdd)', 'code-review'],
    },
    {
      title: m.workflow_6_title(),
      description: m.workflow_6_description(),
      mengapa: m.workflow_6_why(),
      steps: ['/handoff (purpose: prototype)', 'new session: /prototype', '/handoff back learnings', 'continue grilling with the insight'],
    },
    {
      title: m.workflow_7_title(),
      description: m.workflow_7_description(),
      mengapa: m.workflow_7_why(),
      steps: ['/handoff (from agent A)', 'load in agent B', 'work in agent B', '/handoff back (if needed)'],
    },
    {
      title: m.workflow_8_title(),
      description: m.workflow_8_description(),
      mengapa: m.workflow_8_why(),
      steps: ['/implement (hits a manual step)', '/wizard (generate bash script)', 'human runs script locally (.env ready)', 'continue /implement'],
    },
    {
      title: m.workflow_9_title(),
      description: m.workflow_9_description(),
      mengapa: m.workflow_9_why(),
      steps: ['/to-questionnaire (grill the send)', 'send markdown async / live meeting', 'collect the answers', 'feed into /grill-with-docs or /to-spec'],
    },
    {
      title: m.workflow_10_title(),
      description: m.workflow_10_description(),
      mengapa: m.workflow_10_why(),
      steps: ['grill-with-docs', 'to-spec', 'to-tickets', 'implement-spec (parallel subagents)', 'code-review (integration branch)'],
    },
  ]
}
