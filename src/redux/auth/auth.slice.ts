import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "./auth.types";

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  error: null,
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state) => {
      state.isLoading = true;
    },
    setLoginSuccess: (
      state,
      action: PayloadAction<{ id: string; email: string }>
    ) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
      state.isLoading = false;
    },
    setLoginFail: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
      state.isLoading = false;
    },
    setLogout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
      state.isLoading = false;
    },
  },
});

export const { setLogin, setLoginSuccess, setLoginFail, setLogout } = authSlice.actions;

export default authSlice.reducer;
