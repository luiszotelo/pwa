import styles from '../styles/Header.module.css'
function Header () {
  return (
    <header >
        <img src="https://www.escotel.com.mx/images/logo.png" alt="logo" />

        <h1 className={styles['header__title']}>Service <span className={styles['service-track']}>Tracking</span></h1>
    </header>
  )
}

export default Header