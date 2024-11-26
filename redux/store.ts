import { configureStore } from '@reduxjs/toolkit';
import { globalSlice } from './globalStates';
export const store = configureStore({
    reducer: {
        global: globalSlice.reducer,
    }
    // Add any middleware or enhancers here
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;