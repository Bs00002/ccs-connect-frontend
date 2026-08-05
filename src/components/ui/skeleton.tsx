export function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse bg-slate-100 ${className}`} />
}
