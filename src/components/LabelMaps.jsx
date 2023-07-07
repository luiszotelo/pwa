import styles from '../styles/LabelMaps.module.css'
import Label from './Label.jsx'
function LabelMaps () {
  return (
      <div className={styles['esquina']}>
    <article className={styles['container']}>
              <Label color={'red'} label={'Ubicación Cliente'} />
              <Label color={'blue'} label={'Ubicación Proveedor'} />
              <Label color={'yellow'} label={'Destino'} />
    </article>
</div>
  )
}

export default LabelMaps