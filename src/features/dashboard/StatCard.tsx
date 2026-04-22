import type { LucideIcon } from 'lucide-react'
import type { DashboardStat } from '../../types'
import { cn } from '../../utils/classNames'
import { Card } from '../../components/ui/Card'

interface StatCardProps {
  stat: DashboardStat
  icon: LucideIcon
}

const toneStyles: Record<DashboardStat['tone'], string> = {
  neutral: 'bg-slate-50 text-slate-700 ring-slate-200',
  blue: 'bg-blue-50 text-blue-700 ring-blue-200',
  green: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  amber: 'bg-amber-50 text-amber-800 ring-amber-200',
  red: 'bg-rose-50 text-rose-700 ring-rose-200',
}

export function StatCard({ stat, icon: Icon }: StatCardProps) {
  return (
    <Card className="p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{stat.label}</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">{stat.value}</p>
        </div>
        <span className={cn('inline-flex size-9 items-center justify-center rounded-md ring-1', toneStyles[stat.tone])}>
          <Icon className="size-4" aria-hidden="true" />
        </span>
      </div>
      <p className="mt-4 text-sm text-slate-500">{stat.helper}</p>
    </Card>
  )
}
