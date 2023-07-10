import { fbm } from "../../services/firabase/firabase";
import { setLatitude, setLongitude,setService } from "./serviceSlice";

export const updatePoints = (idService) => {
  return (dispatch, getState) => {
    const { latitude, longitude } = getState().serviceReducer;
    fbm.updatePoints(idService, { latitude, longitude });
    console.log("updatePoints", latitude, longitude);
  };
};

export const updatePointService = (idService) => {
  return (dispatch) => {
    try {
      fbm.obtenerDocumentoPorID(idService, (data) => {
        console.log("updatePointService", data);
        dispatch(setService(data));
        dispatch(setLatitude(data.trajectory[data.trajectory.length - 1].latitude));
        dispatch(setLongitude(data.trajectory[data.trajectory.length - 1].longitude));
      });

    } catch (error) {
      console.log(error);
    }
  };
};


export const createAlertService = (data) => {
    return dispatch => {
      fbm.createAlertService(data)
    }
}