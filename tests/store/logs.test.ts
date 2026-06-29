import { describe, it, expect, beforeEach } from 'vitest'
import { getDailyLog, saveDailyLog } from '../../src/store/logs'

beforeEach(() => localStorage.clear())

describe('getDailyLog', () => {
  it('returns default empty log for new date', () => {
    const log = getDailyLog('2026-06-29')
    expect(log.date).toBe('2026-06-29')
    expect(log.completedTaskIds).toEqual([])
  })
})

describe('saveDailyLog', () => {
  it('persists and retrieves log', () => {
    const log = getDailyLog('2026-06-29')
    log.standupOutput = 'test standup'
    saveDailyLog(log)
    expect(getDailyLog('2026-06-29').standupOutput).toBe('test standup')
  })
})
