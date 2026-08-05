import * as React from 'react'
import { cn } from '../../lib/utils'

const Badge = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn(
      'inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700',
      className,
    )}
    {...props}
  />
))

Badge.displayName = 'Badge'

export { Badge }
