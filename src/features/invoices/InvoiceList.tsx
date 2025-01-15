import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectInvoices,
  selectInvoicesError,
  selectInvoicesIsLoading,
} from "../../redux/invoices/invoices.selectors";
import { getInvoices } from "../../redux/invoices/invoices.thunks";
import { AppDispatch } from "../../redux/store";
import { formatCurrency } from "../../utils/format-currency.utils";
import Spinner from "../../components/spinner/Spinner";
import Table from "../../components/table/Table";

const TABLE_HEADERS = [
  { key: "id", label: "ID" },
  { key: "amount", label: "Bedrag" },
  { key: "invoice_date", label: "Factuurdatum" },
  { key: "due_date", label: "Einddatum" },
  { key: "customer", label: "Naam klant" },
  { key: "vehicle", label: "Kenteken" },
  { key: "paid", label: "Status" },
];

const InvoiceList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const isLoading = useSelector(selectInvoicesIsLoading);
  const invoiceList = useSelector(selectInvoices);
  const error = useSelector(selectInvoicesError);

  useEffect(() => {
    dispatch(getInvoices());
  }, []);

  const getStatus = (paid: boolean | null): string => {
    return paid ? "Betaald" : "Open";
  };

  const handleRowClick = (row: { [key: string]: any }) => {
    console.log("Row clicked:", row);
    // You can handle the row click here, e.g., navigate, show details, etc.
  };

  const getCellFormattedValueAndClass = (key: string, value: any) => {
    let cellClass = "";
    let formattedValue = value;

    if (key === "paid") {
      if (value === "Betaald") {
        cellClass = "green-text";
      } else if (value === "Open") {
        cellClass = "red-text";
      }
    }

    return {
      cellClass,
      formattedValue,
    };
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <div className="error">
        Fout bij het ophalen van facturenlijst - {error}
      </div>
    );
  }

  const updatedList = invoiceList.map((invoice) => {
    return {
      ...invoice,
      amount: formatCurrency(invoice.amount),
      customer: `${invoice.customer.first_name} ${invoice.customer.last_name}`,
      vehicle: invoice.vehicle.license_plate,
      paid: getStatus(invoice.paid),
    };
  });

  return (
    <Table
      data={updatedList}
      headers={TABLE_HEADERS.map((header) => header.label)}
      headerKeys={TABLE_HEADERS.map((header) => header.key)}
      onRowClick={handleRowClick}
      getCellClassAndFormattedValue={getCellFormattedValueAndClass}
    />
  );
};

export default InvoiceList;
