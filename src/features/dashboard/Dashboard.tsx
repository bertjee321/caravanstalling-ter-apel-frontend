import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/spinner/Spinner";
import { selectCustomersIsLoading } from "../../redux/customers/customers.selectors";
import { getCustomers } from "../../redux/customers/customers.thunks";
import { selectInvoicesIsLoading } from "../../redux/invoices/invoices.selectors";
import { getInvoices } from "../../redux/invoices/invoices.thunks";
import { AppDispatch } from "../../redux/store";
import { selectVehiclesIsLoading } from "../../redux/vehicles/vehicles.selectors";
import { getVehicles } from "../../redux/vehicles/vehicles.thunks";
import "./Dashboard.css";

enum ButtonType {
  CUSTOMER = "customer",
  VEHICLES = "vehicles",
  INVOICES = "invoices",
}

const Dashboard: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const customersLoading = useSelector(selectCustomersIsLoading);
  const vehiclesLoading = useSelector(selectVehiclesIsLoading);
  const invoicesLoading = useSelector(selectInvoicesIsLoading);

  useEffect(() => {
    dispatch(getCustomers());
    dispatch(getVehicles());
    dispatch(getInvoices());
  }, []);

  const handleButtonClick = (buttonType: ButtonType) => {
    switch (buttonType) {
      case ButtonType.CUSTOMER:
        navigate("/customers/add-customer");
        break;
      case ButtonType.VEHICLES:
        navigate("/vehicles/add-vehicle");
        break;
      case ButtonType.INVOICES:
        navigate("/customers/add-invoice");
        break;
    }
  };

  if (customersLoading || vehiclesLoading || invoicesLoading) {
    return (
      <>
        <h2 style={{ textAlign: "center" }}>Gegevens ophalen... </h2>
        <Spinner />
      </>
    );
  }

  return (
    <div className="add-buttons-container">
      <button
        className="add-button add-customer-button"
        onClick={() => handleButtonClick(ButtonType.CUSTOMER)}
      >
        Klant toevoegen
      </button>
      <button
        className="add-button add-vehicle-button disabled"
        // onClick={() => handleButtonClick(ButtonType.VEHICLES)}
      >
        Voertuig toevoegen
      </button>
      <button
        className="add-button add-invoice-button disabled"
        // onClick={() => handleButtonClick(ButtonType.INVOICES)}
      >
        Factuur toevoegen
      </button>
    </div>
  );
};

export default Dashboard;
