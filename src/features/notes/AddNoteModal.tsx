import { X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { SelectMenu } from '../../components/ui/SelectMenu'
import type { Job, Note } from '../../types'

interface AddNoteModalProps {
  isOpen: boolean
  jobs: Job[]
  onClose: () => void
  onSubmit: (input: {
    title: string
    body: string
    tags: string[]
    jobId?: string
  }) => void
  initialJobId?: string
  initialNote?: Note
  onUpdate?: (
    noteId: string,
    input: {
      title: string
      body: string
      tags: string[]
      jobId?: string
    },
  ) => void
}

export function AddNoteModal({ initialJobId = '', initialNote, isOpen, jobs, onClose, onSubmit, onUpdate }: AddNoteModalProps) {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [tags, setTags] = useState('')
  const [jobId, setJobId] = useState(initialJobId)

  const jobOptions = useMemo(
    () => [
      { label: 'General note', value: '' },
      ...jobs.map((job) => ({
        label: `${job.company} / ${job.roleTitle}`,
        value: job.id,
      })),
    ],
    [jobs],
  )

  useEffect(() => {
    if (!isOpen) {
      return
    }

    setTitle(initialNote?.title ?? '')
    setBody(initialNote?.body ?? '')
    setTags(initialNote?.tags.join(', ') ?? '')
    setJobId(initialNote?.jobId ?? initialJobId)
  }, [initialJobId, initialNote, isOpen])

  if (!isOpen) {
    return null
  }

  function handleClose() {
    setTitle('')
    setBody('')
    setTags('')
    setJobId(initialJobId)
    onClose()
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const nextInput = {
      title,
      body,
      jobId: jobId || undefined,
      tags: tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
    }

    if (initialNote && onUpdate) {
      onUpdate(initialNote.id, nextInput)
    } else {
      onSubmit(nextInput)
    }

    handleClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4">
      <div className="flex max-h-[90vh] w-full max-w-xl flex-col overflow-hidden rounded-lg bg-white shadow-xl">
        <div className="shrink-0 border-b border-slate-200 px-5 py-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-semibold text-slate-950">{initialNote ? 'Edit note' : 'Add note'}</h2>
              <p className="mt-1 text-sm text-slate-500">
                {initialNote ? 'Update the current note and save your changes.' : 'Capture prep, retros, or context linked to a job.'}
              </p>
            </div>
            <button
              aria-label="Close modal"
              className="inline-flex size-9 items-center justify-center rounded-md text-slate-500 hover:bg-slate-100 hover:text-slate-900"
              onClick={handleClose}
              type="button"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        <form className="flex min-h-0 flex-1 flex-col" onSubmit={handleSubmit}>
          <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-5">
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Linked job</span>
              <SelectMenu className="mt-1" label="Linked job" onChange={setJobId} options={jobOptions} value={jobId} />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-slate-700">Title</span>
              <input
                className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-200/60"
                onChange={(event) => setTitle(event.target.value)}
                required
                value={title}
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-slate-700">Note</span>
              <textarea
                className="mt-1 min-h-32 w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-200/60"
                onChange={(event) => setBody(event.target.value)}
                required
                value={body}
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-slate-700">Tags</span>
              <input
                className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-200/60"
                onChange={(event) => setTags(event.target.value)}
                placeholder="prep, recruiter, retro"
                value={tags}
              />
            </label>
          </div>

          <div className="flex shrink-0 justify-end gap-2 border-t border-slate-200 bg-white p-5">
            <button
              className="rounded-md border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              onClick={handleClose}
              type="button"
            >
              Cancel
            </button>
            <button
              className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-800"
              type="submit"
            >
              {initialNote ? 'Save changes' : 'Save note'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
