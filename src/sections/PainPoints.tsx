import styles from './PainPoints.module.css'

const points = [
  {
    icon: '💸',
    title: 'Language schools cost thousands',
    desc: 'CHF 2,000–4,000 for a single A1 course. Plus commute, materials, and registration fees.',
  },
  {
    icon: '📅',
    title: "Fixed schedules don't fit your life",
    desc: 'Waitlists, rigid timetables, miss one class and you fall behind the group.',
  },
  {
    icon: '🎯',
    title: "Generic apps don't have a curriculum",
    desc: "Duolingo and Babbel teach random vocabulary with no progression. They don't follow Goethe or DELF exam structure.",
  },
]

export default function PainPoints() {
  return (
    <section className="section section-alt">
      <div className="container">
        <div className="section-header">
          <h2>Sound familiar?</h2>
        </div>
        <div className={styles.grid}>
          {points.map((p) => (
            <div key={p.title} className={styles.card}>
              <div className={styles.emoji}>{p.icon}</div>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
