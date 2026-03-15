import styles from './FounderStory.module.css'

export default function FounderStory() {
  return (
    <section className="section section-alt">
      <div className="container">
        <div className="section-header">
          <h2>Why I built Flamingua</h2>
        </div>
        <blockquote className={styles.quote}>
          <p className={styles.text}>
            When I moved from Geneva to Zurich, I needed to learn German for my residence permit.
            Language schools wanted CHF 2,000+ and had rigid schedules that didn't fit my work.
            Apps like Duolingo were fun but wouldn't prepare me for the Goethe exam.
            I spent months building what I wished existed: a structured, exam-aligned course
            that actually teaches you to speak — at a fraction of the cost. That's Flamingua.
          </p>
          <p className={styles.attribution}>— Tobias Hagstrom, Founder</p>
        </blockquote>
      </div>
    </section>
  )
}
