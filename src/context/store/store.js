import { configureStore } from '@reduxjs/toolkit';
import serviceReducer  from '../slices/serviceSlice';
import {  cabinaReducer } from '../slices';

export const store = configureStore({
    reducer: {
        serviceReducer,
         cabinaReducer
    },
});
