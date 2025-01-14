import React, { useState } from "react";
import { useDispatch } from "react-redux";
import SubmitButton from "../../components/buttons/SubmitButton";
import { addCustomer } from "../../redux/customers/customers.thunks";
import { AppDispatch } from "../../redux/store";
import "./AddCustomer.css";
import AffixInput from "./inputs/AffixInput";
import CityInput from "./inputs/CityInput";
import EmailInput from "./inputs/EmailInput";
import FirstNameInput from "./inputs/FirstNameInput";
import HouseNumberAdditionInput from "./inputs/HouseNumberAdditionInput";
import HouseNumberInput from "./inputs/HouseNumberInput";
import LastNameInput from "./inputs/LastNameInput";
import PhoneInput from "./inputs/PhoneInput";
import PostalCodeInput from "./inputs/PostalCodeInput";
import StreetInput from "./inputs/StreetInput";

export interface CustomerInput {
  firstName: string;
  affix: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  street: string;
  houseNumber: string;
  houseNumberAddition: string;
  postalCode: string;
  city: string;
}

const AddCustomer: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [resetForm, setResetForm] = useState(0);
  const [customer, setCustomer] = useState<CustomerInput>({
    firstName: "",
    affix: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    street: "",
    houseNumber: "",
    houseNumberAddition: "",
    postalCode: "",
    city: "",
  });
  const [customerInputErrors, setCustomerInputErrors] = useState({
    lastName: false,
    firstName: false,
    email: false,
    phoneNumber: false,
    street: false,
    houseNumber: false,
    postalCode: false,
    city: false,
  });

  const handleCustomerStateChange = (newState: { [key: string]: string }) => {
    setCustomer((prevState) => ({ ...prevState, ...newState }));
  };

  const handleCustomerErrors = (newErrors: { [key: string]: boolean }) => {
    setCustomerInputErrors((prevState) => ({ ...prevState, ...newErrors }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (Object.values(customerInputErrors).some((error) => error)) {
      return;
    }

    dispatch(addCustomer(customer));

    // Reset Form
    setResetForm((prevState) => prevState + 1);
  };

  return (
    <>
      <form className="add-customer-form" onSubmit={handleSubmit}>
        <h1>Klant toevoegen</h1>
        <hr style={{ marginBottom: "15px", marginTop: "15px" }}></hr>
        <div className="form-section">
          <h3>Klantgegevens</h3>
          <FirstNameInput
            onStateChange={handleCustomerStateChange}
            onGetError={handleCustomerErrors}
            reset={resetForm}
          />
          <div className="input-row">
            <AffixInput
              onStateChange={handleCustomerStateChange}
              reset={resetForm}
            />
            <LastNameInput
              onStateChange={handleCustomerStateChange}
              onGetError={handleCustomerErrors}
              reset={resetForm}
              isRequired={true}
            />
          </div>
          <div className="input-row">
            <EmailInput
              onStateChange={handleCustomerStateChange}
              onGetError={handleCustomerErrors}
              reset={resetForm}
              isRequired={true}
            />
            <PhoneInput
              onStateChange={handleCustomerStateChange}
              onGetError={handleCustomerErrors}
              reset={resetForm}
            />
          </div>
          <StreetInput
            onStateChange={handleCustomerStateChange}
            onGetError={handleCustomerErrors}
            reset={resetForm}
            isRequired={true}
          />
          <div className="input-row">
            <HouseNumberInput
              onStateChange={handleCustomerStateChange}
              onGetError={handleCustomerErrors}
              reset={resetForm}
              isRequired={true}
            />
            <HouseNumberAdditionInput
              onStateChange={handleCustomerStateChange}
              reset={resetForm}
            />
          </div>
          <div className="input-row">
            <PostalCodeInput
              onGetError={handleCustomerErrors}
              reset={resetForm}
              isRequired={true}
              onStateChange={handleCustomerStateChange}
            />
            <CityInput
              onGetError={handleCustomerErrors}
              reset={resetForm}
              isRequired={true}
              onStateChange={handleCustomerStateChange}
            />
          </div>
        </div>
        <SubmitButton>Bevestigen</SubmitButton>
      </form>
    </>
  );
};

export default AddCustomer;
