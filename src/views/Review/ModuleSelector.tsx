import type { ReviewModule } from '../../types'

const MODULE_LABELS: Record<ReviewModule, string> = {
  'gtd-check': 'GTD 清单检查',
  'success-journal': '成功日记',
  'mistake-log': '错题本',
  'gratitude': '每日感激',
  'four-l': '4L 回顾（适合周/月）',
  'stop-start-continue': 'Stop·Start·Continue（适合周/月）',
  'free-write': '自由记录',
}

interface Props {
  selected: ReviewModule[]
  onChange: (modules: ReviewModule[]) => void
}

export function ModuleSelector({ selected, onChange }: Props) {
  function toggle(m: ReviewModule) {
    onChange(selected.includes(m) ? selected.filter((x) => x !== m) : [...selected, m])
  }
  return (
    <div className="space-y-1">
      <p className="mb-2 text-xs text-gray-500">选择今日复盘模块</p>
      {(Object.keys(MODULE_LABELS) as ReviewModule[]).map((m) => (
        <label key={m} className="flex items-center gap-2 text-sm text-gray-700">
          <input type="checkbox" checked={selected.includes(m)} onChange={() => toggle(m)} className="rounded" />
          {MODULE_LABELS[m]}
        </label>
      ))}
    </div>
  )
}
