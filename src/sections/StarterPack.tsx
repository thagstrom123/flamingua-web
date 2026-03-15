import styles from './StarterPack.module.css'

export default function StarterPack() {
  return (
    <section className="section">
      <div className="container">
        <div className={styles.wrapper}>
          <span className={styles.coming}>Coming Soon</span>
          <h2>A1 Without Classes — Starter Pack</h2>
          <p>
            A free PDF guide with study schedule, exam tips, and vocabulary lists
            to complement your Flamingua practice.
          </p>
          <a
            href="mailto:hallo.flamingua@gmail.com?subject=Starter%20Pack%20Waitlist"
            className={styles.cta}
          >
            Join the waitlist
          </a>
        </div>
      </div>
    </section>
  )
}
