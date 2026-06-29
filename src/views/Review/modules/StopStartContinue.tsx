import type { ModuleProps } from '../../../types'

const ITEMS = [
  { key: 'stop', label: 'Stop — 停止', placeholder: '应该停止的行为或习惯...' },
  { key: 'start', label: 'Start — 开始', placeholder: '应该开始的新行为...' },
  { key: 'continue', label: 'Continue — 继续', placeholder: '值得保持的行为...' },
]

export function StopStartContinue({ responses, onChange }: ModuleProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-gray-700">Stop · Start · Continue</h3>
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
