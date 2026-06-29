import { useState } from 'react'
import { MindDump } from './MindDump'
import { TaskList } from './TaskList'
import { classifyTasks } from '../../ai/classify'
import { getConfig } from '../../store/config'
import { saveTask, getTodayTasks, updateTask } from '../../store/tasks'
import type { Task, Priority } from '../../types'

function makeId() { return `task-${Date.now()}-${Math.random().toString(36).slice(2, 7)}` }
function today() { return new Date().toISOString().slice(0, 10) }

export function PlanView() {
  const [staged, setStaged] = useState<Task[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [todayTasks, setTodayTasks] = useState<Task[]>(getTodayTasks)

  async function handleDump(text: string) {
    setError('')
    setLoading(true)
    try {
      const config = getConfig()
      if (!config.claudeApiKey) {
        setError('请先在 Settings 里填写 Claude API Key')
        setLoading(false)
        return
      }
      const classified = await classifyTasks(text, config.contexts.map((c) => c.name), config.claudeApiKey)
      const tasks: Task[] = classified.map((c) => ({
        id: makeId(),
        title: c.title,
        context: c.context,
        type: c.type,
        priority: c.priority,
        status: 'inbox' as const,
        estimatedMinutes: c.estimatedMinutes,
        actualMinutes: null,
        is2Min: c.is2Min,
        parentId: null,
        date: today(),
        createdAt: new Date().toISOString(),
        completedAt: null,
        notes: '',
        interruptions: [],
      }))
      tasks.forEach(saveTask)
      setStaged(tasks)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'AI 调用失败')
    } finally {
      setLoading(false)
    }
  }

  function handlePriority(id: string, priority: Priority) {
    updateTask(id, { priority })
    setStaged((prev) => prev.map((t) => t.id === id ? { ...t, priority } : t))
  }

  function handleStatus(id: string, status: 'today' | 'someday' | 'dropped') {
    updateTask(id, { status })
    setStaged((prev) => prev.filter((t) => t.id !== id))
    setTodayTasks(getTodayTasks())
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="text-lg font-semibold text-gray-900">今日规划</h1>
      <MindDump onSubmit={handleDump} loading={loading} />
      {error && <p className="text-sm text-red-600">{error}</p>}
      {staged.length > 0 && (
        <div>
          <p className="mb-2 text-sm font-medium text-gray-700">AI 整理结果 — 确认后加入今日 / 推至以后</p>
          <TaskList tasks={staged} onPriorityChange={handlePriority} onStatusChange={handleStatus} />
        </div>
      )}
      {todayTasks.length > 0 && (
        <div>
          <p className="mb-2 text-sm font-medium text-gray-700">今日任务池</p>
          <TaskList
            tasks={todayTasks}
            onPriorityChange={(id, p) => { updateTask(id, { priority: p }); setTodayTasks(getTodayTasks()) }}
            onStatusChange={(id, s) => { updateTask(id, { status: s }); setTodayTasks(getTodayTasks()) }}
          />
        </div>
      )}
    </div>
  )
}
