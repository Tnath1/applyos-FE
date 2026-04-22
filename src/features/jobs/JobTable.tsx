import { ArrowUpRight, CalendarDays, MapPin, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Job } from '../../types'
import { formatDate } from '../../utils/format'
import { Badge } from '../../components/ui/Badge'
import { JobStatusBadge } from '../../components/ui/StatusBadge'

interface JobTableProps {
  jobs: Job[]
}

export function JobTable({ jobs }: JobTableProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="hidden overflow-x-auto md:block">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Role</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Status</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                Applied
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                Priority
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                Open
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {jobs.map((job) => (
              <tr className="transition hover:bg-slate-50" key={job.id}>
                <td className="px-4 py-4">
                  <div className="font-medium text-slate-950">{job.roleTitle}</div>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-slate-500">
                    <span>{job.company}</span>
                    <span className="text-slate-300">/</span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="size-3.5" aria-hidden="true" />
                      {job.location}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <JobStatusBadge status={job.status} />
                </td>
                <td className="px-4 py-4 text-sm text-slate-600">{formatDate(job.appliedDate)}</td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <Badge tone={job.priority === 'High' ? 'red' : job.priority === 'Medium' ? 'amber' : 'neutral'}>
                      {job.priority}
                    </Badge>
                    <span className="inline-flex items-center gap-1 text-sm text-slate-500">
                      <Star className="size-3.5 fill-amber-300 text-amber-300" aria-hidden="true" />
                      {job.rating}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-4 text-right">
                  <Link
                    className="inline-flex items-center gap-1 text-sm font-medium text-slate-900 hover:text-blue-700"
                    to={`/jobs/${job.id}`}
                  >
                    Details
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="divide-y divide-slate-100 md:hidden">
        {jobs.map((job) => (
          <Link className="block p-4 transition hover:bg-slate-50" key={job.id} to={`/jobs/${job.id}`}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-medium text-slate-950">{job.roleTitle}</h3>
                <p className="mt-1 text-sm text-slate-500">{job.company}</p>
              </div>
              <JobStatusBadge status={job.status} />
            </div>
            <div className="mt-3 flex flex-wrap gap-3 text-sm text-slate-500">
              <span className="inline-flex items-center gap-1">
                <MapPin className="size-4" aria-hidden="true" />
                {job.workplace}
              </span>
              <span className="inline-flex items-center gap-1">
                <CalendarDays className="size-4" aria-hidden="true" />
                {formatDate(job.appliedDate)}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
