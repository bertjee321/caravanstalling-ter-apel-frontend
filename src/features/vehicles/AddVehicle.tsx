import { useState } from "react";
import { addVehicle } from "../../api/vehicle.api";
import SubmitButton from "../../components/buttons/SubmitButton";
import { Garage, VehicleType } from "../../enums";
import formStyles from "../../styles/form-styles.module.css";
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

interface AddVehicleProps {
  customerId: number;
  onComplete: () => void;
}

const AddVehicle: React.FC<AddVehicleProps> = ({ customerId, onComplete }) => {
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // TODO: Add validation
    // if (Object.values(customerInputErrors).some((error) => error)) {
    //   return;
    // }

    try {
      await addVehicle(vehicle, customerId);
    } catch (error) {
      console.error(error);
    } finally {
      onComplete();
    }

    setResetForm((prev) => prev + 1);
  };

  const form = (
    <div className={formStyles["form-section"]}>
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
    <form className={formStyles["app-form"]} onSubmit={handleSubmit}>
      <h1>Voertuig toevoegen</h1>
      <hr style={{ marginBottom: "15px", marginTop: "15px" }}></hr>
      {form}
      <SubmitButton>Voertuig toevoegen</SubmitButton>
    </form>
  );
};

export default AddVehicle;
