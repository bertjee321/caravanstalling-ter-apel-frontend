import { Customer } from "../customers/customers.types";
import { Invoice } from "../invoices/invoices.types";

export interface VehiclesState {
  vehicles: Vehicle[];
  loading: boolean;
  error: string | null;
}

export interface Vehicle {
  created_at: string;
  customer_id: number;
  garage: string;
  id: number;
  license_plate: string;
  type: string;
  updated_at: string | null;
  customer: Customer;
  invoices: Invoice[];
}

