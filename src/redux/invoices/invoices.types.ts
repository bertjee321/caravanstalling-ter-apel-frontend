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

export interface InvoiceRequestParameters {
  customer_id: number;
  vehicle_id: number;
  amount: number;
  invoice_date: string;
  due_date: string;
  paid: boolean | null;
  payment_date: string | null;
}

export interface InvoiceResponseParameters {
  id: number;
  customer_id: number;
  vehicle_id: number;
  amount: number;
  invoice_date: string;
  due_date: string;
  paid: boolean;
  payment_date: string | null;
  created_at: string;
  updated_at: string;
}
