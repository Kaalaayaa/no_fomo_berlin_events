'use client'

import { useState } from 'react'
import Link from 'next/link'
import styles from './auth.module.css'

export default function SignUpPage() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setSubmitted(true)
      setLoading(false)
    }, 800)
  }

  return (
    <main className={styles.page}>
      <div className={styles.inner}>
        <div className={styles.label}>— Become a member</div>
        <h1 className={styles.title}>
          Make yourself <em>a key.</em>
        </h1>
        <p className={styles.subtitle}>
          Two minutes. We never sell your email. You can leave any time.
        </p>

        {!submitted ? (
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.field}>
              <label htmlFor="name" className={styles.fieldLabel}>Name</label>
              <input
                id="name"
                className={styles.input}
                type="text"
                autoComplete="given-name"
                placeholder="First name or alias"
                required
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="email" className={styles.fieldLabel}>Email</label>
              <input
                id="email"
                className={styles.input}
                type="email"
                autoComplete="email"
                placeholder="you@queer.berlin"
                required
              />
            </div>
            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? 'Sending...' : 'Send invite link →'}
            </button>
            <p className={styles.terms}>
              By signing up you agree to our{' '}
              <a href="#" className={styles.termsLink}>door policy</a>{' '}
              and that you're 18+.
            </p>
          </form>
        ) : (
          <div className={styles.success}>
            <div className={styles.successLabel}>✓ Welcome.</div>
            <p className={styles.successText}>Check your inbox for the invite link.</p>
          </div>
        )}

        <div className={styles.perks}>
          <div className={styles.perksLabel}>— What you get</div>
          {[
            { num: '01', title: 'Friday digest, 48h early.', body: 'Weekend listings before the public site.' },
            { num: '02', title: 'Members-only listings.', body: "Small parties that don't want to be googled." },
            { num: '03', title: 'RSVP & .ics export.', body: 'Save events, drop them in your calendar.' },
          ].map(p => (
            <div key={p.num} className={styles.perk}>
              <span className={styles.perkNum}>{p.num}</span>
              <div>
                <span className={styles.perkTitle}>{p.title}</span>
                <span className={styles.perkBody}>{p.body}</span>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.divider}>
          <span className={styles.dividerText}>Already a member?</span>
          <Link href="/signin" className={styles.dividerLink}>Sign in →</Link>
        </div>
      </div>
    </main>
  )
}