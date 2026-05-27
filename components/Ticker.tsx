import styles from './Ticker.module.css'
 
const items = [
  '★ Queer & FLINTA* events in Berlin',
  'Human-edited · ad-free · member-funded',
  'Updated every Friday morning',
  '★ Every listing read by hand',
  'Berlin · 14° · bewölkt',
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
 