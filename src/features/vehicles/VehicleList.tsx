import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../components/spinner/Spinner";
import Table from "../../components/table/Table";
import { Invoice } from "../../redux/invoices/invoices.types";
import { AppDispatch } from "../../redux/store";
import {
  selectVehicles,
  selectVehiclesError,
  selectVehiclesIsLoading,
} from "../../redux/vehicles/vehicles.selectors";
import { getVehicles } from "../../redux/vehicles/vehicles.thunks";

const TABLE_HEADERS = [
  { key: "id", label: "ID" },
  { key: "type", label: "Type" },
  { key: "license_plate", label: "Kenteken" },
  { key: "garage", label: "Schuur" },
  { key: "customer", label: "Eigenaar" },
  { key: "invoices", label: "Openstaande facturen" },
];

const VehicleList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const isLoading = useSelector(selectVehiclesIsLoading);
  const vehicleList = useSelector(selectVehicles);
  const error = useSelector(selectVehiclesError);

  useEffect(() => {
    dispatch(getVehicles());
  }, []);

  const getOpenInvoices = (invoices: Invoice[]): number => {
    return invoices.filter((invoice) => !invoice.paid).length;
  };

  const handleRowClick = (row: { [key: string]: any }) => {
    console.log("Row clicked:", row);
    // You can handle the row click here, e.g., navigate, show details, etc.
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <div className="error">
        Fout bij het ophalen van voertuigenlijst - {error}
      </div>
    );
  }

  const updatedList = vehicleList.map((vehicle) => {
    return {
      ...vehicle,
      customer: `${vehicle.customer.first_name} ${vehicle.customer.last_name}`,
      invoices: getOpenInvoices(vehicle.invoices),
    };
  });

  return (
    <Table
      data={updatedList}
      headers={TABLE_HEADERS.map((header) => header.label)}
      headerKeys={TABLE_HEADERS.map((header) => header.key)}
      onRowClick={handleRowClick}
    />
  );
};

export default VehicleList;
