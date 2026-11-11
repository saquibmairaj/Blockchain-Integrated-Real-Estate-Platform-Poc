import { cn } from '@/components/ui/utils'

type EyebrowProps = {
  children: React.ReactNode
  className?: string
}

export function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <p
      className={cn('text-[11px] font-semibold uppercase tracking-[0.22em] text-brand', className)}
    >
      {children}
    </p>
  )
}
