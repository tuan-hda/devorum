import { configureStore } from "@reduxjs/toolkit";
import menuSlice from "./slices/menuSlice";

export const store = configureStore({
  reducer: {
    [menuSlice.name]: menuSlice,
  },
  // devTools: true,
});
export type AppState = ReturnType<typeof store.getState>;
