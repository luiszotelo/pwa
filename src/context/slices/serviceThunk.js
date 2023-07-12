import { createAsyncThunk } from "@reduxjs/toolkit";
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
    // eslint-disable-next-line no-unused-vars
    return dispatch => {
      fbm.createAlertService(data)
    }
}

// export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
//     const response = await axios.get(BASE_URL)
//     console.log(response.data)
//     return response?.data
// })

export const getServiceApi = createAsyncThunk('service/getService', async (id) => {
  try {
    const response = await fetch(`https://dev-sigsa.backend.escotel.mx/api/tracking/GetServicio/${id}`)
    const data = await response.json()
    return data
    
  } catch (error) {
    console.log(error) 
  }
} 
)
