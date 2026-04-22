import type { LucideIcon } from 'lucide-react'
import { cn } from '../../utils/classNames'

interface IconButtonProps {
  icon: LucideIcon
  label: string
  className?: string
}

export function IconButton({ icon: Icon, label, className }: IconButtonProps) {
  return (
    <button
      aria-label={label}
      title={label}
      className={cn(
        'inline-flex size-9 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900',
        className,
      )}
      type="button"
    >
      <Icon className="size-4" aria-hidden="true" />
    </button>
  )
}
