import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const registerUser = createAsyncThunk(
  "auth/regester",
  async ({ firstName, lastName, email, password, phone }, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:4000/api/auth/regester", {
        firstName,
        lastName,
        email,
        password,
        phone,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to regester user");
    }
  }
);

const initialState = {
  userData: null,
  isLoading: false,
  isError: null,
  isRegistered: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetRegistration: (state) => {
      state.userData = null;
      state.isError = null;
      state.isRegistered = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
        state.isRegistered = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload.data;
        state.isRegistered = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
        state.isRegistered = false;
      });
  },
});

export const { resetRegistration } = authSlice.actions;
export default authSlice.reducer;