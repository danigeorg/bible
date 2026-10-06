import ProgressBar from './ProgressBar'

type Props = {
  percent: number; chapters: number; total: number
  daysDone: number; totalDays: number; dayNumber: number; daysLeft: number; streak: number
}

export default function Stats(p: Props) {
  return (
    <section id="progress" className="rounded-3xl border border-line bg-card p-6">
      <p className="font-serif text-5xl text-moss">{p.percent}%<span className="ml-2 text-lg text-ink/60">complete</span></p>
      <div className="mt-4"><ProgressBar percent={p.percent} /></div>
      <p className="mt-3 text-sm text-ink/70">{p.chapters.toLocaleString()} / {p.total.toLocaleString()} chapters</p>
      <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
        <div><dt className="text-ink/50">Days read</dt><dd>{p.daysDone} / {p.totalDays}</dd></div>
        <div><dt className="text-ink/50">Plan</dt><dd>Day {p.dayNumber} of {p.totalDays}</dd></div>
        <div><dt className="text-ink/50">Days remaining</dt><dd>{p.daysLeft}</dd></div>
        <div><dt className="text-ink/50">Streak</dt><dd>🔥 {p.streak} day streak</dd></div>
      </dl>
    </section>
  )
}
