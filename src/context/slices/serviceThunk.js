import { createAsyncThunk } from "@reduxjs/toolkit";
import { fbm } from "../../services/firabase/firabase";
import { setLatitude, setLongitude, setService } from "./serviceSlice";
import { clienteAxiosBaseUrl } from "../../utils/clienteAxiosBaseUrl";

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
        dispatch(
          setLatitude(data.trajectory[data.trajectory.length - 1].latitude)
        );
        dispatch(
          setLongitude(data.trajectory[data.trajectory.length - 1].longitude)
        );
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const createAlertService = (data) => {
  // eslint-disable-next-line no-unused-vars
  return (dispatch) => {
    fbm.createAlertService(data);
  };
};


export const getServiceApi = createAsyncThunk(
  "service/getService",
  async (id) => {
    try {
      const { data } = await clienteAxiosBaseUrl(
        `/api/tracking/GetServicio/${id}`
      );
      return data;
    } catch (error) {
      throw Error(error);
    }
  }
);

export const shareLocation = createAsyncThunk(
  "service/shareLocation",
  async (idCliente, number) => {
    try {
      const {data} = await clienteAxiosBaseUrl(
        `/api/tracking/Comparte/${idCliente}/${number}`
      );
      console.log(data);
    } catch (error) {
      throw Error(error);
    }
  }
);
