import { useState } from "react";
import SubmitButton from "../../components/buttons/SubmitButton";
import "./AddInvoice.css";

export interface InvoiceInput {
  amount: number;
  invoiceDate: string;
  dueDate: string;
}

interface AddInvoiceComponentProps {
  inForm?: boolean; // Optional prop to render only the form
  onStateChange?: (state: InvoiceInput) => void; // Callback to pass state to parent
}

const AddInvoice: React.FC<AddInvoiceComponentProps> = ({
  inForm,
  onStateChange,
}) => {
  const [invoice, setInvoice] = useState<InvoiceInput>({
    amount: 0,
    invoiceDate: new Date().toISOString().split("T")[0], // default to today's date in the format YYYY-MM-DD
    dueDate: new Date().toISOString().split("T")[0], // default to today's date in the format YYYY-MM-DD
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInvoice({ ...invoice, [e.target.name]: e.target.value });

    if(inForm && onStateChange) {
      onStateChange({ ...invoice, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Submitting Invoice Data", invoice);
  };

  // Form structure for the invoice
  const form = (
    <div className="form-section">
      <h3>Factuur</h3>

      <label>Bedrag</label>
      <input
        type="number"
        name="amount"
        value={invoice.amount}
        onChange={handleChange}
        required
      />

      <label>Factuurdatum</label>
      <input
        type="date"
        name="invoiceDate"
        value={invoice.invoiceDate}
        onChange={handleChange}
        required
      />

      <label>Betaaldatum</label>
      <input
        type="date"
        name="dueDate"
        value={invoice.dueDate}
        onChange={handleChange}
        required
      />
    </div>
  );

  // Return different views based on whether it's inside a form or not
  if (inForm) {
    return form;
  } else {
    return (
      <form className="add-invoice-form" onSubmit={handleSubmit}>
        {form}
        <SubmitButton>Factuur toevoegen</SubmitButton>
      </form>
    );
  }
};

export default AddInvoice;
