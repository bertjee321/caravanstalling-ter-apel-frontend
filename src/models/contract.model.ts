export interface ContractResponseParameters {
  id: number;
  created_at: string;
  customer_id: number;
  vehicle_id: number;
  contract_start: string;
  contract_end: string | null;
  price_excl_VAT: number;
  notes: string | null;
}

export interface ContractRequestParameters {
  customer_id: number;
  vehicle_id: number;
  contract_start: string;
  contract_end?: string;
  price_excl_VAT: number;
  notes?: string;
}
