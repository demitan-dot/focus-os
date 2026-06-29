import { useState } from 'react'

interface Props { onCapture: (title: string) => void }

export function QuickCapture({ onCapture }: Props) {
  const [value, setValue] = useState('')

  function submit() {
    if (!value.trim()) return
    onCapture(value.trim())
    setValue('')
  }

  return (
    <div className="flex gap-2">
      <input
        autoFocus
        className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        placeholder="快速捕捉 — 按回车存入 Inbox"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && submit()}
      />
      <button onClick={submit} className="rounded-lg bg-indigo-600 px-3 py-2 text-sm text-white hover:bg-indigo-700">
        存入
      </button>
    </div>
  )
}
