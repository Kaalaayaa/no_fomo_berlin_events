'use client'

import { useState } from 'react'
import styles from './page.module.css'

const CATEGORIES = ['Club', 'Concert', 'Performance', 'Reading', 'Workshop', 'Cinema', 'Cruise', 'Kitchen', 'Talk']
const AUDIENCES = ['FLINTA*', 'Queer', 'All welcome']
const TAGS = ['Techno', 'Breaks', 'Gqom', 'Ambient', 'Drag', 'Spoken word', 'Solidarity', 'Fundraiser']
const PRICING = ['Sliding scale', 'Fixed price', 'PWYC', 'Free', 'Donation']
const ACCESS = ['Step-free entrance', 'Step-free floors', 'Accessible bathroom', 'Quiet room', 'Earplugs at bar', 'Free care companion', 'Sign language']

export default function SubmitPage() {
  const [category, setCategory] = useState<string | null>(null)
  const [audience, setAudience] = useState<string | null>(null)
  const [tags, setTags] = useState<string[]>([])
  const [pricing, setPricing] = useState<string | null>(null)
  const [access, setAccess] = useState<string[]>([])
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  function toggleTag(tag: string) {
    setTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag].slice(0, 5))
  }

  function toggleAccess(item: string) {
    setAccess(prev => prev.includes(item) ? prev.filter(a => a !== item) : [...prev, item])
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const form = e.currentTarget
    const data = new FormData(form)

    const payload = {
      title: data.get('title') as string,
      tagline: data.get('tagline') as string,
      description: data.get('description') as string,
      lineup: data.get('lineup') as string || null,
      date: new Date(`${data.get('date')}T${data.get('time') || '20:00'}`).toISOString(),
      venue: data.get('venue') as string,
      address: data.get('address') as string || null,
      category: category || 'Other',
      audience: audience || 'All welcome',
      tags,
      priceMin: data.get('priceMin') ? parseFloat(data.get('priceMin') as string) : null,
      priceMax: data.get('priceMax') ? parseFloat(data.get('priceMax') as string) : null,
      pricingModel: pricing,
      capacity: data.get('capacity') ? parseInt(data.get('capacity') as string) : null,
      ticketUrl: data.get('ticketUrl') as string || null,
      status: 'pending',
    }

    try {
      const res = await fetch('/api/events/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (res.ok) setSubmitted(true)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <main className={styles.successPage}>
        <div className={styles.successInner}>
          <div className={styles.sectionLabel}>— Submitted</div>
          <h1 className={styles.successTitle}>Got it. We'll review within 48 hours.</h1>
          <p className={styles.successText}>
            A human reads every submission. No automated rejections. If we have questions we'll reach out by email.
          </p>
          <a href="/" className={styles.backBtn}>← Back to events</a>
        </div>
      </main>
    )
  }

  return (
    <main>
      {/* HERO */}
      <section className={styles.heroSection}>
        <div className={styles.heroInner}>
          <div className={styles.heroGrid}>
            <div>
              <div className={styles.sectionLabel}>— Submit an event</div>
              <h1 className={styles.heroTitle}>
                Throwing something? <em>Tell us.</em>
              </h1>
            </div>
            <div>
              <p className={styles.heroSubtitle}>
                Free for grassroots crews. We don't list venue programming, brand activations, or anything with a guestlist arms race. Reviewed within 48 hours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FORM */}
      <section>
        <div className={styles.formInner}>
          <form className={styles.form} onSubmit={handleSubmit}>

            {/* 01 BASICS */}
            <div className={styles.formSection}>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionNum}>01</span>
                <div>
                  <div className={styles.sectionLabel}>— The basics</div>
                  <h2 className={styles.sectionTitle}>What, when, where.</h2>
                </div>
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="title">Event title <span className={styles.req}>*</span></label>
                <input id="title" name="title" className={styles.input} type="text" placeholder="Soft Power vol. 13" required />
              </div>

              <div className={styles.grid3}>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="date">Date <span className={styles.req}>*</span></label>
                  <input id="date" name="date" className={styles.input} type="date" required />
                </div>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="time">Doors <span className={styles.req}>*</span></label>
                  <input id="time" name="time" className={styles.input} type="time" required />
                </div>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="end">Ends</label>
                  <input id="end" name="end" className={styles.input} type="time" />
                </div>
              </div>

              <div className={styles.grid2}>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="venue">Venue <span className={styles.req}>*</span></label>
                  <input id="venue" name="venue" className={styles.input} type="text" placeholder="RSO · Sameheads…" required />
                  <div className={styles.hint}>Or "Location on RSVP" if you don't publish the address.</div>
                </div>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="address">Address</label>
                  <input id="address" name="address" className={styles.input} type="text" placeholder="Schnellerstr. 137, 12439 Berlin" />
                </div>
              </div>
            </div>

            {/* 02 TYPE */}
            <div className={styles.formSection}>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionNum}>02</span>
                <div>
                  <div className={styles.sectionLabel}>— Type & community</div>
                  <h2 className={styles.sectionTitle}>Help us place it.</h2>
                </div>
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Event type · pick one <span className={styles.req}>*</span></label>
                <div className={styles.chips}>
                  {CATEGORIES.map(c => (
                    <button key={c} type="button"
                      className={category === c ? styles.chipActive : styles.chip}
                      onClick={() => setCategory(c)}
                      aria-pressed={category === c}
                    >{c}</button>
                  ))}
                </div>
              </div>

              <div className={styles.field}>
                <label className={styles.label}>For whom · pick one <span className={styles.req}>*</span></label>
                <div className={styles.chips}>
                  {AUDIENCES.map(a => (
                    <button key={a} type="button"
                      className={
                        a !== 'All welcome'
                          ? audience === a ? styles.chipAccentActive : styles.chipAccent
                          : audience === a ? styles.chipActive : styles.chip
                      }
                      onClick={() => setAudience(a)}
                      aria-pressed={audience === a}
                    >{a}</button>
                  ))}
                </div>
                <div className={styles.hint}>Be honest — the awareness team will care.</div>
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Tags <em className={styles.optional}>(optional, up to 5)</em></label>
                <div className={styles.chips}>
                  {TAGS.map(t => (
                    <button key={t} type="button"
                      className={tags.includes(t) ? styles.chipActive : styles.chipGhost}
                      onClick={() => toggleTag(t)}
                      aria-pressed={tags.includes(t)}
                    >{t}</button>
                  ))}
                </div>
              </div>
            </div>

            {/* 03 DESCRIPTION */}
            <div className={styles.formSection}>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionNum}>03</span>
                <div>
                  <div className={styles.sectionLabel}>— Tell us about it</div>
                  <h2 className={styles.sectionTitle}>Two paragraphs, max.</h2>
                </div>
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="tagline">Tagline <span className={styles.req}>*</span></label>
                <input id="tagline" name="tagline" className={styles.input} type="text" placeholder="An all-night residency in three rooms." required />
                <div className={styles.hint}>One sentence. Appears under the title on the listing card.</div>
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="description">Full description <span className={styles.req}>*</span></label>
                <textarea id="description" name="description" className={styles.textarea} placeholder="Who's playing, what to expect, anything else the door should know. ~150–250 words." required />
                <div className={styles.hint}>Plain text. Write it the way you'd describe it to a friend.</div>
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="lineup">Line-up <em className={styles.optional}>(one per line, optional)</em></label>
                <textarea id="lineup" name="lineup" className={styles.textarea}
                  placeholder={`23:59 — Opening set\n01:00 — Maara (Montréal)\n03:00 — Sugar Free (Lisboa)`} />
              </div>
            </div>

            {/* 04 DOOR */}
            <div className={styles.formSection}>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionNum}>04</span>
                <div>
                  <div className={styles.sectionLabel}>— Door & tickets</div>
                  <h2 className={styles.sectionTitle}>Money & sliding scale.</h2>
                </div>
              </div>

              <div className={styles.grid3}>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="priceMin">Door — from <span className={styles.req}>*</span></label>
                  <input id="priceMin" name="priceMin" className={styles.input} type="number" placeholder="8" min="0" required />
                </div>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="priceMax">Door — to</label>
                  <input id="priceMax" name="priceMax" className={styles.input} type="number" placeholder="18" min="0" />
                  <div className={styles.hint}>Leave empty if fixed price.</div>
                </div>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="capacity">Capacity</label>
                  <input id="capacity" name="capacity" className={styles.input} type="number" placeholder="320" min="0" />
                </div>
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Pricing model</label>
                <div className={styles.chips}>
                  {PRICING.map(p => (
                    <button key={p} type="button"
                      className={pricing === p ? styles.chipActive : styles.chip}
                      onClick={() => setPricing(p)}
                      aria-pressed={pricing === p}
                    >{p}</button>
                  ))}
                </div>
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="ticketUrl">Tickets URL <em className={styles.optional}>(optional)</em></label>
                <input id="ticketUrl" name="ticketUrl" className={styles.input} type="url" placeholder="https://…" />
              </div>
            </div>

            {/* 05 AWARENESS */}
            <div className={styles.formSection}>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionNum}>05</span>
                <div>
                  <div className={styles.sectionLabel}>— Awareness & accessibility</div>
                  <h2 className={styles.sectionTitle}>Required.</h2>
                </div>
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="awareness">Awareness contact <span className={styles.req}>*</span></label>
                <input id="awareness" name="awareness" className={styles.input} type="text" placeholder="Name + phone or Signal handle reachable on the night" required />
                <div className={styles.hint}>Will not be public — only used if a guest reports an incident.</div>
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Accessibility</label>
                <div className={styles.chips}>
                  {ACCESS.map(a => (
                    <button key={a} type="button"
                      className={access.includes(a) ? styles.chipActive : styles.chip}
                      onClick={() => toggleAccess(a)}
                      aria-pressed={access.includes(a)}
                    >{a}</button>
                  ))}
                </div>
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="extra">Anything else the door should make clear?</label>
                <textarea id="extra" name="extra" className={styles.textarea} placeholder="e.g. phone sticker policy, dress code, content warnings, photography rules." />
              </div>
            </div>

            {/* 06 WHO */}
            <div className={styles.formSection}>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionNum}>06</span>
                <div>
                  <div className={styles.sectionLabel}>— Who's submitting</div>
                  <h2 className={styles.sectionTitle}>So we can reach you.</h2>
                </div>
              </div>

              <div className={styles.grid2}>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="crew">Crew / collective <span className={styles.req}>*</span></label>
                  <input id="crew" name="crew" className={styles.input} type="text" placeholder="Soft Power" required />
                </div>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="email">Your email <span className={styles.req}>*</span></label>
                  <input id="email" name="email" className={styles.input} type="email" placeholder="you@queer.berlin" required />
                </div>
              </div>

              <label className={styles.checkboxLabel}>
                <input type="checkbox" className={styles.checkbox} required />
                <span className={styles.checkboxText}>
                  I confirm this event is grassroots, community-led, with an awareness contact present on the night.
                </span>
              </label>
            </div>

            <div className={styles.submitRow}>
              <button type="submit" className={styles.submitBtn} disabled={loading}>
                {loading ? 'Submitting...' : 'Submit for review →'}
              </button>
              <div className={styles.submitHint}>Reviewed by a human within 48 hours. No automated rejections.</div>
            </div>

          </form>

          {/* SIDEBAR */}
          <aside className={styles.sidebar}>
            <div className={styles.sidebarSticky}>

              <div className={styles.sidebarBox}>
                <div className={styles.sectionLabel} style={{ color: 'var(--accent)' }}>— What we check</div>
                <ul className={styles.checkList}>
                  <li>· Grassroots & community-led — not a brand activation.</li>
                  <li>· Awareness team present and reachable on the night.</li>
                  <li>· Door is honest about who the night is for.</li>
                  <li>· Pricing isn't gatekeeping the community it claims to serve.</li>
                </ul>
              </div>

              <div className={styles.sidebarBox} style={{ background: 'var(--paper-soft)' }}>
                <div className={styles.sectionLabel}>— Not sure?</div>
                <p className={styles.sidebarText}>
                  If you're not sure whether your event fits, send us a message before submitting. We'd rather have a quick conversation than a rejected form.
                </p>
                <a href="mailto:hello@nofomo.berlin" className={styles.sidebarLink}>hello@nofomo.berlin</a>
              </div>

            </div>
          </aside>
        </div>
      </section>
    </main>
  )
}