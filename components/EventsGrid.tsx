'use client'

import { useEffect, useState } from 'react'
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

interface EventsGridProps {
  filters: Filters
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

export default function EventsGrid({ filters }: EventsGridProps) {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [visibleCount, setVisibleCount] = useState(12)

  // Reset pagination the moment filters change, during render rather than
  // in the effect below — React's set-state-in-effect rule wants state
  // resets moved out of the effect body. The effect is left with only the
  // actual async fetch.
  const [prevFilters, setPrevFilters] = useState(filters)
  if (filters !== prevFilters) {
    setPrevFilters(filters)
    setVisibleCount(12)
    setLoading(true)
  }

  useEffect(() => {
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

  return (
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
  )
}
