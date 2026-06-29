import type { ModuleProps } from '../../../types'

export function SuccessJournal({ responses, onChange }: ModuleProps) {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-gray-700">成功日记</h3>
      <p className="text-xs text-gray-400">今天赢了什么？（具体事项，1-3 条）</p>
      <textarea
        rows={3}
        className="w-full rounded border border-gray-200 p-2 text-sm focus:border-indigo-400 focus:outline-none"
        placeholder={"1. 完成了2篇高质量blog\n2. Reddit帖子获得了50个upvote\n3. ..."}
        value={(responses['wins'] as string) ?? ''}
        onChange={(e) => onChange('wins', e.target.value)}
      />
    </div>
  )
}
