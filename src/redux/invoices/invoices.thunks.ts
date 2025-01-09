import axiosInstance from "../../api/axios";
import { AppDispatch } from "../store";
import {
  fetchInvoices,
  fetchInvoicesFailure,
  fetchInvoicesSuccess,
} from "./invoices.slice";
import { AddInvoice, Invoice } from "./invoices.types";

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

export const addInvoice =
  (invoice: AddInvoice) => async (dispatch: AppDispatch) => {
    try {
      const requestData = {
        amount: invoice.amount,
        due_date: invoice.dueDate,
        invoice_date: invoice.invoiceDate,
        vehicle_id: invoice.vehicleId,
        customer_id: invoice.customerId,
      };
      await axiosInstance.post("/invoices/addinvoice", requestData);

      dispatch(getInvoices());
    } catch (error: any) {
      console.error(error);
    }
  };
