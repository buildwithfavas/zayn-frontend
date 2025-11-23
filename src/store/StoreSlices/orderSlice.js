import { createSlice } from "@reduxjs/toolkit";

const initialState = { items: [], prices: {}, coupon: null };

const orderSlice = createSlice({
  name: "Order",
  initialState,
  reducers: {
    createOrderItems: (state, action) => {
      state.items = action.payload.items;
      state.prices = action.payload.prices;
      state.coupon = action.payload.coupon || null;
    },
    applyCoupon: (state, action) => {
      state.coupon = action.payload.coupon;
      state.items = action.payload.items;
    },
    removeCoupon: (state, action) => {
      state.coupon = null;
      state.items = action.payload.items;
    },
  },
});

export const { createOrderItems, applyCoupon, removeCoupon } =
  orderSlice.actions;
export default orderSlice.reducer;
