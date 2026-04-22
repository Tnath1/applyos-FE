import { Upload } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { PageHeader } from '../components/ui/PageHeader'
import { ResumeCard } from '../features/resumes/ResumeCard'
import { resumes } from '../mock'

export function ResumesPage() {
  return (
    <>
      <PageHeader
        eyebrow="My Resumes"
        title="Resume library"
        description="Keep focused resume variants ready to attach to each application."
      />
      <div className="grid gap-4 p-4 sm:p-6 xl:grid-cols-3">
        <Card className="flex min-h-64 items-center justify-center border-dashed p-6 text-center">
          <div>
            <span className="mx-auto inline-flex size-12 items-center justify-center rounded-md bg-slate-100 text-slate-600">
              <Upload className="size-5" aria-hidden="true" />
            </span>
            <h2 className="mt-4 font-semibold text-slate-950">Upload resume</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">PDF and DOCX variants can be attached to tracked roles.</p>
            <button
              className="mt-5 rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800"
              type="button"
            >
              Choose file
            </button>
          </div>
        </Card>
        {resumes.map((resume) => (
          <ResumeCard key={resume.id} resume={resume} />
        ))}
      </div>
    </>
  )
}
