'use client'

import { useState } from 'react'
import FilterBar from '@/components/FilterBar'
import EventsGrid from '@/components/EventsGrid'

interface Filters {
  category: string | null
  audience: string | null
  dateFrom: string | null
  dateTo: string | null
  when: string | null
}

export default function EventsPage() {
  const [filters, setFilters] = useState<Filters>({
    category: null,
    audience: null,
    dateFrom: null,
    dateTo: null,
    when: null,
  })

  return (
    <main>
      <FilterBar onFilterChange={setFilters} />
      <EventsGrid filters={filters} />
    </main>
  )
}
