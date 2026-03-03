import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './uiSlice';
import inquiryReducer from './inquirySlice'; // Import the inquiry reducer

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    inquiries: inquiryReducer, // Dynamically import the inquiry reducer
  },
});