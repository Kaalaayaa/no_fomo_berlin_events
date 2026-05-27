import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <h1 className={styles.title}>
          Queer & FLINTA* events <em>in</em> Berlin.
        </h1>
        {/* <p className={styles.subtitle}>
          A weekly, human-edited index of clubs, concerts, readings, kitchens
          and cruises — read by a person before it shows up here.
        </p> */}
      </div>
    </section>
  )
}