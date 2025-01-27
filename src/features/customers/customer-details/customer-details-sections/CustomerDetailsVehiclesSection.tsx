import { useState } from "react";
import Button, { ButtonStyle } from "../../../../components/buttons/Button";
import { ContractResponseParameters } from "../../../../models/contract.model";
import { VehicleResponseParameters } from "../../../../models/vehicle.model";
import { formatLicensePlate } from "../../../../utils/vehicle.utils";
import styles from "../CustomerDetails.module.css";

interface CustomerDetailsVehiclesSectionProps {
  vehicles: VehicleResponseParameters[];
  contracts: ContractResponseParameters[];
  onAddVehicle: () => void;
  onAddContract: (vehicleId: number) => void;
  onAddInvoice: (contractId: number, amount: number) => void;
}

export const CustomerDetailsVehiclesSection: React.FC<
  CustomerDetailsVehiclesSectionProps
> = ({ vehicles, contracts, onAddVehicle, onAddContract, onAddInvoice }) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const setCollapsedHandler = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <div className={styles["section"]}>
      <h2>
        Voertuigen{" "}
        <span>
          {" "}
          <Button
            buttonStyle={ButtonStyle.Minimal}
            onClick={() => onAddVehicle()}
            isSmall={true}
          >
            Voertuig toevoegen
          </Button>
        </span>
      </h2>
      {vehicles.length === 0 && <p>Geen voertuigen</p>}

      {vehicles.map((vehicle) => (
        <div key={vehicle.id} className={styles["vehicle"]}>
          <h3>
            {vehicle.type} - {vehicle.brand}, {vehicle.model} (
            {formatLicensePlate(vehicle.license_plate)}){" "}
          </h3>
          <span
            className={styles["collapse-btn"]}
            onClick={setCollapsedHandler}
          >
            {collapsed ? "Verberg contracten" : "Toon contracten"}
          </span>

          {collapsed && (
            <>
              <hr
                style={{
                  maxWidth: "100%",
                  margin: "1rem auto",
                }}
              />

              <div>
                <strong>Contracten</strong>
              </div>
              {contracts.length === 0 && <p>Geen contracten</p>}
              {contracts.map((contract) => (
                <div key={contract.id} className={styles["contracts"]}>
                  <p>
                    Contract: {contract.contract_start} tot{" "}
                    {contract.contract_end}
                    <span>
                      {" "}
                      <Button
                        buttonStyle={ButtonStyle.Minimal}
                        onClick={() =>
                          onAddInvoice(contract.id, contract.price_excl_VAT)
                        }
                        isSmall={true}
                      >
                        Factuur maken
                      </Button>
                    </span>
                  </p>
                </div>
              ))}
              <Button
                buttonStyle={ButtonStyle.Green}
                onClick={() => onAddContract(vehicle.id)}
                isSmall={true}
              >
                Nieuw contract
              </Button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default CustomerDetailsVehiclesSection;
