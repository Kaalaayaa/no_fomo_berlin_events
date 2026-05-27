'use client'

import { useState } from 'react'
import Link from 'next/link'
import styles from './auth.module.css'

export default function SignInPage() {
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
        <div className={styles.label}>— Sign in</div>
        <h1 className={styles.title}>
          Welcome <em>back.</em>
        </h1>
        <p className={styles.subtitle}>
          We'll email you a one-time link. No passwords.
        </p>

        {!submitted ? (
          <form className={styles.form} onSubmit={handleSubmit}>
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
              {loading ? 'Sending...' : 'Send me a link →'}
            </button>
          </form>
        ) : (
          <div className={styles.success}>
            <div className={styles.successLabel}>✓ You're in.</div>
            <p className={styles.successText}>Check your inbox for the link.</p>
          </div>
        )}

        <div className={styles.divider}>
          <span className={styles.dividerText}>No account yet?</span>
          <Link href="/signup" className={styles.dividerLink}>Become a member →</Link>
        </div>
      </div>
    </main>
  )
}