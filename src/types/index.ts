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

export interface UserProfile {
  firstName: string
  lastName: string
  email: string
  emailVerified: boolean
  targetRole: string
  headline: string
  preferredLocations: string[]
  workplacePreference: Job['workplace'] | 'Flexible'
  salaryTarget: string
  linkedInUrl: string
  portfolioUrl: string
  githubUrl: string
  timeZone: string
}

export interface WorkspacePreferences {
  defaultHome: '/dashboard' | '/jobs' | '/resumes' | '/notes'
  trackerView: 'table' | 'board'
  dateFormat: 'MMM D, YYYY' | 'DD MMM YYYY'
  weeklyGoal: number
  compactMode: boolean
  autoOpenJobLinks: boolean
}

export interface AuthSession {
  id: string
  deviceName: string
  location: string
  lastActive: string
  current: boolean
}

export interface SecuritySettings {
  provider: 'Email + password' | 'Google SSO'
  twoFactorEnabled: boolean
  sessionTimeout: '15m' | '1h' | '8h' | '24h'
  lastPasswordChange: string
  sessions: AuthSession[]
}

export interface SubscriptionSettings {
  plan: 'Free' | 'Pro'
  billingCycle: 'monthly' | 'annual'
  status: 'trialing' | 'active'
  renewalDate: string
  seats: number
  features: string[]
}

export interface IntegrationStatus {
  id: string
  label: string
  status: 'connected' | 'available' | 'coming-soon'
  description: string
}

export interface WorkspaceSettings {
  profile: UserProfile
  preferences: WorkspacePreferences
  security: SecuritySettings
  subscription: SubscriptionSettings
  integrations: IntegrationStatus[]
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
