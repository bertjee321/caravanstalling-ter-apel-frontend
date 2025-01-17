import { AxiosResponse } from "axios";
import { CustomerInput } from "../features/customers/AddCustomer";
import { CustomerRequestParameters } from "../redux/customers/customers.types";
import axiosInstance from "./axios";

const API_ROUTE = "/customers";

export const addCustomer = async (customer: CustomerInput) => {
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

  try {
    const response = await axiosInstance.post<
      AxiosResponse<{ id: number }, any>
    >(`${API_ROUTE}/addcustomer`, requestData);

    return response.data.data.id;
  } catch (error: any) {
    console.error(error);
  }
};
