import type { ModuleProps } from '../../../types'

export function Gratitude({ responses, onChange }: ModuleProps) {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-gray-700">每日感激</h3>
      <p className="text-xs text-gray-400">今天感激的三件事（可以很小）</p>
      {[1, 2, 3].map((n) => (
        <input
          key={n}
          className="w-full rounded border border-gray-200 px-3 py-1.5 text-sm focus:border-indigo-400 focus:outline-none"
          placeholder={`感激 ${n}...`}
          value={(responses[`gratitude-${n}`] as string) ?? ''}
          onChange={(e) => onChange(`gratitude-${n}`, e.target.value)}
        />
      ))}
    </div>
  )
}
