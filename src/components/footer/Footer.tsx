import styles from './footer.module.css'

export const Footer = () => {
  return (
    <footer className={styles.container}>
      <div className={styles.logo}>Lamadev</div>
      <div className={styles.text}>Some text</div>
    </footer>
  )
}
