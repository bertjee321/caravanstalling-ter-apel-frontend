import { AxiosResponse } from "axios";
import { ContractInput } from "../features/contracts/AddContract";
import { ContractRequestParameters } from "../models/contract.model";
import axiosInstance from "./axios";

const API_ROUTE = "/contracts";

export const addContract = async (
  contract: ContractInput,
  customerId: number,
  vehicleId: number
) => {
  const requestData: ContractRequestParameters = {
    customer_id: customerId,
    vehicle_id: vehicleId,
    contract_start: contract.contractStart,
    contract_end: contract.contractEnd,
    price_excl_VAT: contract.priceExclVAT,
    notes: contract.notes,
  };

  try {
    const response = await axiosInstance.post<
      AxiosResponse<{ id: number }, any>
    >(`${API_ROUTE}/addcontract`, requestData);

    return response.data.data.id;
  } catch (error: any) {
    console.error(error);
  }
};
