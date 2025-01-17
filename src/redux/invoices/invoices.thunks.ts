import axiosInstance from "../../api/axios";
import { AppDispatch } from "../store";
import {
  fetchInvoices,
  fetchInvoicesFailure,
  fetchInvoicesSuccess,
} from "./invoices.slice";
import { Invoice } from "./invoices.types";

export const getInvoices = () => async (dispatch: AppDispatch) => {
  dispatch(fetchInvoices());

  try {
    const response = await axiosInstance.get<Invoice[]>(
      "/invoices/getinvoices"
    );
    dispatch(fetchInvoicesSuccess(response.data));
  } catch (error: any) {
    dispatch(fetchInvoicesFailure(error.message));
  }
};
