import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Action to add items to cart
export const addToCart = createAsyncThunk(
  "cart/add",
  async ({ userId, items }, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:4000/api/addToCart/add", {
        userId,
        items,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to add item to cart");
    }
  }
);

// Action to remove items from cart
export const removeFromCart = createAsyncThunk(
  "cart/remove",
  async ({ userId, productId, variantId }, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:4000/api/addToCart/remove", {
        userId,
        productId,
        variantId,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to remove item from cart");
    }
  }
);

// Action to update cart item quantity
export const updateCartQuantity = createAsyncThunk(
  "cart/updateQuantity",
  async ({ userId, productId, variantId, quantity }, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:4000/api/addToCart/update-quantity", {
        userId,
        productId,
        variantId,
        quantity,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update cart quantity");
    }
  }
);

// Action to fetch cart by userId
export const getCart = createAsyncThunk(
  "cart/fetch",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/addToCart/get/${userId}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch cart");
    }
  }
);

const initialState = {
  cartData: null, // Store cart details (null initially, updated with fetched cart)
  isLoading: false,
  isError: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  extraReducers: (builder) => {
    builder
      // Add to Cart
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        // Optionally update cartData if the backend returns the updated cart
        // For now, we rely on getCart to refresh the cart
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })
      // Remove from Cart
      .addCase(removeFromCart.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.isLoading = false;
        // Optionally update cartData if the backend returns the updated cart
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })
      // Update Cart Quantity
      .addCase(updateCartQuantity.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        state.isLoading = false;
        // Optionally update cartData if the backend returns the updated cart
      })
      .addCase(updateCartQuantity.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })
      // Fetch Cart
      .addCase(getCart.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartData = action.payload;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      });
  },
});

export default cartSlice.reducer;