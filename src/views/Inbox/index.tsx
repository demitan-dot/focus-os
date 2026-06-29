import { useState } from 'react'
import { QuickCapture } from './QuickCapture'
import { ClarifyItem } from './ClarifyItem'
import { getInboxTasks, saveTask } from '../../store/tasks'
import { getConfig } from '../../store/config'
import { classifyTasks } from '../../ai/classify'
import type { Task } from '../../types'

function makeId() { return `task-${Date.now()}-${Math.random().toString(36).slice(2, 7)}` }
function today() { return new Date().toISOString().slice(0, 10) }

export function InboxView({ onCountChange }: { onCountChange: (n: number) => void }) {
  const [tasks, setTasks] = useState<Task[]>(getInboxTasks)

  function refresh() {
    const updated = getInboxTasks()
    setTasks(updated)
    onCountChange(updated.length)
  }

  async function handleCapture(title: string) {
    const config = getConfig()
    const base: Task = {
      id: makeId(), title, context: 'Work', type: 'next-action',
      priority: 'P1', status: 'inbox', estimatedMinutes: null,
      actualMinutes: null, is2Min: false, parentId: null,
      date: today(), createdAt: new Date().toISOString(),
      completedAt: null, notes: '', interruptions: [],
    }
    saveTask(base)
    refresh()
    if (config.claudeApiKey) {
      try {
        const [classified] = await classifyTasks(title, config.contexts.map((c) => c.name), config.claudeApiKey)
        if (classified) {
          saveTask({ ...base, context: classified.context, priority: classified.priority, is2Min: classified.is2Min, type: classified.type })
          refresh()
        }
      } catch { /* silent — base task already saved */ }
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <h1 className="text-lg font-semibold text-gray-900">
        Inbox <span className="text-sm font-normal text-gray-400">— 捕捉一切，稍后处理</span>
      </h1>
      <QuickCapture onCapture={handleCapture} />
      {tasks.length === 0
        ? <p className="py-8 text-center text-sm text-gray-400">Inbox 已清空 ✓</p>
        : (
          <div className="space-y-2">
            <p className="text-sm text-gray-500">{tasks.length} 条待处理 — 逐一确认去向</p>
            {tasks.map((t) => <ClarifyItem key={t.id} task={t} onAction={refresh} />)}
          </div>
        )}
    </div>
  )
}
