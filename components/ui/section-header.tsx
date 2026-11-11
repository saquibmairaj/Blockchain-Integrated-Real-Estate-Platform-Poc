import { cn } from '@/components/ui/utils'
import { Eyebrow } from '@/components/ui/eyebrow'

type SectionHeaderProps = {
  eyebrow?: React.ReactNode
  title: React.ReactNode
  description?: React.ReactNode
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'center',
  className,
}: SectionHeaderProps) {
  const isCentered = align === 'center'

  return (
    <div className={cn('max-w-2xl', isCentered && 'mx-auto text-center', className)}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2
        className={cn(
          'text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl',
          eyebrow && 'mt-5',
        )}
      >
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-gray-400 sm:text-lg">{description}</p>
      ) : null}
    </div>
  )
}
