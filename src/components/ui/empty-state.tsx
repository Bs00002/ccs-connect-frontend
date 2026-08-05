export function EmptyState({ title = 'No data', description = 'No records found.' }: { title?: string; description?: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-200/70 bg-white/90 p-8 text-center">
      <p className="text-lg font-semibold text-slate-900">{title}</p>
      <p className="mt-2 text-sm text-slate-600">{description}</p>
    </div>
  )
}
