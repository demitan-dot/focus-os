import { describe, it, expect, beforeEach } from 'vitest'
import { getConfig, saveConfig } from '../../src/store/config'

beforeEach(() => localStorage.clear())

describe('getConfig', () => {
  it('returns default config when nothing stored', () => {
    const c = getConfig()
    expect(c.contexts.length).toBeGreaterThan(0)
    expect(c.claudeApiKey).toBe('')
  })
})

describe('saveConfig', () => {
  it('persists config and getConfig returns it', () => {
    const c = getConfig()
    c.claudeApiKey = 'sk-test'
    saveConfig(c)
    expect(getConfig().claudeApiKey).toBe('sk-test')
  })
})
