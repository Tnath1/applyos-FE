import type { ActivityTimelineItem } from '../types'

export const activityTimeline: ActivityTimelineItem[] = [
  {
    id: 'activity-1',
    type: 'interview',
    title: 'Arcadia Labs screen scheduled',
    description: 'Hiring manager call confirmed for Apr 23 at 11:00 AM.',
    createdAt: '2026-04-21',
    jobId: 'job-arcadia',
  },
  {
    id: 'activity-2',
    type: 'application',
    title: 'Brightlane Health added',
    description: 'Saved role and matched it to the full stack resume.',
    createdAt: '2026-04-22',
    jobId: 'job-brightlane',
  },
  {
    id: 'activity-3',
    type: 'resume',
    title: 'Product Engineer resume updated',
    description: 'Added onboarding metrics and dashboard ownership bullets.',
    createdAt: '2026-04-18',
  },
  {
    id: 'activity-4',
    type: 'note',
    title: 'Nova Metrics prep note created',
    description: 'Captured product story angle for the referral application.',
    createdAt: '2026-04-19',
    jobId: 'job-nova',
  },
]
