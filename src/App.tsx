import { Route, Routes } from "react-router-dom";
import "./App.css";
import MainLayout from "./components/layout/MainLayout";
import Login from "./features/auth/Login";
import Logout from "./features/auth/Logout";
import AddCustomer from "./features/customers/AddCustomer";
import CustomerDetailsPage from "./features/customers/customer-details/CustomerDetailsPage";
import CustomerList from "./features/customers/CustomerList";
import Dashboard from "./features/dashboard/Dashboard";
import InvoiceList from "./features/invoices/InvoiceList";
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
        <Route
          path="customers/customer-details/:id"
          element={<CustomerDetailsPage />}
        />
        <Route path="vehicles" element={<VehicleList />} />
        <Route path="invoices" element={<InvoiceList />} />
      </Route>
    </Routes>
  );
}

export default App;
