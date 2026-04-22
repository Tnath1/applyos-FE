import { Bell, Database, KeyRound, UserRound } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { PageHeader } from '../components/ui/PageHeader'

const settingsItems = [
  {
    icon: UserRound,
    title: 'Profile',
    description: 'Name, target role, location preferences, and portfolio links.',
  },
  {
    icon: Bell,
    title: 'Notifications',
    description: 'Follow-up reminders and calendar sync settings.',
  },
  {
    icon: KeyRound,
    title: 'Authentication',
    description: 'JWT-backed sign-in and account security will connect here later.',
  },
  {
    icon: Database,
    title: 'Data source',
    description: 'API and PostgreSQL connection status once the backend is available.',
  },
]

export function SettingsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Settings"
        title="Workspace settings"
        description="Frontend placeholder for account, notification, and backend connection settings."
      />
      <div className="grid gap-4 p-4 sm:p-6 xl:grid-cols-2">
        {settingsItems.map((item) => (
          <Card className="p-5" key={item.title}>
            <div className="flex gap-4">
              <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-md bg-slate-100 text-slate-600">
                <item.icon className="size-5" aria-hidden="true" />
              </span>
              <div>
                <h2 className="font-semibold text-slate-950">{item.title}</h2>
                <p className="mt-1 text-sm leading-6 text-slate-500">{item.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </>
  )
}
