import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.push(action.payload);
    },
    removeFromCart: (state, action) => {
      return state.filter((e, i) => i != action.payload.index);
    },
    increaseQty: (state, action) => {
      state[action.payload.index].quantity++;
    },
    decreaseQty: (state, action) => {
      if (state[action.payload.index].quantity > 1) {
        state[action.payload.index].quantity--;
      }
    },
    clearCart: () => {
      return [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
