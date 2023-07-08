import { useDispatch, useSelector } from 'react-redux'
import { Button } from "antd";
import { updateCompleted, updatedArrived } from '../context/slices/serviceSlice.js';

function Buttons () {
    const dispatch = useDispatch()
    const { arrived, completed } = useSelector(state => state.serviceReducer.service)
    const onClickUpdateArrive = () => {
        dispatch(updatedArrived())
        
    }
    const onClickUpdateCompleted = () => {
        dispatch(updateCompleted())
    }
  return (
    <>
        <Button type='primary' disabled={arrived} onClick={onClickUpdateArrive}>Confirmar Arrivo</Button>
        <Button type='primary' danger  disabled={!arrived || completed} onClick={onClickUpdateCompleted}>Finalizar Servicio</Button>
    </>
  )
}

export default Buttons