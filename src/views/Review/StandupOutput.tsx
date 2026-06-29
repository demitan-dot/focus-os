import { useState } from 'react'
import type { ReviewOutput } from '../../ai/review'

interface Props { output: ReviewOutput }

export function StandupOutput({ output }: Props) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    const text = `${output.standupOutput}\n\n明日MIT:\n${output.tomorrowMIT.map((m, i) => `${i + 1}. ${m}`).join('\n')}`
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-3 rounded-xl border border-indigo-100 bg-indigo-50 p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-indigo-800">明日早会内容</h3>
        <button onClick={copy} className="rounded bg-indigo-600 px-3 py-1 text-xs text-white hover:bg-indigo-700">
          {copied ? '已复制 ✓' : '一键复制'}
        </button>
      </div>
      <pre className="font-sans text-sm leading-relaxed whitespace-pre-wrap text-gray-800">{output.standupOutput}</pre>
      {output.tomorrowMIT.length > 0 && (
        <div>
          <p className="mb-1 text-xs font-semibold text-indigo-700">明日 MIT（最重要的事）</p>
          <ol className="list-inside list-decimal space-y-1">
            {output.tomorrowMIT.map((m, i) => <li key={i} className="text-sm text-gray-700">{m}</li>)}
          </ol>
        </div>
      )}
      {output.insight && (
        <p className="border-t border-indigo-100 pt-2 text-xs text-gray-500">💡 {output.insight}</p>
      )}
    </div>
  )
}
