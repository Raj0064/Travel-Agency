import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice.js";
import packageSlice from "./packageSlice.js";
import bookingSlice from "./bookingSlice.js";

const store = configureStore({
  reducer: {
    auth: authSlice,
    package:packageSlice,
    booking:bookingSlice
  },
});

export default store;