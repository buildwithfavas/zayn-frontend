import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
};

const userAuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      console.log(state.user);
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    setUserLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setUser, clearUser, setUserLoading } = userAuthSlice.actions;
export default userAuthSlice.reducer;
