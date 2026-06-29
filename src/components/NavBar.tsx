type View = 'plan' | 'focus' | 'inbox' | 'review' | 'settings'

interface NavBarProps {
  current: View
  inboxCount: number
  onNavigate: (v: View) => void
}

const NAV_ITEMS: { id: View; label: string }[] = [
  { id: 'plan', label: 'Plan' },
  { id: 'focus', label: 'Focus' },
  { id: 'inbox', label: 'Inbox' },
  { id: 'review', label: 'Review' },
  { id: 'settings', label: 'Settings' },
]

export function NavBar({ current, inboxCount, onNavigate }: NavBarProps) {
  return (
    <nav className="flex items-center gap-1 border-b border-gray-200 bg-white px-4 py-2">
      {NAV_ITEMS.map((item) => (
        <button
          key={item.id}
          onClick={() => onNavigate(item.id)}
          className={`relative rounded px-3 py-1.5 text-sm font-medium transition-colors ${
            current === item.id
              ? 'bg-indigo-50 text-indigo-700'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          {item.label}
          {item.id === 'inbox' && inboxCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              {inboxCount > 9 ? '9+' : inboxCount}
            </span>
          )}
        </button>
      ))}
    </nav>
  )
}
