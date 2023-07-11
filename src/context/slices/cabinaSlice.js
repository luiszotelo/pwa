import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    alerts: []
}

export const cabinaSlice = createSlice({
  name: 'mapCabina',
  initialState,
  reducers: {
    setAlerts: (state,action) => {
        state.alerts = action.payload
    },
  },
})

export const {setAlerts} = cabinaSlice.actions

export default cabinaSlice.reducer