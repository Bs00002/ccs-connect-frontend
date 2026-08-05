export function Modal({children}:{children?:any}){
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded p-4 max-w-2xl w-full">{children}</div>
    </div>
  )
}
export default Modal
