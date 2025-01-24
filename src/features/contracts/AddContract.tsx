import { useState } from "react";
import { addContract } from "../../api/contract.api";
import SubmitButton from "../../components/buttons/SubmitButton";
import formStyles from "../../styles/form-styles.module.css";
import ContractAmountInput from "./inputs/ContractAmountInput";
import EndDateInput from "./inputs/ContractEndDateInput";
import ContractNotesInput from "./inputs/ContractNotesInput";
import StartDateInput from "./inputs/ContractStartDateInput";

export interface ContractInput {
  contractStart: string;
  contractEnd: string | null;
  priceExclVAT: number;
  notes: string | null;
}

interface AddContractProps {
  customerId: number;
  vehicleId: number;
  onComplete: () => void;
}

const AddContract: React.FC<AddContractProps> = ({
  customerId,
  vehicleId,
  onComplete,
}) => {
  const [resetForm, setResetForm] = useState(0);
  const [contract, setContract] = useState<ContractInput>({
    contractStart: new Date().toISOString().split("T")[0], // default to today's date in the format YYYY-MM-DD
    contractEnd: null,
    priceExclVAT: 0,
    notes: null,
  });

  const handleChange = (newState: { [key: string]: string | number }) => {
    setContract((prevState) => ({ ...prevState, ...newState }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // ADD VALIDATION
    // if (Object.values(customerInputErrors).some((error) => error)) { return; }

    try {
      await addContract(contract, customerId, vehicleId);
    } catch (error) {
      console.error(error);
    } finally {
      onComplete();
    }

    setResetForm((prevState) => prevState + 1);
  };

  const form = (
    <div className={formStyles["form-section"]}>
      <h3>Contractgegevens</h3>
      <StartDateInput
        onStateChange={handleChange}
        reset={resetForm}
        isRequired={true}
      />
      <EndDateInput onStateChange={handleChange} reset={resetForm} />
      <ContractAmountInput
        onStateChange={handleChange}
        reset={resetForm}
        isRequired={true}
      />
      <ContractNotesInput onStateChange={handleChange} reset={resetForm} />
    </div>
  );

  return (
    <form className={formStyles["app-form"]} onSubmit={handleSubmit}>
      <h1>Contract aanmaken</h1>
      <hr style={{ marginBottom: "15px", marginTop: "15px" }}></hr>
      {form}
      <SubmitButton>Contract maken</SubmitButton>
    </form>
  );
};

export default AddContract;
