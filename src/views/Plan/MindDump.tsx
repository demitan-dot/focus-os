import { useState } from 'react'

interface Props {
  onSubmit: (text: string) => void
  loading: boolean
}

export function MindDump({ onSubmit, loading }: Props) {
  const [text, setText] = useState('')

  return (
    <div className="space-y-3">
      <p className="text-sm text-gray-500">把今天要做的所有事情一次性倒出来 ↓</p>
      <textarea
        className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        rows={6}
        placeholder="写博客、回复邮件、准备周会PPT、买咖啡豆..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        onClick={() => onSubmit(text)}
        disabled={loading || !text.trim()}
        className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-50 hover:bg-indigo-700"
      >
        {loading ? 'AI 整理中...' : 'AI 整理 →'}
      </button>
    </div>
  )
}
