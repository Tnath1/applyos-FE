import { PageHeader } from '../components/ui/PageHeader'
import { ReminderCard } from '../features/reminders/ReminderCard'
import { reminders } from '../mock'
import type { ReminderStatus } from '../types'
import { reminderStatusLabels } from '../utils/format'

const sections: ReminderStatus[] = ['overdue', 'upcoming', 'completed']

export function RemindersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Reminders"
        title="Follow-up queue"
      />
      <div className="grid gap-6 p-4 sm:p-6 xl:grid-cols-3">
        {sections.map((section) => {
          const sectionReminders = reminders.filter((reminder) => reminder.status === section)

          return (
            <section key={section}>
              <div className="mb-3 flex items-center justify-between">
                <h2 className="font-semibold text-slate-950">{reminderStatusLabels[section]}</h2>
                <span className="text-sm text-slate-500">{sectionReminders.length}</span>
              </div>
              <div className="space-y-3">
                {sectionReminders.map((reminder) => (
                  <ReminderCard key={reminder.id} reminder={reminder} />
                ))}
              </div>
            </section>
          )
        })}
      </div>
    </>
  )
}
