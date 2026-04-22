import type { Note } from '../types'

export const notes: Note[] = [
  {
    id: 'note-arcadia-fit',
    jobId: 'job-arcadia',
    title: 'Hiring manager screen prep',
    body: 'Emphasize dashboard work, onboarding simplification, and the way we reduced handoff time between design and engineering.',
    createdAt: '2026-04-20',
    tags: ['prep', 'screen'],
    pinned: true,
  },
  {
    id: 'note-nova-product',
    jobId: 'job-nova',
    title: 'Portfolio angle',
    body: 'Lead with the workflow redesign case study. Their posting keeps repeating adoption and measurable activation.',
    createdAt: '2026-04-19',
    tags: ['portfolio', 'story'],
  },
  {
    id: 'note-compensation',
    title: 'Compensation notes',
    body: 'Keep target range consistent. For remote roles, ask about leveling before anchoring too hard.',
    createdAt: '2026-04-16',
    tags: ['negotiation'],
  },
  {
    id: 'note-rejection-review',
    jobId: 'job-kinetic',
    title: 'Retrospective',
    body: 'Good product conversation, weaker systems design round. Practice data modeling tradeoffs with fewer assumptions.',
    createdAt: '2026-04-12',
    tags: ['retro'],
  },
]
