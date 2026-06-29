import type { ModuleProps } from '../../../types'

const CHECKS = [
  { key: 'inbox-cleared', label: 'Inbox 已清空' },
  { key: 'someday-reviewed', label: 'Someday 列表已回顾' },
  { key: 'mit-confirmed', label: '明日 MIT 已确认' },
]

export function GTDCheck({ responses, onChange }: ModuleProps) {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-gray-700">GTD 清单检查</h3>
      {CHECKS.map((c) => (
        <label key={c.key} className="flex items-center gap-2 text-sm text-gray-600">
          <input
            type="checkbox"
            checked={responses[c.key] === 'true'}
            onChange={(e) => onChange(c.key, String(e.target.checked))}
            className="rounded"
          />
          {c.label}
        </label>
      ))}
    </div>
  )
}
