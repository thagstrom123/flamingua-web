import { useState } from 'react'
import styles from './FAQ.module.css'

const faqs = [
  {
    q: 'Is Flamingua really enough to pass the A1 exam?',
    a: 'Flamingua covers all Goethe A1 and DELF A1 vocabulary, grammar structures, and exam formats. Combined with regular practice, many users feel prepared for the exam. For best results, supplement with real conversations when possible.',
  },
  {
    q: 'How is Flamingua different from Duolingo?',
    a: 'Duolingo teaches random vocabulary through gamification. Flamingua follows a structured, exam-aligned curriculum with 36 lessons that build on each other — just like a language course, but at your own pace and 98% cheaper.',
  },
  {
    q: 'How does the grammar progression work?',
    a: 'Each unit introduces grammar in context through dialogues and exercises — not as abstract tables. Later units build on earlier ones, so you learn present tense before past tense, articles before adjective endings. It mirrors how a good language course sequences grammar.',
  },
  {
    q: 'What can I do for free?',
    a: 'Units 1–3 (9 full lessons) are completely free with all exercise types. No account needed, no credit card required. Premium unlocks Units 4–12 and AI features.',
  },
  {
    q: 'Who built this?',
    a: 'Flamingua was built by Tobias Hagstrom, an expat who moved from Geneva to Zurich and needed to pass the Goethe A1. After spending CHF 2,000 on language schools, he built the app he wished existed.',
  },
  {
    q: 'Is my data safe?',
    a: 'Your progress is stored locally on your device. We don\'t sell data, run ads, or track you. AI features process your audio/text to provide feedback — nothing is stored after evaluation.',
  },
  {
    q: 'How long does it take to complete?',
    a: 'Most users complete the course in 8–12 weeks studying 15–20 minutes per day. You can go faster or slower — there are no deadlines.',
  },
  {
    q: 'Can I cancel anytime?',
    a: 'Yes. Premium subscriptions can be cancelled anytime through the App Store or Google Play. No cancellation fees, no questions asked.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="section section-alt">
      <div className="container">
        <div className="section-header">
          <h2>Frequently asked questions</h2>
        </div>
        <div className={styles.list}>
          {faqs.map((faq, i) => (
            <div key={i} className={styles.item}>
              <button
                className={styles.question}
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                {faq.q}
                <span className={open === i ? styles.arrowOpen : styles.arrow}>▼</span>
              </button>
              {open === i && <div className={styles.answer}>{faq.a}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
