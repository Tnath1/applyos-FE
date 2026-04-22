import type { Reminder } from '../types'

export const reminders: Reminder[] = [
  {
    id: 'reminder-arcadia-followup',
    jobId: 'job-arcadia',
    title: 'Send follow-up after hiring manager call',
    dueDate: '2026-04-21',
    status: 'overdue',
    channel: 'email',
  },
  {
    id: 'reminder-nova-portfolio',
    jobId: 'job-nova',
    title: 'Attach refined portfolio deck',
    dueDate: '2026-04-24',
    status: 'upcoming',
    channel: 'manual',
  },
  {
    id: 'reminder-brightlane',
    jobId: 'job-brightlane',
    title: 'Check recruiter response window',
    dueDate: '2026-04-27',
    status: 'upcoming',
    channel: 'calendar',
  },
  {
    id: 'reminder-sunstone',
    jobId: 'job-sunstone',
    title: 'Thank interview panel',
    dueDate: '2026-04-18',
    status: 'completed',
    channel: 'email',
  },
]
