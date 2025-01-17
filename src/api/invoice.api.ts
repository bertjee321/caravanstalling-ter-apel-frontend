import { AxiosResponse } from "axios";
import { InvoiceInput } from "../features/invoices/AddInvoice";
import { InvoiceRequestParameters } from "../redux/invoices/invoices.types";
import axiosInstance from "./axios";

const API_ROUTE = "/invoices";

export const addInvoice = async (
  invoice: InvoiceInput,
  customerId: number,
  vehicleId: number
) => {
  const requestData: InvoiceRequestParameters = {
    customer_id: customerId,
    vehicle_id: vehicleId,
    amount: invoice.amount,
    invoice_date: invoice.invoiceDate,
    due_date: invoice.dueDate,
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
