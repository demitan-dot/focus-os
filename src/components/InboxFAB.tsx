import { useEffect, useState } from 'react'
import { saveTask } from '../store/tasks'
import { getConfig } from '../store/config'
import { classifyTasks } from '../ai/classify'
import type { Task } from '../types'

function makeId() { return `task-${Date.now()}-${Math.random().toString(36).slice(2, 7)}` }
function today() { return new Date().toISOString().slice(0, 10) }

interface Props { onCaptured: () => void }

export function InboxFAB({ onCaptured }: Props) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'i') { e.preventDefault(); setOpen(true) }
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  async function submit() {
    if (!value.trim()) return
    const config = getConfig()
    const task: Task = {
      id: makeId(), title: value.trim(), context: 'Work', type: 'next-action',
      priority: 'P1', status: 'inbox', estimatedMinutes: null, actualMinutes: null,
      is2Min: false, parentId: null, date: today(), createdAt: new Date().toISOString(),
      completedAt: null, notes: '', interruptions: [],
    }
    saveTask(task)
    setValue('')
    setOpen(false)
    onCaptured()
    if (config.claudeApiKey) {
      try {
        const [c] = await classifyTasks(task.title, config.contexts.map((x) => x.name), config.claudeApiKey)
        if (c) { saveTask({ ...task, context: c.context, priority: c.priority, is2Min: c.is2Min }); onCaptured() }
      } catch { /* silent */ }
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-2xl text-white shadow-lg hover:bg-indigo-700"
        title="快速捕捉 (Cmd+I)"
      >
        +
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setOpen(false)}>
          <div className="w-full max-w-md rounded-xl bg-white p-4 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <p className="mb-2 text-sm font-medium text-gray-700">快速捕捉</p>
            <div className="flex gap-2">
              <input
                autoFocus
                className="flex-1 rounded border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
                placeholder="按回车保存..."
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') submit(); if (e.key === 'Escape') setOpen(false) }}
              />
              <button onClick={submit} className="rounded bg-indigo-600 px-3 py-2 text-sm text-white">保存</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
