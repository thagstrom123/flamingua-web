import StoreButtons from '../components/StoreButtons'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.links}>
        <a href="mailto:hallo.flamingua@gmail.com">Contact</a>
        <a href="mailto:hallo.flamingua@gmail.com?subject=Privacy%20Policy">Privacy Policy</a>
        <a href="mailto:hallo.flamingua@gmail.com?subject=Terms%20of%20Service">Terms of Service</a>
      </div>
      <StoreButtons size="small" />
      <p className={styles.copyright}>&copy; 2026 Tobias Hagstrom. All rights reserved.</p>
    </footer>
  )
}
