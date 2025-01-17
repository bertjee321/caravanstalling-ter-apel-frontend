import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../api/axios";
import Modal from "../../components/modal/Modal";
import Spinner from "../../components/spinner/Spinner";
import { CustomerResponseParameters } from "../../redux/customers/customers.types";
import { InvoiceResponseParameters } from "../../redux/invoices/invoices.types";
import { VehicleResponseParameters } from "../../redux/vehicles/vehicles.types";
import AddInvoice from "../invoices/AddInvoice";
import AddVehicle from "../vehicles/AddVehicle";
import CustomerDetails from "./CustomerDetails";

const mapResponseToCustomer = (
  response: CustomerResponseParameters
): {
  customer: Partial<CustomerResponseParameters>;
  vehicles: VehicleResponseParameters[];
  invoices: InvoiceResponseParameters[];
} => {
  return {
    customer: response,
    vehicles: response.vehicles,
    invoices: response.invoices,
  };
};

const CustomerDetailsPage = () => {
  const { id } = useParams(); // Extract the ID from the route
  const [data, setData] = useState<{
    customer?: Partial<CustomerResponseParameters>;
    vehicles: VehicleResponseParameters[];
    invoices: InvoiceResponseParameters[];
  }>({ customer: undefined, vehicles: [], invoices: [] });
  const [isVehicleModalOpen, setIsVehicleModalOpen] = useState<boolean>(false);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState<boolean>(false);
  const [customerId, setCustomerId] = useState<number>(0);
  const [vehicleId, setVehicleId] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      setLoading(true);

      if (id === undefined) {
        throw new Error("No customer ID provided");
      }

      const response = await axiosInstance.get<CustomerResponseParameters[]>(
        `/customers//getcustomer/${id}`
      );

      setData(mapResponseToCustomer(response.data[0]));
    } catch (err) {
      setError("Failed to fetch customer data");
    } finally {
      setLoading(false);
    }
  };

  const openVehicleModal = (customerId: number) => {
    setCustomerId(customerId);
    setIsVehicleModalOpen(true);
    setIsInvoiceModalOpen(false);
  };

  const openInvoiceModal = (customerId: number, vehicleId: number) => {
    setCustomerId(customerId);
    setVehicleId(vehicleId);
    setIsInvoiceModalOpen(true);
    setIsVehicleModalOpen(false);
  };

  const closeVehicleModal = () => {
    setCustomerId(0);
    setVehicleId(0);
    setIsVehicleModalOpen(false);
  };

  const closeInvoiceModal = () => {
    setCustomerId(0);
    setVehicleId(0);
    setIsInvoiceModalOpen(false);
  };

  const handleComplete = () => {
    closeVehicleModal();
    closeInvoiceModal();
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
      <Modal isOpen={isVehicleModalOpen} onClose={closeVehicleModal}>
        <AddVehicle customerId={customerId} onComplete={handleComplete} />
      </Modal>

      <Modal isOpen={isInvoiceModalOpen} onClose={closeInvoiceModal}>
        <AddInvoice
          customerId={customerId}
          vehicleId={vehicleId}
          onComplete={handleComplete}
        />
      </Modal>

      <CustomerDetails
        customer={data.customer}
        vehicles={data.vehicles}
        invoices={data.invoices}
        onVehicleModalOpen={openVehicleModal}
        onInvoiceModalOpen={openInvoiceModal}
      />
    </>
  );
};

export default CustomerDetailsPage;
