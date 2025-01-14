import { useState } from "react";
import SubmitButton from "../../components/buttons/SubmitButton";
import { Garage, VehicleType } from "../../enums";
import "./AddVehicle.css";
import BrandInput from "./inputs/BrandInput";
import GarageInput from "./inputs/GarageInput";
import LicensePlateInput from "./inputs/LicensePlateInput";
import ModelInput from "./inputs/ModelInput";
import SizeInput from "./inputs/SizeInput";
import VehicleTypeInput from "./inputs/VehicleTypeInput";

export interface VehicleInput {
  vehicleType: VehicleType;
  garage: Garage;
  licensePlate: string;
  size: number;
  brand: string;
  model: string;
}

const AddVehicle: React.FC = () => {
  const [resetForm, setResetForm] = useState(0);
  const [vehicle, setVehicle] = useState<VehicleInput>({
    vehicleType: VehicleType.OTHER,
    garage: Garage.GARAGE_ONE,
    licensePlate: "",
    size: 0,
    brand: "",
    model: "",
  });

  const handleChange = (newState: { [key: string]: string }) => {
    setVehicle((prevState) => ({ ...prevState, ...newState }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Submitting Vehicle Data", vehicle);

    setResetForm((prev) => prev + 1);
  };

  const form = (
    <div className="form-section">
      <h3>Voertuiggegevens</h3>
      <VehicleTypeInput onStateChange={handleChange} reset={resetForm} />
      <LicensePlateInput onStateChange={handleChange} reset={resetForm} />
      <BrandInput onStateChange={handleChange} reset={resetForm} />
      <ModelInput onStateChange={handleChange} reset={resetForm} />
      <SizeInput onStateChange={handleChange} reset={resetForm} />
      <GarageInput onStateChange={handleChange} reset={resetForm} />
    </div>
  );

  return (
    <form className="add-vehicle-form" onSubmit={handleSubmit}>
      <h1>Voertuig toevoegen</h1>
      <hr style={{ marginBottom: "15px", marginTop: "15px" }}></hr>
      {form}
      <SubmitButton>Voertuig toevoegen</SubmitButton>
    </form>
  );
};

export default AddVehicle;
