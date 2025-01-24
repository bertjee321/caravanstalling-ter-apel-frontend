import React, { useState } from "react";
import { ContractResponseParameters } from "../../../models/contract.model";
import { CustomerResponseParameters } from "../../../models/customer.model";
import { InvoiceResponseParameters } from "../../../models/invoice.model";
import { VehicleResponseParameters } from "../../../models/vehicle.model";
import CustomerDetailsContractsSection from "./customer-details-sections/CustomerDetailsContractsSection";
import CustomerDetailsVehiclesSection from "./customer-details-sections/CustomerDetailsVehiclesSection";
import styles from "./CustomerDetails.module.css";
import CustomerDetailsInvoicesSection from "./customer-details-sections/CustomerDetailsInvoicesSection";

interface CustomerDetailsProps {
  customer: Partial<CustomerResponseParameters>;
  vehicles: VehicleResponseParameters[];
  contracts: ContractResponseParameters[];
  invoices: InvoiceResponseParameters[];
  onAddContract: (vehicleId: number) => void;
  onAddInvoice: (contractId: number) => void;
}

enum CustomerDetailsTab {
  VEHICLES = "vehicles",
  CONTRACTS = "contracts",
  INVOICES = "invoices",
}

const CustomerDetails: React.FC<CustomerDetailsProps> = ({
  customer,
  vehicles,
  contracts,
  invoices,
  onAddContract,
  onAddInvoice
}) => {
  const [activeTab, setActiveTab] = useState<CustomerDetailsTab>(
    CustomerDetailsTab.VEHICLES
  );

  return (
    <div className={styles["customer-details"]}>
      {/* Customer Header */}
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

      {/* Tabs */}
      <div className={styles["tabs"]}>
        <button
          className={`${styles["tab"]} ${
            activeTab === CustomerDetailsTab.VEHICLES
              ? `${styles["active"]}`
              : ""
          }`}
          onClick={() => setActiveTab(CustomerDetailsTab.VEHICLES)}
        >
          Voertuigen
        </button>
        <button
          className={`${styles["tab"]} ${
            activeTab === CustomerDetailsTab.CONTRACTS
              ? `${styles["active"]}`
              : ""
          }`}
          onClick={() => setActiveTab(CustomerDetailsTab.CONTRACTS)}
        >
          Contracten
        </button>
        <button
          className={`${styles["tab"]} ${
            activeTab === CustomerDetailsTab.INVOICES
              ? `${styles["active"]}`
              : ""
          }`}
          onClick={() => setActiveTab(CustomerDetailsTab.INVOICES)}
        >
          Facturen
        </button>
      </div>

      {/* Sections */}
      <div className={styles["sections"]}>
        {activeTab === CustomerDetailsTab.VEHICLES && (
          <CustomerDetailsVehiclesSection
            vehicles={vehicles}
            contracts={contracts}
            onAddContract={onAddContract}
            onAddInvoice={onAddInvoice}
          />
        )}

        {activeTab === CustomerDetailsTab.CONTRACTS && (
          <CustomerDetailsContractsSection contracts={contracts} />
        )}

        {activeTab === CustomerDetailsTab.INVOICES && (
          <CustomerDetailsInvoicesSection invoices={invoices} />
        )}
      </div>
    </div>
  );
};

export default CustomerDetails;
