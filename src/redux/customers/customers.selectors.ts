import { RootState } from "../root.reducer";

export const selectCustomers = (state: RootState) => state.customers.customers;
export const selectCustomersIsLoading = (state: RootState) =>
  state.customers.loading;
export const selectCustomersError = (state: RootState) => state.customers.error;
