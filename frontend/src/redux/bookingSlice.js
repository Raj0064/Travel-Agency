import { createSlice } from "@reduxjs/toolkit";

const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    bookings: [],
  },
  reducers: {
    setBookings: (state, action) => {
      state.bookings = action.payload;
    },
  },
});
export default bookingSlice.reducer;
export const { setBookings } = bookingSlice.actions;
