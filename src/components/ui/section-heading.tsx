import { type ReactNode } from 'react'
import { cn } from '../../lib/utils'

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  description?: string
  className?: string
  children?: ReactNode
}

export function SectionHeading({ eyebrow, title, description, className, children }: SectionHeadingProps) {
  return (
    <div className={cn('max-w-3xl', className)}>
      {eyebrow ? <p className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-emerald-600 dark:text-emerald-400">{eyebrow}</p> : null}
      <h2 className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-4xl">{title}</h2>
      {description ? <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-300">{description}</p> : null}
      {children}
    </div>
  )
}
