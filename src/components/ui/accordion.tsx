import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '../../lib/utils'

type AccordionItemType = {
  question: string
  answer: string
}

interface AccordionProps {
  items: AccordionItemType[]
}

export function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <div className="space-y-4">
      {items.map((item, index) => {
        const open = index === openIndex
        return (
          <div key={item.question} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_20px_80px_rgba(15,23,42,0.05)] dark:border-slate-700/60 dark:bg-slate-950">
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left text-lg font-semibold text-slate-900 dark:text-white"
              onClick={() => setOpenIndex(open ? -1 : index)}
            >
              <span>{item.question}</span>
              <ChevronDown className={cn('h-5 w-5 transition-transform duration-300', open ? 'rotate-180' : 'rotate-0')} />
            </button>
            <div className={cn('px-5 pb-5 text-slate-600 dark:text-slate-300', open ? 'block' : 'hidden')}>
              <p className="leading-7">{item.answer}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
