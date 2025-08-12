import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Action to fetch all products
export const ProductFetch = createAsyncThunk(
  "Product/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:4000/api/product/get");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch products");
    }
  }
);

// Action to fetch a single product by ID
export const ProductFetchById = createAsyncThunk(
  "Product/fetchById",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/product/get/${productId}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch product");
    }
  }
);

const initialState = {
  ProductData: [],
  isLoading: false,
  isError: null,
};

const ProductSlice = createSlice({
  name: "Product",
  initialState,
  extraReducers: (builder) => {
    builder
      // Handle ProductFetch
      .addCase(ProductFetch.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(ProductFetch.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ProductData = action.payload;
      })
      .addCase(ProductFetch.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })
      // Handle ProductFetchById
      .addCase(ProductFetchById.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(ProductFetchById.fulfilled, (state, action) => {
        state.isLoading = false;
        // Add or update the product in ProductData
        const existingProductIndex = state.ProductData.findIndex((p) => p._id === action.payload._id);
        if (existingProductIndex >= 0) {
          state.ProductData[existingProductIndex] = action.payload;
        } else {
          state.ProductData.push(action.payload);
        }
      })
      .addCase(ProductFetchById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      });
  },
});

export default ProductSlice.reducer;