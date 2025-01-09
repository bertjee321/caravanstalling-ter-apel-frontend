import { RootState } from "../root.reducer";

export const selectVehicles = (state: RootState) => state.vehicles.vehicles;
export const selectVehiclesIsLoading = (state: RootState) =>
  state.vehicles.loading;
export const selectVehiclesError = (state: RootState) => state.vehicles.error;
