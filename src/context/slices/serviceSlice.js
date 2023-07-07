import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  service: {},
  arrived: false,
  completed: false,
  
}

export const serviceSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setService: (state, action) => {
      state.service = action.payload
    },
      updateCompleted: (state) => {
        state.completed =  true
    },
    updatedArrived: (state) => {
      console.log('arrived')
      state.arrived =  true 
    }
  }
}) 


// Action creators are generated for each case reducer function
export const { setService, updateCompleted, updatedArrived} = serviceSlice.actions

export default serviceSlice.reducer