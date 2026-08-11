'use client'

import { useEffect, useRef, useState } from 'react'
import EventCard from './EventCard'
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

/** Build a human label for the "All events" section */
function gridLabel(when: string | null, count: number): string {
  const n = `${count} event${count !== 1 ? 's' : ''}`
  const map: Record<string, string> = {
    Tonight:   `— ${n} tonight`,
    Tomorrow:  `— ${n} tomorrow`,
    Weekend:   `— ${n} this weekend`,
    'This week': `— ${n} this week`,
  }
  return when && map[when] ? map[when] : `— ${n}`
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

  // ── All events grid — driven by the filter bar ────────────────────────────
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [visibleCount, setVisibleCount] = useState(12)

  useEffect(() => {
    setVisibleCount(12)
    setLoading(true)
    const params = new URLSearchParams()
    if (filters.category) params.set('category', filters.category)
    if (filters.audience) params.set('audience', filters.audience)
    if (filters.dateFrom) params.set('dateFrom', filters.dateFrom)
    if (filters.dateTo)   params.set('dateTo',   filters.dateTo)

    fetch(`/api/events?${params.toString()}`)
      .then(res => res.json())
      .then(data => { setEvents(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [filters])

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
      <section>
        <div className={styles.gridSection}>
          <div className={styles.gridHeader}>
            <div>
              <div className={styles.gridLabel}>{gridLabel(filters.when, events.length)}</div>
              <h2 className={styles.sectionTitle}>All events</h2>
            </div>
          </div>

          {loading ? (
            <div className={styles.empty}>Loading…</div>
          ) : events.length === 0 ? (
            <div className={styles.empty}>No events found — try removing a filter</div>
          ) : (
            <div className={styles.grid}>
              {events.slice(0, visibleCount).map(event => (
                <EventCard key={event.id} event={event} size="large" savedByMe={event.savedByMe} />
              ))}
            </div>
          )}

          <div className={styles.loadMore}>
            <span className={styles.loadMoreLabel}>
              Showing {Math.min(visibleCount, events.length)} of {events.length} events
            </span>
            {visibleCount < events.length && (
              <button
                className={styles.loadMoreBtn}
                onClick={() => setVisibleCount(prev => prev + 12)}
              >
                Load more ↓
              </button>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
