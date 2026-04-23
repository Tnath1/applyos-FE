import { BriefcaseBusiness } from 'lucide-react'
import type { JobStatus } from '../../types'
import { statusLabels } from '../../utils/format'

interface JobEmptyStateProps {
  status?: JobStatus | 'all'
  query?: string
}

export function JobEmptyState({ query = '', status = 'all' }: JobEmptyStateProps) {
  const hasQuery = query.trim().length > 0
  const statusLabel = status === 'all' ? 'jobs' : `${statusLabels[status].toLowerCase()} jobs`
  const title = hasQuery ? 'No matching jobs found' : `No ${statusLabel} yet`
  const description = hasQuery
    ? 'Try another search term or clear the current filter.'
    : status === 'all'
      ? 'Add a job to start building your pipeline.'
      : `Jobs moved to ${statusLabels[status]} will appear here.`

  return (
    <div className="flex min-h-64 items-center justify-center rounded-lg border border-dashed border-slate-200 bg-white p-8 text-center">
      <div>
        <span className="mx-auto inline-flex size-11 items-center justify-center rounded-md bg-slate-100 text-slate-500">
          <BriefcaseBusiness className="size-5" aria-hidden="true" />
        </span>
        <h2 className="mt-4 text-sm font-semibold text-slate-950">{title}</h2>
        <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">{description}</p>
      </div>
    </div>
  )
}
