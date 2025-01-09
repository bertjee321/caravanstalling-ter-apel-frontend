import React, { useState } from "react";
import { useDispatch } from "react-redux";
import SubmitButton from "../../components/buttons/SubmitButton";
import { addCustomer } from "../../redux/customers/customers.thunks";
import { AppDispatch } from "../../redux/store";
import AddInvoice, { InvoiceInput } from "../invoices/AddInvoice";
import AddVehicle, { VehicleInput, VehicleType } from "../vehicles/AddVehicle";
import "./AddCustomer.css";

const AddCustomer: React.FC = () => {
  // Customer State
  const [customer, setCustomer] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });
  const [vehicle, setVehicle] = useState<VehicleInput>({
    type: VehicleType.OTHER,
    garage: "",
    licensePlate: "",
  });
  const [invoice, setInvoice] = useState<InvoiceInput>({
    amount: 0,
    invoiceDate: new Date().toISOString().split("T")[0], // default to today's date in the format YYYY-MM-DD
    dueDate: new Date().toISOString().split("T")[0], // default to today's date in the format YYYY-MM-DD
  });

  const dispatch: AppDispatch = useDispatch();

  // Section Toggles
  const [addVehicle, setAddVehicle] = useState(false);
  const [addInvoice, setAddInvoice] = useState(false);

  const handleVehicleStateChange = (newState: VehicleInput) => {
    setVehicle((prevState) => ({ ...prevState, ...newState }));
  };

  const handleInvoiceStateChange = (newState: InvoiceInput) => {
    setInvoice((prevState) => ({ ...prevState, ...newState }));
  };

  const handleCustomerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const vehicleData = addVehicle ? vehicle : undefined;
    const invoiceData = addInvoice ? invoice : undefined;

    dispatch(addCustomer(customer, vehicleData, invoiceData));

    // Reset Form
    setCustomer({ email: "", firstName: "", lastName: "", phoneNumber: "" });

    setAddVehicle(false);
    setAddInvoice(false);
  };

  return (
    <>
      <form className="add-customer-form" onSubmit={handleSubmit}>
        <h1>Klant toevoegen</h1>
        <hr style={{ marginBottom: "15px", marginTop: "15px" }}></hr>
        <div className="form-section">
          <h3>Klantgegevens</h3>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={customer.email}
            onChange={handleCustomerChange}
            required
          />
          <label>Voornaam</label>
          <input
            type="text"
            name="firstName"
            value={customer.firstName}
            onChange={handleCustomerChange}
            required
          />
          <label>Achternaam</label>
          <input
            type="text"
            name="lastName"
            value={customer.lastName}
            onChange={handleCustomerChange}
            required
          />
          <label>Telefoonnummer</label>
          <input
            type="text"
            name="phoneNumber"
            value={customer.phoneNumber}
            onChange={handleCustomerChange}
          />
        </div>

        <div className="toggle-section">
          <label className="checkbox-container">
            Voertuig toevoegen
            <input
              type="checkbox"
              checked={addVehicle}
              onChange={(e) => {
                setAddVehicle(e.target.checked);
                if (!e.target.checked) setAddInvoice(false);
              }}
            />
            <span className="checkmark"></span>
          </label>
        </div>

        {addVehicle && (
          <>
            <AddVehicle
              inForm={true}
              onStateChange={handleVehicleStateChange}
            />
            <div className="toggle-section">
              <label className="checkbox-container">
                Factuur toevoegen
                <input
                  type="checkbox"
                  checked={addInvoice}
                  onChange={(e) => setAddInvoice(e.target.checked)}
                />
                <span className="checkmark"></span>
              </label>
            </div>
          </>
        )}
        {addInvoice && (
          <AddInvoice inForm={true} onStateChange={handleInvoiceStateChange} />
        )}

        <SubmitButton>Bevestigen</SubmitButton>
      </form>
    </>
  );
};

export default AddCustomer;
