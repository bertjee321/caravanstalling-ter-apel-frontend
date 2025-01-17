import axiosInstance from "../../api/axios";
import { AppDispatch } from "../store";
import {
  fetchVehicles,
  fetchVehiclesFailure,
  fetchVehiclesSuccess,
} from "./vehicles.slice";
import { Vehicle } from "./vehicles.types";

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
