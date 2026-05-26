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
}

interface Filters {
  category: string | null
  audience: string | null
  dateFrom: string | null
  dateTo: string | null
}

interface EventsSectionProps {
  filters: Filters
}

export default function EventsSection({ filters }: EventsSectionProps) {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [visibleCount, setVisibleCount] = useState(12)
  const railRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setVisibleCount(12)
    setLoading(true)
    const params = new URLSearchParams()
    if (filters.category) params.set('category', filters.category)
    if (filters.audience) params.set('audience', filters.audience)
    if (filters.dateFrom) params.set('dateFrom', filters.dateFrom)
    if (filters.dateTo) params.set('dateTo', filters.dateTo)

    fetch(`/api/events?${params.toString()}`)
      .then(res => res.json())
      .then(data => {
        setEvents(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [filters])

  function scrollRail(dir: 'prev' | 'next') {
    if (railRef.current) {
      railRef.current.scrollBy({ left: dir === 'next' ? 360 : -360, behavior: 'smooth' })
    }
  }

  const railEvents = events.slice(0, 5)

  return (
    <>
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
            {loading ? (
              <div className={styles.empty}>Loading events...</div>
            ) : railEvents.length === 0 ? (
              <div className={styles.empty}>No events found</div>
            ) : (
              railEvents.map(event => (
                <div key={event.id} className={styles.railCard}>
                  <EventCard event={event} />
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      <section>
        <div className={styles.gridSection}>
          <div className={styles.gridHeader}>
            <div>
              <div className={styles.gridLabel}>— {events.length} events</div>
              <h2 className={styles.sectionTitle}>All events</h2>
            </div>
          </div>

          {loading ? (
            <div className={styles.empty}>Loading...</div>
          ) : events.length === 0 ? (
            <div className={styles.empty}>No events found — try removing a filter</div>
          ) : (
            <div className={styles.grid}>
              {events.map(event => (
                <EventCard key={event.id} event={event} size="large" />
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