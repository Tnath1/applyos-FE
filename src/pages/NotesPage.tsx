import { Plus, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { PageHeader } from '../components/ui/PageHeader'
import { AddNoteModal } from '../features/notes/AddNoteModal'
import { NoteCard } from '../features/notes/NoteCard'
import { useWorkspace } from '../features/workspace/WorkspaceProvider'

export function NotesPage() {
  const { addNote, jobs, notes } = useWorkspace()
  const [isAddNoteOpen, setIsAddNoteOpen] = useState(false)
  const [query, setQuery] = useState('')

  const filteredNotes = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    if (!normalizedQuery) {
      return notes
    }

    return notes.filter((note) =>
      [note.title, note.body, ...note.tags]
        .join(' ')
        .toLowerCase()
        .includes(normalizedQuery),
    )
  }, [notes, query])

  return (
    <>
      <PageHeader
        actions={
          <button
            className="inline-flex items-center gap-2 rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800"
            onClick={() => setIsAddNoteOpen(true)}
            type="button"
          >
            <Plus className="size-4" aria-hidden="true" />
            New note
          </button>
        }
        eyebrow="Notes"
        title="Search notes"
      />
      <div className="space-y-4 p-4 sm:p-6">
        <div className="relative w-full xl:max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <input
            className="w-full rounded-md border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-200/60"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search note title, content, or tags"
            type="search"
            value={query}
          />
        </div>

        {filteredNotes.length > 0 ? (
          <div className="grid gap-4 xl:grid-cols-2">
            {filteredNotes.map((note) => (
              <NoteCard key={note.id} note={note} />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-slate-200 bg-white p-8 text-center">
            <h2 className="text-sm font-semibold text-slate-950">No notes found</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Create a job-linked note for prep, recruiter context, or interview retros.
            </p>
          </div>
        )}
      </div>

      <AddNoteModal isOpen={isAddNoteOpen} jobs={jobs} onClose={() => setIsAddNoteOpen(false)} onSubmit={addNote} />
    </>
  )
}
