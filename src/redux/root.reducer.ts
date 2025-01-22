// rootReducer.ts
import { combineReducers } from "redux";
import authReducer from "./auth/auth.slice";
import contractsReducer from "./contracts/contracts.slice";
import customersReducer from "./customers/customers.slice";
import invoicesReducer from "./invoices/invoices.slice";
import vehiclesReducer from "./vehicles/vehicles.slice";

const rootReducer = combineReducers({
  auth: authReducer,
  customers: customersReducer,
  invoices: invoicesReducer,
  vehicles: vehiclesReducer,
  contracts: contractsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
