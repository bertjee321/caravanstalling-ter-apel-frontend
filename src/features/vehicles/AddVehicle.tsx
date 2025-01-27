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
import Checkbox from "../../components/checkbox/Checkbox";

export interface VehicleInput {
  vehicleType: VehicleType;
  garage: Garage | null;
  licensePlate: string;
  size: number;
  brand: string;
  model: string;
  currentlyStored: boolean;
}

interface AddVehicleProps {
  customerId: number;
  onComplete: () => void;
}

const AddVehicle: React.FC<AddVehicleProps> = ({ customerId, onComplete }) => {
  const [resetForm, setResetForm] = useState(0);
  const [vehicleType, setVehicleType] = useState<VehicleType>(
    VehicleType.OTHER
  );
  const [garage, setGarage] = useState<Garage>(Garage.GARAGE_ONE);
  const [licensePlate, setLicensePlate] = useState<string>("");
  const [size, setSize] = useState<number>(0);
  const [brand, setBrand] = useState<string>("");
  const [model, setModel] = useState<string>("");
  const [currentlyStored, setCurrentlyStored] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const vehicle: VehicleInput = {
      vehicleType,
      garage: currentlyStored ? garage : null,
      licensePlate,
      size,
      brand,
      model,
      currentlyStored,
    };

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
      <VehicleTypeInput
        reset={resetForm}
        onHandleChange={(e) => setVehicleType(e.target.value as VehicleType)}
      />
      <LicensePlateInput
        reset={resetForm}
        onHandleChange={(e) => setLicensePlate(e.target.value)}
      />
      <BrandInput
        reset={resetForm}
        onHandleChange={(e) => setBrand(e.target.value)}
      />
      <ModelInput
        reset={resetForm}
        onHandleChange={(e) => setModel(e.target.value)}
      />
      <SizeInput
        reset={resetForm}
        onHandleChange={(e) => setSize(Number(e.target.value))}
      />
      <Checkbox
        label="Voertuig staat momenteel in de schuur"
        onHandleChange={(isStored) => setCurrentlyStored(isStored)}
      />
      {currentlyStored && (
        <GarageInput
          reset={resetForm}
          onHandleChange={(e) => setGarage(e.target.value as Garage)}
        />
      )}
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
