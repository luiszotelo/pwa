import styles from '../styles/LabelMaps.module.css'
function Label ( {color, label} ) {
  return (
    <>
      
<div className={styles['label__block']}>
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={color} className={styles["ping"]}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
</svg>
              <span className={styles['label']}> {label} </span>
</div>
    </>
  )
}

export default Label