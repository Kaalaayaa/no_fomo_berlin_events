import Link from 'next/link'
import styles from './Header.module.css'

export default function Header() {
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
        </nav>

        <div className={styles.actions}>
          <Link href="/submit" className={styles.submitBtn}>
            Submit event →
          </Link>
        </div>

      </div>
    </header>
  )
}