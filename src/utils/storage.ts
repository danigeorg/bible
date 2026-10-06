const KEY = 'bible-to-christmas:v1'

export function loadDone(): number[] {
  try {
    const raw = localStorage.getItem(KEY)
    const parsed = raw ? JSON.parse(raw) : null
    return Array.isArray(parsed?.done) ? parsed.done.filter((n: unknown) => Number.isInteger(n)) : []
  } catch {
    return []
  }
}

export function saveDone(done: number[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify({ done, startDate: '2026-10-07', endDate: '2026-12-25' }))
  } catch { /* storage unavailable */ }
}

export function clearDone() {
  try { localStorage.removeItem(KEY) } catch { /* ignore */ }
}
