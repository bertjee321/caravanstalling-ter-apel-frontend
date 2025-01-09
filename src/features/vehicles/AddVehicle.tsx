import { useState } from "react";
import SubmitButton from "../../components/buttons/SubmitButton";
import "./AddVehicle.css";

export enum VehicleType {
  CARAVAN = "Caravan",
  CAMPER = "Camper",
  CAR = "Auto",
  TRAILER = "Aanhanger",
  MOTORCYCLE = "Motor",
  OTHER = "Anders",
}

export interface VehicleInput {
  type: VehicleType;
  garage: string;
  licensePlate: string;
}

interface AddVehicleComponentProps {
  inForm?: boolean; // Optional prop to render only the form
  onStateChange?: (state: VehicleInput) => void; // Callback to pass state to parent
}

const AddVehicle: React.FC<AddVehicleComponentProps> = ({
  inForm,
  onStateChange,
}) => {
  const [vehicle, setVehicle] = useState<VehicleInput>({
    type: VehicleType.OTHER,
    garage: "",
    licensePlate: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVehicle({ ...vehicle, [e.target.name]: e.target.value });

    if (inForm && onStateChange) {
      onStateChange({ ...vehicle, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Submitting Vehicle Data");
  };

  const form = (
    <div className="form-section">
      <h3>Voertuiggegevens</h3>
      <label>Kenteken</label>
      <input
        type="text"
        name="licensePlate"
        value={vehicle.licensePlate}
        onChange={handleChange}
        required
      />
      <label>Type voertuig</label>
      <input
        type="text"
        name="type"
        value={vehicle.type?.toString()}
        onChange={handleChange}
        required
      />
      <label>Locatie (schuur)</label>
      <input
        type="text"
        name="garage"
        value={vehicle.garage}
        onChange={handleChange}
      />
    </div>
  );

  if (inForm) {
    return form;
  } else {
    return (
      <form className="add-vehicle-form" onSubmit={handleSubmit}>
        {form}
        <SubmitButton>Voertuig toevoegen</SubmitButton>
      </form>
    );
  }
};

export default AddVehicle;
