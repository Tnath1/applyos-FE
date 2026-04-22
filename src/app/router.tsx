import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import { AppShell } from '../layouts/AppShell'
import { DashboardPage } from '../pages/DashboardPage'
import { JobDetailsPage } from '../pages/JobDetailsPage'
import { JobTrackerPage } from '../pages/JobTrackerPage'
import { NotesPage } from '../pages/NotesPage'
import { RemindersPage } from '../pages/RemindersPage'
import { ResumesPage } from '../pages/ResumesPage'
import { SettingsPage } from '../pages/SettingsPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      { index: true, element: <Navigate replace to="/dashboard" /> },
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'jobs', element: <JobTrackerPage /> },
      { path: 'jobs/:id', element: <JobDetailsPage /> },
      { path: 'resumes', element: <ResumesPage /> },
      { path: 'reminders', element: <RemindersPage /> },
      { path: 'notes', element: <NotesPage /> },
      { path: 'settings', element: <SettingsPage /> },
      { path: '*', element: <Navigate replace to="/dashboard" /> },
    ],
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
