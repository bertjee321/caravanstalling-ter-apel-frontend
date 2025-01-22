import { RootState } from "../root.reducer";

export const selectContracts = (state: RootState) => state.contracts.contracts;
export const selectContractsIsLoading = (state: RootState) =>
  state.contracts.loading;
export const selectContractsError = (state: RootState) => state.contracts.error;
