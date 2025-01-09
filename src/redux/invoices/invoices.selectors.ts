import { RootState } from "../root.reducer";

export const selectInvoices = (state: RootState) => state.invoices.invoices;
export const selectInvoicesIsLoading = (state: RootState) =>
  state.invoices.loading;
export const selectInvoicesError = (state: RootState) => state.invoices.error;
