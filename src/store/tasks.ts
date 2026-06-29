import { storageGet, storageSet } from './storage'
import type { Task, TaskStatus } from '../types'

const KEY = 'tasks'

export function getAllTasks(): Task[] {
  return storageGet<Task[]>(KEY) ?? []
}

export function saveTask(task: Task): void {
  const tasks = getAllTasks().filter((t) => t.id !== task.id)
  storageSet(KEY, [...tasks, task])
}

export function updateTask(id: string, patch: Partial<Task>): void {
  const tasks = getAllTasks().map((t) => (t.id === id ? { ...t, ...patch } : t))
  storageSet(KEY, tasks)
}

export function deleteTask(id: string): void {
  storageSet(KEY, getAllTasks().filter((t) => t.id !== id))
}

export function getTasksByStatus(status: TaskStatus): Task[] {
  return getAllTasks().filter((t) => t.status === status)
}

export function getInboxTasks(): Task[] {
  return getTasksByStatus('inbox')
}

export function getTodayTasks(): Task[] {
  return getTasksByStatus('today')
}

export function getSomedayTasks(): Task[] {
  return getTasksByStatus('someday')
}
