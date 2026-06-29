import { callClaude } from './client'
import type { Priority, TaskType } from '../types'

export interface ClassifiedTask {
  title: string
  context: string
  priority: Priority
  is2Min: boolean
  type: TaskType
  estimatedMinutes: number | null
}

export function parseClassifyResponse(raw: string): ClassifiedTask[] {
  try {
    const cleaned = raw.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
    const parsed = JSON.parse(cleaned)
    if (!Array.isArray(parsed)) return []
    return parsed as ClassifiedTask[]
  } catch {
    return []
  }
}

export async function classifyTasks(
  rawText: string,
  contextNames: string[],
  apiKey: string,
): Promise<ClassifiedTask[]> {
  const prompt = `You are a GTD assistant. Parse the following raw task dump and classify each task.

Available contexts: ${contextNames.join(', ')}

For each task, output a JSON array with this shape:
[{
  "title": "concise task title",
  "context": "one of the available contexts",
  "priority": "P0" | "P1" | "P2",
  "is2Min": true | false,
  "type": "next-action" | "project" | "someday" | "reference",
  "estimatedMinutes": number | null
}]

Rules:
- P0 = must do today, blocks other work
- P1 = important, do today if possible
- P2 = nice to have
- is2Min = true if the task can realistically be done in under 2 minutes
- type = "project" if it requires more than one step
- Output ONLY valid JSON, no explanation

Raw task dump:
${rawText}`

  const raw = await callClaude(apiKey, 'claude-haiku-4-5-20251001', [{ role: 'user', content: prompt }], 2048)
  return parseClassifyResponse(raw)
}
