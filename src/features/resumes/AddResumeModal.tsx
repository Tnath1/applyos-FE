import { X } from 'lucide-react'
import { useState } from 'react'
import type { Resume } from '../../types'

interface AddResumeModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (input: {
    name: string
    roleFocus: string
    fileType: Resume['fileType']
    version: string
    keywords: string[]
  }) => void
}

const emptyForm = {
  name: '',
  roleFocus: '',
  fileType: 'PDF' as Resume['fileType'],
  version: 'v1.0',
  keywords: '',
}

export function AddResumeModal({ isOpen, onClose, onSubmit }: AddResumeModalProps) {
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
      <div className="w-full max-w-xl rounded-lg bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <div>
            <h2 className="text-base font-semibold text-slate-950">Add resume</h2>
            <p className="mt-1 text-sm text-slate-500">Create a resume record you can attach to jobs.</p>
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
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Resume name</span>
            <input
              className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-200/60"
              onChange={(event) => updateField('name', event.target.value)}
              placeholder="Product Engineer - SaaS"
              required
              value={form.name}
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">Role focus</span>
            <input
              className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-200/60"
              onChange={(event) => updateField('roleFocus', event.target.value)}
              placeholder="Frontend platform, React, design systems"
              required
              value={form.roleFocus}
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium text-slate-700">File type</span>
              <select
                className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-200/60"
                onChange={(event) => updateField('fileType', event.target.value)}
                value={form.fileType}
              >
                <option value="PDF">PDF</option>
                <option value="DOCX">DOCX</option>
              </select>
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Version</span>
              <input
                className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-200/60"
                onChange={(event) => updateField('version', event.target.value)}
                value={form.version}
              />
            </label>
          </div>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">Keywords</span>
            <input
              className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-200/60"
              onChange={(event) => updateField('keywords', event.target.value)}
              placeholder="React, TypeScript, Product analytics"
              value={form.keywords}
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
              Save resume
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
