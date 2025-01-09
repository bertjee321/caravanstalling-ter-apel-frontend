import { AxiosResponse } from "axios";
import axiosInstance from "../../api/axios";
import { addInvoice } from "../invoices/invoices.thunks";
import { AddInvoice } from "../invoices/invoices.types";
import { AppDispatch } from "../store";
import {
  fetchVehicles,
  fetchVehiclesFailure,
  fetchVehiclesSuccess,
} from "./vehicles.slice";
import { AddVehicle, Vehicle } from "./vehicles.types";

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

export const addVehicle = (vehicle: AddVehicle, invoice?: AddInvoice) => async (dispatch: AppDispatch) => {
  try {
    const requestData = {
      customer_id: vehicle.customerId,
      garage: vehicle.garage,
      license_plate: vehicle.licensePlate,
      type: vehicle.type,
    }
    const response = await axiosInstance.post<AxiosResponse<{ id: number }, any>>("/vehicles/addvehicle", requestData);

    console.log("invoice data", invoice);

    if (invoice) {
      const invoiceData: AddInvoice = {
        amount: invoice.amount,
        dueDate: invoice.dueDate,
        invoiceDate: invoice.invoiceDate,
        vehicleId: response.data.data.id,
        customerId: vehicle.customerId,
      }
      dispatch(addInvoice(invoiceData)); // should set invoice
    }

    dispatch(getVehicles());
  } catch (error: any) {
    console.error(error);
  }
}