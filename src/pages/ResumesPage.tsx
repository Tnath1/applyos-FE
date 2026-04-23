import { FileText, Plus, Trophy, Upload } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Card } from '../components/ui/Card'
import { PageHeader } from '../components/ui/PageHeader'
import { AddResumeModal } from '../features/resumes/AddResumeModal'
import { ResumeCard } from '../features/resumes/ResumeCard'
import { useWorkspace } from '../features/workspace/WorkspaceProvider'

export function ResumesPage() {
  const { addResume, jobs, resumes } = useWorkspace()
  const [isAddResumeOpen, setIsAddResumeOpen] = useState(false)
  const resumeStats = useMemo(() => {
    const attachedJobs = jobs.filter((job) => job.resumeId)
    const offerJobs = attachedJobs.filter((job) => job.status === 'offer')
    const interviewingJobs = attachedJobs.filter((job) => job.status === 'interviewing')
    const unusedResumes = resumes.filter((resume) => !jobs.some((job) => job.resumeId === resume.id))

    return [
      {
        label: 'Total resumes',
        value: resumes.length,
        helper: 'Variants in library',
        icon: FileText,
      },
      {
        label: 'Positive signals',
        value: interviewingJobs.length + offerJobs.length,
        helper: 'Interviewing or offer outcomes',
        icon: Trophy,
      },
      {
        label: 'Unused resumes',
        value: unusedResumes.length,
        helper: 'No jobs attached yet',
        icon: Upload,
      },
    ]
  }, [jobs, resumes])

  return (
    <>
      <PageHeader
        actions={
          <button
            className="inline-flex items-center gap-2 rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800"
            onClick={() => setIsAddResumeOpen(true)}
            type="button"
          >
            <Plus className="size-4" aria-hidden="true" />
            Add resume
          </button>
        }
        eyebrow="My Resumes"
        title="Resume library"
      />

      <div className="space-y-6 p-4 sm:p-6">
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {resumeStats.map((stat) => (
            <Card className="p-4" key={stat.label}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                  <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">{stat.value}</p>
                </div>
                <span className="inline-flex size-9 items-center justify-center rounded-md bg-slate-100 text-slate-600">
                  <stat.icon className="size-4" aria-hidden="true" />
                </span>
              </div>
              <p className="mt-4 text-sm text-slate-500">{stat.helper}</p>
            </Card>
          ))}
        </section>

        <section className="grid gap-4 xl:grid-cols-3">
        <Card className="flex min-h-64 items-center justify-center border-dashed p-6 text-center">
          <div>
            <span className="mx-auto inline-flex size-12 items-center justify-center rounded-md bg-slate-100 text-slate-600">
              <Upload className="size-5" aria-hidden="true" />
            </span>
            <h2 className="mt-4 font-semibold text-slate-950">Upload resume</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">PDF and DOCX variants can be attached to tracked roles.</p>
            <button
              className="mt-5 rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800"
              onClick={() => setIsAddResumeOpen(true)}
              type="button"
            >
              Add resume
            </button>
          </div>
        </Card>
        {resumes.map((resume) => (
          <ResumeCard jobs={jobs} key={resume.id} resume={resume} />
        ))}
        </section>
      </div>

      <AddResumeModal isOpen={isAddResumeOpen} onClose={() => setIsAddResumeOpen(false)} onSubmit={addResume} />
    </>
  )
}
