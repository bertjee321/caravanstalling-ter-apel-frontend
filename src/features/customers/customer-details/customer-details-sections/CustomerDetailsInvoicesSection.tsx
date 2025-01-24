import Button, { ButtonStyle } from "../../../../components/buttons/Button";
import ButtonContainerVertical from "../../../../components/buttons/button-containers/ButtonContainerVertical";
import { InvoiceResponseParameters } from "../../../../models/invoice.model";
import { reverseDate } from "../../../../utils/date.utils";
import { formatCurrency } from "../../../../utils/format-currency.utils";
import styles from "../CustomerDetails.module.css";

export const CustomerDetailsInvoicesSection: React.FC<{
  invoices: InvoiceResponseParameters[];
}> = ({ invoices }) => {
  return (
    <div className={styles["section"]}>
      <h2>Facturen</h2>
      {invoices.map((invoice) => (
        <div className={styles["invoice"]} key={invoice.id}>
          <p>
            #{invoice.id} - {formatCurrency(invoice.amount_incl_VAT)} -{" "}
            {invoice.paid
              ? `Betaald op ${reverseDate(invoice.payment_date!)}`
              : "Openstaand"}
          </p>
          <div style={{ display: "flex", gap: "1rem" }}>
            <Button buttonStyle={ButtonStyle.Green} isSmall={true}>
              Bekijk
            </Button>

            {!invoice.paid && (
              <Button buttonStyle={ButtonStyle.Orange} isSmall={true}>
                Opnieuw versturen
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CustomerDetailsInvoicesSection;
