import {
  AlertTriangle,
  Bell,
  BriefcaseBusiness,
  CreditCard,
  FileText,
  LayoutDashboard,
  Menu,
  NotebookPen,
  Search,
  Settings,
  Sparkles,
  X,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { Badge } from '../components/ui/Badge'
import { SearchableSelect } from '../components/ui/SearchableSelect'
import { useBodyScrollLock } from '../hooks/useBodyScrollLock'
import { useWorkspace } from '../features/workspace/WorkspaceProvider'
import { cn } from '../utils/classNames'

interface NavItem {
  disabled?: boolean
  label: string
  to: string
  icon: LucideIcon
}

const navItems: NavItem[] = [
  { label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
  { label: 'Job Tracker', to: '/jobs', icon: BriefcaseBusiness },
  { label: 'My Resumes', to: '/resumes', icon: FileText },
  { label: 'Notes', to: '/notes', icon: NotebookPen },
  { label: 'Reminders', to: '/reminders', icon: Bell, disabled: true },
  { label: 'Settings', to: '/settings', icon: Settings, disabled: true },
]

const countryOptions = [
  'Australia',
  'Canada',
  'France',
  'Germany',
  'Ghana',
  'India',
  'Ireland',
  'Kenya',
  'Netherlands',
  'Nigeria',
  'South Africa',
  'United Arab Emirates',
  'United Kingdom',
  'United States',
].map((country) => ({
  label: country,
  value: country,
}))

function NavigationList({ mobile = false }: { mobile?: boolean }) {
  return (
    <nav className={cn(mobile ? 'flex gap-1 overflow-x-auto px-3 pb-3' : 'space-y-1 px-3')}>
      {navItems.map((item) => (
        item.disabled ? (
          <div
            className={cn(
              'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-400',
              mobile && 'shrink-0',
            )}
            key={item.to}
          >
            <item.icon className="size-4" aria-hidden="true" />
            <span>{item.label}</span>
          </div>
        ) : (
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
        )
      ))}
    </nav>
  )
}

export function AppShell() {
  const { settings, updateProfile, updateSubscription } = useWorkspace()
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [profileSaved, setProfileSaved] = useState(false)
  const [isBillingOpen, setIsBillingOpen] = useState(false)
  const profile = settings.profile
  const subscription = settings.subscription
  const [profileForm, setProfileForm] = useState(profile)
  const [billingForm, setBillingForm] = useState({
    cardholderName: '',
    billingEmail: profile.email,
    cardNumber: '',
    expiry: '',
    cvc: '',
    country: 'United States',
  })
  const fullName = useMemo(() => `${profile.firstName} ${profile.lastName}`.trim(), [profile.firstName, profile.lastName])
  useBodyScrollLock(isProfileOpen || isBillingOpen)

  useEffect(() => {
    setProfileForm(profile)
  }, [profile])

  useEffect(() => {
    setBillingForm((current) => ({
      ...current,
      billingEmail: profile.email,
    }))
  }, [profile.email])

  useEffect(() => {
    if (!profileSaved) {
      return
    }

    const timeoutId = window.setTimeout(() => setProfileSaved(false), 1800)
    return () => window.clearTimeout(timeoutId)
  }, [profileSaved])

  function handleProfileSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    updateProfile({
      ...profileForm,
      preferredLocations: profileForm.preferredLocations.map((location) => location.trim()).filter(Boolean),
    })
    setProfileSaved(true)
  }

  function handleUpgradeToPro() {
    setIsBillingOpen(true)
  }

  function handleBillingSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    updateSubscription({
      plan: 'Pro',
      billingCycle: 'monthly',
      status: 'active',
      renewalDate: subscription.renewalDate,
      seats: 1,
      features: ['Unlimited jobs', 'Resume library', 'Notes workspace', 'Priority support'],
      billingDetails: {
        cardholderName: billingForm.cardholderName,
        billingEmail: billingForm.billingEmail,
        country: billingForm.country,
        cardLast4: billingForm.cardNumber.slice(-4),
      },
    })
    setIsBillingOpen(false)
  }

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
          <div className="space-y-3">
            <button
              className="w-full rounded-lg border border-slate-200 bg-slate-50 p-3 text-left transition hover:border-slate-300 hover:bg-white"
              onClick={() => setIsProfileOpen(true)}
              type="button"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-950">{fullName}</p>
                  <p className="mt-1 truncate text-xs text-slate-500">{profile.email}</p>
                </div>
                <Badge className="shrink-0" tone={subscription.plan === 'Pro' ? 'blue' : 'neutral'}>
                  {subscription.plan === 'Pro' ? 'Pro' : 'Free mode'}
                </Badge>
              </div>
            </button>
            {subscription.plan === 'Free' ? (
              <button
                className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
                onClick={() => setIsBillingOpen(true)}
                type="button"
              >
                <Sparkles className="size-4" aria-hidden="true" />
                Upgrade to Pro
              </button>
            ) : null}
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

      {isProfileOpen ? (
        <div className="fixed inset-0 z-50 hidden bg-slate-950/30 lg:flex lg:items-center lg:justify-center lg:p-6" role="presentation">
          <button
            aria-label="Close account modal"
            className="absolute inset-0"
            onClick={() => setIsProfileOpen(false)}
            type="button"
          />
          <aside className="relative z-10 w-full max-w-lg rounded-xl border border-slate-200 bg-white shadow-2xl">
            <div className="flex max-h-[85vh] flex-col overflow-hidden">
              <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Account</p>
                  <h2 className="mt-2 text-lg font-semibold text-slate-950">Profile</h2>
                  <p className="mt-1 text-sm text-slate-500">Manage the account details that matter for your job search workspace.</p>
                </div>
                <button
                  aria-label="Close account modal"
                  className="inline-flex size-9 items-center justify-center rounded-md text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                  onClick={() => setIsProfileOpen(false)}
                  type="button"
                >
                  <X className="size-4" aria-hidden="true" />
                </button>
              </div>

              <div className="flex-1 space-y-5 overflow-y-auto px-6 py-6">
                <section className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-slate-950">Current plan</p>
                  <p className="mt-1 text-sm text-slate-500">
                    {subscription.plan === 'Free' ? 'Free mode' : 'Pro on monthly billing'}
                  </p>
                    </div>
                    <Badge tone={subscription.plan === 'Pro' ? 'blue' : 'neutral'}>
                      {subscription.plan === 'Pro' ? 'Pro' : 'Free mode'}
                    </Badge>
                  </div>
                  {subscription.plan === 'Free' ? (
                    <button
                      className="mt-4 inline-flex items-center gap-2 rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
                      onClick={() => {
                        setIsProfileOpen(false)
                        handleUpgradeToPro()
                      }}
                      type="button"
                    >
                      <Sparkles className="size-4" aria-hidden="true" />
                      Upgrade to Pro
                    </button>
                  ) : null}
                  {subscription.plan === 'Pro' && subscription.billingDetails ? (
                    <div className="mt-4 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600">
                      Billing saved for {subscription.billingDetails.billingEmail} with card ending in {subscription.billingDetails.cardLast4}.
                    </div>
                  ) : null}
                </section>

                <form className="space-y-5 rounded-lg border border-slate-200 p-4" onSubmit={handleProfileSubmit}>
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-slate-950">Profile details</p>
                      <p className="mt-1 text-sm text-slate-500">Manage the core account details for your workspace.</p>
                    </div>
                    {profileSaved ? <Badge tone="green">Saved</Badge> : null}
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className="text-sm font-medium text-slate-700">First name</span>
                      <input
                        className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-200/60"
                        onChange={(event) => setProfileForm((current) => ({ ...current, firstName: event.target.value }))}
                        value={profileForm.firstName}
                      />
                    </label>
                    <label className="block">
                      <span className="text-sm font-medium text-slate-700">Last name</span>
                      <input
                        className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-200/60"
                        onChange={(event) => setProfileForm((current) => ({ ...current, lastName: event.target.value }))}
                        value={profileForm.lastName}
                      />
                    </label>
                  </div>

                  <label className="block">
                    <span className="text-sm font-medium text-slate-700">Email</span>
                    <div className="mt-1 flex items-center justify-between gap-3 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm">
                      <span className="truncate text-slate-700">{profileForm.email}</span>
                      <Badge tone={profileForm.emailVerified ? 'green' : 'amber'}>
                        {profileForm.emailVerified ? 'Confirmed' : 'Pending'}
                      </Badge>
                    </div>
                    <div className="mt-2 flex items-start gap-2 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">
                      <AlertTriangle className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
                      <p>
                        <span className="font-semibold">NB:</span> Confirmed email addresses cannot be edited.
                      </p>
                    </div>
                  </label>

                  <div className="flex justify-end">
                    <button
                      className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
                      type="submit"
                    >
                      Save profile
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </aside>
        </div>
      ) : null}

      {subscription.plan === 'Free' && isBillingOpen ? (
        <div className="fixed inset-0 z-[60] bg-slate-950/40 lg:flex lg:items-center lg:justify-center lg:p-6" role="presentation">
          <button
            aria-label="Close billing modal"
            className="absolute inset-0"
            onClick={() => setIsBillingOpen(false)}
            type="button"
          />
          <aside className="relative z-10 mx-auto w-full max-w-xl rounded-xl border border-slate-200 bg-white shadow-2xl">
            <div className="flex max-h-[85vh] flex-col overflow-hidden">
              <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Billing</p>
                  <h2 className="mt-2 text-lg font-semibold text-slate-950">Upgrade to Pro</h2>
                  <p className="mt-1 text-sm text-slate-500">Add billing details to upgrade this workspace to Pro on a monthly plan.</p>
                </div>
                <button
                  aria-label="Close billing modal"
                  className="inline-flex size-9 items-center justify-center rounded-md text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                  onClick={() => setIsBillingOpen(false)}
                  type="button"
                >
                  <X className="size-4" aria-hidden="true" />
                </button>
              </div>

              <form className="space-y-4 overflow-y-auto px-6 py-6" onSubmit={handleBillingSubmit}>
                <label className="block">
                  <span className="text-sm font-medium text-slate-700">Cardholder name</span>
                  <input
                    className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-200/60"
                    onChange={(event) => setBillingForm((current) => ({ ...current, cardholderName: event.target.value }))}
                    required
                    value={billingForm.cardholderName}
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-medium text-slate-700">Billing email</span>
                  <input
                    className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-200/60"
                    onChange={(event) => setBillingForm((current) => ({ ...current, billingEmail: event.target.value }))}
                    required
                    type="email"
                    value={billingForm.billingEmail}
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-medium text-slate-700">Card number</span>
                  <input
                    className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-200/60"
                    inputMode="numeric"
                    onChange={(event) => setBillingForm((current) => ({ ...current, cardNumber: event.target.value }))}
                    placeholder="4242 4242 4242 4242"
                    required
                    value={billingForm.cardNumber}
                  />
                </label>

                <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_120px_100px]">
                  <label className="block">
                    <span className="text-sm font-medium text-slate-700">Country</span>
                    <SearchableSelect
                      className="mt-1"
                      label="Country"
                      onChange={(value) => setBillingForm((current) => ({ ...current, country: value }))}
                      options={countryOptions}
                      searchPlaceholder="Search country"
                      value={billingForm.country}
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm font-medium text-slate-700">Expiry</span>
                    <input
                      className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-200/60"
                      onChange={(event) => setBillingForm((current) => ({ ...current, expiry: event.target.value }))}
                      placeholder="MM/YY"
                      required
                      value={billingForm.expiry}
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm font-medium text-slate-700">CVC</span>
                    <input
                      className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-200/60"
                      inputMode="numeric"
                      onChange={(event) => setBillingForm((current) => ({ ...current, cvc: event.target.value }))}
                      placeholder="123"
                      required
                      value={billingForm.cvc}
                    />
                  </label>
                </div>

                <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <CreditCard className="size-4 text-slate-400" aria-hidden="true" />
                    Billing details will be saved to this account for monthly renewal.
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 border-t border-slate-200 pt-4">
                  <button
                    className="rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                    onClick={() => setIsBillingOpen(false)}
                    type="button"
                  >
                    Cancel
                  </button>
                  <button
                    className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
                    type="submit"
                  >
                    Upgrade now
                  </button>
                </div>
              </form>
            </div>
          </aside>
        </div>
      ) : null}
    </div>
  )
}
