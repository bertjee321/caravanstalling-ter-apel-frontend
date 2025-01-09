import { Route, Routes } from "react-router-dom";
import "./App.css";
import MainLayout from "./components/layout/MainLayout";
import Login from "./features/auth/Login";
import Logout from "./features/auth/Logout";
import AddCustomer from "./features/customers/AddCustomer";
import CustomerList from "./features/customers/CustomerList";
import Dashboard from "./features/dashboard/Dashboard";
import AddInvoice from "./features/invoices/AddInvoice";
import InvoiceList from "./features/invoices/InvoiceList";
import AddVehicle from "./features/vehicles/AddVehicle";
import VehicleList from "./features/vehicles/VehicleList";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/logout" element={<Logout />} />

      <Route path="/" element={<MainLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="customers" element={<CustomerList />} />
        <Route path="customers/add-customer" element={<AddCustomer />} />
        <Route path="vehicles" element={<VehicleList />} />
        <Route path="vehicles/add-vehicle" element={<AddVehicle />} />
        <Route path="invoices" element={<InvoiceList />} />
        <Route path="invoices/add-invoice" element={<AddInvoice />} />
      </Route>
    </Routes>
  );
}

export default App;
