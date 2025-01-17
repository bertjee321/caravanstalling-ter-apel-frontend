import React from "react";
import Button, { ButtonStyle } from "../../components/buttons/Button";
import { CustomerResponseParameters } from "../../redux/customers/customers.types";
import { InvoiceResponseParameters } from "../../redux/invoices/invoices.types";
import { VehicleResponseParameters } from "../../redux/vehicles/vehicles.types";
import styles from "./CustomerDetails.module.css";

interface CustomerDetailsProps {
  customer: Partial<CustomerResponseParameters>;
  vehicles: VehicleResponseParameters[];
  invoices: InvoiceResponseParameters[];
  onVehicleModalOpen: (customerId: number) => void;
  onInvoiceModalOpen: (customerId: number, vehicleId: number) => void;
}

const CustomerDetails: React.FC<CustomerDetailsProps> = ({
  customer,
  vehicles,
  invoices,
  onVehicleModalOpen,
  onInvoiceModalOpen,
}) => {
  return (
    <div className={styles["customer-details"]}>
      {/* Customer Information */}
      <div className={styles["customer-card"]}>
        <h2>
          {`${customer.first_name} ${customer.affix ?? ""} ${
            customer.last_name
          }`.trim()}
        </h2>
        <p>
          <strong>E-mail:</strong> {customer.email}
        </p>
        <p>
          <strong>Tel.:</strong> {customer.phone_number}
        </p>
        <p>
          <strong>Adres:</strong>{" "}
          {`${customer.street} ${customer.house_number}${
            customer.house_number_addition
              ? ` ${customer.house_number_addition}`
              : ""
          }, ${customer.postal_code}, ${customer.city}`}
        </p>
        <p>
          <strong>Gemaakt op:</strong>{" "}
          {new Date(customer.created_at!).toLocaleDateString()}
        </p>
        <p>
          <strong>Bijgewerkt op:</strong>{" "}
          {new Date(customer.updated_at!).toLocaleDateString()}
        </p>
      </div>

      {/* Vehicles Section */}
      <div className={styles["customer-section"]}>
        <h3>Voertuigen</h3>
        {vehicles.length > 0 ? (
          <table className={styles["data-table"]}>
            <thead>
              <tr>
                <th>Kenteken</th>
                <th>Type</th>
                <th>Garage</th>
                <th>Gestald</th>
                <th>Status factuur</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((vehicle) => (
                <tr key={vehicle.id}>
                  <td>{vehicle.license_plate}</td>
                  <td>{vehicle.type}</td>
                  <td>{vehicle.garage}</td>
                  <td>{vehicle.currently_in_garage ? "Ja" : "Nee"}</td>
                  <td>
                    <Button
                      onClick={() =>
                        onInvoiceModalOpen(customer.id!, vehicle.id!)
                      }
                      buttonStyle={ButtonStyle.Orange}
                    >
                      Factuur toevoegen
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Geen voertuigen gevonden.</p>
        )}
        <Button
          onClick={() => onVehicleModalOpen(customer.id!)}
          buttonStyle={ButtonStyle.Blue}
        >
          Voertuig toevoegen
        </Button>
      </div>

      {/* Invoices Section */}
      <div className={styles["customer-section"]}>
        <h3>Facturen</h3>
        {invoices.length > 0 ? (
          <table className={styles["data-table"]}>
            <thead>
              <tr>
                <th>#</th>
                <th>Factuurdatum</th>
                <th>Einddatum</th>
                <th>Bedrag</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.id}>
                  <td>{invoice.id}</td>
                  <td>{new Date(invoice.invoice_date).toLocaleDateString()}</td>
                  <td>{new Date(invoice.due_date).toLocaleDateString()}</td>
                  <td>€{invoice.amount.toFixed(2)}</td>
                  <td>{invoice.paid ? "VOLDAAN" : "OPEN"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Geen facturen gevonden.</p>
        )}
      </div>
    </div>
  );
};

export default CustomerDetails;
