import { useDispatch, useSelector } from 'react-redux'
import { Button } from "antd";
import { updateCompleted, updatedArrived } from '../context/slices/serviceSlice.js';
import { fbm } from '../services/firabase/firabase.js';
import { useNavigate } from 'react-router-dom';
function ButtonsMapProveedor ( { id , interval}) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
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
    <>
        <Button type='primary' disabled={arrived} onClick={onClickUpdateArrive}>Confirmar Arribo</Button>
        <Button type='primary' danger  disabled={!arrived || completed} onClick={onClickUpdateCompleted}>Finalizar Servicio</Button>
    </>
  )
}

export default ButtonsMapProveedor