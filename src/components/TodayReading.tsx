import type { PlanDay } from '../utils/readingPlan'

const fmt = (iso: string) =>
  new Date(iso + 'T00:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric' })

type Props = { day: PlanDay; done: boolean; status: string; onToggle: () => void }

export default function TodayReading({ day, done, status, onToggle }: Props) {
  return (
    <section id="today" className="rounded-3xl border border-line bg-card p-6 sm:p-8">
      <p className="text-sm text-ink/60">Day {day.day} — {fmt(day.date)}</p>
      <h2 className="mt-2 font-serif text-4xl leading-tight sm:text-5xl">{day.label}</h2>
      <p className="mt-1 text-sm text-ink/60">{day.chapters} chapters</p>
      <label className="mt-6 flex cursor-pointer items-center gap-3 rounded-2xl border border-line px-4 py-3 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-moss">
        <input type="checkbox" checked={done} onChange={onToggle} className="h-5 w-5 accent-[#5c7355]" />
        <span>Mark today’s reading complete</span>
      </label>
      <p className="mt-4 text-sm text-gold">{status}</p>
    </section>
  )
}
