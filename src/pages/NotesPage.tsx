import { Plus } from 'lucide-react'
import { PageHeader } from '../components/ui/PageHeader'
import { NoteCard } from '../features/notes/NoteCard'
import { notes } from '../mock'

export function NotesPage() {
  return (
    <>
      <PageHeader
        actions={
          <button
            className="inline-flex items-center gap-2 rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800"
            type="button"
          >
            <Plus className="size-4" aria-hidden="true" />
            New note
          </button>
        }
        eyebrow="Notes"
        title="Search notes"
        description="Interview prep, negotiation points, application retros, and company-specific context."
      />
      <div className="grid gap-4 p-4 sm:p-6 xl:grid-cols-2">
        {notes.map((note) => (
          <NoteCard key={note.id} note={note} />
        ))}
      </div>
    </>
  )
}
