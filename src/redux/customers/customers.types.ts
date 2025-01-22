import { Invoice } from "../invoices/invoices.types";
import { Vehicle } from "../vehicles/vehicles.types";

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
