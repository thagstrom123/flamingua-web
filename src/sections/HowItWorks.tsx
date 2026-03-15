import styles from './HowItWorks.module.css'

const steps = [
  { num: '1', title: 'Download free', desc: 'Get Flamingua from the App Store or Google Play. Units 1–3 are completely free.' },
  { num: '2', title: 'Follow the curriculum', desc: 'Work through structured lessons at your own pace. Practice speaking, writing, and grammar.' },
  { num: '3', title: 'Pass your exam', desc: 'Arrive at Goethe or DELF A1 prepared and confident.' },
]

export default function HowItWorks() {
  return (
    <section className="section section-alt">
      <div className="container">
        <div className="section-header">
          <h2>How it works</h2>
        </div>
        <div className={styles.steps}>
          {steps.map((s, i) => (
            <>
              <div key={s.num} className={styles.step}>
                <div className={styles.stepNumber}>{s.num}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
              {i < 2 && <div key={`c-${i}`} className={styles.connector}>→</div>}
            </>
          ))}
        </div>
      </div>
    </section>
  )
}
