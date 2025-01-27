import { AxiosResponse } from "axios";
import { VehicleInput } from "../features/vehicles/AddVehicle";
import axiosInstance from "./axios";
import { VehicleRequestParameters } from "../models/vehicle.model";

const API_ROUTE = "/vehicles";

export const addVehicle = async (vehicle: VehicleInput, customerId: number) => {
  const requestData: VehicleRequestParameters = {
    customer_id: customerId,
    type: vehicle.vehicleType,
    garage: vehicle.garage,
    license_plate: vehicle.licensePlate,
    size: vehicle.size,
    brand: vehicle.brand,
    model: vehicle.model,
    currently_in_garage: vehicle.currentlyStored,
  };

  try {
    const response = await axiosInstance.post<
      AxiosResponse<{ id: number }, any>
    >(`${API_ROUTE}/addVehicle`, requestData);

    return response.data.data.id;
  } catch (error: any) {
    console.error(error);
  }
};
