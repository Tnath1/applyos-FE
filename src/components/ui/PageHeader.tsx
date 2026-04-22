interface PageHeaderProps {
  eyebrow?: string
  title: string
  description?: string
  actions?: React.ReactNode
}

export function PageHeader({ eyebrow, title, description, actions }: PageHeaderProps) {
  return (
    <header className="flex min-h-16 flex-col gap-3 border-b border-slate-200 bg-white px-4 py-3 sm:px-6 lg:sticky lg:top-0 lg:z-20 lg:flex-row lg:items-center lg:justify-between">
      <div>
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase leading-none tracking-[0.18em] text-slate-500">{eyebrow}</p>
        ) : null}
        <h1 className="mt-1 text-xl font-semibold leading-6 tracking-tight text-slate-950">{title}</h1>
        {description ? <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-600">{description}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
    </header>
  )
}
