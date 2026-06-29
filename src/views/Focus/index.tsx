import { useState, useCallback, useEffect } from 'react'
import { Timer } from './Timer'
import { InterruptModal } from './InterruptModal'
import { getTodayTasks, updateTask } from '../../store/tasks'
import { getDailyLog, saveDailyLog } from '../../store/logs'
import type { Task } from '../../types'

function today() { return new Date().toISOString().slice(0, 10) }

function sortedByPriority(tasks: Task[]): Task[] {
  const order = { P0: 0, P1: 1, P2: 2 }
  return [...tasks].sort((a, b) => order[a.priority] - order[b.priority])
}

export function FocusView() {
  const [tasks, setTasks] = useState<Task[]>(() => sortedByPriority(getTodayTasks()))
  const [currentIdx] = useState(0)
  const [running, setRunning] = useState(false)
  const [elapsedSeconds, setElapsedSeconds] = useState(0)
  const [showInterrupt, setShowInterrupt] = useState(false)
  const [interruptStart, setInterruptStart] = useState(0)

  const current = tasks[currentIdx] ?? null

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (e.key === ' ' && !showInterrupt) { e.preventDefault(); setRunning((r) => !r) }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [showInterrupt])

  const handleTick = useCallback((s: number) => setElapsedSeconds(s), [])

  function handleComplete() {
    if (!current) return
    setRunning(false)
    const minutes = Math.round(elapsedSeconds / 60)
    updateTask(current.id, { status: 'done', actualMinutes: minutes, completedAt: new Date().toISOString() })
    const log = getDailyLog(today())
    saveDailyLog({ ...log, completedTaskIds: [...log.completedTaskIds, current.id] })
    setElapsedSeconds(0)
    setTasks(sortedByPriority(getTodayTasks()))
  }

  function handleInterruptClick() {
    setRunning(false)
    setInterruptStart(elapsedSeconds)
    setShowInterrupt(true)
  }

  function handleInterruptConfirm(reason: string) {
    if (!current) return
    const durationMinutes = Math.round((elapsedSeconds - interruptStart) / 60)
    const interruption = { timestamp: new Date().toISOString(), reason, durationMinutes }
    updateTask(current.id, { interruptions: [...current.interruptions, interruption] })
    setShowInterrupt(false)
  }

  if (tasks.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4">
        <p className="text-2xl">🎉</p>
        <p className="text-lg font-medium text-gray-700">今日任务全部完成！</p>
        <p className="text-sm text-gray-400">去 Review 做今日复盘 →</p>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col items-center justify-center gap-8">
      {showInterrupt && (
        <InterruptModal onConfirm={handleInterruptConfirm} onCancel={() => setShowInterrupt(false)} />
      )}
      <div className="text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-indigo-600">{current?.context}</p>
        <h2 className="mt-2 text-2xl font-semibold text-gray-900">{current?.title}</h2>
        <p className="mt-1 text-sm text-gray-400">{currentIdx + 1} / {tasks.length}</p>
      </div>
      <Timer running={running} onTick={handleTick} />
      <div className="flex gap-3">
        <button
          onClick={() => setRunning((r) => !r)}
          className="rounded-full bg-indigo-600 px-8 py-3 text-sm font-medium text-white hover:bg-indigo-700"
        >
          {running ? '暂停' : '开始'} <span className="text-xs text-indigo-200">(Space)</span>
        </button>
        <button onClick={handleComplete} className="rounded-full bg-green-600 px-6 py-3 text-sm font-medium text-white hover:bg-green-700">
          完成 ✓
        </button>
        <button onClick={handleInterruptClick} className="rounded-full bg-orange-100 px-6 py-3 text-sm font-medium text-orange-700 hover:bg-orange-200">
          打断 →
        </button>
      </div>
    </div>
  )
}
