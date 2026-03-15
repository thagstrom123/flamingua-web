import StoreButtons from '../components/StoreButtons'
import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section className={styles.hero}>
      <img
        src={import.meta.env.BASE_URL + 'flamingua_icon_1024.png'}
        alt="Flamingua app icon"
        className={styles.icon}
      />
      <h1 className={styles.headline}>
        A real A1 curriculum — not random exercises
      </h1>
      <p className={styles.subheadline}>
        36 structured lessons that follow the Goethe and DELF A1 syllabus.
        Grammar builds on grammar. Vocabulary builds on vocabulary.
        AI speaking practice included. 98% cheaper than language schools.
      </p>
      <StoreButtons />
      <p className={styles.note}>Units 1–3 free. No credit card needed.</p>
    </section>
  )
}
