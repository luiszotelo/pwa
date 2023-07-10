import { fbm } from "../../services/firabase/firabase";

export const  updatePoints = (idService) => {
    return (dispatch,getState) => {
        const { latitude, longitude } = getState().serviceReducer;
        fbm.updatePoints(idService,{latitude,longitude})
    }  
}