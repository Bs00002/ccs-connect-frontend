import * as React from 'react'
import { cn } from '../../lib/utils'

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('rounded-3xl border border-slate-200/80 bg-white/90 shadow-[0_20px_80px_rgba(2,6,23,0.06)] backdrop-blur', className)} {...props} />
))
Card.displayName = 'Card'

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6', className)} {...props} />
))
CardContent.displayName = 'CardContent'

export { Card, CardContent }
