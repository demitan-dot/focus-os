import { useState, useCallback } from 'react'
import { ModuleSelector } from './ModuleSelector'
import { StandupOutput } from './StandupOutput'
import { GTDCheck } from './modules/GTDCheck'
import { SuccessJournal } from './modules/SuccessJournal'
import { MistakeLog } from './modules/MistakeLog'
import { Gratitude } from './modules/Gratitude'
import { FourL } from './modules/FourL'
import { StopStartContinue } from './modules/StopStartContinue'
import { FreeWrite } from './modules/FreeWrite'
import { getDailyLog, saveDailyLog } from '../../store/logs'
import { getAllTasks } from '../../store/tasks'
import { getConfig } from '../../store/config'
import { generateDailyReview, type ReviewOutput } from '../../ai/review'
import type { ReviewModule, ReviewResponses, ModuleProps } from '../../types'

function today() { return new Date().toISOString().slice(0, 10) }

const MODULE_COMPONENTS: Record<ReviewModule, React.ComponentType<ModuleProps>> = {
  'gtd-check': GTDCheck,
  'success-journal': SuccessJournal,
  'mistake-log': MistakeLog,
  'gratitude': Gratitude,
  'four-l': FourL,
  'stop-start-continue': StopStartContinue,
  'free-write': FreeWrite,
}

export function ReviewView() {
  const config = getConfig()
  const log = getDailyLog(today())
  const [modules, setModules] = useState<ReviewModule[]>(
    log.review.modules.length ? log.review.modules : config.defaultReviewModules.daily,
  )
  const [responses, setResponses] = useState<ReviewResponses>(log.review.responses)
  const [output, setOutput] = useState<ReviewOutput | null>(
    log.standupOutput ? { standupOutput: log.standupOutput, tomorrowMIT: log.tomorrowMIT, insight: '' } : null,
  )
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleResponseChange = useCallback((key: string, value: string | string[]) => {
    setResponses((prev) => {
      const updated = { ...prev, [key]: value }
      const current = getDailyLog(today())
      saveDailyLog({ ...current, review: { modules, responses: updated, energyLevel: null } })
      return updated
    })
  }, [modules])

  async function generate() {
    setError('')
    if (!config.claudeApiKey) { setError('请先在 Settings 填写 Claude API Key'); return }
    setLoading(true)
    const currentLog = { ...getDailyLog(today()), review: { modules, responses, energyLevel: null } }
    saveDailyLog(currentLog)
    try {
      const result = await generateDailyReview(currentLog, getAllTasks(), config.claudeApiKey)
      saveDailyLog({ ...currentLog, standupOutput: result.standupOutput, tomorrowMIT: result.tomorrowMIT })
      setOutput(result)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'AI 生成失败')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="text-lg font-semibold text-gray-900">日复盘</h1>
      <ModuleSelector selected={modules} onChange={setModules} />
      <hr className="border-gray-200" />
      <div className="space-y-6">
        {modules.map((m) => {
          const Component = MODULE_COMPONENTS[m]
          return <Component key={m} responses={responses} onChange={handleResponseChange} />
        })}
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button
        onClick={generate}
        disabled={loading}
        className="w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-medium text-white disabled:opacity-50 hover:bg-indigo-700"
      >
        {loading ? 'AI 生成中...' : '生成明日早会内容 →'}
      </button>
      {output && <StandupOutput output={output} />}
    </div>
  )
}
