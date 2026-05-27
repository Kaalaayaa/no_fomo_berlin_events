'use client'

import { useState } from 'react'
import styles from './FilterBar.module.css'

const WHEN = ['Tonight', 'Tomorrow', 'Weekend', 'This week']
const WHAT = ['Club', 'Concert', 'Performance', 'Reading', 'Workshop', 'Cinema', 'Exhibition', 'Market', 'Kitchen']
const FOR = ['FLINTA*', 'Queer', 'All welcome']

interface FilterBarProps {
  onFilterChange: (filters: {
    category: string | null
    audience: string | null
    dateFrom: string | null
    dateTo: string | null
    when: string | null
  }) => void
}

function getDateRange(when: string): { dateFrom: string; dateTo: string } {
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

  if (when === 'Tonight') {
    const end = new Date(today)
    end.setHours(23, 59, 59)
    return { dateFrom: today.toISOString(), dateTo: end.toISOString() }
  }

  if (when === 'Tomorrow') {
    const start = new Date(today)
    start.setDate(today.getDate() + 1)
    const end = new Date(start)
    end.setHours(23, 59, 59)
    return { dateFrom: start.toISOString(), dateTo: end.toISOString() }
  }

  if (when === 'Weekend') {
    const day = today.getDay()
    const daysToFri = (5 - day + 7) % 7
    const fri = new Date(today)
    fri.setDate(today.getDate() + daysToFri)
    const sun = new Date(fri)
    sun.setDate(fri.getDate() + 2)
    sun.setHours(23, 59, 59)
    return { dateFrom: fri.toISOString(), dateTo: sun.toISOString() }
  }

  if (when === 'This week') {
    const end = new Date(today)
    end.setDate(today.getDate() + 6)
    end.setHours(23, 59, 59)
    return { dateFrom: today.toISOString(), dateTo: end.toISOString() }
  }

  return { dateFrom: today.toISOString(), dateTo: '' }
}

export default function FilterBar({ onFilterChange }: FilterBarProps) {
  const [activeWhen, setActiveWhen] = useState<string | null>(null)
  const [activeWhat, setActiveWhat] = useState<string | null>(null)
  const [activeFor, setActiveFor] = useState<string | null>(null)

  function handleWhen(value: string) {
    const next = activeWhen === value ? null : value
    setActiveWhen(next)
    const dates = next ? getDateRange(next) : { dateFrom: null, dateTo: null }
    onFilterChange({ category: activeWhat, audience: activeFor, when: next, ...dates })
  }

  function handleWhat(value: string) {
    const next = activeWhat === value ? null : value
    setActiveWhat(next)
    const dates = activeWhen ? getDateRange(activeWhen) : { dateFrom: null, dateTo: null }
    onFilterChange({ category: next, audience: activeFor, when: activeWhen, ...dates })
  }

  function handleFor(value: string) {
    const next = activeFor === value ? null : value
    setActiveFor(next)
    const dates = activeWhen ? getDateRange(activeWhen) : { dateFrom: null, dateTo: null }
    onFilterChange({ category: activeWhat, audience: next, when: activeWhen, ...dates })
  }

  return (
    <section className={styles.bar} aria-label="Event filters">
      <div className={styles.inner}>

        <div className={styles.group} role="group" aria-label="Filter by time">
          <span className={styles.groupLabel}>When</span>
          {WHEN.map(w => (
            <button
              key={w}
              className={activeWhen === w ? styles.chipActive : styles.chip}
              onClick={() => handleWhen(w)}
              aria-pressed={activeWhen === w}
            >
              {w}
            </button>
          ))}
        </div>

        <div className={styles.divider} aria-hidden="true" />

        <div className={styles.group} role="group" aria-label="Filter by category">
          <span className={styles.groupLabel}>What</span>
          {WHAT.map(w => (
            <button
              key={w}
              className={activeWhat === w ? styles.chipActive : styles.chip}
              onClick={() => handleWhat(w)}
              aria-pressed={activeWhat === w}
            >
              {w}
            </button>
          ))}
        </div>

        <div className={styles.divider} aria-hidden="true" />

        <div className={styles.group} role="group" aria-label="Filter by audience">
          <span className={styles.groupLabel}>For</span>
          {FOR.map(f => (
            <button
              key={f}
              className={
                f === 'All welcome'
                  ? activeFor === f ? styles.chipActive : styles.chip
                  : activeFor === f ? styles.chipAccentActive : styles.chipAccent
              }
              onClick={() => handleFor(f)}
              aria-pressed={activeFor === f}
            >
              {f}
            </button>
          ))}
        </div>

      </div>
    </section>
  )
}