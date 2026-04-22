import { FileText, MoreHorizontal } from 'lucide-react'
import type { Resume } from '../../types'
import { Badge } from '../../components/ui/Badge'
import { Card } from '../../components/ui/Card'
import { IconButton } from '../../components/ui/IconButton'
import { formatDate } from '../../utils/format'

interface ResumeCardProps {
  resume: Resume
}

export function ResumeCard({ resume }: ResumeCardProps) {
  return (
    <Card className="p-4">
      <div className="flex items-start gap-3">
        <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-md bg-slate-100 text-slate-600">
          <FileText className="size-5" aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-semibold text-slate-950">{resume.name}</h3>
              <p className="mt-1 text-sm leading-5 text-slate-500">{resume.roleFocus}</p>
            </div>
            <IconButton icon={MoreHorizontal} label="Resume actions" />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge>{resume.fileType}</Badge>
            <Badge tone="blue">{resume.version}</Badge>
            <Badge tone="green">{resume.matchScore}% match</Badge>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {resume.keywords.map((keyword) => (
              <span className="rounded bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600" key={keyword}>
                {keyword}
              </span>
            ))}
          </div>
          <p className="mt-4 text-xs text-slate-500">Updated {formatDate(resume.updatedAt)}</p>
        </div>
      </div>
    </Card>
  )
}
