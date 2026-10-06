import { BOOKS, type Book } from '../data/bible'

export const START_DATE = '2026-10-07'
export const END_DATE = '2026-12-25'

export type Ref = { book: string; chapter: number }
export type PlanDay = {
  day: number
  date: string // YYYY-MM-DD
  start: Ref
  end: Ref
  chapters: number
  label: string
}

export const totalChapters = (books: Book[] = BOOKS) =>
  books.reduce((sum, b) => sum + b.chapters, 0)

const utc = (iso: string) => {
  const [y, m, d] = iso.split('-').map(Number)
  return Date.UTC(y, m - 1, d)
}
const DAY_MS = 86_400_000

export const daysBetween = (a: string, b: string) => Math.round((utc(b) - utc(a)) / DAY_MS)

export const toISO = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`

export const addDays = (iso: string, n: number) => {
  const d = new Date(utc(iso) + n * DAY_MS)
  return d.toISOString().slice(0, 10)
}

export function formatLabel(start: Ref, end: Ref): string {
  if (start.book === end.book) {
    return start.chapter === end.chapter
      ? `${start.book} ${start.chapter}`
      : `${start.book} ${start.chapter}–${end.chapter}`
  }
  return `${start.book} ${start.chapter} – ${end.book} ${end.chapter}`
}

/** Splits all chapters into consecutive daily ranges; the first `remainder` days get one extra chapter. */
export function generatePlan(
  startDate = START_DATE,
  endDate = END_DATE,
  books: Book[] = BOOKS,
): PlanDay[] {
  const days = daysBetween(startDate, endDate) + 1
  const chapters: Ref[] = books.flatMap((b) =>
    Array.from({ length: b.chapters }, (_, i) => ({ book: b.name, chapter: i + 1 })),
  )
  const base = Math.floor(chapters.length / days)
  const extra = chapters.length % days
  const plan: PlanDay[] = []
  let cursor = 0
  for (let i = 0; i < days; i++) {
    const count = base + (i < extra ? 1 : 0)
    const start = chapters[cursor]
    const end = chapters[cursor + count - 1]
    plan.push({ day: i + 1, date: addDays(startDate, i), start, end, chapters: count, label: formatLabel(start, end) })
    cursor += count
  }
  return plan
}

/** Index of today's plan day; -1 = before start, plan.length = after end. */
export function todayIndex(plan: PlanDay[], todayISO: string): number {
  const i = daysBetween(plan[0].date, todayISO)
  return i < 0 ? -1 : Math.min(i, plan.length)
}

export const completedChapters = (plan: PlanDay[], done: number[]) =>
  plan.filter((d) => done.includes(d.day)).reduce((s, d) => s + d.chapters, 0)

export const completionPercent = (completed: number, total = totalChapters()) =>
  Math.round((completed / total) * 100)

/** Consecutive completed days ending at today (or yesterday if today isn't done yet). */
export function calculateStreak(plan: PlanDay[], done: number[], todayIdx: number): number {
  let i = Math.min(todayIdx, plan.length - 1)
  if (i >= 0 && !done.includes(plan[i].day) && i === todayIdx) i--
  let streak = 0
  while (i >= 0 && done.includes(plan[i].day)) { streak++; i-- }
  return streak
}

/** Scheduled days before today that are not complete. */
export function daysBehind(plan: PlanDay[], done: number[], todayIdx: number): number {
  const upTo = Math.min(todayIdx, plan.length)
  return plan.slice(0, Math.max(upTo, 0)).filter((d) => !done.includes(d.day)).length
}

/** The reading to focus on: today's, or the next unfinished day once today's is done. */
export function focusIndex(plan: PlanDay[], done: number[], todayIdx: number): number {
  let i = Math.min(Math.max(todayIdx, 0), plan.length - 1)
  while (i < plan.length - 1 && done.includes(plan[i].day)) i++
  return i
}
