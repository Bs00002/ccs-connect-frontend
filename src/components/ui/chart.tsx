export function ChartPlaceholder({title}:{title?:string}){
  return (
    <div className="p-4 border rounded bg-white">
      <div className="text-sm text-slate-600 font-medium">{title || 'Chart'}</div>
      <div className="h-40 flex items-center justify-center text-slate-400">Chart placeholder</div>
    </div>
  )
}
export default ChartPlaceholder
