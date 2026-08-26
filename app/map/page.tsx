import Link from "next/link";
import styles from "./page.module.css";

export default function MapPage() {
  return (
    <main className={styles.page}>
      <div className={styles.inner}>
        <div className={styles.label}>— Map</div>
        <h1 className={styles.title}>
          Work in progress.
        </h1>
        <p className={styles.subtitle}>
          I&apos;m building a map view of every event — check back soon.
        </p>
        <Link href="/events" className={styles.backLink}>
          Browse events →
        </Link>
      </div>
    </main>
  );
}
