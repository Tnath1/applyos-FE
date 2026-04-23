import { FileText, NotebookText } from 'lucide-react'
import { SelectMenu } from '../../components/ui/SelectMenu'
import type { Job, Note, Resume } from '../../types'
import { Badge } from '../../components/ui/Badge'
import { Card } from '../../components/ui/Card'

interface JobDetailSidePanelProps {
  job: Job
  resume?: Resume
  resumes?: Resume[]
  notes: Note[]
  onAddNote?: () => void
  onEditNote?: (note: Note) => void
  onResumeChange?: (resumeId: string) => void
}

export function JobDetailSidePanel({ job, resume, resumes = [], notes, onAddNote, onEditNote, onResumeChange }: JobDetailSidePanelProps) {
  const resumeOptions = [
    { label: 'No resume selected', value: '' },
    ...resumes.map((item) => ({
      label: item.name,
      value: item.id,
    })),
  ]

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
              <Badge tone="green">{resume.matchScore}% match</Badge>
            </div>
          </div>
        ) : (
          <p className="mt-3 text-sm text-slate-500">No resume attached.</p>
        )}
        {onResumeChange ? (
          <label className="mt-4 block">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
              {resume ? 'Replace resume' : 'Attach resume'}
            </span>
            <SelectMenu
              className="mt-2"
              disabled={resumes.length === 0}
              label={resume ? 'Replace resume' : 'Attach resume'}
              onChange={onResumeChange}
              options={resumeOptions}
              value={job.resumeId}
            />
          </label>
        ) : null}
      </Card>

      <Card className="p-4">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-sm font-semibold text-slate-950">Notes</h2>
          <div className="flex items-center gap-2">
            {onAddNote ? (
              <button
                className="rounded-md border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-950"
                onClick={notes.length > 0 && onEditNote ? () => onEditNote(notes[0]) : onAddNote}
                type="button"
              >
                {notes.length > 0 ? 'Edit note' : 'Add note'}
              </button>
            ) : null}
            <NotebookText className="size-4 text-slate-400" aria-hidden="true" />
          </div>
        </div>
        <div className="mt-4 space-y-3">
          {notes.length > 0 ? (
            notes.map((note) => (
              <button
                className="w-full rounded-md border border-slate-200 p-3 text-left transition hover:border-slate-300"
                key={note.id}
                onClick={onEditNote ? () => onEditNote(note) : undefined}
                type="button"
              >
                <p className="text-sm font-medium text-slate-950">{note.title}</p>
                <p className="mt-1 text-sm leading-5 text-slate-600">{note.body}</p>
              </button>
            ))
          ) : (
            <p className="text-sm text-slate-500">No notes yet.</p>
          )}
        </div>
      </Card>
    </aside>
  )
}
