export interface VehicleRequestParameters {
  customer_id: number;
  type: string;
  garage: string | null;
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
  garage: string | null;
  license_plate: string;
  size: number | null;
  brand: string | null;
  model: string | null;
  currently_in_garage: boolean;
}
