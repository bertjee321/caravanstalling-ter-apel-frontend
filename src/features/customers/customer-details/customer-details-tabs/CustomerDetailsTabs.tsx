import { CustomerDetailsTab } from "../CustomerDetails";
import styles from "../CustomerDetails.module.css";

interface CustomerDetailsTabsProps {
  activeTab: CustomerDetailsTab;
  setActiveTab: (tab: CustomerDetailsTab) => void;
}

const CustomerDetailsTabs: React.FC<CustomerDetailsTabsProps> = ({
  activeTab,
  setActiveTab,
}) => {
  return (
    <div className={styles["tabs"]}>
      <button
        className={`${styles["tab"]} ${
          activeTab === CustomerDetailsTab.VEHICLES ? `${styles["active"]}` : ""
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
          activeTab === CustomerDetailsTab.INVOICES ? `${styles["active"]}` : ""
        }`}
        onClick={() => setActiveTab(CustomerDetailsTab.INVOICES)}
      >
        Facturen
      </button>
    </div>
  );
};

export default CustomerDetailsTabs;