import type { PlanDay } from '../utils/readingPlan'

const short = (iso: string) =>
  new Date(iso + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

type Props = { plan: PlanDay[]; done: number[]; todayIdx: number; onToggle: (day: number) => void }

export default function ReadingPlan({ plan, done, todayIdx, onToggle }: Props) {
  return (
    <section id="plan">
      <h2 className="mb-3 font-serif text-2xl">Plan</h2>
      <ul className="overflow-hidden rounded-3xl border border-line bg-card">
        {plan.map((d, i) => {
          const isDone = done.includes(d.day)
          const isToday = i === todayIdx
          return (
            <li key={d.day} className={`border-b border-line last:border-b-0 ${isToday ? 'bg-moss/10' : ''}`}>
              <label className={`flex cursor-pointer items-center gap-3 px-4 py-3 text-sm ${isDone ? 'text-ink/45' : i < todayIdx || isToday ? '' : 'text-ink/70'}`}>
                <input type="checkbox" checked={isDone} onChange={() => onToggle(d.day)} className="h-4 w-4 shrink-0 accent-[#5c7355]" />
                <span className="w-14 shrink-0 text-ink/50">Day {d.day}</span>
                <span className="w-14 shrink-0 text-ink/50">{short(d.date)}</span>
                <span className={`flex-1 ${isDone ? 'line-through' : isToday ? 'font-medium' : ''}`}>{d.label}</span>
                <span className="hidden text-ink/50 sm:inline">{d.chapters} ch</span>
              </label>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
