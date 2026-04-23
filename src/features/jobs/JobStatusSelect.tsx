import { SelectMenu } from '../../components/ui/SelectMenu'
import type { JobStatus } from '../../types'
import { statusLabels } from '../../utils/format'

interface JobStatusSelectProps {
  value: JobStatus
  onChange: (status: JobStatus) => void
  label?: string
}

const statuses: JobStatus[] = ['saved', 'applied', 'interviewing', 'offer', 'rejected']
const statusOptions = statuses.map((status) => ({ label: statusLabels[status], value: status }))

export function JobStatusSelect({ value, onChange, label = 'Status' }: JobStatusSelectProps) {
  return <SelectMenu className="min-w-32" label={label} onChange={onChange} options={statusOptions} value={value} />
}
