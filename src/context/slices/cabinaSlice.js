import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    alerts: [],
    servicesActive: [],
    markers: [],
    markersInMap: []
}

export const cabinaSlice = createSlice({
  name: 'mapCabina',
  initialState,
  reducers: {
    setAlerts: (state,action) => {
        state.alerts = action.payload
    },
    setServicesActive: (state, action) => {
      state.servicesActive = action.payload
    },
    setMarkers: (state, action) =>{
      state.markers = action.payload
    },
    setMarkersInMap: (state, action) =>{
      state.markersInMap = [...state.markersInMap, action.payload] 
    }
  },
})



export const {setAlerts, setServicesActive, setMarkers, setMarkersInMap} = cabinaSlice.actions

export default cabinaSlice.reducer