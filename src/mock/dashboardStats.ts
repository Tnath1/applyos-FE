import type { DashboardStat } from '../types'
import { jobs } from './jobs'
import { reminders } from './reminders'

export const dashboardStats: DashboardStat[] = [
  {
    id: 'total-jobs',
    label: 'Total jobs',
    value: jobs.length,
    helper: 'Across all tracked roles',
    tone: 'neutral',
  },
  {
    id: 'applied',
    label: 'Applied',
    value: jobs.filter((job) => job.status === 'applied').length,
    helper: 'Waiting on first response',
    tone: 'blue',
  },
  {
    id: 'interviewing',
    label: 'Interviewing',
    value: jobs.filter((job) => job.status === 'interviewing').length,
    helper: 'Active conversations',
    tone: 'amber',
  },
  {
    id: 'offers',
    label: 'Offers',
    value: jobs.filter((job) => job.status === 'offer').length,
    helper: 'Ready for decision work',
    tone: 'green',
  },
  {
    id: 'rejected',
    label: 'Rejected',
    value: jobs.filter((job) => job.status === 'rejected').length,
    helper: 'Closed and archived',
    tone: 'red',
  },
  {
    id: 'reminders-due',
    label: 'Reminders due',
    value: reminders.filter((reminder) => reminder.status === 'overdue').length,
    helper: 'Needs attention today',
    tone: 'amber',
  },
]
