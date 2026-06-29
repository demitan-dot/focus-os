export type Priority = 'P0' | 'P1' | 'P2'
export type TaskStatus = 'inbox' | 'today' | 'someday' | 'done' | 'dropped'
export type TaskType = 'next-action' | 'project' | 'someday' | 'reference'
export type EnergyLevel = 'high' | 'medium' | 'low'
export type ReviewPeriod = 'daily' | 'weekly' | 'monthly'
export type ReviewModule =
  | 'gtd-check'
  | 'success-journal'
  | 'mistake-log'
  | 'gratitude'
  | 'four-l'
  | 'stop-start-continue'
  | 'free-write'

export interface Interruption {
  timestamp: string
  reason: string
  durationMinutes: number
}

export interface Task {
  id: string
  title: string
  context: string
  type: TaskType
  priority: Priority
  status: TaskStatus
  estimatedMinutes: number | null
  actualMinutes: number | null
  is2Min: boolean
  parentId: string | null
  date: string
  createdAt: string
  completedAt: string | null
  notes: string
  interruptions: Interruption[]
}

export interface ReviewResponses {
  [moduleId: string]: string | string[]
}

export interface ModuleProps {
  responses: ReviewResponses
  onChange: (key: string, value: string | string[]) => void
}

export interface DailyLog {
  date: string
  plannedTaskIds: string[]
  completedTaskIds: string[]
  review: {
    modules: ReviewModule[]
    responses: ReviewResponses
    energyLevel: EnergyLevel | null
  }
  standupOutput: string
  tomorrowMIT: string[]
}

export interface WeeklyLog {
  weekStartDate: string
  completedByContext: Record<string, number>
  review: {
    modules: ReviewModule[]
    responses: ReviewResponses
  }
  standupOutput: string
  nextWeekMIT: string[]
}

export interface UserContext {
  id: string
  name: string
  color: string
}

export interface Config {
  userName: string
  claudeApiKey: string
  contexts: UserContext[]
  defaultReviewModules: {
    daily: ReviewModule[]
    weekly: ReviewModule[]
    monthly: ReviewModule[]
  }
}
