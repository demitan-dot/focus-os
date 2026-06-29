import { useState } from 'react'
import { getConfig, saveConfig } from '../store/config'
import type { Config, UserContext } from '../types'

const COLORS = ['indigo', 'green', 'amber', 'red', 'purple', 'teal', 'orange', 'sky']

export function SettingsView() {
  const [config, setConfig] = useState<Config>(getConfig)
  const [saved, setSaved] = useState(false)

  function save() {
    saveConfig(config)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  function updateContext(id: string, patch: Partial<UserContext>) {
    setConfig((c) => ({ ...c, contexts: c.contexts.map((ctx) => ctx.id === id ? { ...ctx, ...patch } : ctx) }))
  }

  function addContext() {
    const id = `ctx-${Date.now()}`
    setConfig((c) => ({ ...c, contexts: [...c.contexts, { id, name: '新分类', color: 'indigo' }] }))
  }

  function removeContext(id: string) {
    setConfig((c) => ({ ...c, contexts: c.contexts.filter((ctx) => ctx.id !== id) }))
  }

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <h1 className="text-lg font-semibold text-gray-900">Settings</h1>

      <section className="space-y-2">
        <h2 className="text-sm font-semibold text-gray-700">Claude API Key</h2>
        <p className="text-xs text-gray-400">
          Key 仅存本地浏览器，不经过任何服务器。{' '}
          <a href="https://console.anthropic.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline">
            获取 Key →
          </a>
        </p>
        <input
          type="password"
          className="w-full rounded border border-gray-300 px-3 py-2 font-mono text-sm focus:border-indigo-500 focus:outline-none"
          placeholder="sk-ant-..."
          value={config.claudeApiKey}
          onChange={(e) => setConfig((c) => ({ ...c, claudeApiKey: e.target.value }))}
        />
      </section>

      <section className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-700">工作分类 (Contexts)</h2>
          <button onClick={addContext} className="rounded bg-indigo-50 px-2 py-1 text-xs text-indigo-600 hover:bg-indigo-100">+ 添加</button>
        </div>
        <div className="space-y-2">
          {config.contexts.map((ctx) => (
            <div key={ctx.id} className="flex items-center gap-2">
              <input
                className="flex-1 rounded border border-gray-200 px-2 py-1 text-sm focus:border-indigo-400 focus:outline-none"
                value={ctx.name}
                onChange={(e) => updateContext(ctx.id, { name: e.target.value })}
              />
              <select
                className="rounded border border-gray-200 px-2 py-1 text-sm"
                value={ctx.color}
                onChange={(e) => updateContext(ctx.id, { color: e.target.value })}
              >
                {COLORS.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              <button onClick={() => removeContext(ctx.id)} className="text-lg leading-none text-red-400 hover:text-red-600">×</button>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-2">
        <h2 className="text-sm font-semibold text-gray-700">你的名字</h2>
        <input
          className="rounded border border-gray-200 px-3 py-1.5 text-sm focus:border-indigo-400 focus:outline-none"
          placeholder="早会汇报里会用到"
          value={config.userName}
          onChange={(e) => setConfig((c) => ({ ...c, userName: e.target.value }))}
        />
      </section>

      <button onClick={save} className="rounded-lg bg-indigo-600 px-6 py-2 text-sm font-medium text-white hover:bg-indigo-700">
        {saved ? '已保存 ✓' : '保存'}
      </button>
    </div>
  )
}
