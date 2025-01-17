import { Invoice, InvoiceResponseParameters } from "../invoices/invoices.types";
import { Vehicle, VehicleResponseParameters } from "../vehicles/vehicles.types";

export interface CustomersState {
  customers: Customer[];
  loading: boolean;
  error: string | null;
}

export interface Customer {
  created_at: string;
  email: string;
  first_name: string | null;
  id: number;
  last_name: string;
  phone_number: string | null;
  updated_at: string;
  vehicles: Vehicle[];
  invoices: Invoice[];
}

export interface AddCustomer {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

export interface CustomerRequestParameters {
  last_name: string;
  affix: string | null;
  first_name: string;
  email: string;
  phone_number: string;
  street: string;
  house_number: string;
  house_number_addition: string | null;
  postal_code: string;
  city: string;
}

export interface CustomerResponseParameters {
  id: number;
  created_at: string;
  updated_at: string;
  last_name: string;
  affix: string | null;
  first_name: string;
  email: string;
  phone_number: string;
  street: string | null;
  house_number: string | null;
  house_number_addition: string | null;
  postal_code: string | null;
  city: string | null;
  vehicles: VehicleResponseParameters[];
  invoices: InvoiceResponseParameters[];
}
