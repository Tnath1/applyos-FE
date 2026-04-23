import type { WorkspaceSettings } from '../types'

export const settings: WorkspaceSettings = {
  profile: {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    emailVerified: true,
    targetRole: 'Senior Product Engineer',
    headline: 'Product-minded frontend engineer focused on systems and workflow UX',
    preferredLocations: ['Remote', 'Austin, TX', 'New York, NY'],
    workplacePreference: 'Flexible',
    salaryTarget: '$160k - $190k',
    linkedInUrl: 'https://linkedin.com/in/johndoe',
    portfolioUrl: 'https://johndoe.dev',
    githubUrl: 'https://github.com/johndoe',
    timeZone: 'Africa/Lagos',
  },
  preferences: {
    defaultHome: '/dashboard',
    trackerView: 'table',
    dateFormat: 'MMM D, YYYY',
    weeklyGoal: 8,
    compactMode: false,
    autoOpenJobLinks: true,
  },
  security: {
    provider: 'Email + password',
    twoFactorEnabled: false,
    sessionTimeout: '8h',
    lastPasswordChange: '2026-03-18',
    sessions: [
      {
        id: 'session-current',
        deviceName: 'Chrome on Windows',
        location: 'Lagos, NG',
        lastActive: '2026-04-23',
        current: true,
      },
      {
        id: 'session-mac',
        deviceName: 'Safari on MacBook',
        location: 'London, UK',
        lastActive: '2026-04-19',
        current: false,
      },
    ],
  },
  subscription: {
    plan: 'Free',
    billingCycle: 'monthly',
    status: 'active',
    renewalDate: '2026-05-14',
    seats: 1,
    features: ['Job tracking', 'Resume library', 'Notes workspace'],
    billingDetails: undefined,
  },
  integrations: [
    {
      id: 'api-auth',
      label: 'Auth service',
      status: 'available',
      description: 'Ready for JWT session wiring once the backend is connected.',
    },
    {
      id: 'postgres',
      label: 'PostgreSQL',
      status: 'available',
      description: 'Schema-ready surface for jobs, resumes, notes, and settings sync.',
    },
    {
      id: 'stripe',
      label: 'Billing',
      status: 'coming-soon',
      description: 'Subscription lifecycle and invoice history will connect here later.',
    },
    {
      id: 'calendar',
      label: 'Calendar sync',
      status: 'coming-soon',
      description: 'Interview reminders and follow-up scheduling will land here later.',
    },
  ],
}
