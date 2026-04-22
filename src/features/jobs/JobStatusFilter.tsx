import type { JobStatus } from '../../types'
import { cn } from '../../utils/classNames'
import { statusLabels } from '../../utils/format'

interface JobStatusFilterProps {
  value: JobStatus | 'all'
  onChange: (value: JobStatus | 'all') => void
}

const statuses: Array<JobStatus | 'all'> = ['all', 'saved', 'applied', 'interviewing', 'offer', 'rejected']

export function JobStatusFilter({ value, onChange }: JobStatusFilterProps) {
  return (
    <div className="flex gap-1 overflow-x-auto rounded-md border border-slate-200 bg-white p-1">
      {statuses.map((status) => (
        <button
          className={cn(
            'shrink-0 rounded px-3 py-1.5 text-sm font-medium transition',
            value === status ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950',
          )}
          key={status}
          onClick={() => onChange(status)}
          type="button"
        >
          {status === 'all' ? 'All' : statusLabels[status]}
        </button>
      ))}
    </div>
  )
}
