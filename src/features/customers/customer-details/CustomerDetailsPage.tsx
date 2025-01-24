import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCustomerById } from "../../../api/customer.api";
import Spinner from "../../../components/spinner/Spinner";
import { ContractResponseParameters } from "../../../models/contract.model";
import { CustomerResponseParameters } from "../../../models/customer.model";
import { InvoiceResponseParameters } from "../../../models/invoice.model";
import { VehicleResponseParameters } from "../../../models/vehicle.model";
import CustomerDetails from "./CustomerDetails";
import Modal from "../../../components/modal/Modal";
import AddContract from "../../contracts/AddContract";
import AddInvoice from "../../invoices/AddInvoice";

const CustomerDetailsPage = () => {
  const { id } = useParams(); // Extract the ID from the route
  const [data, setData] = useState<{
    customer?: Partial<CustomerResponseParameters>;
    vehicles: VehicleResponseParameters[];
    invoices: InvoiceResponseParameters[];
    contracts: ContractResponseParameters[];
  }>({ customer: undefined, vehicles: [], invoices: [], contracts: [] });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [contractModalOpen, setContractModalOpen] = useState<boolean>(false);
  const [invoiceModalOpen, setInvoiceModalOpen] = useState<boolean>(false);
  const [vehicleId, setVehicleId] = useState<number>(0);
  const [contractId, setContractId] = useState<number>(0);
  const [contractAmount, setContractAmount] = useState<number>(0);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetchCustomerById(Number(id));
      setData(response);
    } catch (err) {
      setError("Failed to fetch customer data");
    } finally {
      setLoading(false);
    }
  };

  const contractModalOpenHandler = (vehicleId: number) => {
    setVehicleId(vehicleId);
    setContractModalOpen(true);
  };

  const contractModalCloseHandler = () => {
    setContractModalOpen(false);
  };

  const invoiceModalOpenHandler = (contractId: number, amount: number) => {
    setContractAmount(amount);
    setContractId(contractId);
    setInvoiceModalOpen(true);
  };

  const invoiceModalCloseHandler = () => {
    setInvoiceModalOpen(false);
  };

  const handleOnComplete = () => {
    contractModalCloseHandler();
    invoiceModalCloseHandler();
    setContractId(0);
    setVehicleId(0);
    setContractAmount(0);
    fetchData();
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!data.customer) {
    return <div>No customer found.</div>;
  }

  return (
    <>
      <Modal isOpen={contractModalOpen} onClose={contractModalCloseHandler}>
        <AddContract
          customerId={data.customer.id!}
          vehicleId={vehicleId}
          onComplete={handleOnComplete}
        />
      </Modal>
      <Modal isOpen={invoiceModalOpen} onClose={invoiceModalCloseHandler}>
        <AddInvoice
          customerId={data.customer.id!}
          contractId={contractId}
          onComplete={handleOnComplete}
          defaultValues={{ amountExclVAT: contractAmount }}
        />
      </Modal>

      <CustomerDetails
        customer={data.customer}
        vehicles={data.vehicles}
        invoices={data.invoices}
        contracts={data.contracts} // Add contracts here
        onAddContract={contractModalOpenHandler}
        onAddInvoice={invoiceModalOpenHandler}
      />
    </>
  );
};

export default CustomerDetailsPage;
