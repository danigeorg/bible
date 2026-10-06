import { useEffect, useMemo, useState } from 'react'
import ReadingPlan from './components/ReadingPlan'
import Stats from './components/Stats'
import TodayReading from './components/TodayReading'
import { clearDone, loadDone, saveDone } from './utils/storage'
import {
  calculateStreak, completedChapters, completionPercent, daysBehind, focusIndex,
  generatePlan, toISO, todayIndex, totalChapters,
} from './utils/readingPlan'

export default function App() {
  const plan = useMemo(() => generatePlan(), [])
  const total = totalChapters()
  const [done, setDone] = useState<number[]>(loadDone)
  useEffect(() => saveDone(done), [done])

  const todayIdx = todayIndex(plan, toISO(new Date()))
  const chapters = completedChapters(plan, done)
  const percent = completionPercent(chapters, total)
  const behind = daysBehind(plan, done, todayIdx)
  const focus = plan[focusIndex(plan, done, todayIdx)]
  const nav = (id: string) => () => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  const toggle = (day: number) =>
    setDone((d) => (d.includes(day) ? d.filter((x) => x !== day) : [...d, day]))

  const reset = () => {
    if (window.confirm('Reset all progress? This cannot be undone.')) { clearDone(); setDone([]) }
  }

  let status = 'You’re on track.'
  if (behind > 0) status = `You’re ${behind} reading day${behind > 1 ? 's' : ''} behind.`
  if (todayIdx < 0) status = `Starts October 7 — ${-todayIdx} day${-todayIdx > 1 ? 's' : ''} to go.`
  if (todayIdx >= plan.length && chapters < total) status = 'The plan has ended — keep reading, finish what remains.'

  const complete = chapters === total

  return (
    <main className="mx-auto max-w-2xl space-y-6 px-4 py-8 sm:py-12">
      <header>
        <h1 className="font-serif text-4xl sm:text-5xl">Bible to Christmas</h1>
        <p className="mt-1 font-serif text-lg italic text-ink/60">Read the Bible. Finish on Christmas.</p>
        <nav className="mt-4 flex gap-5 text-sm text-moss">
          <button onClick={nav('today')}>Today</button>
          <button onClick={nav('plan')}>Plan</button>
          <button onClick={nav('progress')}>Progress</button>
        </nav>
      </header>

      {complete ? (
        <section className="rounded-3xl border border-line bg-card p-8 text-center">
          <h2 className="font-serif text-4xl">Bible Completed 🎉</h2>
          <p className="mt-2 font-serif text-lg italic">You made it to Christmas.</p>
          <p className="mt-4 text-sm text-ink/60">1,189 / 1,189 chapters · 100%</p>
        </section>
      ) : (
        <TodayReading day={focus} done={done.includes(focus.day)} status={status} onToggle={() => toggle(focus.day)} />
      )}

      <Stats
        percent={percent} chapters={chapters} total={total}
        daysDone={done.length} totalDays={plan.length}
        dayNumber={Math.min(Math.max(todayIdx + 1, 0), plan.length)}
        daysLeft={Math.max(plan.length - Math.max(todayIdx + 1, 0), 0)}
        streak={calculateStreak(plan, done, todayIdx)}
      />
      <ReadingPlan plan={plan} done={done} todayIdx={todayIdx} onToggle={toggle} />
      <footer className="pt-2 text-center">
        <button onClick={reset} className="text-xs text-ink/50 underline">Reset progress</button>
      </footer>
    </main>
  )
}
