import type { ModuleProps } from '../../../types'

const ITEMS = [
  { key: 'liked', label: 'Liked — 喜欢的', placeholder: '进展顺利的事...' },
  { key: 'learned', label: 'Learned — 学到的', placeholder: '新的认知或技能...' },
  { key: 'lacked', label: 'Lacked — 缺失的', placeholder: '缺少了什么...' },
  { key: 'longed', label: 'Longed for — 期待的', placeholder: '下周最想实现的...' },
]

export function FourL({ responses, onChange }: ModuleProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-gray-700">4L 回顾</h3>
      {ITEMS.map((item) => (
        <div key={item.key}>
          <p className="mb-1 text-xs font-medium text-gray-500">{item.label}</p>
          <textarea
            rows={2}
            className="w-full rounded border border-gray-200 p-2 text-sm focus:border-indigo-400 focus:outline-none"
            placeholder={item.placeholder}
            value={(responses[item.key] as string) ?? ''}
            onChange={(e) => onChange(item.key, e.target.value)}
          />
        </div>
      ))}
    </div>
  )
}
