export function Stepper({steps,active}:{steps:string[],active?:number}){
  return (
    <div className="flex gap-2">
      {steps.map((s,i)=> <div key={i} className={`px-3 py-1 rounded ${i===active? 'bg-blue-600 text-white':'bg-slate-100'}`}>{s}</div>)}
    </div>
  )
}
export default Stepper
