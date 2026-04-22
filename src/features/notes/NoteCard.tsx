import { Pin } from 'lucide-react'
import type { Note } from '../../types'
import { Badge } from '../../components/ui/Badge'
import { Card } from '../../components/ui/Card'
import { jobs } from '../../mock'
import { formatDate } from '../../utils/format'

interface NoteCardProps {
  note: Note
}

export function NoteCard({ note }: NoteCardProps) {
  const job = jobs.find((item) => item.id === note.jobId)

  return (
    <Card className="p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-slate-950">{note.title}</h3>
            {note.pinned ? <Pin className="size-4 fill-amber-300 text-amber-500" aria-hidden="true" /> : null}
          </div>
          <p className="mt-1 text-sm text-slate-500">{job ? `${job.company} / ${job.roleTitle}` : 'General'}</p>
        </div>
        <span className="text-xs text-slate-500">{formatDate(note.createdAt)}</span>
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-700">{note.body}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {note.tags.map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </div>
    </Card>
  )
}
