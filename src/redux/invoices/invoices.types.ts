import { Customer } from "../customers/customers.types";
import { Vehicle } from "../vehicles/vehicles.types";

export interface InvoicesState {
  invoices: Invoice[];
  loading: boolean;
  error: string | null;
}

export interface Invoice {
  amount: number;
  created_at: string | null;
  customer_id: number;
  due_date: string;
  id: number;
  invoice_date: string;
  paid: boolean | null;
  updated_at: string | null;
  vehicle_id: number;
  customer: Customer;
  vehicle: Vehicle;
}

export interface AddInvoice {
  amount: number;
  dueDate: string;
  invoiceDate: string;
  vehicleId?: number;
  customerId?: number;
}