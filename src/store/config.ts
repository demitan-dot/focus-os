import { storageGet, storageSet } from './storage'
import type { Config, ReviewModule } from '../types'

const KEY = 'config'

const DEFAULT_DAILY_MODULES: ReviewModule[] = ['gtd-check', 'success-journal', 'mistake-log']
const DEFAULT_WEEKLY_MODULES: ReviewModule[] = ['gtd-check', 'four-l']
const DEFAULT_MONTHLY_MODULES: ReviewModule[] = ['stop-start-continue', 'free-write']

function defaultConfig(): Config {
  return {
    userName: '',
    claudeApiKey: '',
    contexts: [
      { id: 'work', name: 'Work', color: 'indigo' },
      { id: 'personal', name: 'Personal', color: 'green' },
      { id: 'learning', name: 'Learning', color: 'amber' },
    ],
    defaultReviewModules: {
      daily: DEFAULT_DAILY_MODULES,
      weekly: DEFAULT_WEEKLY_MODULES,
      monthly: DEFAULT_MONTHLY_MODULES,
    },
  }
}

export function getConfig(): Config {
  return storageGet<Config>(KEY) ?? defaultConfig()
}

export function saveConfig(config: Config): void {
  storageSet(KEY, config)
}
