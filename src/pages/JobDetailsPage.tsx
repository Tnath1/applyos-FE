import { ArrowLeft, ArrowUpRight, CalendarDays, MapPin, Star } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { Badge } from '../components/ui/Badge'
import { Card } from '../components/ui/Card'
import { PageHeader } from '../components/ui/PageHeader'
import { JobStatusBadge } from '../components/ui/StatusBadge'
import { JobDetailSidePanel } from '../features/jobs/JobDetailSidePanel'
import { useWorkspace } from '../features/workspace/WorkspaceProvider'
import { notes, reminders } from '../mock'
import { formatDate } from '../utils/format'

export function JobDetailsPage() {
  const { id } = useParams()
  const { attachResumeToJob, jobs, resumes } = useWorkspace()
  const job = jobs.find((item) => item.id === id)

  if (!job) {
    return (
      <>
        <PageHeader eyebrow="Job Details" title="Job not found" />
        <div className="p-4 sm:p-6">
          <Link className="text-sm font-medium text-blue-700 hover:text-blue-900" to="/jobs">
            Back to jobs
          </Link>
        </div>
      </>
    )
  }

  const attachedResume = resumes.find((resume) => resume.id === job.resumeId)
  const jobNotes = notes.filter((note) => job.noteIds.includes(note.id))
  const jobReminders = reminders.filter((reminder) => job.reminderIds.includes(reminder.id))

  return (
    <>
      <PageHeader
        actions={
          <a
            className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
            href={job.sourceUrl}
            rel="noreferrer"
            target="_blank"
          >
            Source
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
        }
        eyebrow="Job Details"
        title={job.roleTitle}
      />
      <div className="grid gap-6 p-4 sm:p-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <Card className="overflow-hidden">
          <div className="border-b border-slate-200 p-5">
            <Link
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-950"
              to="/jobs"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              Back to jobs
            </Link>

            <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <JobStatusBadge status={job.status} />
                  <Badge tone={job.priority === 'High' ? 'red' : job.priority === 'Medium' ? 'amber' : 'neutral'}>
                    {job.priority} priority
                  </Badge>
                </div>
                <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950">{job.company}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">{job.lastActivity}</p>
              </div>
              <div className="grid gap-3 text-sm text-slate-600 sm:grid-cols-3 lg:text-right">
                <div>
                  <p className="font-medium text-slate-950">Applied</p>
                  <p className="mt-1">{formatDate(job.appliedDate)}</p>
                </div>
                <div>
                  <p className="font-medium text-slate-950">Compensation</p>
                  <p className="mt-1">{job.salaryRange}</p>
                </div>
                <div>
                  <p className="font-medium text-slate-950">Rating</p>
                  <p className="mt-1 inline-flex items-center gap-1 lg:justify-end">
                    <Star className="size-4 fill-amber-300 text-amber-300" aria-hidden="true" />
                    {job.rating}/5
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-3 border-t border-slate-200 pt-5 sm:grid-cols-2">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <MapPin className="size-4 text-slate-400" aria-hidden="true" />
                {job.location}
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <CalendarDays className="size-4 text-slate-400" aria-hidden="true" />
                {job.source}
              </div>
            </div>
          </div>

          <section className="border-b border-slate-200 p-5">
            <h2 className="text-base font-semibold text-slate-950">Relevant keywords</h2>
            <p className="mt-1 text-sm text-slate-500">Terms to keep aligned across resume, notes, and interview prep.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {job.keywords.map((keyword) => (
                <Badge key={keyword} tone="neutral">
                  {keyword}
                </Badge>
              ))}
            </div>
          </section>

          <section className="border-b border-slate-200 p-5">
            <h2 className="text-base font-semibold text-slate-950">About the job</h2>
            <p className="mt-4 text-sm leading-7 text-slate-700">{job.description}</p>
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-slate-950">Responsibilities</h3>
              <ul className="mt-3 space-y-3 text-sm leading-6 text-slate-700">
                {job.responsibilities.map((responsibility) => (
                  <li className="flex gap-3" key={responsibility}>
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-slate-400" />
                    <span>{responsibility}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="p-5">
            <h2 className="text-base font-semibold text-slate-950">Pipeline timeline</h2>
            <div className="mt-5 space-y-4">
              {job.stageHistory.map((event) => (
                <div className="flex gap-3" key={`${event.status}-${event.date}`}>
                  <span className="mt-1.5 size-2.5 shrink-0 rounded-full bg-slate-900" />
                  <div>
                    <p className="text-sm font-medium text-slate-950">{event.label}</p>
                    <p className="mt-1 text-sm text-slate-500">{formatDate(event.date)}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </Card>

        <JobDetailSidePanel
          job={job}
          notes={jobNotes}
          onResumeChange={(resumeId) => attachResumeToJob(job.id, resumeId)}
          reminders={jobReminders}
          resume={attachedResume}
          resumes={resumes}
        />
      </div>
    </>
  )
}
