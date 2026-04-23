import {
  DndContext,
  DragOverlay,
  PointerSensor,
  pointerWithin,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core'
import { GripVertical, MapPin } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Badge } from '../../components/ui/Badge'
import type { Job, JobStatus } from '../../types'
import { cn } from '../../utils/classNames'
import { formatShortDate, statusLabels } from '../../utils/format'

interface JobBoardProps {
  jobs: Job[]
  onStatusChange: (jobId: string, status: JobStatus) => void
}

const statuses: JobStatus[] = ['saved', 'applied', 'interviewing', 'offer', 'rejected']

function BoardColumn({ jobs, status }: { jobs: Job[]; status: JobStatus }) {
  const { isOver, setNodeRef } = useDroppable({ id: status })

  return (
    <section
      className={cn(
        'min-h-80 rounded-lg border border-slate-200 bg-white p-3 shadow-sm transition-colors',
        isOver && 'border-slate-400 bg-slate-50',
      )}
      ref={setNodeRef}
    >
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-950">{statusLabels[status]}</h2>
        <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">{jobs.length}</span>
      </div>
      <div className="space-y-3">
        {jobs.length > 0 ? (
          jobs.map((job) => <BoardCard job={job} key={job.id} />)
        ) : (
          <div className="rounded-md border border-dashed border-slate-200 bg-slate-50/70 px-3 py-8 text-center text-sm leading-6 text-slate-500">
            No {statusLabels[status].toLowerCase()} jobs.
          </div>
        )}
      </div>
    </section>
  )
}

function BoardCard({ job }: { job: Job }) {
  const { attributes, isDragging, listeners, setNodeRef } = useDraggable({
    id: job.id,
  })

  return (
    <article
      className={cn('rounded-md border border-slate-200 bg-white p-3 shadow-sm', isDragging && 'opacity-40')}
      ref={setNodeRef}
    >
      <BoardCardContent attributes={attributes} job={job} listeners={listeners} />
    </article>
  )
}

function BoardCardPreview({ job }: { job: Job }) {
  return (
    <article className="w-64 rotate-1 rounded-md border border-slate-200 bg-white p-3 shadow-xl">
      <BoardCardContent job={job} />
    </article>
  )
}

function BoardCardContent({
  attributes,
  job,
  listeners,
}: {
  attributes?: ReturnType<typeof useDraggable>['attributes']
  job: Job
  listeners?: ReturnType<typeof useDraggable>['listeners']
}) {
  return (
    <div className="flex items-start gap-2">
      <button
        aria-label={`Move ${job.roleTitle}`}
        className="mt-0.5 cursor-grab rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 active:cursor-grabbing"
        type="button"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="size-4" aria-hidden="true" />
      </button>
      <div className="min-w-0 flex-1">
        <Link className="font-medium text-slate-950 hover:text-blue-700" to={`/jobs/${job.id}`}>
          {job.roleTitle}
        </Link>
        <p className="mt-1 text-sm text-slate-500">{job.company}</p>
        <p className="mt-2 inline-flex items-center gap-1 text-xs text-slate-500">
          <MapPin className="size-3.5" aria-hidden="true" />
          {job.location}
        </p>
        <div className="mt-3 flex items-center justify-between gap-2">
          <Badge tone={job.priority === 'High' ? 'red' : job.priority === 'Medium' ? 'amber' : 'neutral'}>
            {job.priority}
          </Badge>
          <span className="text-xs text-slate-500">{formatShortDate(job.appliedDate)}</span>
        </div>
      </div>
    </div>
  )
}

export function JobBoard({ jobs, onStatusChange }: JobBoardProps) {
  const [activeJobId, setActiveJobId] = useState<string | null>(null)
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 6,
      },
    }),
  )
  const activeJob = useMemo(() => jobs.find((job) => job.id === activeJobId), [activeJobId, jobs])

  function handleDragStart(event: DragStartEvent) {
    setActiveJobId(String(event.active.id))
  }

  function handleDragEnd(event: DragEndEvent) {
    const jobId = String(event.active.id)
    const nextStatus = event.over?.id as JobStatus | undefined
    setActiveJobId(null)

    if (!nextStatus || !statuses.includes(nextStatus)) {
      return
    }

    const job = jobs.find((item) => item.id === jobId)

    if (job && job.status !== nextStatus) {
      onStatusChange(job.id, nextStatus)
    }
  }

  return (
    <DndContext
      collisionDetection={pointerWithin}
      onDragCancel={() => setActiveJobId(null)}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      sensors={sensors}
    >
      <div className="grid gap-4 xl:grid-cols-5">
        {statuses.map((status) => (
          <BoardColumn jobs={jobs.filter((job) => job.status === status)} key={status} status={status} />
        ))}
      </div>
      <DragOverlay dropAnimation={null}>{activeJob ? <BoardCardPreview job={activeJob} /> : null}</DragOverlay>
    </DndContext>
  )
}
