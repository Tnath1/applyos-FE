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
    fileName: string
    fileDataUrl: string
    fileMimeType: string
    version: string
    keywords: string[]
  }) => void
}

const emptyForm = {
  name: '',
  roleFocus: '',
  fileType: 'PDF' as Resume['fileType'],
  fileName: '',
  fileDataUrl: '',
  fileMimeType: '',
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

  function getFileType(file: File): Resume['fileType'] {
    const extension = file.name.split('.').pop()?.toLowerCase()

    if (extension === 'doc') {
      return 'DOC'
    }

    if (extension === 'docx') {
      return 'DOCX'
    }

    return 'PDF'
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    const reader = new FileReader()

    reader.onload = () => {
      const fileNameWithoutExtension = file.name.replace(/\.[^/.]+$/, '')

      setForm((currentForm) => ({
        ...currentForm,
        name: currentForm.name || fileNameWithoutExtension,
        fileType: getFileType(file),
        fileName: file.name,
        fileDataUrl: String(reader.result),
        fileMimeType: file.type || 'application/octet-stream',
      }))
    }

    reader.readAsDataURL(file)
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
          <label className="block rounded-lg border border-dashed border-slate-300 bg-slate-50 p-4">
            <span className="text-sm font-medium text-slate-700">Resume file</span>
            <input
              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              className="mt-2 block w-full text-sm text-slate-600 file:mr-4 file:rounded-md file:border-0 file:bg-slate-900 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-slate-800"
              onChange={handleFileChange}
              required
              type="file"
            />
            <p className="mt-2 text-xs text-slate-500">
              {form.fileName ? `${form.fileName} selected` : 'Upload a PDF, DOC, or DOCX file.'}
            </p>
          </label>

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
