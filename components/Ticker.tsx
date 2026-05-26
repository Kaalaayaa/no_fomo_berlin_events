import styles from './Ticker.module.css'
 
const items = [
  '★ June lineup is live',
  'Berlin · 13° · klar',
  'Members night ⟶ Fri 06.06 · RSO',
  'Door policy: respect or leave',
  '★ Solidarity tickets always available',
]
 
export default function Ticker() {
  return (
    <div className={styles.ticker} aria-hidden="true">
      <div className={styles.track}>
        <div className={styles.items}>
          {items.map((item, i) => <span key={i}>{item}</span>)}
        </div>
        <div className={styles.items} aria-hidden="true">
          {items.map((item, i) => <span key={i}>{item}</span>)}
        </div>
      </div>
    </div>
  )
}
 