import { AxiosResponse } from "axios";
import { InvoiceInput } from "../features/invoices/AddInvoice";
import axiosInstance from "./axios";
import { InvoiceRequestParameters } from "../models/invoice.model";

const API_ROUTE = "/invoices";

export const addInvoice = async (
  invoice: InvoiceInput,
  contractId: number,
  customerId: number
) => {
  const requestData: InvoiceRequestParameters = {
    contract_id: contractId,
    customer_id: customerId,
    invoice_date: invoice.invoiceDate,
    due_date: invoice.dueDate,
    amount_excl_VAT: invoice.amountExclVAT,
    paid: invoice.paid,
    payment_date: invoice.paymentDate,
  };

  try {
    const response = await axiosInstance.post<
      AxiosResponse<{ id: number }, any>
    >(`${API_ROUTE}/addinvoice`, requestData);

    return response.data.data.id;
  } catch (error: any) {
    console.error(error);
  }
};