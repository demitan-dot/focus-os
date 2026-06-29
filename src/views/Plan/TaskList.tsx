import type { Task, Priority } from '../../types'

const PRIORITY_COLORS: Record<Priority, string> = {
  P0: 'bg-red-100 text-red-700',
  P1: 'bg-yellow-100 text-yellow-700',
  P2: 'bg-gray-100 text-gray-600',
}

interface Props {
  tasks: Task[]
  onPriorityChange: (id: string, p: Priority) => void
  onStatusChange: (id: string, status: 'today' | 'someday' | 'dropped') => void
}

export function TaskList({ tasks, onPriorityChange, onStatusChange }: Props) {
  if (tasks.length === 0) return null

  return (
    <ul className="space-y-2">
      {tasks.map((t) => (
        <li key={t.id} className="flex items-start gap-3 rounded-lg border border-gray-200 bg-white p-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-gray-900">{t.title}</p>
            <div className="mt-1 flex flex-wrap gap-1">
              <span className="rounded px-1.5 py-0.5 text-xs bg-indigo-50 text-indigo-600">{t.context}</span>
              <span className={`rounded px-1.5 py-0.5 text-xs ${PRIORITY_COLORS[t.priority]}`}>{t.priority}</span>
              {t.is2Min && <span className="rounded px-1.5 py-0.5 text-xs bg-green-50 text-green-600">⚡ 2min</span>}
            </div>
          </div>
          <div className="flex shrink-0 gap-1">
            {(['P0', 'P1', 'P2'] as Priority[]).map((p) => (
              <button
                key={p}
                onClick={() => onPriorityChange(t.id, p)}
                className={`rounded px-1.5 py-0.5 text-xs ${t.priority === p ? PRIORITY_COLORS[p] : 'bg-gray-50 text-gray-400'}`}
              >
                {p}
              </button>
            ))}
            <button onClick={() => onStatusChange(t.id, 'today')} className="rounded bg-indigo-600 px-2 py-0.5 text-xs text-white">今日</button>
            <button onClick={() => onStatusChange(t.id, 'someday')} className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600">以后</button>
          </div>
        </li>
      ))}
    </ul>
  )
}
