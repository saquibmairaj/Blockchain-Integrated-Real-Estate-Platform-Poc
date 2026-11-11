import { cn } from '@/components/ui/utils'

type StatProps = {
  label: string
  value: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const valueSize = {
  sm: 'text-base sm:text-lg',
  md: 'text-xl sm:text-2xl',
  lg: 'text-4xl sm:text-5xl md:text-6xl',
}

export function Stat({ label, value, size = 'md', className }: StatProps) {
  return (
    <div className={className}>
      <p className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-gray-500">
        {label}
      </p>
      <p className={cn('mt-2 font-semibold text-white', valueSize[size])}>{value}</p>
    </div>
  )
}
