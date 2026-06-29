import { useState } from 'react'

interface Props { onConfirm: (reason: string) => void; onCancel: () => void }

export function InterruptModal({ onConfirm, onCancel }: Props) {
  const [reason, setReason] = useState('')

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-sm rounded-xl bg-white p-5 shadow-xl">
        <p className="mb-1 font-medium text-gray-900">打断记录</p>
        <p className="mb-3 text-sm text-gray-500">去做什么了？（帮你晚上复盘）</p>
        <input
          autoFocus
          className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
          placeholder="例：突然来了个会议 / 刷了一下手机..."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') onConfirm(reason); if (e.key === 'Escape') onCancel() }}
        />
        <div className="mt-3 flex justify-end gap-2">
          <button onClick={onCancel} className="rounded px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100">取消</button>
          <button onClick={() => onConfirm(reason)} className="rounded bg-orange-500 px-3 py-1.5 text-sm text-white">记录打断</button>
        </div>
      </div>
    </div>
  )
}
