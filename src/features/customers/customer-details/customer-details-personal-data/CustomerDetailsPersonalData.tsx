import { CustomerResponseParameters } from "../../../../models/customer.model";
import styles from "../CustomerDetails.module.css";

interface CustomerDetailsPersonalDataProps {
  customer: Partial<CustomerResponseParameters>;
}

const CustomerDetailsPersonalData: React.FC<
  CustomerDetailsPersonalDataProps
> = ({ customer }) => {
  return (
    <div className={styles["customer-header"]}>
      <h1>
        {" "}
        {`${customer.first_name} ${customer.affix ?? ""} ${
          customer.last_name
        }`.trim()}
      </h1>
      <p>Email: {customer.email}</p>
      <p>Telefoon: {customer.phone_number}</p>
      <p>
        Adres:{" "}
        {`${customer.street} ${customer.house_number}${
          customer.house_number_addition
            ? ` ${customer.house_number_addition}`
            : ""
        }, ${customer.postal_code}, ${customer.city}`}
      </p>
    </div>
  );
};

export default CustomerDetailsPersonalData;
