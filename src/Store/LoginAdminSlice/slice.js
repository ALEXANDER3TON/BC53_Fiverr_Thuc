import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import Swal from "sweetalert2";
import axios from "axios";

import { CURRENT_ADMIN } from "../../Constant";
import fetcher from "../../APIs/fetcher";

export const loginAdmin = createAsyncThunk(
  "admin/loginAdmin",
  async (payload) => {
    console.log("payload", payload);
    try {
      const Request = await fetcher.post("/auth/signin", payload);
      const response = await Request.data.content;
      console.log("response", response);
      localStorage.setItem(CURRENT_ADMIN, JSON.stringify(response));
      return response;
    } catch (error) {}
  }
);

const initialState = {
  loading: false,
  user: localStorage.getItem(CURRENT_ADMIN)
    ? JSON.parse(localStorage.getItem(CURRENT_ADMIN))
    : null,
  error: null,
};

export const LoginAdminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setLogout: (state, { payload }) => {
      localStorage.removeItem(CURRENT_ADMIN);
      state.user = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload;
        state.error = null;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.error.message;
      });
  },
});

export const { reducer: AdminReducer, actions: AdminAction } = LoginAdminSlice;
