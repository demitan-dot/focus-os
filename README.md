# Focus OS

GTD-based daily time management app with AI-powered task classification, focus timer, and auto-generated standup reports.

**Core loop:** Plan → Focus → Inbox (anytime) → Review → Standup

## Features

- **Plan** — dump all tasks in free text, AI classifies by context and priority (P0/P1/P2)
- **Focus** — one task at a time with live timer, interrupt tracking, 2-minute rule flag
- **Inbox** — capture anything instantly (floating button or Cmd+I), clarify later
- **Review** — daily / weekly / monthly review with 7 selectable modules
- **Standup** — AI generates next-day morning standup in SMART format + MIT recommendations

## Quick Start

**Option A — Deploy to Vercel (1 click)**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/demitan-dot/focus-os)

**Option B — Run locally**

```bash
git clone https://github.com/demitan-dot/focus-os
cd focus-os
npm install
npm run dev
```

Open `http://localhost:5173` and add your Claude API key in Settings.

## Getting a Claude API Key

1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Create an account and add billing
3. Generate an API key under **API Keys**
4. Paste it in Focus OS → Settings

Your key is stored **only in your browser's localStorage** — never sent anywhere except Anthropic's API directly.

## GTD Workflow

| GTD Step | Focus OS |
|----------|----------|
| Capture | Inbox — one line, instant |
| Clarify | Inbox triage — actionable? 2min? today / someday / delete |
| Organize | Plan — AI classifies + prioritizes |
| Reflect | Review — daily / weekly / monthly |
| Engage | Focus — one task, live timer |

## Review Modules

| Module | Best for |
|--------|----------|
| GTD Check | Daily — inbox cleared? MIT confirmed? |
| Success Journal | Daily — what went well (builds momentum) |
| Mistake Log | Daily — root-cause learning |
| Gratitude | Daily — 3 things (positive psychology) |
| 4L Review | Weekly — Liked / Learned / Lacked / Longed for |
| Stop·Start·Continue | Weekly/Monthly — behavior change |
| Free Write | Any — unstructured reflection |

## Data Privacy

All data stays in your browser's localStorage. Nothing is uploaded anywhere. Your Claude API key never passes through any intermediate server.

## Tech Stack

- React 18 + TypeScript + Vite
- Tailwind CSS v3
- Claude API (Haiku for task classification, Sonnet for review generation)
- localStorage (no backend, no database)
