
import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

// ── Date helpers ──────────────────────────────────────────────────────────────
const today = new Date()
today.setHours(0, 0, 0, 0)

/** Returns a date N days from today at the given hour:minute */
function d(daysOffset: number, hour: number, minute = 0): Date {
  const dt = new Date(today)
  dt.setDate(today.getDate() + daysOffset)
  dt.setHours(hour, minute, 0, 0)
  return dt
}

async function main() {
  const events = [
    // ── Tonight ───────────────────────────────────────────────────────────────
    {
      title: 'Soft Power vol. 12',
      tagline: 'An all-night residency in three rooms.',
      description: 'Soft Power returns for its twelfth edition with a carefully curated lineup spanning techno, breaks and experimental club music. Three rooms, no headliners, no bullshit. The focus is on the floor and the people on it.',
      lineup: '23:59 — Opening set\n01:00 — Maara (Montréal)\n03:00 — Sugar Free (Lisboa)\n05:00 — Lyz Eim (resident)',
      date: d(0, 23, 59),
      venue: 'OHM',
      address: 'Köpenicker Str. 70, 10179 Berlin',
      category: 'Club',
      audience: 'Queer',
      tags: ['Techno', 'Breaks'],
      imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800',
      priceMin: 8, priceMax: 14, pricingModel: 'Sliding scale',
      capacity: 320, status: 'approved',
    },
    {
      title: 'Fehler und Risse — Opening',
      tagline: 'New works on paper, textile and found objects.',
      description: 'A group exhibition by five Berlin-based artists exploring failure, repair and the aesthetics of the unfinished. Opening with drinks and a short performance. Exhibition runs for four weeks.',
      date: d(0, 19, 0),
      venue: 'District Berlin',
      address: 'Bessemerstr. 2-14, 12103 Berlin',
      category: 'Exhibition',
      audience: 'All welcome',
      tags: ['Visual art'],
      imageUrl: 'https://images.unsplash.com/photo-1531913764164-f85c52e6e654?w=800',
      priceMin: 0, priceMax: 0, pricingModel: 'Free',
      capacity: 120, status: 'approved',
    },
    {
      title: 'Late Reads',
      tagline: 'Queer poetry and short prose, late night.',
      description: 'A monthly late-night reading event. Six readers, twenty minutes each. Bring a drink, bring a friend, bring a poem if you want to share one. Impromptu readings from the floor welcome after midnight.',
      date: d(0, 21, 30),
      venue: 'Roses',
      address: 'Oranienstr. 187, 10999 Berlin',
      category: 'Reading',
      audience: 'Queer',
      tags: ['Spoken word'],
      imageUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800',
      priceMin: 0, priceMax: 5, pricingModel: 'PWYC',
      capacity: 40, status: 'approved',
    },
    {
      title: 'Tender Frequencies',
      tagline: 'Ambient and drone in a candlelit space.',
      description: 'An intimate evening of ambient and drone music in a candlelit venue. Four artists, two hours, no talking. Come to listen properly. Limited capacity — arrive on time.',
      date: d(0, 20, 0),
      venue: 'Radial System',
      address: 'Holzmarktstr. 33, 10243 Berlin',
      category: 'Concert',
      audience: 'Queer',
      tags: ['Ambient'],
      imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800',
      priceMin: 12, priceMax: 20, pricingModel: 'Sliding scale',
      capacity: 60, status: 'approved',
    },

    // ── Tomorrow ──────────────────────────────────────────────────────────────
    {
      title: 'Zine Werkstatt',
      tagline: 'Make something with your hands.',
      description: 'A free workshop for anyone who wants to make a zine. Materials provided. No experience needed. We will go through layout, printing and binding. Bring your ideas, your feelings, your rage.',
      date: d(1, 17, 0),
      venue: 'Sameheads',
      address: 'Richardstr. 10, 12043 Berlin',
      category: 'Workshop',
      audience: 'FLINTA*',
      tags: ['DIY'],
      imageUrl: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800',
      priceMin: 0, priceMax: 0, pricingModel: 'Free',
      capacity: 20, status: 'approved',
    },
    {
      title: 'Queer Shorts Berlin',
      tagline: 'An evening of short films by queer filmmakers.',
      description: 'A curated screening of short films made by queer and FLINTA* filmmakers from Berlin and beyond. Six films, one interval, no content warnings withheld. Discussion with two directors after the screening.',
      date: d(1, 19, 30),
      venue: 'Moviemento',
      address: 'Kottbusser Damm 22, 10967 Berlin',
      category: 'Cinema',
      audience: 'Queer',
      tags: ['Solidarity'],
      imageUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800',
      priceMin: 7, priceMax: 12, pricingModel: 'Sliding scale',
      capacity: 90, status: 'approved',
    },
    {
      title: 'Embodied Boundaries',
      tagline: 'A workshop on consent and physical space.',
      description: 'A practical workshop on consent, personal boundaries and communication in physical space. Led by two somatic practitioners. Not a therapy session, not a lecture. Bring comfortable clothes and an open mind.',
      date: d(1, 16, 0),
      venue: 'Oyoun',
      address: 'Lucy-Lameck-Str. 32, 12049 Berlin',
      category: 'Workshop',
      audience: 'FLINTA*',
      tags: ['Solidarity'],
      imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800',
      priceMin: 5, priceMax: 20, pricingModel: 'Sliding scale',
      capacity: 25, status: 'approved',
    },
    {
      title: 'Hausgemacht',
      tagline: 'A market of queer makers and small labels.',
      description: 'Forty tables of clothing, ceramics, prints, books, jewellery and food made by queer and FLINTA* people based in Berlin. Free to enter. Cash and card both accepted at most stalls.',
      date: d(1, 12, 0),
      venue: 'Naunynritze',
      address: 'Naunynstr. 72, 10997 Berlin',
      category: 'Market',
      audience: 'All welcome',
      tags: ['DIY'],
      imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800',
      priceMin: 0, priceMax: 0, pricingModel: 'Free',
      capacity: 200, status: 'approved',
    },

    // ── This weekend (Fri–Sun) ────────────────────────────────────────────────
    {
      title: 'Body Pressure',
      tagline: 'Movement, sweat, and no phones.',
      description: 'A FLINTA* only night focused on physical presence and collective movement. No phones policy strictly enforced. The music moves between gqom, afrobeats and UK funky. Come to dance, not to document.',
      date: d(3, 22, 0),
      venue: 'Trauma Bar und Kino',
      address: 'Revaler Str. 99, 10245 Berlin',
      category: 'Club',
      audience: 'FLINTA*',
      tags: ['Gqom', 'Breaks'],
      imageUrl: 'https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?w=800',
      priceMin: 10, priceMax: 18, pricingModel: 'Sliding scale',
      capacity: 150, status: 'approved',
    },
    {
      title: 'Drag Brunch at Sameheads',
      tagline: 'Eggs, coffee, and absolute chaos.',
      description: 'Sunday drag brunch with three performers, free coffee for the first hour and a DJ set that starts at noon and does not stop until everyone has left. FLINTA* and queer first at the door.',
      date: d(4, 11, 0),
      venue: 'Sameheads',
      address: 'Richardstr. 10, 12043 Berlin',
      category: 'Performance',
      audience: 'Queer',
      tags: ['Drag'],
      imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800',
      priceMin: 0, priceMax: 10, pricingModel: 'PWYC',
      capacity: 50, status: 'approved',
    },
    {
      title: 'Nachtfalter',
      tagline: 'Experimental electronics and live visuals.',
      description: 'Three acts performing live electronics alongside projected visuals. The programme moves from harsh noise to delicate synthesis. No DJ sets, no laptops hidden behind screens — everything performed live and visible.',
      date: d(3, 21, 0),
      venue: 'Silent Green',
      address: 'Gerichtstr. 35, 13347 Berlin',
      category: 'Concert',
      audience: 'All welcome',
      tags: ['Ambient', 'Techno'],
      imageUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800',
      priceMin: 10, priceMax: 10, pricingModel: 'Fixed price',
      capacity: 200, status: 'approved',
    },
    {
      title: 'Körper / Raum',
      tagline: 'Site-specific performance in an empty factory.',
      description: 'A site-specific performance piece by a collective of five dancers responding to the architecture of a former factory space. Two showings per night, 45 minutes each. Audience moves through the space.',
      date: d(5, 19, 0),
      venue: 'Alte Münze',
      address: 'Molkenmarkt 2, 10179 Berlin',
      category: 'Performance',
      audience: 'All welcome',
      tags: ['Dance'],
      imageUrl: 'https://images.unsplash.com/photo-1547153760-18fc86324498?w=800',
      priceMin: 12, priceMax: 20, pricingModel: 'Sliding scale',
      capacity: 40, status: 'approved',
    },
    {
      title: 'Saturday Kitchen at Oyoun',
      tagline: 'A communal meal cooked and shared together.',
      description: 'Every Saturday a different collective takes over the kitchen at Oyoun. This week: food from the Levant, cooked by the Beirut Diaspora Kitchen collective. Suggested donation €8. Vegan options available.',
      date: d(4, 18, 0),
      venue: 'Oyoun',
      address: 'Lucy-Lameck-Str. 32, 12049 Berlin',
      category: 'Kitchen',
      audience: 'All welcome',
      tags: ['Solidarity'],
      imageUrl: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800',
      priceMin: 0, priceMax: 12, pricingModel: 'PWYC',
      capacity: 60, status: 'approved',
    },

    // ── Next week ─────────────────────────────────────────────────────────────
    {
      title: 'Voices from the Margin',
      tagline: 'Readings by FLINTA* writers of colour.',
      description: 'An evening of readings by five FLINTA* writers of colour based in Berlin. Poetry, short prose and one excerpt from an upcoming novel. Books available to buy directly from the authors. In English and German.',
      date: d(7, 19, 30),
      venue: 'Oyoun',
      address: 'Lucy-Lameck-Str. 32, 12049 Berlin',
      category: 'Reading',
      audience: 'FLINTA*',
      tags: ['Spoken word', 'Solidarity'],
      imageUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800',
      priceMin: 5, priceMax: 15, pricingModel: 'Sliding scale',
      capacity: 60, status: 'approved',
    },
    {
      title: 'After the Archive',
      tagline: 'Documentary film and conversation.',
      description: 'A screening of a 90-minute documentary about the recovery of a lost queer archive from 1970s West Berlin, followed by a conversation with the director and one of the people featured in the film.',
      date: d(8, 19, 0),
      venue: 'Kino Central',
      address: 'Rosenthaler Str. 39, 10178 Berlin',
      category: 'Cinema',
      audience: 'Queer',
      tags: ['Spoken word', 'Solidarity'],
      imageUrl: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800',
      priceMin: 8, priceMax: 8, pricingModel: 'Fixed price',
      capacity: 70, status: 'approved',
    },
    {
      title: 'Warm Bodies',
      tagline: 'A night of queer electronic music and dancing.',
      description: 'Monthly queer club night at KitKat with a rotating cast of DJs. This month: disco, baile funk and deconstructed club music. Dress code: express yourself or don\'t come.',
      date: d(9, 22, 0),
      venue: 'KitKatClub',
      address: 'Köpenicker Str. 76, 10179 Berlin',
      category: 'Club',
      audience: 'Queer',
      tags: ['Disco', 'Techno'],
      imageUrl: 'https://images.unsplash.com/photo-1571266028243-d220c6a6fe7e?w=800',
      priceMin: 12, priceMax: 20, pricingModel: 'Sliding scale',
      capacity: 400, status: 'approved',
    },
    {
      title: 'Silk and Circuits',
      tagline: 'Fashion, technology, and queer futures.',
      description: 'A one-night exhibition and performance exploring the intersection of wearable technology, fashion and queer identity. Twelve artists, three performances, one runway show at 21:00. Free entry before 20:00.',
      date: d(10, 18, 0),
      venue: 'Radialsystem',
      address: 'Holzmarktstr. 33, 10243 Berlin',
      category: 'Exhibition',
      audience: 'Queer',
      tags: ['Visual art', 'Performance'],
      imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
      priceMin: 0, priceMax: 8, pricingModel: 'PWYC',
      capacity: 150, status: 'approved',
    },
  ]

  await prisma.event.deleteMany()
  console.log('Cleared existing events')

  for (const event of events) {
    await prisma.event.create({ data: event })
  }

  console.log(`Seeded ${events.length} events`)
  console.log(`  Tonight (day 0):       ${events.filter(e => e.date >= d(0,0) && e.date < d(1,0)).length} events`)
  console.log(`  Tomorrow (day 1):      ${events.filter(e => e.date >= d(1,0) && e.date < d(2,0)).length} events`)
  console.log(`  Weekend (days 3–5):    ${events.filter(e => e.date >= d(3,0) && e.date < d(6,0)).length} events`)
  console.log(`  Next week (days 7–10): ${events.filter(e => e.date >= d(7,0) && e.date < d(11,0)).length} events`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
