export default function ProgressBar({ percent }: { percent: number }) {
  return (
    <div role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100}
      className="h-3 w-full overflow-hidden rounded-full bg-line">
      <div className="h-full rounded-full bg-moss transition-[width] duration-700 ease-out" style={{ width: `${percent}%` }} />
    </div>
  )
}
