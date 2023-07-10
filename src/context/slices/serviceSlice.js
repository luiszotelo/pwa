import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  service: {},
  latitude: 0,
  longitude: 0,
};

export const serviceSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setService: (state, action) => {
      state.service = action.payload;
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
      state.latitude = state.latitude + 0.0001;
      state.longitude = state.longitude + 0.0001;
    },
      
  },
});

// Action creators are generated for each case reducer function
export const {mvCorrdinates, setLatitude, setLongitude, setService, updateCompleted, updatedArrived } =
  serviceSlice.actions;

export default serviceSlice.reducer;
