import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  admin: null,
  isAdminAuthenticated: false,
  isLoading: false,
};
const adminAuthSlice = createSlice({
  name: "adminAuth",
  initialState,
  reducers: {
    setAdmin: (state, action) => {
      state.admin = action.payload;
      state.isAdminAuthenticated = true;
    },
    clearAdmin: (state) => {
      state.admin = null;
      state.isAdminAuthenticated = false;
    },
    setAdminLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setAdmin, clearAdmin, setAdminLoading } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;
