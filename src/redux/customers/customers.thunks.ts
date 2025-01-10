import { AxiosResponse } from "axios";
import axiosInstance from "../../api/axios";
import { AddInvoice } from "../invoices/invoices.types";
import { AppDispatch } from "../store";
import { addVehicle } from "../vehicles/vehicles.thunks";
import { AddVehicle } from "../vehicles/vehicles.types";
import {
  fetchCustomers,
  fetchCustomersFailure,
  fetchCustomersSuccess,
} from "./customers.slice";
import { AddCustomer, Customer } from "./customers.types";

export const getCustomers = () => async (dispatch: AppDispatch) => {
  dispatch(fetchCustomers());

  try {
    const response = await axiosInstance.get<Customer[]>(
      "/customers/getcustomers"
    );
    dispatch(fetchCustomersSuccess(response.data));
  } catch (error: any) {
    dispatch(fetchCustomersFailure(error.message));
  }
};

export const addCustomer =
  (customer: AddCustomer, vehicle?: AddVehicle, invoice?: AddInvoice) =>
  async (dispatch: AppDispatch) => {
    try {
      const requestData = {
        email: customer.email,
        first_name: customer.firstName,
        last_name: customer.lastName,
        phone_number: customer.phoneNumber,
      };
      const response = await axiosInstance.post<
        AxiosResponse<{ id: number }, any>
      >("/customers/addcustomer", requestData);

      const customerId = response.data.data.id;

      if (vehicle) {
        const vehicleData: AddVehicle = {
          customerId,
          garage: vehicle.garage,
          licensePlate: vehicle.licensePlate,
          type: vehicle.type,
        };
        dispatch(addVehicle(vehicleData, invoice));
      }

      dispatch(getCustomers()); // should set customer to state!
    } catch (error: any) {
      console.error(error);
    }
  };
