import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setLogout } from "../auth/auth.slice";
import { Vehicle, VehiclesState } from "./vehicles.types";

const initialState: VehiclesState = {
  vehicles: [],
  loading: false,
  error: null,
};

const vehiclesSlice = createSlice({
  name: "vehicles",
  initialState,
  reducers: {
    fetchVehicles: (state) => {
      state.loading = true;
    },
    fetchVehiclesSuccess: (state, action: PayloadAction<Vehicle[]>) => {
      state.loading = false;
      state.vehicles = action.payload;
    },
    fetchVehiclesFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setLogout, () => initialState); // Reset to initial state on logout
  },
});

export const { fetchVehicles, fetchVehiclesSuccess, fetchVehiclesFailure } =
  vehiclesSlice.actions;
export default vehiclesSlice.reducer;
