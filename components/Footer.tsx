import Link from 'next/link'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>

        <div className={styles.wordmark}>
          no<i>/</i>fomo
        </div>

        <nav className={styles.nav} aria-label="Footer navigation">
          <Link href="/" className={styles.navLink}>Events</Link>
          <Link href="/about" className={styles.navLink}>About</Link>
          <Link href="/submit" className={styles.navLink}>Submit an event</Link>
          <span className={styles.dot}>·</span>
          <Link href="/submit" className={styles.navLink}>Become a member</Link>
        </nav>

        <div className={styles.legal}>
          <div>© no/fomo Berlin · 2026</div>
          <div className={styles.legalLinks}>
            <a href="#" className={styles.legalLink}>Imprint</a>
            <a href="#" className={styles.legalLink}>Datenschutz</a>
            <a href="#" className={styles.legalLink}>EN / DE</a>
          </div>
        </div>

      </div>
    </footer>
  )
}