import { describe, it, expect, beforeEach } from 'vitest'
import { storageGet, storageSet, storageRemove } from '../../src/store/storage'

beforeEach(() => localStorage.clear())

describe('storageSet / storageGet', () => {
  it('stores and retrieves a value', () => {
    storageSet('test-key', { x: 1 })
    expect(storageGet('test-key')).toEqual({ x: 1 })
  })

  it('returns null for missing key', () => {
    expect(storageGet('missing')).toBeNull()
  })

  it('returns null when stored value is malformed JSON', () => {
    localStorage.setItem('focus-os:bad', 'not-json{')
    expect(storageGet('bad')).toBeNull()
  })
})

describe('storageRemove', () => {
  it('removes a key', () => {
    storageSet('to-remove', 42)
    storageRemove('to-remove')
    expect(storageGet('to-remove')).toBeNull()
  })
})
