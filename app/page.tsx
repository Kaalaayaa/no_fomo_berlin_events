'use client'

import { useState } from 'react'
import Hero from '@/components/Hero'
import FilterBar from '@/components/FilterBar'
import EventsSection from '@/components/EventsSection'

interface Filters {
  category: string | null
  audience: string | null
  dateFrom: string | null
  dateTo: string | null
}

export default function Home() {
  const [filters, setFilters] = useState<Filters>({
    category: null,
    audience: null,
    dateFrom: null,
    dateTo: null,
  })

  return (
    <main>
      <Hero />
      <FilterBar onFilterChange={setFilters} />
      <EventsSection filters={filters} />
    </main>
  )
}