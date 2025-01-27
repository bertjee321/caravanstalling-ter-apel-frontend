import React, { useState } from "react";
import { ContractResponseParameters } from "../../../models/contract.model";
import { CustomerResponseParameters } from "../../../models/customer.model";
import { InvoiceResponseParameters } from "../../../models/invoice.model";
import { VehicleResponseParameters } from "../../../models/vehicle.model";
import CustomerDetailsContractsSection from "./customer-details-sections/CustomerDetailsContractsSection";
import CustomerDetailsVehiclesSection from "./customer-details-sections/CustomerDetailsVehiclesSection";
import styles from "./CustomerDetails.module.css";
import CustomerDetailsInvoicesSection from "./customer-details-sections/CustomerDetailsInvoicesSection";
import CustomerDetailsTabs from "./customer-details-tabs/CustomerDetailsTabs";
import CustomerDetailsPersonalData from "./customer-details-personal-data/CustomerDetailsPersonalData";
import { on } from "events";

interface CustomerDetailsProps {
  customer: Partial<CustomerResponseParameters>;
  vehicles: VehicleResponseParameters[];
  contracts: ContractResponseParameters[];
  invoices: InvoiceResponseParameters[];
  onAddContract: (vehicleId: number) => void;
  onAddInvoice: (contractId: number, amount: number) => void;
  onAddVehicle: () => void;
}

export enum CustomerDetailsTab {
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
  onAddInvoice,
  onAddVehicle,
}) => {
  const [activeTab, setActiveTab] = useState<CustomerDetailsTab>(
    CustomerDetailsTab.VEHICLES
  );

  return (
    <div className={styles["customer-details"]}>
      {/* Customer Header */}
      <CustomerDetailsPersonalData customer={customer} />

      {/* Tabs */}
      <CustomerDetailsTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Sections */}
      <div className={styles["sections"]}>
        {activeTab === CustomerDetailsTab.VEHICLES && (
          <CustomerDetailsVehiclesSection
            vehicles={vehicles}
            contracts={contracts}
            onAddContract={onAddContract}
            onAddInvoice={onAddInvoice}
            onAddVehicle={onAddVehicle}
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
