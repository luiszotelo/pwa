import { configureStore } from '@reduxjs/toolkit';
import serviceReducer  from '../slices/serviceSlice';

export const store = configureStore({
    reducer: {
        serviceReducer
    },
});
