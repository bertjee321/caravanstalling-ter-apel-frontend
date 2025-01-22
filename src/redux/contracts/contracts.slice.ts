import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setLogout } from "../auth/auth.slice";
import { Contract, ContractsState } from "./contracts.types";

const initialState: ContractsState = {
  contracts: [],
  loading: false,
  error: null,
};

const contractsSlice = createSlice({
  name: "contracts",
  initialState,
  reducers: {
    fetchContracts: (state) => {
      state.loading = true;
    },
    fetchContractsSuccess: (state, action: PayloadAction<Contract[]>) => {
      state.loading = false;
      state.contracts = action.payload;
    },
    fetchContractsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setLogout, () => initialState); // Reset to initial state on logout
  },
});

export const { fetchContracts, fetchContractsSuccess, fetchContractsFailure } =
contractsSlice.actions;
export default contractsSlice.reducer;
