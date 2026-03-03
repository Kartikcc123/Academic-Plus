import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// 1. The Async Thunk: This does the heavy lifting of talking to the backend
export const fetchInquiries = createAsyncThunk(
  'inquiries/fetchInquiries',
  async (token, thunkAPI) => {
    try {
      // We pass the token from the component so Redux can authenticate the request
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      const response = await axios.get('/api/inquiries', config);
      return response.data; // This becomes the 'action.payload'
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch inquiries');
    }
  }
);

// 2. The Slice: Managing the state based on the Thunk's progress
const inquirySlice = createSlice({
  name: 'inquiries',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {}, // We don't need manual reducers because the extraReducers handle the async stuff
  extraReducers: (builder) => {
    builder
      .addCase(fetchInquiries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInquiries.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload; // Boom, data is saved globally!
      })
      .addCase(fetchInquiries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default inquirySlice.reducer;