import type { JobStatus } from '../../types'
import { statusLabels } from '../../utils/format'

interface JobStatusSelectProps {
  value: JobStatus
  onChange: (status: JobStatus) => void
  label?: string
}

const statuses: JobStatus[] = ['saved', 'applied', 'interviewing', 'offer', 'rejected']

export function JobStatusSelect({ value, onChange, label = 'Status' }: JobStatusSelectProps) {
  return (
    <label className="block">
      <span className="sr-only">{label}</span>
      <select
        className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 outline-none transition hover:bg-slate-50 focus:border-slate-400 focus:ring-4 focus:ring-slate-200/60"
        onChange={(event) => onChange(event.target.value as JobStatus)}
        value={value}
      >
        {statuses.map((status) => (
          <option key={status} value={status}>
            {statusLabels[status]}
          </option>
        ))}
      </select>
    </label>
  )
}
