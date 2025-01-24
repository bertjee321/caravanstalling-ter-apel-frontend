import { useState } from "react";
import { addInvoice } from "../../api/invoice.api";
import SubmitButton from "../../components/buttons/SubmitButton";
import Checkbox from "../../components/checkbox/Checkbox";
import formStyles from "../../styles/form-styles.module.css";
import AmountInput from "./inputs/AmountInput";
import DueDateInput from "./inputs/DueDateInput";
import InvoiceDateInput from "./inputs/InvoiceDateInput";
import PaymentDateInput from "./inputs/PaymentDateInput";

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
  defaultValues?: Partial<InvoiceInput>;
}

const AddInvoice: React.FC<AddInvoiceProps> = ({
  contractId,
  customerId,
  onComplete,
  defaultValues,
}) => {
  const [resetForm, setResetForm] = useState(0);
  const [invoiceDate, setInvoiceDate] = useState<string>(
    defaultValues?.invoiceDate ?? new Date().toISOString().split("T")[0]
  );
  const [dueDate, setDueDate] = useState<string>(
    defaultValues?.dueDate ?? new Date().toISOString().split("T")[0]
  );
  const [paymentDate, setPaymentDate] = useState<string | null>(
    defaultValues?.paymentDate ?? null
  );
  const [amountExclVAT, setAmountExclVAT] = useState<number>(
    defaultValues?.amountExclVAT ?? 0
  );
  const [paid, setPaid] = useState<boolean>(defaultValues?.paid ?? false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const invoiceData: InvoiceInput = {
      invoiceDate,
      dueDate,
      paymentDate,
      amountExclVAT,
      paid,
    };

    // ADD VALIDATION
    // if (Object.values(customerInputErrors).some((error) => error)) { return; }

    try {
      await addInvoice(invoiceData, contractId, customerId);
    } catch (error) {
      console.error(error);
    } finally {
      onComplete();
    }

    setResetForm((prevState) => prevState + 1);
  };

  const form = (
    <div className={formStyles["form-section"]}>
      <h3>Factuurgegevens</h3>
      <AmountInput
        onHandleChange={(e) => setAmountExclVAT(parseFloat(e.target.value))}
        reset={resetForm}
        isRequired={true}
        defaultValue={defaultValues?.amountExclVAT}
      />
      <InvoiceDateInput
        onHandleChange={(e) => setInvoiceDate(e.target.value)}
        reset={resetForm}
        isRequired={true}
      />
      <DueDateInput
        onHandleChange={(e) => setDueDate(e.target.value)}
        reset={resetForm}
        isRequired={true}
      />
      <Checkbox label="Betaald" onHandleChange={(paid) => setPaid(paid)} />
      {paid && (
        <PaymentDateInput
          onHandleChange={(e) => setPaymentDate(e.target.value)}
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
