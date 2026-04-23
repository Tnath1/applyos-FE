import { Check, ChevronDown } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { cn } from '../../utils/classNames'

export interface SelectMenuOption<T extends string> {
  label: string
  value: T
}

interface SelectMenuProps<T extends string> {
  label: string
  value: T
  options: Array<SelectMenuOption<T>>
  onChange: (value: T) => void
  disabled?: boolean
  className?: string
}

export function SelectMenu<T extends string>({
  className,
  disabled = false,
  label,
  onChange,
  options,
  value,
}: SelectMenuProps<T>) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const selectedOption = options.find((option) => option.value === value)

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)

    return () => document.removeEventListener('mousedown', handlePointerDown)
  }, [])

  function handleSelect(nextValue: T) {
    onChange(nextValue)
    setIsOpen(false)
  }

  return (
    <div className={cn('relative', className)} ref={menuRef}>
      <button
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label={label}
        className={cn(
          'inline-flex w-full items-center justify-between gap-3 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 focus:border-slate-400 focus:outline-none focus:ring-4 focus:ring-slate-200/60',
          disabled && 'cursor-not-allowed bg-slate-50 text-slate-400 hover:bg-slate-50',
        )}
        disabled={disabled}
        onClick={() => setIsOpen((currentValue) => !currentValue)}
        type="button"
      >
        <span className="truncate">{selectedOption?.label ?? 'Select'}</span>
        <ChevronDown className="size-4 shrink-0 text-slate-400" aria-hidden="true" />
      </button>

      {isOpen ? (
        <div
          className="absolute left-0 z-40 mt-2 max-h-64 w-full min-w-44 overflow-y-auto rounded-md border border-slate-200 bg-white p-1 shadow-lg"
          role="menu"
        >
          {options.map((option) => (
            <button
              className={cn(
                'flex w-full items-center justify-between gap-3 rounded px-3 py-2 text-left text-sm transition',
                value === option.value ? 'bg-slate-100 font-medium text-slate-950' : 'text-slate-600 hover:bg-slate-50',
              )}
              key={option.value}
              onClick={() => handleSelect(option.value)}
              role="menuitem"
              type="button"
            >
              <span className="truncate">{option.label}</span>
              {value === option.value ? <Check className="size-4 shrink-0 text-slate-500" aria-hidden="true" /> : null}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}
