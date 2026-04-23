import { Check, ChevronDown, Search } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { cn } from '../../utils/classNames'

export interface SearchableSelectOption<T extends string> {
  label: string
  value: T
}

interface SearchableSelectProps<T extends string> {
  label: string
  value: T
  options: Array<SearchableSelectOption<T>>
  onChange: (value: T) => void
  disabled?: boolean
  className?: string
  searchPlaceholder?: string
}

export function SearchableSelect<T extends string>({
  className,
  disabled = false,
  label,
  onChange,
  options,
  value,
  searchPlaceholder = 'Search',
}: SearchableSelectProps<T>) {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const menuRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const selectedOption = options.find((option) => option.value === value)

  const filteredOptions = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    if (!normalizedQuery) {
      return options
    }

    return options.filter((option) => option.label.toLowerCase().includes(normalizedQuery))
  }, [options, query])

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    return () => document.removeEventListener('mousedown', handlePointerDown)
  }, [])

  useEffect(() => {
    if (!isOpen) {
      setQuery('')
      return
    }

    window.setTimeout(() => {
      inputRef.current?.focus()
    }, 0)
  }, [isOpen])

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
        <div className="absolute left-0 z-40 mt-2 w-full min-w-56 rounded-md border border-slate-200 bg-white p-2 shadow-lg" role="menu">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
            <input
              className="w-full rounded-md border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-200/60"
              onChange={(event) => setQuery(event.target.value)}
              placeholder={searchPlaceholder}
              ref={inputRef}
              value={query}
            />
          </div>

          <div className="mt-2 max-h-56 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
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
              ))
            ) : (
              <p className="px-3 py-2 text-sm text-slate-500">No countries found.</p>
            )}
          </div>
        </div>
      ) : null}
    </div>
  )
}
