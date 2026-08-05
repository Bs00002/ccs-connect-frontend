export function Timeline({ items }: { items: { date?: string; title: string; detail?: string }[] }) {
  return (
    <div className="space-y-4">
      {items.map((it, i) => (
        <div key={i} className="flex items-start gap-4">
          <div className="mt-1 h-3 w-3 rounded-full bg-emerald-500" />
          <div>
            <p className="font-semibold text-slate-900">{it.title}</p>
            {it.detail ? <p className="text-sm text-slate-600">{it.detail}</p> : null}
            {it.date ? <p className="mt-1 text-xs text-slate-400">{it.date}</p> : null}
          </div>
        </div>
      ))}
    </div>
  )
}
