import axiosInstance from "../../api/axios";
import { InvoiceInput } from "../../features/invoices/AddInvoice";
import { AppDispatch } from "../store";
import {
  fetchInvoices,
  fetchInvoicesFailure,
  fetchInvoicesSuccess,
} from "./invoices.slice";
import { Invoice, InvoiceRequestParameters } from "./invoices.types";

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
  (invoice: InvoiceInput) => async (dispatch: AppDispatch) => {
    try {
      const requestData: InvoiceRequestParameters = {
        amount: invoice.amount,
        due_date: invoice.dueDate,
        invoice_date: invoice.invoiceDate,
        vehicle_id: 0,
        customer_id: 0,
        paid: invoice.paid,
        payment_date: invoice.paymentDate,
      };
      await axiosInstance.post("/invoices/addinvoice", requestData);

      dispatch({ type: "INVOICE ADDED" }); // should set invoice to state!
    } catch (error: any) {
      console.error(error);
    }
  };
