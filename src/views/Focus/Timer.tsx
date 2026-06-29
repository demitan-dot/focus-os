import { useEffect, useState } from 'react'

interface Props { running: boolean; onTick: (seconds: number) => void }

export function Timer({ running, onTick }: Props) {
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    if (!running) { setSeconds(0); return }
    const id = setInterval(() => setSeconds((s) => { const next = s + 1; onTick(next); return next }), 1000)
    return () => clearInterval(id)
  }, [running, onTick])

  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0')
  const s = (seconds % 60).toString().padStart(2, '0')

  return (
    <div className="text-center">
      <span className="font-mono text-7xl font-thin tracking-widest text-gray-900">
        {h > 0 ? `${h}:` : ''}{m}:{s}
      </span>
    </div>
  )
}
