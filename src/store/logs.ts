import { storageGet, storageSet } from './storage'
import type { DailyLog, WeeklyLog } from '../types'

function defaultDailyLog(date: string): DailyLog {
  return {
    date,
    plannedTaskIds: [],
    completedTaskIds: [],
    review: { modules: [], responses: {}, energyLevel: null },
    standupOutput: '',
    tomorrowMIT: [],
  }
}

export function getDailyLog(date: string): DailyLog {
  const all = storageGet<Record<string, DailyLog>>('daily-logs') ?? {}
  return all[date] ?? defaultDailyLog(date)
}

export function saveDailyLog(log: DailyLog): void {
  const all = storageGet<Record<string, DailyLog>>('daily-logs') ?? {}
  storageSet('daily-logs', { ...all, [log.date]: log })
}

export function getWeeklyLog(weekStart: string): WeeklyLog {
  const all = storageGet<Record<string, WeeklyLog>>('weekly-logs') ?? {}
  return all[weekStart] ?? {
    weekStartDate: weekStart,
    completedByContext: {},
    review: { modules: [], responses: {} },
    standupOutput: '',
    nextWeekMIT: [],
  }
}

export function saveWeeklyLog(log: WeeklyLog): void {
  const all = storageGet<Record<string, WeeklyLog>>('weekly-logs') ?? {}
  storageSet('weekly-logs', { ...all, [log.weekStartDate]: log })
}
