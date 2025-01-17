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

export interface AddVehicle {
  customerId?: number;
  garage: string;
  licensePlate: string;
  type: string;
}

export interface VehicleRequestParameters {
  customer_id: number;
  type: string;
  garage: string;
  license_plate: string;
  size: number;
  brand: string;
  model: string;
  currently_in_garage: boolean;
}

export interface VehicleResponseParameters {
  id: number;
  created_at: string;
  updated_at: string;
  customer_id: number;
  type: string;
  garage: string;
  license_plate: string;
  size: number | null;
  brand: string | null;
  model: string | null;
  currently_in_garage: boolean;
}
