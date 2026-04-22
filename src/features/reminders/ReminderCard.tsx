import { CalendarCheck, Mail, MousePointer2 } from 'lucide-react'
import type { Reminder } from '../../types'
import { Card } from '../../components/ui/Card'
import { ReminderStatusBadge } from '../../components/ui/StatusBadge'
import { jobs } from '../../mock'
import { formatDate } from '../../utils/format'

interface ReminderCardProps {
  reminder: Reminder
}

const channelIcon = {
  calendar: CalendarCheck,
  email: Mail,
  manual: MousePointer2,
}

export function ReminderCard({ reminder }: ReminderCardProps) {
  const Icon = channelIcon[reminder.channel]
  const job = jobs.find((item) => item.id === reminder.jobId)

  return (
    <Card className="p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex gap-3">
          <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-md bg-slate-100 text-slate-600">
            <Icon className="size-4" aria-hidden="true" />
          </span>
          <div>
            <h3 className="font-medium text-slate-950">{reminder.title}</h3>
            <p className="mt-1 text-sm text-slate-500">
              {job ? `${job.company} / ${job.roleTitle}` : 'General reminder'}
            </p>
          </div>
        </div>
        <ReminderStatusBadge status={reminder.status} />
      </div>
      <p className="mt-4 text-sm font-medium text-slate-700">Due {formatDate(reminder.dueDate)}</p>
    </Card>
  )
}
