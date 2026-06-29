import { describe, it, expect } from 'vitest'
import { parseClassifyResponse } from '../../src/ai/classify'

describe('parseClassifyResponse', () => {
  it('parses valid JSON array from AI response', () => {
    const raw = JSON.stringify([
      { title: 'Write blog post', context: 'SEO', priority: 'P0', is2Min: false, type: 'next-action', estimatedMinutes: 60 },
    ])
    const result = parseClassifyResponse(raw)
    expect(result).toHaveLength(1)
    expect(result[0].title).toBe('Write blog post')
  })

  it('returns empty array on malformed JSON', () => {
    expect(parseClassifyResponse('not json')).toEqual([])
  })

  it('strips markdown code fences if present', () => {
    const raw = '```json\n[{"title":"t","context":"c","priority":"P1","is2Min":false,"type":"next-action","estimatedMinutes":null}]\n```'
    expect(parseClassifyResponse(raw)).toHaveLength(1)
  })
})
