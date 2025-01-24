import { useState } from "react";
import { addInvoice } from "../../api/invoice.api";
import SubmitButton from "../../components/buttons/SubmitButton";
import formStyles from "../../styles/form-styles.module.css";
import AmountInput from "./inputs/AmountInput";
import DueDateInput from "./inputs/DueDateInput";
import InvoiceDateInput from "./inputs/InvoiceDateInput";
import PaymentDateInput from "./inputs/PaymentDateInput";
import Checkbox from "../../components/checkbox/Checkbox";

export interface InvoiceInput {
  amountExclVAT: number;
  invoiceDate: string;
  dueDate: string;
  paymentDate: string | null;
  paid: boolean;
}

interface AddInvoiceProps {
  contractId: number;
  customerId: number;
  onComplete: () => void;
}

const AddInvoice: React.FC<AddInvoiceProps> = ({
  contractId,
  customerId,
  onComplete,
}) => {
  const [resetForm, setResetForm] = useState(0);
  const [invoice, setInvoice] = useState<InvoiceInput>({
    invoiceDate: new Date().toISOString().split("T")[0], // default to today's date in the format YYYY-MM-DD
    dueDate: new Date().toISOString().split("T")[0], // default to today's date in the format YYYY-MM-DD
    amountExclVAT: 0,
    paymentDate: null,
    paid: false,
  });

  const handleChange = (newState: { [key: string]: string | number }) => {
    setInvoice((prevState) => ({ ...prevState, ...newState }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // ADD VALIDATION
    // if (Object.values(customerInputErrors).some((error) => error)) { return; }

    try {
      await addInvoice(invoice, contractId, customerId);
    } catch (error) {
      console.error(error);
    } finally {
      onComplete();
    }

    setResetForm((prevState) => prevState + 1);
  };

  const onPaidChange = (paid: boolean) => {
    setInvoice((prevState) => ({ ...prevState, paid }));
  };

  const form = (
    <div className={formStyles["form-section"]}>
      <h3>Factuurgegevens</h3>
      <AmountInput
        onStateChange={handleChange}
        reset={resetForm}
        isRequired={true}
      />
      <InvoiceDateInput
        onStateChange={handleChange}
        reset={resetForm}
        isRequired={true}
      />
      <DueDateInput
        onStateChange={handleChange}
        reset={resetForm}
        isRequired={true}
      />
      <Checkbox label="Betaald" onHandleChange={onPaidChange} />
      {invoice.paid && (
        <PaymentDateInput
          onStateChange={handleChange}
          reset={resetForm}
          isRequired={true}
        />
      )}
    </div>
  );

  return (
    <form className={formStyles["app-form"]} onSubmit={handleSubmit}>
      <h1>Factuur toevoegen</h1>
      <hr style={{ marginBottom: "15px", marginTop: "15px" }}></hr>
      {form}
      <SubmitButton>Factuur toevoegen</SubmitButton>
    </form>
  );
};

export default AddInvoice;
