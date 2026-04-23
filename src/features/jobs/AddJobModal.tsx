import { X } from 'lucide-react'
import { useState } from 'react'
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

export function AddJobModal({ isOpen, onClose, onSubmit }: AddJobModalProps) {
  const [form, setForm] = useState(emptyForm)

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
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
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

        <form className="space-y-4 p-5" onSubmit={handleSubmit}>
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
              <select
                className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-200/60"
                onChange={(event) => updateField('workplace', event.target.value)}
                value={form.workplace}
              >
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
                <option value="On-site">On-site</option>
              </select>
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
              <select
                className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-200/60"
                onChange={(event) => updateField('priority', event.target.value)}
                value={form.priority}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
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

          <div className="flex justify-end gap-2 border-t border-slate-200 pt-4">
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
