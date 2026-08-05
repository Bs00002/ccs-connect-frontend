export function StatusBadge({status}:{status?:string}){
  const cls = status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : status === 'Approved' ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-700'
  return <span className={`px-2 py-1 rounded text-xs ${cls}`}>{status}</span>
}
export default StatusBadge
