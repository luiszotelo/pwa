import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  service: {},
  
}

export const serviceSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setService: (state, action) => {
      state.service = action.payload
    },
      updateCompleted: (state) => {
        state.service.completed =  true
    },
    updatedArrived: (state) => {
      console.log('arrived')
      state.service.arrived =  true 
    }
  }
}) 


// Action creators are generated for each case reducer function
export const { setService, updateCompleted, updatedArrived} = serviceSlice.actions

export default serviceSlice.reducer