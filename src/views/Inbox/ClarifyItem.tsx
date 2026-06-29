import type { Task } from '../../types'
import { updateTask } from '../../store/tasks'

interface Props { task: Task; onAction: () => void }

export function ClarifyItem({ task, onAction }: Props) {
  function act(status: 'today' | 'someday' | 'dropped') {
    updateTask(task.id, { status })
    onAction()
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-3">
      <p className="text-sm font-medium text-gray-900">{task.title}</p>
      {task.is2Min && (
        <p className="mt-1 text-xs font-medium text-green-600">⚡ 预估不到 2 分钟 — 立刻做，不要放系统</p>
      )}
      <div className="mt-2 flex gap-2">
        <button onClick={() => act('today')} className="rounded bg-indigo-600 px-3 py-1 text-xs text-white">加入今日</button>
        <button onClick={() => act('someday')} className="rounded bg-gray-100 px-3 py-1 text-xs text-gray-700">Someday</button>
        <button onClick={() => act('dropped')} className="rounded bg-red-50 px-3 py-1 text-xs text-red-600">删除</button>
      </div>
    </div>
  )
}
