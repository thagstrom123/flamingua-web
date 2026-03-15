import styles from './Pricing.module.css'

export default function Pricing() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <h2>Transparent pricing</h2>
          <p>No hidden fees. No surprise charges. Cancel anytime.</p>
        </div>

        <div className={styles.comparison}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th></th>
                <th>Language School</th>
                <th>Duolingo Plus</th>
                <th>Babbel</th>
                <th className={styles.highlight}>Flamingua</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Cost</td>
                <td>CHF 2,500–5,000</td>
                <td>$13/mo</td>
                <td>$15/mo</td>
                <td className={styles.highlight}>€4.99/mo</td>
              </tr>
              <tr>
                <td>Exam-aligned</td>
                <td>Yes</td>
                <td>No</td>
                <td>Partially</td>
                <td className={styles.highlight}>Yes</td>
              </tr>
              <tr>
                <td>Speaking practice</td>
                <td>In class only</td>
                <td>Limited</td>
                <td>Limited</td>
                <td className={styles.highlight}>AI-powered</td>
              </tr>
              <tr>
                <td>Structured curriculum</td>
                <td>Yes</td>
                <td>No</td>
                <td>Partially</td>
                <td className={styles.highlight}>Yes — 36 lessons</td>
              </tr>
              <tr>
                <td>Flexible schedule</td>
                <td>No</td>
                <td>Yes</td>
                <td>Yes</td>
                <td className={styles.highlight}>Yes</td>
              </tr>
              <tr>
                <td>Grammar progression</td>
                <td>Yes</td>
                <td>No</td>
                <td>Partially</td>
                <td className={styles.highlight}>Yes — sequenced</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className={styles.cards}>
          <div className={styles.card}>
            <h3>Free</h3>
            <div className={styles.price}>€0</div>
            <div className={styles.priceNote}>forever</div>
            <ul className={styles.featureList}>
              <li>Units 1–3 (9 lessons)</li>
              <li>All exercise types</li>
              <li>Grammar progression</li>
              <li>No account required</li>
            </ul>
          </div>
          <div className={styles.cardPremium}>
            <div className={styles.badge}>Most Popular</div>
            <h3>Premium</h3>
            <div className={styles.price}>€4.99</div>
            <div className={styles.priceNote}>per month</div>
            <ul className={styles.featureList}>
              <li>All 36 lessons</li>
              <li>AI speaking practice</li>
              <li>AI writing evaluation</li>
              <li>Full exam preparation</li>
              <li>Cancel anytime</li>
            </ul>
          </div>
        </div>

        <p className={styles.savings}>98% cheaper than a language school course.</p>
      </div>
    </section>
  )
}
