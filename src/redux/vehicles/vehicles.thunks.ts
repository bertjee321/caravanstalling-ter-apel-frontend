import { AxiosResponse } from "axios";
import axiosInstance from "../../api/axios";
import { VehicleInput } from "../../features/vehicles/AddVehicle";
import { AppDispatch } from "../store";
import {
  fetchVehicles,
  fetchVehiclesFailure,
  fetchVehiclesSuccess,
} from "./vehicles.slice";
import { Vehicle, VehicleRequestParameters } from "./vehicles.types";

export const getVehicles = () => async (dispatch: AppDispatch) => {
  dispatch(fetchVehicles());

  try {
    const response = await axiosInstance.get<Vehicle[]>(
      "/vehicles/getvehicles"
    );
    dispatch(fetchVehiclesSuccess(response.data));
  } catch (error: any) {
    dispatch(fetchVehiclesFailure(error.message));
  }
};

export const addVehicle =
  (vehicle: VehicleInput) => async (dispatch: AppDispatch) => {
    try {
      const requestData: VehicleRequestParameters = {
        customer_id: 0,
        type: vehicle.vehicleType,
        garage: vehicle.garage,
        license_plate: vehicle.licensePlate,
        size: vehicle.size,
        brand: vehicle.brand,
        model: vehicle.model,
        currently_in_garage: false,
      };
      await axiosInstance.post<AxiosResponse<{ id: number }, any>>(
        "/vehicles/addvehicle",
        requestData
      );

      dispatch({ type: "VEHICLE ADDED" }); // should set vehicle to state!
    } catch (error: any) {
      console.error(error);
    }
  };
