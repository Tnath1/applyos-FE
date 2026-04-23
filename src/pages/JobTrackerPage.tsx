import { LayoutGrid, List, Plus, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { PageHeader } from '../components/ui/PageHeader'
import { AddJobModal } from '../features/jobs/AddJobModal'
import { JobBoard } from '../features/jobs/JobBoard'
import { JobEmptyState } from '../features/jobs/JobEmptyState'
import { JobStatusFilter } from '../features/jobs/JobStatusFilter'
import { JobTable } from '../features/jobs/JobTable'
import { useWorkspace } from '../features/workspace/WorkspaceProvider'
import type { JobStatus } from '../types'
import { cn } from '../utils/classNames'

type TrackerView = 'table' | 'board'

export function JobTrackerPage() {
  const { addJob, jobs, updateJobStatus } = useWorkspace()
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<JobStatus | 'all'>('all')
  const [view, setView] = useState<TrackerView>('table')
  const [isAddJobOpen, setIsAddJobOpen] = useState(false)

  const filteredJobs = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return jobs.filter((job) => {
      const matchesStatus = status === 'all' || job.status === status
      const matchesQuery =
        normalizedQuery.length === 0 ||
        [job.roleTitle, job.company, job.location, job.source, ...job.keywords]
          .join(' ')
          .toLowerCase()
          .includes(normalizedQuery)

      return matchesStatus && matchesQuery
    })
  }, [jobs, query, status])

  return (
    <>
      <PageHeader
        actions={
          <button
            className="inline-flex items-center gap-2 rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800"
            onClick={() => setIsAddJobOpen(true)}
            type="button"
          >
            <Plus className="size-4" aria-hidden="true" />
            Add job
          </button>
        }
        eyebrow="Job Tracker"
        title="Applications"
      />
      <div className="space-y-4 p-4 sm:p-6">
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          <div className="relative w-full xl:max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <input
              className="w-full rounded-md border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-200/60"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search roles, companies, keywords"
              type="search"
              value={query}
            />
          </div>
          <JobStatusFilter onChange={setStatus} value={status} />
        </div>

        <div className="flex justify-end">
          <div className="inline-flex rounded-md border border-slate-200 bg-white p-1 shadow-sm">
            {[
              { id: 'table' as const, label: 'Table', icon: List },
              { id: 'board' as const, label: 'Board', icon: LayoutGrid },
            ].map((item) => (
              <button
                className={cn(
                  'inline-flex items-center gap-2 rounded px-3 py-1.5 text-sm font-medium transition',
                  view === item.id ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950',
                )}
                key={item.id}
                onClick={() => setView(item.id)}
                type="button"
              >
                <item.icon className="size-4" aria-hidden="true" />
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {view === 'table' ? (
          <JobTable
            emptyState={<JobEmptyState query={query} status={status} />}
            jobs={filteredJobs}
            onStatusChange={updateJobStatus}
          />
        ) : (
          <JobBoard jobs={filteredJobs} onStatusChange={updateJobStatus} />
        )}
      </div>

      <AddJobModal isOpen={isAddJobOpen} onClose={() => setIsAddJobOpen(false)} onSubmit={addJob} />
    </>
  )
}
