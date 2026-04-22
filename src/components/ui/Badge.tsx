import { cn } from '../../utils/classNames'

type BadgeTone = 'neutral' | 'blue' | 'green' | 'amber' | 'red' | 'violet'

interface BadgeProps {
  children: React.ReactNode
  tone?: BadgeTone
  className?: string
}

const toneStyles: Record<BadgeTone, string> = {
  neutral: 'border-slate-200 bg-slate-50 text-slate-700',
  blue: 'border-blue-200 bg-blue-50 text-blue-700',
  green: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  amber: 'border-amber-200 bg-amber-50 text-amber-800',
  red: 'border-rose-200 bg-rose-50 text-rose-700',
  violet: 'border-violet-200 bg-violet-50 text-violet-700',
}

export function Badge({ children, tone = 'neutral', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium leading-none',
        toneStyles[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}
