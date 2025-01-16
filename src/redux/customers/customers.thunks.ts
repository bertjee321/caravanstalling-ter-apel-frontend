import { AxiosResponse } from "axios";
import axiosInstance from "../../api/axios";
import { CustomerInput } from "../../features/customers/AddCustomer";
import { AppDispatch } from "../store";
import {
  fetchCustomers,
  fetchCustomersFailure,
  fetchCustomersSuccess,
} from "./customers.slice";
import { Customer, CustomerRequestParameters } from "./customers.types";

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
  (customer: CustomerInput) => async (dispatch: AppDispatch) => {
    try {
      const requestData: CustomerRequestParameters = {
        last_name: customer.lastName,
        affix: customer.affix,
        first_name: customer.firstName,
        email: customer.email,
        phone_number: customer.phoneNumber,
        street: customer.street,
        house_number: customer.houseNumber,
        house_number_addition: customer.houseNumberAddition,
        postal_code: customer.postalCode,
        city: customer.city,
      };
      await axiosInstance.post<AxiosResponse<{ id: number }, any>>(
        "/customers/addcustomer",
        requestData
      );

      dispatch({ type: "CUSTOMER ADDED" }); // should set customer to state!
    } catch (error: any) {
      console.error(error);
    }
  };
