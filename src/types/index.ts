export type JobStatus = 'saved' | 'applied' | 'interviewing' | 'offer' | 'rejected'

export type ReminderStatus = 'overdue' | 'upcoming' | 'completed'

export type ActivityType = 'application' | 'resume' | 'note' | 'reminder' | 'interview' | 'status'

export interface DashboardStat {
  id: string
  label: string
  value: number
  helper: string
  tone: 'neutral' | 'blue' | 'green' | 'amber' | 'red'
}

export interface Resume {
  id: string
  name: string
  roleFocus: string
  fileType: 'PDF' | 'DOC' | 'DOCX'
  fileName?: string
  fileDataUrl?: string
  fileMimeType?: string
  updatedAt: string
  version: string
  matchScore: number
  keywords: string[]
}

export interface Note {
  id: string
  jobId?: string
  title: string
  body: string
  createdAt: string
  tags: string[]
  pinned?: boolean
}

export interface Reminder {
  id: string
  jobId?: string
  title: string
  dueDate: string
  status: ReminderStatus
  channel: 'email' | 'calendar' | 'manual'
}

export interface ActivityTimelineItem {
  id: string
  type: ActivityType
  title: string
  description: string
  createdAt: string
  jobId?: string
}

export interface JobStageEvent {
  status: JobStatus
  label: string
  date: string
}

export interface Job {
  id: string
  roleTitle: string
  company: string
  location: string
  workplace: 'Remote' | 'Hybrid' | 'On-site'
  status: JobStatus
  appliedDate: string | null
  source: string
  sourceUrl: string
  salaryRange: string
  priority: 'Low' | 'Medium' | 'High'
  rating: number
  keywords: string[]
  description: string
  responsibilities: string[]
  resumeId: string
  noteIds: string[]
  reminderIds: string[]
  lastActivity: string
  contact: {
    name: string
    role: string
    email: string
  }
  stageHistory: JobStageEvent[]
}
