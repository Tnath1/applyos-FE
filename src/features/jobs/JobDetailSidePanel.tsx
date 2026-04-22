import { CalendarDays, FileText, Mail, NotebookText } from 'lucide-react'
import type { Job, Note, Reminder, Resume } from '../../types'
import { Badge } from '../../components/ui/Badge'
import { Card } from '../../components/ui/Card'
import { ReminderStatusBadge } from '../../components/ui/StatusBadge'
import { formatDate } from '../../utils/format'

interface JobDetailSidePanelProps {
  job: Job
  resume?: Resume
  notes: Note[]
  reminders: Reminder[]
}

export function JobDetailSidePanel({ job, resume, notes, reminders }: JobDetailSidePanelProps) {
  return (
    <aside className="space-y-4">
      <Card className="p-4">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-sm font-semibold text-slate-950">Attached resume</h2>
          <FileText className="size-4 text-slate-400" aria-hidden="true" />
        </div>
        {resume ? (
          <div className="mt-4 rounded-md border border-slate-200 bg-slate-50 p-3">
            <p className="font-medium text-slate-950">{resume.name}</p>
            <p className="mt-1 text-sm text-slate-500">{resume.roleFocus}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge tone="blue">{resume.version}</Badge>
              <Badge tone="green">{resume.matchScore}% match</Badge>
            </div>
          </div>
        ) : (
          <p className="mt-3 text-sm text-slate-500">No resume attached.</p>
        )}
      </Card>

      <Card className="p-4">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-sm font-semibold text-slate-950">Contact</h2>
          <Mail className="size-4 text-slate-400" aria-hidden="true" />
        </div>
        <div className="mt-4">
          <p className="font-medium text-slate-950">{job.contact.name}</p>
          <p className="mt-1 text-sm text-slate-500">{job.contact.role}</p>
          <p className="mt-2 text-sm text-slate-700">{job.contact.email}</p>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-sm font-semibold text-slate-950">Notes</h2>
          <NotebookText className="size-4 text-slate-400" aria-hidden="true" />
        </div>
        <div className="mt-4 space-y-3">
          {notes.length > 0 ? (
            notes.map((note) => (
              <div className="rounded-md border border-slate-200 p-3" key={note.id}>
                <p className="text-sm font-medium text-slate-950">{note.title}</p>
                <p className="mt-1 text-sm leading-5 text-slate-600">{note.body}</p>
              </div>
            ))
          ) : (
            <p className="text-sm text-slate-500">No notes yet.</p>
          )}
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-sm font-semibold text-slate-950">Reminders</h2>
          <CalendarDays className="size-4 text-slate-400" aria-hidden="true" />
        </div>
        <div className="mt-4 space-y-3">
          {reminders.length > 0 ? (
            reminders.map((reminder) => (
              <div className="rounded-md border border-slate-200 p-3" key={reminder.id}>
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm font-medium text-slate-950">{reminder.title}</p>
                  <ReminderStatusBadge status={reminder.status} />
                </div>
                <p className="mt-2 text-sm text-slate-500">{formatDate(reminder.dueDate)}</p>
              </div>
            ))
          ) : (
            <p className="text-sm text-slate-500">No reminders scheduled.</p>
          )}
        </div>
      </Card>
    </aside>
  )
}
