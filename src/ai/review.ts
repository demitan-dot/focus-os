import { callClaude } from './client'
import type { Task, DailyLog } from '../types'

export interface ReviewOutput {
  standupOutput: string
  tomorrowMIT: string[]
  insight: string
}

export function parseReviewResponse(raw: string): ReviewOutput {
  try {
    const cleaned = raw.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
    const parsed = JSON.parse(cleaned)
    return {
      standupOutput: parsed.standupOutput ?? '',
      tomorrowMIT: Array.isArray(parsed.tomorrowMIT) ? parsed.tomorrowMIT.slice(0, 3) : [],
      insight: parsed.insight ?? '',
    }
  } catch {
    return { standupOutput: '', tomorrowMIT: [], insight: '' }
  }
}

export async function generateDailyReview(
  log: DailyLog,
  allTasks: Task[],
  apiKey: string,
): Promise<ReviewOutput> {
  const completed = allTasks.filter((t) => log.completedTaskIds.includes(t.id))
  const planned = allTasks.filter((t) => log.plannedTaskIds.includes(t.id))
  const remaining = planned.filter((t) => !log.completedTaskIds.includes(t.id))
  const totalInterruptions = completed.reduce((sum, t) => sum + t.interruptions.length, 0)
  const byContext = completed.reduce<Record<string, string[]>>((acc, t) => {
    acc[t.context] = acc[t.context] ?? []
    acc[t.context].push(t.title)
    return acc
  }, {})

  const reviewText = Object.entries(log.review.responses)
    .map(([mod, val]) => `[${mod}]: ${Array.isArray(val) ? val.join('; ') : val}`)
    .join('\n')

  const prompt = `You are a GTD coach. Generate a morning standup report for tomorrow and 3 MIT recommendations.

Today's date: ${log.date}
Completed tasks by context:
${JSON.stringify(byContext, null, 2)}

Remaining tasks not completed: ${remaining.map((t) => t.title).join(', ') || 'none'}
Total interruptions today: ${totalInterruptions}

User's review notes:
${reviewText || '(none)'}

Output a JSON object:
{
  "standupOutput": "SMART format standup for tomorrow morning meeting. Group by context. Each item: [Context] specific action + measurable result. Keep under 200 words total.",
  "tomorrowMIT": ["most important task 1", "most important task 2", "most important task 3"],
  "insight": "One sentence observation about today's time/focus patterns"
}

Output ONLY valid JSON.`

  const raw = await callClaude(apiKey, 'claude-sonnet-4-6', [{ role: 'user', content: prompt }], 1024)
  return parseReviewResponse(raw)
}
