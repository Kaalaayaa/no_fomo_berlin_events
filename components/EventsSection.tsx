'use client'

import { useEffect, useRef, useState } from 'react'
import EventCard from './EventCard'
import EventsGrid from './EventsGrid'
import styles from './EventsSection.module.css'

interface Event {
  id: string
  title: string
  tagline: string
  date: string
  venue: string
  category: string
  audience: string
  imageUrl: string | null
  priceMin: number | null
  priceMax: number | null
  pricingModel: string | null
  savedByMe?: boolean
}

interface Filters {
  category: string | null
  audience: string | null
  dateFrom: string | null
  dateTo: string | null
  when: string | null
}

interface EventsSectionProps {
  filters: Filters
}

/** Always returns tonight's ISO date range — never changes during a session */
function getTonightRange() {
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const end = new Date(today)
  end.setHours(23, 59, 59)
  return { dateFrom: today.toISOString(), dateTo: end.toISOString() }
}

export default function EventsSection({ filters }: EventsSectionProps) {
  const railRef = useRef<HTMLDivElement>(null)

  // ── Tonight in Berlin rail — independent, fixed to today ─────────────────
  const [tonightEvents, setTonightEvents] = useState<Event[]>([])
  const [tonightLoading, setTonightLoading] = useState(true)

  useEffect(() => {
    const { dateFrom, dateTo } = getTonightRange()
    fetch(`/api/events?dateFrom=${encodeURIComponent(dateFrom)}&dateTo=${encodeURIComponent(dateTo)}`)
      .then(res => res.json())
      .then(data => { setTonightEvents(data); setTonightLoading(false) })
      .catch(() => setTonightLoading(false))
  }, []) // runs once — "tonight" doesn't change while the user is on the page

  function scrollRail(dir: 'prev' | 'next') {
    railRef.current?.scrollBy({ left: dir === 'next' ? 360 : -360, behavior: 'smooth' })
  }

  const railCards = tonightEvents.slice(0, 5)

  return (
    <>
      {/* ── Tonight in Berlin — always today, ignores filters ── */}
      <section className={styles.railSection}>
        <div className={styles.railInner}>
          <div className={styles.sectionHeader}>
            <div>
              <div className={styles.sectionLabel}>— Coming up</div>
              <h2 className={styles.sectionTitle}>Tonight in Berlin</h2>
            </div>
            <div className={styles.railNav}>
              <button className={styles.railBtn} onClick={() => scrollRail('prev')} aria-label="Scroll left">←</button>
              <button className={styles.railBtn} onClick={() => scrollRail('next')} aria-label="Scroll right">→</button>
            </div>
          </div>
        </div>

        <div className={styles.rail} ref={railRef}>
          <div className={styles.railTrack}>
            {tonightLoading ? (
              <div className={styles.empty}>Loading…</div>
            ) : railCards.length === 0 ? (
              <div className={styles.empty}>Nothing on tonight — check back later</div>
            ) : (
              railCards.map(event => (
                <div key={event.id} className={styles.railCard}>
                  <EventCard event={event} savedByMe={event.savedByMe} />
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* ── All events — responds to the filter bar ── */}
      <EventsGrid filters={filters} />
    </>
  )
}
