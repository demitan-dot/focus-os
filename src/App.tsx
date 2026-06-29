import { useState } from 'react'
import { NavBar } from './components/NavBar'

type View = 'plan' | 'focus' | 'inbox' | 'review' | 'settings'

export default function App() {
  const [view, setView] = useState<View>('plan')
  const [inboxCount] = useState(0)

  return (
    <div className="flex h-screen flex-col bg-gray-50">
      <NavBar current={view} inboxCount={inboxCount} onNavigate={setView} />
      <main className="flex-1 overflow-auto p-4">
        <p className="text-center text-gray-400">View: {view} (coming soon)</p>
      </main>
    </div>
  )
}
