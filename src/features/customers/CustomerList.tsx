import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../components/table/Table";
import {
  selectCustomers,
  selectCustomersError,
  selectCustomersIsLoading,
} from "../../redux/customers/customers.selectors";
import { getCustomers } from "../../redux/customers/customers.thunks";
import { AppDispatch } from "../../redux/store";
import { formatCurrency } from "../../utils/format-currency.utils";
import "./CustomerList.css";
import { getInvoicesAmount } from "../../utils/customer.utils";
import Spinner from "../../components/spinner/Spinner";

const CustomerList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const isLoading = useSelector(selectCustomersIsLoading);
  const customerList = useSelector(selectCustomers);
  const error = useSelector(selectCustomersError);

  const updatedList = customerList.map((customer) => {
    return {
      ...customer,
      vehicles: customer.vehicles.length,
      invoices_amount: getInvoicesAmount(customer.invoices),
    };
  });

  const getCellFormattedValueAndClass = (key: string, value: any) => {
    let cellClass = "";
    let formattedValue = value;

    if (key === "invoices_amount") {
      formattedValue = formatCurrency(value);
      if (value > 0) {
        cellClass = "red-text"; // For positive amounts
      } else if (value <= 0) {
        cellClass = "green-text"; // For negative amounts
      }
    }

    return {
      cellClass,
      formattedValue,
    };
  };

  const handleRowClick = (row: { [key: string]: any }) => {
    console.log("Row clicked:", row);
    // You can handle the row click here, e.g., navigate, show details, etc.
  };

  const HEADERS = [
    { key: "id", label: "ID" },
    { key: "last_name", label: "Achternaam" },
    { key: "first_name", label: "Voornaam" },
    { key: "email", label: "Email" },
    { key: "phone_number", label: "Telefoon" },
    { key: "vehicles", label: "Voertuigen" },
    { key: "invoices_amount", label: "Openstaand" },
  ];

  useEffect(() => {
    dispatch(getCustomers());
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />; // Loading spinner or overlay
  }

  if (error) {
    return (
      <div className="error">
        Fout bij het ophalen van de klantenlijst - {error}
      </div>
    );
  }

  return (
    <Table
      headers={HEADERS.map((header) => header.label)}
      headerKeys={HEADERS.map((header) => header.key)}
      data={updatedList}
      getCellClassAndFormattedValue={getCellFormattedValueAndClass}
      onRowClick={handleRowClick}
    />
  );
};

export default CustomerList;
