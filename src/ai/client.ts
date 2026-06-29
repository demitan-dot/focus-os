interface Message { role: 'user' | 'assistant'; content: string }

export async function callClaude(
  apiKey: string,
  model: string,
  messages: Message[],
  maxTokens = 1024,
): Promise<string> {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({ model, max_tokens: maxTokens, messages }),
  })
  if (!res.ok) throw new Error(`Claude API error ${res.status}: ${await res.text()}`)
  const data = await res.json()
  return data.content[0].text as string
}
