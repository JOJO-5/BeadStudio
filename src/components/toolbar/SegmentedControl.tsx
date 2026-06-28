interface SegmentedControlOption<T extends string | number> {
  value: T
  label: string
}

interface SegmentedControlProps<T extends string | number> {
  options: SegmentedControlOption<T>[]
  value: T
  onChange: (value: T) => void
}

export function SegmentedControl<T extends string | number>({
  options,
  value,
  onChange,
}: SegmentedControlProps<T>) {
  return (
    <div className="flex items-center bg-[var(--color-background-muted)] rounded-[var(--radius-md)] p-1">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={`
            px-3 py-1 text-sm rounded-[var(--radius-sm)]
            transition-all duration-[var(--duration-fast)]
            ${value === option.value
              ? 'bg-[var(--color-background)] text-[var(--color-text-primary)] shadow-[var(--shadow-sm)]'
              : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]'
            }
          `}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
