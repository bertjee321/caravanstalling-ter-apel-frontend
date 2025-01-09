import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Customer, CustomersState } from "./customers.types";
import { setLogout } from "../auth/auth.slice";

const initialState: CustomersState = {
  customers: [],
  loading: false,
  error: null,
};

const customersSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    fetchCustomers: (state) => {
      state.loading = true;
    },
    fetchCustomersSuccess: (state, action: PayloadAction<Customer[]>) => {
      state.loading = false;
      state.customers = action.payload;
    },
    fetchCustomersFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setLogout, () => initialState); // Reset to initial state on logout
  },
});

export const { fetchCustomers, fetchCustomersSuccess, fetchCustomersFailure } =
  customersSlice.actions;
export default customersSlice.reducer;
