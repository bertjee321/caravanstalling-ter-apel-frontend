import { Invoice } from "../redux/invoices/invoices.types";

export const getInvoicesAmount = (invoices: Invoice[]): number => {
    return invoices
      .filter((invoice) => !invoice.paid)
      .reduce((acc, invoice) => acc + invoice.amount, 0);
  };