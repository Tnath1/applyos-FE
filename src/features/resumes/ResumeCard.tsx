import { Link } from 'react-router-dom'
import type { Job, Resume } from '../../types'
import { Card } from '../../components/ui/Card'
import { JobStatusBadge } from '../../components/ui/StatusBadge'

interface ResumeCardProps {
  resume: Resume
  jobs: Job[]
}

export function ResumeCard({ jobs, resume }: ResumeCardProps) {
  const attachedJobs = jobs.filter((job) => job.resumeId === resume.id)

  return (
    <Card className="p-4">
      <h3 className="font-semibold text-slate-950">{resume.name}</h3>
      <p className="mt-1 text-sm leading-5 text-slate-500">{resume.roleFocus}</p>

      <div className="mt-5">
        <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Used on jobs</h4>
        {attachedJobs.length > 0 ? (
          <div className="mt-3 space-y-2">
            {attachedJobs.slice(0, 3).map((job) => (
              <Link
                className="block rounded-md border border-slate-200 p-3 transition hover:bg-slate-50"
                key={job.id}
                to={`/jobs/${job.id}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-slate-950">{job.company}</p>
                    <p className="mt-1 text-xs text-slate-500">{job.roleTitle}</p>
                  </div>
                  <JobStatusBadge status={job.status} />
                </div>
              </Link>
            ))}
            {attachedJobs.length > 3 ? (
              <p className="text-xs text-slate-500">+{attachedJobs.length - 3} more jobs using this resume</p>
            ) : null}
          </div>
        ) : (
          <p className="mt-3 rounded-md border border-dashed border-slate-200 bg-slate-50 p-3 text-sm leading-6 text-slate-500">
            No jobs attached yet. Attach this resume from a job detail page to start tracking outcomes.
          </p>
        )}
      </div>
    </Card>
  )
}
