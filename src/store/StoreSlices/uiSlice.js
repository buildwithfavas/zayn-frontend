import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalOpen: false,
  id: null,
  params: { page: 1, perPage: 16 },
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setModalOpen: (state, action) => {
      state.modalOpen = action.payload;
    },
    setProductId: (state, action) => {
      state.id = action.payload;
    },
    setParams: (state, action) => {
      state.params = { ...state.params, ...action.payload };
    },
    clearParams: (state) => {
      state.params = { page: 1, perPage: 16 };
    },
  },
});

export const { setModalOpen, setProductId, setParams, clearParams } = uiSlice.actions;
export default uiSlice.reducer;
