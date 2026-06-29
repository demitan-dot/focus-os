import { describe, it, expect } from 'vitest'
import { parseReviewResponse } from '../../src/ai/review'

describe('parseReviewResponse', () => {
  it('parses valid review JSON', () => {
    const raw = JSON.stringify({
      standupOutput: '**SEO**: Published 2 blogs',
      tomorrowMIT: ['Write 2 blogs', 'GEO keyword research'],
      insight: '3 interruptions — avg 12 min each',
    })
    const result = parseReviewResponse(raw)
    expect(result.standupOutput).toContain('SEO')
    expect(result.tomorrowMIT).toHaveLength(2)
  })

  it('returns safe fallback on malformed JSON', () => {
    const result = parseReviewResponse('broken')
    expect(result.standupOutput).toBe('')
    expect(result.tomorrowMIT).toEqual([])
  })

  it('clamps tomorrowMIT to 3 items', () => {
    const raw = JSON.stringify({
      standupOutput: 'output',
      tomorrowMIT: ['a', 'b', 'c', 'd', 'e'],
      insight: '',
    })
    expect(parseReviewResponse(raw).tomorrowMIT).toHaveLength(3)
  })
})
