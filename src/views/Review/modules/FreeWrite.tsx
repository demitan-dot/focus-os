import type { ModuleProps } from '../../../types'

export function FreeWrite({ responses, onChange }: ModuleProps) {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-gray-700">自由记录</h3>
      <p className="text-xs text-gray-400">无结构随想，写什么都行</p>
      <textarea
        rows={5}
        className="w-full rounded border border-gray-200 p-2 text-sm focus:border-indigo-400 focus:outline-none"
        placeholder="今天有什么想记下来的..."
        value={(responses['free'] as string) ?? ''}
        onChange={(e) => onChange('free', e.target.value)}
      />
    </div>
  )
}
