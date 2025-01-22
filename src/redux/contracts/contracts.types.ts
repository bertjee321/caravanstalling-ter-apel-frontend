export interface ContractsState {
  contracts: Contract[];
  loading: boolean;
  error: string | null;
}

export interface Contract {
  id: number;
  customer_id: number;
  vehicle_id: number;
  contract_start: string;
  contract_end: string | null;
  price_excl_VAT: number;
  notes: string | null;
}
