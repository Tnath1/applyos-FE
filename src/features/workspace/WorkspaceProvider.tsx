import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { activityTimeline as initialActivity, jobs as initialJobs } from '../../mock'
import type { ActivityTimelineItem, DashboardStat, Job, JobStatus } from '../../types'
import { statusLabels } from '../../utils/format'

interface NewJobInput {
  roleTitle: string
  company: string
  location: string
  workplace: Job['workplace']
  source: string
  sourceUrl: string
  salaryRange: string
  keywords: string[]
  description: string
}

interface WorkspaceContextValue {
  jobs: Job[]
  activityTimeline: ActivityTimelineItem[]
  dashboardStats: DashboardStat[]
  addJob: (input: NewJobInput) => Job
  updateJobStatus: (jobId: string, status: JobStatus) => void
}

const WorkspaceContext = createContext<WorkspaceContextValue | null>(null)

const jobsStorageKey = 'applyos.jobs.v1'
const activityStorageKey = 'applyos.activity.v1'

function today() {
  return new Date().toISOString().slice(0, 10)
}

function createId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`
}

function readStoredValue<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') {
    return fallback
  }

  try {
    const storedValue = window.localStorage.getItem(key)
    return storedValue ? (JSON.parse(storedValue) as T) : fallback
  } catch {
    return fallback
  }
}

function createStatusActivity(job: Job, fromStatus: JobStatus, toStatus: JobStatus, createdAt: string): ActivityTimelineItem {
  return {
    id: createId('activity'),
    type: 'status',
    title: `${job.company} moved to ${statusLabels[toStatus]}`,
    description: `${job.roleTitle} changed from ${statusLabels[fromStatus]} to ${statusLabels[toStatus]}.`,
    createdAt,
    jobId: job.id,
  }
}

function createDashboardStats(jobs: Job[]): DashboardStat[] {
  return [
    {
      id: 'total-jobs',
      label: 'Total jobs',
      value: jobs.length,
      helper: 'Across all tracked roles',
      tone: 'neutral',
    },
    {
      id: 'saved',
      label: 'Saved',
      value: jobs.filter((job) => job.status === 'saved').length,
      helper: 'Ready to review or apply',
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
  ]
}

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
  const [jobs, setJobs] = useState<Job[]>(() => readStoredValue(jobsStorageKey, initialJobs))
  const [activityTimeline, setActivityTimeline] = useState<ActivityTimelineItem[]>(() =>
    readStoredValue(activityStorageKey, initialActivity),
  )

  useEffect(() => {
    window.localStorage.setItem(jobsStorageKey, JSON.stringify(jobs))
  }, [jobs])

  useEffect(() => {
    window.localStorage.setItem(activityStorageKey, JSON.stringify(activityTimeline))
  }, [activityTimeline])

  const dashboardStats = useMemo(() => createDashboardStats(jobs), [jobs])

  function addJob(input: NewJobInput) {
    const createdAt = today()
    const newJob: Job = {
      id: createId('job'),
      roleTitle: input.roleTitle,
      company: input.company,
      location: input.location,
      workplace: input.workplace,
      status: 'saved',
      appliedDate: null,
      source: input.source || 'Manual entry',
      sourceUrl: input.sourceUrl || '#',
      salaryRange: input.salaryRange || 'Not listed',
      priority: 'Medium',
      rating: 3,
      keywords: input.keywords,
      description:
        input.description ||
        'This saved role is ready for review. Add the full job description when you are ready to tailor a resume or apply.',
      responsibilities: ['Review the posting', 'Attach the best resume variant', 'Move to Applied when submitted'],
      resumeId: '',
      noteIds: [],
      reminderIds: [],
      lastActivity: 'Saved to pipeline',
      contact: {
        name: 'Not assigned',
        role: 'Recruiting contact',
        email: 'Add contact email',
      },
      stageHistory: [{ status: 'saved', label: 'Saved role', date: createdAt }],
    }

    setJobs((currentJobs) => [newJob, ...currentJobs])
    setActivityTimeline((currentActivity) => [
      {
        id: createId('activity'),
        type: 'application',
        title: `${newJob.company} saved`,
        description: `${newJob.roleTitle} was added to Saved jobs.`,
        createdAt,
        jobId: newJob.id,
      },
      ...currentActivity,
    ])

    return newJob
  }

  function updateJobStatus(jobId: string, status: JobStatus) {
    const jobToUpdate = jobs.find((job) => job.id === jobId)

    if (!jobToUpdate || jobToUpdate.status === status) {
      return
    }

    const changedAt = today()
    const nextActivity = createStatusActivity(jobToUpdate, jobToUpdate.status, status, changedAt)

    setJobs(
      jobs.map((job) =>
        job.id === jobId
          ? {
              ...job,
              status,
              appliedDate: status === 'applied' && !job.appliedDate ? changedAt : job.appliedDate,
              lastActivity: `Moved to ${statusLabels[status]} on ${changedAt}`,
              stageHistory: [
                ...job.stageHistory,
                {
                  status,
                  label: `Moved to ${statusLabels[status]}`,
                  date: changedAt,
                },
              ],
            }
          : job,
      ),
    )
    setActivityTimeline([nextActivity, ...activityTimeline])
  }

  const value = useMemo(
    () => ({ jobs, activityTimeline, dashboardStats, addJob, updateJobStatus }),
    [activityTimeline, dashboardStats, jobs],
  )

  return <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext)

  if (!context) {
    throw new Error('useWorkspace must be used within WorkspaceProvider')
  }

  return context
}
