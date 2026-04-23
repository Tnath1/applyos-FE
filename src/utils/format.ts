import type { JobStatus, ReminderStatus } from '../types'

export const statusLabels: Record<JobStatus, string> = {
  saved: 'Saved',
  applied: 'Applied',
  interviewing: 'Interviewing',
  offer: 'Offer',
  rejected: 'Rejected',
}

export const reminderStatusLabels: Record<ReminderStatus, string> = {
  overdue: 'Overdue',
  upcoming: 'Upcoming',
  completed: 'Completed',
}

export function formatDate(value: string | null | undefined) {
  if (!value) {
    return 'Not applied'
  }

  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(`${value}T12:00:00`))
}

export function formatShortDate(value: string | null | undefined) {
  if (!value) {
    return 'Saved'
  }

  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
  }).format(new Date(`${value}T12:00:00`))
}

export function pluralize(value: number, singular: string, plural = `${singular}s`) {
  return `${value} ${value === 1 ? singular : plural}`
}
