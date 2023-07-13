import { createSlice } from "@reduxjs/toolkit";
import { getServiceApi, shareLocation } from "./serviceThunk";

const initialState = {
  service: {},
  latitude: 0,
  longitude: 0,
  loading: true,
  serviceApiSigsa: {},
  serviceApiSigsaStatus: "loading",
  message: '',
};

export const serviceSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setService: (state, action) => {
      state.service = action.payload;
      state.loading = false;
    },
    updateCompleted: (state) => {
      state.service.completed = true;
    },
    updatedArrived: (state) => {
      console.log("arrived");
      state.service.arrived = true;
    },
    setLatitude: (state, action) => {
      state.latitude = action.payload;
    },
    setLongitude: (state, action) => {
      state.longitude = action.payload;
    },
    mvCorrdinates: (state) => {
      state.latitude = state.latitude + 0.001;
      state.longitude = state.longitude + 0.001;
      console.log("mvCorrdinates", state.latitude, state.longitude);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getServiceApi.pending, (state, action) => {
        state.serviceApiSigsa = action.payload;
        state.serviceApiSigsaStatus = "loading";
      })
      .addCase(getServiceApi.rejected, (state) => {
        state.serviceApiSigsaStatus = "failed";
      })
      .addCase(getServiceApi.fulfilled, (state, action) => {
        state.serviceApiSigsa = action.payload;
        state.serviceApiSigsaStatus = "success";
      })
      .addCase(shareLocation.pending, (state) => {
        state.message = 'loading'
      }
      )
      .addCase(shareLocation.rejected, (state) => {
        state.message = "failed";
      }
      )
      .addCase(shareLocation.fulfilled, (state) => {
        state.message = 'Ubicación compartida correctamente';
      }
      );

  },
});

// Action creators are generated for each case reducer function
export const {
  mvCorrdinates,
  setLatitude,
  setLongitude,
  setService,
  updateCompleted,
  updatedArrived,
} = serviceSlice.actions;

export default serviceSlice.reducer;
