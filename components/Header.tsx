'use client'

import { useState } from 'react'
import Link from 'next/link'
import styles from './Header.module.css'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className={styles.header}>
      <div className={styles.inner}>

        <Link href="/" className={styles.wordmark} aria-label="no/fomo home">
          <span className={styles.logo}>
            no<i>/</i>fomo
          </span>
          <span className={styles.city}>Berlin</span>
        </Link>

        <nav className={styles.nav} aria-label="Main navigation">
          <Link href="/" className={styles.navLink}>Events</Link>
          <Link href="/about" className={styles.navLink}>About</Link>
          <Link href="/" className={styles.navLink}>Map</Link>
          <Link href="/about" className={styles.navLink}>Calender</Link>
        </nav>

        <div className={styles.actions}>
          <Link href="/submit" className={styles.submitBtn}>
            Submit event →
          </Link>
          <Link href="/signin" className={styles.signinBtn}>
            Sign in
          </Link>
        </div>

        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen(prev => !prev)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span className={`${styles.bar} ${menuOpen ? styles.barTopOpen : ''}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.barMidOpen : ''}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.barBotOpen : ''}`} />
        </button>

      </div>

      {menuOpen && (
        <div className={styles.mobileMenu}>
          <nav className={styles.mobileNav} aria-label="Mobile navigation">
            <Link href="/" className={styles.mobileNavLink} onClick={() => setMenuOpen(false)}>Events</Link>
            <Link href="/about" className={styles.mobileNavLink} onClick={() => setMenuOpen(false)}>About</Link>
            <Link href="/" className={styles.mobileNavLink} onClick={() => setMenuOpen(false)}>Map</Link>
            <Link href="/about" className={styles.mobileNavLink} onClick={() => setMenuOpen(false)}>Calender</Link>
          </nav>
          <div className={styles.mobileActions}>
            <Link href="/submit" className={styles.submitBtn} onClick={() => setMenuOpen(false)}>
              Submit event →
            </Link>
            <Link href="/signin" className={styles.signinBtn} onClick={() => setMenuOpen(false)}>
              Sign in
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
