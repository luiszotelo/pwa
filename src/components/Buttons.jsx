import { useDispatch, useSelector } from 'react-redux'
import { Button } from "antd";
import { updateCompleted, updatedArrived } from '../context/slices/serviceSlice.js';
import { fbm } from '../firabase/firabase.js';
function Buttons ( { id }) {
    const dispatch = useDispatch()
    const { arrived, completed } = useSelector(state => state.serviceReducer.service)
    const onClickUpdateArrive = () => {
        dispatch(updatedArrived())
        fbm.updateStatus(id, {arrived: true})
    }
    const onClickUpdateCompleted = () => {
        dispatch(updateCompleted())
        fbm.updateStatus(id, {completed: true})
    }
  return (
    <>
        <Button type='primary' disabled={arrived} onClick={onClickUpdateArrive}>Confirmar Arrivo</Button>
        <Button type='primary' danger  disabled={!arrived || completed} onClick={onClickUpdateCompleted}>Finalizar Servicio</Button>
    </>
  )
}

export default Buttons