import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const CategoryFetch = createAsyncThunk(
  "category/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:4000/api/category/getall");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch categories");
    }
  }
);

const categorySlice = createSlice({
  name: "Category",
  initialState: {
    CategoryData: [],
    isLoading: false,
    isError: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(CategoryFetch.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(CategoryFetch.fulfilled, (state, action) => {
        state.isLoading = false;
        state.CategoryData = action.payload;
      })
      .addCase(CategoryFetch.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      });
  },
});

export default categorySlice.reducer;