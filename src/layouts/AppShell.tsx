import {
  Bell,
  BriefcaseBusiness,
  FileText,
  LayoutDashboard,
  Menu,
  NotebookPen,
  Search,
  Settings,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { NavLink, Outlet } from 'react-router-dom'
import { cn } from '../utils/classNames'

interface NavItem {
  label: string
  to: string
  icon: LucideIcon
}

const navItems: NavItem[] = [
  { label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
  { label: 'Job Tracker', to: '/jobs', icon: BriefcaseBusiness },
  { label: 'My Resumes', to: '/resumes', icon: FileText },
  { label: 'Reminders', to: '/reminders', icon: Bell },
  { label: 'Notes', to: '/notes', icon: NotebookPen },
  { label: 'Settings', to: '/settings', icon: Settings },
]

function NavigationList({ mobile = false }: { mobile?: boolean }) {
  return (
    <nav className={cn(mobile ? 'flex gap-1 overflow-x-auto px-3 pb-3' : 'space-y-1 px-3')}>
      {navItems.map((item) => (
        <NavLink
          className={({ isActive }) =>
            cn(
              'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition',
              mobile && 'shrink-0',
              isActive
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950',
            )
          }
          key={item.to}
          to={item.to}
        >
          <item.icon className="size-4" aria-hidden="true" />
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  )
}

export function AppShell() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-slate-200 bg-white lg:flex lg:flex-col">
        <div className="flex h-16 items-center border-b border-slate-200 px-5">
          <div>
            <p className="text-base font-semibold tracking-tight text-slate-950">ApplyOS</p>
            <p className="text-xs text-slate-500">Job search workspace</p>
          </div>
        </div>
        <div className="py-4">
          <NavigationList />
        </div>
        <div className="mt-auto border-t border-slate-200 p-4">
          <div className="rounded-lg bg-slate-50 p-3">
            <p className="text-sm font-medium text-slate-950">John Doe</p>
            <p className="mt-1 text-xs text-slate-500">Product engineer pipeline</p>
          </div>
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur lg:hidden">
          <div className="flex h-14 items-center justify-between px-4">
            <div className="flex items-center gap-3">
              <Menu className="size-5 text-slate-500" aria-hidden="true" />
              <span className="text-sm font-semibold text-slate-950">ApplyOS</span>
            </div>
            <Search className="size-5 text-slate-500" aria-hidden="true" />
          </div>
          <NavigationList mobile />
        </header>

        <main className="min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
