import { Bookmark, BriefcaseBusiness, CheckCircle2, CircleDashed, Clock, Trophy } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Card } from '../components/ui/Card'
import { PageHeader } from '../components/ui/PageHeader'
import { JobStatusBadge } from '../components/ui/StatusBadge'
import { StatCard } from '../features/dashboard/StatCard'
import { useWorkspace } from '../features/workspace/WorkspaceProvider'
import type { DashboardStat } from '../types'
import { formatDate, formatShortDate } from '../utils/format'

const statIcons: Record<DashboardStat['id'], typeof BriefcaseBusiness> = {
  'total-jobs': BriefcaseBusiness,
  saved: Bookmark,
  applied: CircleDashed,
  interviewing: Clock,
  offers: Trophy,
  rejected: CheckCircle2,
}

export function DashboardPage() {
  const { activityTimeline, dashboardStats, jobs } = useWorkspace()
  const activeJobs = jobs.filter((job) => job.status !== 'rejected')
  const savedJobs = jobs.filter((job) => job.status === 'saved').slice(0, 4)

  return (
    <>
      <PageHeader
        eyebrow="Dashboard"
        title="Today's search overview"
      />
      <div className="space-y-6 p-4 sm:p-6">
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {dashboardStats.map((stat) => (
            <StatCard icon={statIcons[stat.id]} key={stat.id} stat={stat} />
          ))}
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
          <Card className="p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-base font-semibold text-slate-950">Active pipeline</h2>
                <p className="mt-1 text-sm text-slate-500">Roles still worth moving forward.</p>
              </div>
              <Link className="text-sm font-medium text-blue-700 hover:text-blue-900" to="/jobs">
                View jobs
              </Link>
            </div>
            <div className="mt-5 divide-y divide-slate-100">
              {activeJobs.map((job) => (
                <Link
                  className="flex flex-col gap-3 py-4 transition hover:bg-slate-50 sm:flex-row sm:items-center sm:justify-between"
                  key={job.id}
                  to={`/jobs/${job.id}`}
                >
                  <div>
                    <p className="font-medium text-slate-950">{job.roleTitle}</p>
                    <p className="mt-1 text-sm text-slate-500">
                      {job.company} / {job.location}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <JobStatusBadge status={job.status} />
                    <span className="text-sm text-slate-500">{formatShortDate(job.appliedDate)}</span>
                  </div>
                </Link>
              ))}
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-base font-semibold text-slate-950">Saved jobs</h2>
                <p className="mt-1 text-sm text-slate-500">Roles waiting for review or application.</p>
              </div>
              <Link className="text-sm font-medium text-blue-700 hover:text-blue-900" to="/jobs">
                View all
              </Link>
            </div>
            <div className="mt-5 space-y-3">
              {savedJobs.length > 0 ? (
                savedJobs.map((job) => (
                  <Link
                    className="block rounded-md border border-slate-200 p-3 transition hover:bg-slate-50"
                    key={job.id}
                    to={`/jobs/${job.id}`}
                  >
                    <p className="text-sm font-medium text-slate-950">{job.roleTitle}</p>
                    <p className="mt-1 text-sm text-slate-500">{job.company}</p>
                    <p className="mt-3 text-sm font-medium text-slate-700">{job.location}</p>
                  </Link>
                ))
              ) : (
                <p className="rounded-md border border-dashed border-slate-200 p-4 text-sm text-slate-500">
                  No saved jobs yet. Add a role from the Job Tracker.
                </p>
              )}
            </div>
          </Card>
        </section>

        <Card className="p-5">
          <h2 className="text-base font-semibold text-slate-950">Recent activity</h2>
          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            {activityTimeline.map((activity) => (
              <div className="rounded-md border border-slate-200 p-4" key={activity.id}>
                <p className="text-sm font-medium text-slate-950">{activity.title}</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">{activity.description}</p>
                <p className="mt-3 text-xs font-medium uppercase tracking-[0.16em] text-slate-400">
                  {formatDate(activity.createdAt)}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  )
}
