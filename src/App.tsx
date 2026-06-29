import { useState, useCallback } from 'react'
import { NavBar } from './components/NavBar'
import { InboxFAB } from './components/InboxFAB'
import { SettingsView } from './components/Settings'
import { PlanView } from './views/Plan'
import { FocusView } from './views/Focus'
import { InboxView } from './views/Inbox'
import { ReviewView } from './views/Review'
import { getInboxTasks } from './store/tasks'
import { getConfig } from './store/config'

type View = 'plan' | 'focus' | 'inbox' | 'review' | 'settings'

export default function App() {
  const [view, setView] = useState<View>(() => getConfig().claudeApiKey ? 'plan' : 'settings')
  const [inboxCount, setInboxCount] = useState(() => getInboxTasks().length)

  const refreshInbox = useCallback(() => setInboxCount(getInboxTasks().length), [])

  function handleNavigate(v: View) {
    setView(v)
    if (v === 'inbox') setInboxCount(getInboxTasks().length)
  }

  return (
    <div className="flex h-screen flex-col bg-gray-50">
      <NavBar current={view} inboxCount={inboxCount} onNavigate={handleNavigate} />
      <main className="flex-1 overflow-auto p-4">
        {view === 'plan' && <PlanView />}
        {view === 'focus' && <FocusView />}
        {view === 'inbox' && <InboxView onCountChange={setInboxCount} />}
        {view === 'review' && <ReviewView />}
        {view === 'settings' && <SettingsView />}
      </main>
      <InboxFAB onCaptured={refreshInbox} />
    </div>
  )
}
