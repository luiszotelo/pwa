import { configureStore } from '@reduxjs/toolkit';
import serviceReducer  from '../slices/serviceSlice';
import { mapReducer } from '../slices';

export const store = configureStore({
    reducer: {
        serviceReducer,
        mapReducer
    },
});
