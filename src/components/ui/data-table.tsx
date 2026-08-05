import { useMemo, useState } from 'react'
import { cn } from '../../lib/utils'
import { Button } from './button'

export type Column<T> = {
  key: string
  label: string
  render?: (row: T) => React.ReactNode
  sortable?: boolean
}

interface DataTableProps<T> {
  columns: Column<T>[]
  data: T[]
  pageSize?: number
  className?: string
}

export function DataTable<T extends { id?: string | number }>({ columns, data, pageSize = 10, className }: DataTableProps<T>) {
  const [query, setQuery] = useState('')
  const [sortKey, setSortKey] = useState<string | null>(null)
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')
  const [page, setPage] = useState(1)
  const [selected, setSelected] = useState<Record<string, boolean>>({})

  const filtered = useMemo(() => {
    if (!query) return data
    const q = query.toLowerCase()
    return data.filter((row) => Object.values(row).some((v) => String(v).toLowerCase().includes(q)))
  }, [data, query])

  const sorted = useMemo(() => {
    if (!sortKey) return filtered
    return [...filtered].sort((a: any, b: any) => {
      const va = a[sortKey as keyof T]
      const vb = b[sortKey as keyof T]
      if (va == null) return 1
      if (vb == null) return -1
      const cmp = String(va).localeCompare(String(vb), 'en', { numeric: true })
      return sortDir === 'asc' ? cmp : -cmp
    })
  }, [filtered, sortKey, sortDir])

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize))
  const pageData = sorted.slice((page - 1) * pageSize, page * pageSize)

  function toggleSelectAll(checked: boolean) {
    const newSel: Record<string, boolean> = {}
    pageData.forEach((row) => { if (row.id != null) newSel[String(row.id)] = checked })
    setSelected((s) => ({ ...s, ...newSel }))
  }

  function toggleSelectRow(id?: string | number) {
    if (id == null) return
    setSelected((s) => ({ ...s, [String(id)]: !s[String(id)] }))
  }

  function exportCSV(rows: T[]) {
    const header = columns.map((c) => c.label).join(',')
    const body = rows.map((r) => columns.map((c) => {
      const v = c.render ? c.render(r) : (r as any)[c.key]
      const text = typeof v === 'string' || typeof v === 'number' ? String(v) : ''
      return '"' + text.replace(/"/g, '""') + '"'
    }).join(',')).join('\n')
    const csv = [header, body].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'export.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className={cn('w-full', className)}>
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <input value={query} onChange={(e) => { setQuery(e.target.value); setPage(1) }} placeholder="Search..." className="rounded-2xl border px-4 py-2 text-sm outline-none" />
          <Button variant="outline" size="sm" onClick={() => exportCSV(sorted)}>Export CSV</Button>
        </div>
        <div className="text-sm text-slate-600">Showing {sorted.length} results</div>
      </div>

      <div className="overflow-x-auto rounded-2xl border">
        <table className="min-w-full table-auto text-left text-sm">
          <thead className="bg-slate-100 text-slate-600">
            <tr>
              <th className="px-4 py-3">
                <input type="checkbox" onChange={(e) => toggleSelectAll(e.target.checked)} />
              </th>
              {columns.map((col) => (
                <th key={col.key} className="px-4 py-3 font-medium">
                  <div className="flex items-center gap-2">
                    <button className="font-medium" onClick={() => { if (col.sortable) { if (sortKey === col.key) setSortDir(sortDir === 'asc' ? 'desc' : 'asc'); else { setSortKey(col.key); setSortDir('asc') } } }}>
                      {col.label}
                    </button>
                    {sortKey === col.key ? <span className="text-xs">{sortDir === 'asc' ? '↑' : '↓'}</span> : null}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageData.length === 0 ? (
              <tr><td colSpan={columns.length + 1} className="p-6 text-center text-sm text-slate-500">No records</td></tr>
            ) : pageData.map((row) => (
              <tr key={String(row.id)} className="border-t">
                <td className="px-4 py-3">
                  <input type="checkbox" checked={!!selected[String(row.id)]} onChange={() => toggleSelectRow(row.id)} />
                </td>
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3 align-top">
                    {col.render ? col.render(row) : String((row as any)[col.key] ?? '')}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <span>Page</span>
          <select value={page} onChange={(e) => setPage(Number(e.target.value))} className="rounded px-3 py-1">
            {Array.from({ length: totalPages }).map((_, i) => (
              <option key={i} value={i + 1}>{i + 1}</option>
            ))}
          </select>
          <span>of {totalPages}</span>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.max(1, p - 1))}>Prev</Button>
          <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>Next</Button>
        </div>
      </div>
    </div>
  )
}

export default DataTable
