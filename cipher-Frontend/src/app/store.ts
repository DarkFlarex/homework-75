import { configureStore } from '@reduxjs/toolkit';
import {ciphersReducer} from "../ciphers/CpiherSlice";

export const store = configureStore({
  reducer: {
    cipher: ciphersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
