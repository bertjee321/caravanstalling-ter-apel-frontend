import { Invoice } from "../redux/invoices/invoices.types";

export const getInvoicesAmount = (invoices: Invoice[]): number => {
  if (!invoices) return 0;

  return invoices
    .filter((invoice) => !invoice.paid)
    .reduce((acc, invoice) => acc + invoice.amount, 0);
};
