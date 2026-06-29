import { describe, it, expect, beforeEach } from 'vitest'
import { getAllTasks, saveTask, updateTask, deleteTask, getInboxTasks } from '../../src/store/tasks'
import type { Task } from '../../src/types'

beforeEach(() => localStorage.clear())

function makeTask(overrides: Partial<Task> = {}): Task {
  return {
    id: 'task-1',
    title: 'Test task',
    context: 'Work',
    type: 'next-action',
    priority: 'P1',
    status: 'inbox',
    estimatedMinutes: null,
    actualMinutes: null,
    is2Min: false,
    parentId: null,
    date: '2026-06-29',
    createdAt: new Date().toISOString(),
    completedAt: null,
    notes: '',
    interruptions: [],
    ...overrides,
  }
}

describe('saveTask / getAllTasks', () => {
  it('saves and retrieves a task', () => {
    saveTask(makeTask())
    expect(getAllTasks()).toHaveLength(1)
  })
})

describe('updateTask', () => {
  it('patches status', () => {
    saveTask(makeTask())
    updateTask('task-1', { status: 'done' })
    expect(getAllTasks()[0].status).toBe('done')
  })
})

describe('deleteTask', () => {
  it('removes task', () => {
    saveTask(makeTask())
    deleteTask('task-1')
    expect(getAllTasks()).toHaveLength(0)
  })
})

describe('getInboxTasks', () => {
  it('returns only inbox tasks', () => {
    saveTask(makeTask({ id: 't1', status: 'inbox' }))
    saveTask(makeTask({ id: 't2', status: 'today' }))
    expect(getInboxTasks()).toHaveLength(1)
  })
})
