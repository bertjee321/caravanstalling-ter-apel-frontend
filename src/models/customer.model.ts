import { Contract } from "../redux/contracts/contracts.types";
import { ContractResponseParameters } from "./contract.model";
import { InvoiceResponseParameters } from "./invoice.model";
import { VehicleResponseParameters } from "./vehicle.model";

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
  contracts: ContractResponseParameters[];
  invoices: InvoiceResponseParameters[];
}
