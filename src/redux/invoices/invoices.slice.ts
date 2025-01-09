import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setLogout } from "../auth/auth.slice";
import { Invoice, InvoicesState } from "./invoices.types";

const initialState: InvoicesState = {
  invoices: [],
  loading: false,
  error: null,
};

const invoicesSlice = createSlice({
  name: "invoices",
  initialState,
  reducers: {
    fetchInvoices: (state) => {
      state.loading = true;
    },
    fetchInvoicesSuccess: (state, action: PayloadAction<Invoice[]>) => {
      state.loading = false;
      state.invoices = action.payload;
    },
    fetchInvoicesFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setLogout, () => initialState); // Reset to initial state on logout
  },
});

export const { fetchInvoices, fetchInvoicesSuccess, fetchInvoicesFailure } =
  invoicesSlice.actions;
export default invoicesSlice.reducer;
