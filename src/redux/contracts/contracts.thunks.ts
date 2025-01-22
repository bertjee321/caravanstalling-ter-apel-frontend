import axiosInstance from "../../api/axios";
import { AppDispatch } from "../store";
import {
  fetchContracts,
  fetchContractsFailure,
  fetchContractsSuccess,
} from "./contracts.slice";
import { Contract } from "./contracts.types";

export const getContracts = () => async (dispatch: AppDispatch) => {
  dispatch(fetchContracts());

  try {
    const response = await axiosInstance.get<Contract[]>(
      "/contracts/getcontracts"
    );
    dispatch(fetchContractsSuccess(response.data));
  } catch (error: any) {
    dispatch(fetchContractsFailure(error.message));
  }
};
