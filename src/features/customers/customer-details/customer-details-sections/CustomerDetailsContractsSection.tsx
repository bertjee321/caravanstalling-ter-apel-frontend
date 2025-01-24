import { ContractResponseParameters } from "../../../../models/contract.model";
import styles from "../CustomerDetails.module.css";

export const CustomerDetailsContractsSection: React.FC<{
  contracts: ContractResponseParameters[];
}> = ({ contracts }) => {
  return (
    <div className={styles["section"]}>
      <h2>Contracten</h2>
      {contracts.map((contract) => (
        <p key={contract.id}>
          Contract #{contract.id}:{" "}
          {contract.contract_start.split("-").reverse().join("-")} tot{" "}
          {contract.contract_end?.split("-").reverse().join("-")}
        </p>
      ))}
    </div>
  );
};

export default CustomerDetailsContractsSection;
