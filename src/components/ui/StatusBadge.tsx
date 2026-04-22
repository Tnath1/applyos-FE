import type { JobStatus, ReminderStatus } from '../../types'
import { statusLabels, reminderStatusLabels } from '../../utils/format'
import { Badge } from './Badge'

interface JobStatusBadgeProps {
  status: JobStatus
}

interface ReminderStatusBadgeProps {
  status: ReminderStatus
}

const jobTone: Record<JobStatus, 'neutral' | 'blue' | 'green' | 'amber' | 'red'> = {
  saved: 'neutral',
  applied: 'blue',
  interviewing: 'amber',
  offer: 'green',
  rejected: 'red',
}

const reminderTone: Record<ReminderStatus, 'green' | 'amber' | 'red'> = {
  overdue: 'red',
  upcoming: 'amber',
  completed: 'green',
}

export function JobStatusBadge({ status }: JobStatusBadgeProps) {
  return <Badge tone={jobTone[status]}>{statusLabels[status]}</Badge>
}

export function ReminderStatusBadge({ status }: ReminderStatusBadgeProps) {
  return <Badge tone={reminderTone[status]}>{reminderStatusLabels[status]}</Badge>
}
