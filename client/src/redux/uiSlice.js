import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAdmissionModalOpen: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openAdmissionModal: (state) => {
      state.isAdmissionModalOpen = true;
    },
    closeAdmissionModal: (state) => {
      state.isAdmissionModalOpen = false;
    },
  },
});

export const { openAdmissionModal, closeAdmissionModal } = uiSlice.actions;
export default uiSlice.reducer;