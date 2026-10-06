import { describe, expect, it } from 'vitest'
import { BOOKS } from '../data/bible'
import {
  calculateStreak, completedChapters, completionPercent, daysBehind, generatePlan,
  todayIndex, totalChapters,
} from './readingPlan'

const plan = generatePlan()

describe('reading plan', () => {
  it('has 66 books and 1189 chapters', () => {
    expect(BOOKS).toHaveLength(66)
    expect(totalChapters()).toBe(1189)
  })
  it('spans Oct 7 to Dec 25 (80 days)', () => {
    expect(plan).toHaveLength(80)
    expect(plan[0].date).toBe('2026-10-07')
    expect(plan[79].date).toBe('2026-12-25')
  })
  it('starts at Genesis 1 and ends at Revelation 22', () => {
    expect(plan[0].start).toEqual({ book: 'Genesis', chapter: 1 })
    expect(plan[79].end).toEqual({ book: 'Revelation', chapter: 22 })
  })
  it('covers every chapter exactly once, evenly', () => {
    expect(plan.reduce((s, d) => s + d.chapters, 0)).toBe(1189)
    const counts = plan.map((d) => d.chapters)
    expect(Math.max(...counts) - Math.min(...counts)).toBeLessThanOrEqual(1)
    expect(plan[0].label).toBe('Genesis 1–15')
  })
  it('finds today', () => {
    expect(todayIndex(plan, '2026-10-06')).toBe(-1)
    expect(todayIndex(plan, '2026-10-07')).toBe(0)
    expect(todayIndex(plan, '2026-12-26')).toBe(80)
  })
  it('calculates percent, streak, and days behind', () => {
    expect(completedChapters(plan, [1, 2])).toBe(30)
    expect(completionPercent(595)).toBe(50)
    expect(calculateStreak(plan, [1, 2, 3], 3)).toBe(3)
    expect(calculateStreak(plan, [1, 2, 4], 3)).toBe(1)
    expect(daysBehind(plan, [1], 3)).toBe(2)
  })
})
