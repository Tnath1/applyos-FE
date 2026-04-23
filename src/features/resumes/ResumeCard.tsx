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
  const resumeUrl = getResumeUrl(resume)

  return (
    <Card className="p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <a
            className="font-semibold text-slate-950 hover:text-blue-700"
            href={resumeUrl}
            rel="noreferrer"
            target="_blank"
          >
            {resume.name}
          </a>
        </div>
        <a
          className="shrink-0 rounded-md border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-50"
          href={resumeUrl}
          rel="noreferrer"
          target="_blank"
        >
          View resume
        </a>
      </div>
      <p className="mt-2 text-sm leading-5 text-slate-500">{resume.roleFocus}</p>

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

function getResumeUrl(resume: Resume) {
  if (resume.fileDataUrl) {
    return resume.fileDataUrl
  }

  const previewMarkup = `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>${escapeHtml(resume.name)}</title>
        <style>
          body {
            margin: 0;
            background: #f8fafc;
            color: #0f172a;
            font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          }
          main {
            max-width: 760px;
            margin: 48px auto;
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 10px;
            padding: 40px;
            box-shadow: 0 1px 2px rgba(15, 23, 42, 0.06);
          }
          h1 {
            margin: 0;
            font-size: 28px;
            line-height: 1.2;
          }
          p {
            color: #475569;
            line-height: 1.7;
          }
          ul {
            margin-top: 24px;
            padding-left: 20px;
            color: #334155;
            line-height: 1.8;
          }
        </style>
      </head>
      <body>
        <main>
          <h1>${escapeHtml(resume.name)}</h1>
          <p>${escapeHtml(resume.roleFocus)}</p>
          <ul>
            ${resume.keywords.map((keyword) => `<li>${escapeHtml(keyword)}</li>`).join('')}
          </ul>
        </main>
      </body>
    </html>
  `

  return `data:text/html;charset=utf-8,${encodeURIComponent(previewMarkup)}`
}

function escapeHtml(value: string) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;')
}
