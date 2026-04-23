import { X } from 'lucide-react'
import { useState } from 'react'
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock'
import { SelectMenu } from '../../components/ui/SelectMenu'
import type { Job } from '../../types'

interface AddJobModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (input: {
    roleTitle: string
    company: string
    location: string
    workplace: Job['workplace']
    source: string
    sourceUrl: string
    salaryRange: string
    priority: Job['priority']
    keywords: string[]
    description: string
  }) => void
}

const emptyForm = {
  roleTitle: '',
  company: '',
  location: '',
  workplace: 'Remote' as Job['workplace'],
  source: '',
  sourceUrl: '',
  salaryRange: '',
  priority: 'Medium' as Job['priority'],
  keywords: '',
  description: '',
}

const workplaceOptions: Array<{ label: string; value: Job['workplace'] }> = [
  { label: 'Remote', value: 'Remote' },
  { label: 'Hybrid', value: 'Hybrid' },
  { label: 'On-site', value: 'On-site' },
]

const priorityOptions: Array<{ label: string; value: Job['priority'] }> = [
  { label: 'Low', value: 'Low' },
  { label: 'Medium', value: 'Medium' },
  { label: 'High', value: 'High' },
]

export function AddJobModal({ isOpen, onClose, onSubmit }: AddJobModalProps) {
  const [form, setForm] = useState(emptyForm)
  useBodyScrollLock(isOpen)

  if (!isOpen) {
    return null
  }

  function updateField(field: keyof typeof form, value: string) {
    setForm((currentForm) => ({ ...currentForm, [field]: value }))
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    onSubmit({
      ...form,
      keywords: form.keywords
        .split(',')
        .map((keyword) => keyword.trim())
        .filter(Boolean),
    })

    setForm(emptyForm)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4">
      <div className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-lg bg-white shadow-xl">
        <div className="shrink-0 border-b border-slate-200 px-5 py-4">
          <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-semibold text-slate-950">Add saved job</h2>
            <p className="mt-1 text-sm text-slate-500">New jobs start in Saved until you apply.</p>
          </div>
          <button
            aria-label="Close modal"
            className="inline-flex size-9 items-center justify-center rounded-md text-slate-500 hover:bg-slate-100 hover:text-slate-900"
            onClick={onClose}
            type="button"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
          </div>
        </div>

        <form className="flex min-h-0 flex-1 flex-col" onSubmit={handleSubmit}>
          <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Role title</span>
              <input
                className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-200/60"
                onChange={(event) => updateField('roleTitle', event.target.value)}
                required
                value={form.roleTitle}
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Company</span>
              <input
                className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-200/60"
                onChange={(event) => updateField('company', event.target.value)}
                required
                value={form.company}
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Location</span>
              <input
                className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-200/60"
                onChange={(event) => updateField('location', event.target.value)}
                required
                value={form.location}
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Workplace</span>
              <SelectMenu
                className="mt-1"
                label="Workplace"
                onChange={(value) => updateField('workplace', value)}
                options={workplaceOptions}
                value={form.workplace}
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Source</span>
              <input
                className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-200/60"
                onChange={(event) => updateField('source', event.target.value)}
                placeholder="LinkedIn, referral, careers page"
                value={form.source}
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Source URL</span>
              <input
                className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-200/60"
                onChange={(event) => updateField('sourceUrl', event.target.value)}
                placeholder="https://"
                type="url"
                value={form.sourceUrl}
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Priority</span>
              <SelectMenu
                className="mt-1"
                label="Priority"
                onChange={(value) => updateField('priority', value)}
                options={priorityOptions}
                value={form.priority}
              />
            </label>
          </div>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">Salary range</span>
            <input
              className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-200/60"
              onChange={(event) => updateField('salaryRange', event.target.value)}
              placeholder="$140k - $170k"
              value={form.salaryRange}
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">Keywords</span>
            <input
              className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-200/60"
              onChange={(event) => updateField('keywords', event.target.value)}
              placeholder="React, TypeScript, Design systems"
              value={form.keywords}
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">Job description</span>
            <textarea
              className="mt-1 min-h-28 w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-200/60"
              onChange={(event) => updateField('description', event.target.value)}
              value={form.description}
            />
          </label>
          </div>

          <div className="flex shrink-0 justify-end gap-2 border-t border-slate-200 bg-white p-5">
            <button
              className="rounded-md border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              onClick={onClose}
              type="button"
            >
              Cancel
            </button>
            <button
              className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-800"
              type="submit"
            >
              Save job
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
