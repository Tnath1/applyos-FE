import { cn } from '../../utils/classNames'

interface CardProps {
  children: React.ReactNode
  className?: string
}

export function Card({ children, className }: CardProps) {
  return (
    <section className={cn('rounded-lg border border-slate-200 bg-white shadow-sm', className)}>
      {children}
    </section>
  )
}
