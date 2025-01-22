import { AxiosResponse } from "axios";
import { CustomerInput } from "../features/customers/AddCustomer";
import { ContractResponseParameters } from "../models/contract.model";
import {
  CustomerRequestParameters,
  CustomerResponseParameters,
} from "../models/customer.model";
import { InvoiceResponseParameters } from "../models/invoice.model";
import { VehicleResponseParameters } from "../models/vehicle.model";
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

export const fetchCustomerById = async (customerId: number) => {
  try {
    if (customerId === undefined) {
      throw new Error("No customer ID provided");
    }

    const mapResponseToCustomer = (
      response: CustomerResponseParameters
    ): {
      customer: Partial<CustomerResponseParameters>;
      vehicles: VehicleResponseParameters[];
      invoices: InvoiceResponseParameters[];
      contracts: ContractResponseParameters[];
    } => {
      return {
        customer: response,
        vehicles: response.vehicles,
        invoices: response.invoices,
        contracts: response.contracts,
      };
    };

    const response = await axiosInstance.get<CustomerResponseParameters[]>(
      `/customers//getcustomer/${customerId}`
    );

    return mapResponseToCustomer(response.data[0]);
  } catch (err) {
    throw new Error("Failed to fetch customer data");
  }
};
