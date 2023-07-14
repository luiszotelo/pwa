import { useDispatch, useSelector } from 'react-redux'
import { Button } from "antd";
import { updateCompleted, updatedArrived } from '../context/slices/serviceSlice.js';
import { fbm } from '../services/firabase/firabase.js';
function ButtonsMapProveedor ( { id , interval}) {
    const dispatch = useDispatch()
    const { arrived, completed } = useSelector(state => state.serviceReducer.service)
    const onClickUpdateArrive = () => {
        dispatch(updatedArrived())
        fbm.updateStatus(id, {arrived: true})
    }
    const onClickUpdateCompleted = () => {
        dispatch(updateCompleted())
        fbm.updateStatus(id, {completed: true})
        clearInterval(interval)
        // navigate('/')
        
    }
  return (
// 
// 
    <div className='flex gap-3 '>
        <Button  type='primary' disabled={arrived} size='large'  className='bg-sky-500' onClick={onClickUpdateArrive}>Confirmar Arribo</Button>
        <Button type='primary' disabled={!arrived || completed} onClick={onClickUpdateCompleted} size='large' danger   >Finalizar Servicio</Button>
    </div>
  )
}

export default ButtonsMapProveedor