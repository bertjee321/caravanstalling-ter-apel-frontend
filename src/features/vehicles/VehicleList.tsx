import { useSelector } from "react-redux";
import Spinner from "../../components/spinner/Spinner";
import Table from "../../components/table/Table";
import {
  selectVehicles,
  selectVehiclesError,
  selectVehiclesIsLoading,
} from "../../redux/vehicles/vehicles.selectors";

const TABLE_HEADERS = [
  { key: "id", label: "ID" },
  { key: "type", label: "Type" },
  { key: "license_plate", label: "Kenteken" },
  { key: "garage", label: "Gestald (locatie)" },
  { key: "customer", label: "Eigenaar" },
];

const VehicleList: React.FC = () => {
  // const dispatch: AppDispatch = useDispatch();

  const isLoading = useSelector(selectVehiclesIsLoading);
  const vehicleList = useSelector(selectVehicles);
  const error = useSelector(selectVehiclesError);

  // useEffect(() => {
  //   dispatch(getVehicles());
  // }, []);

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
      garage: vehicle.garage ? `Ja (${vehicle.garage})` : "Nee",
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
