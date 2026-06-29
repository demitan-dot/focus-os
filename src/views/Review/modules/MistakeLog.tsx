import type { ModuleProps } from '../../../types'

const FIELDS = [
  { key: 'mistake', label: '踩了什么坑？', placeholder: '具体描述...' },
  { key: 'root-cause', label: '根因是什么？', placeholder: '为什么发生...' },
  { key: 'prevention', label: '下次如何预防？', placeholder: '具体行动...' },
]

export function MistakeLog({ responses, onChange }: ModuleProps) {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-gray-700">错题本</h3>
      {FIELDS.map((f) => (
        <div key={f.key}>
          <p className="mb-1 text-xs text-gray-500">{f.label}</p>
          <textarea
            rows={2}
            className="w-full rounded border border-gray-200 p-2 text-sm focus:border-indigo-400 focus:outline-none"
            placeholder={f.placeholder}
            value={(responses[f.key] as string) ?? ''}
            onChange={(e) => onChange(f.key, e.target.value)}
          />
        </div>
      ))}
    </div>
  )
}
