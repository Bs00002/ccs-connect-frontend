export function KpiCard({label,value,delta}:{label:string,value:any,delta?:string}){
  return (
    <div className="p-4 border rounded bg-white">
      <div className="text-sm text-slate-500">{label}</div>
      <div className="text-xl font-bold">{value}</div>
      {delta && <div className="text-xs text-slate-400">{delta}</div>}
    </div>
  )
}
export default KpiCard
