import axiosInstance from "../../api/axios";
import { AppDispatch } from "../store";
import { fetchCustomers, fetchCustomersFailure, fetchCustomersSuccess } from "./customers.slice";
import { Customer } from "./customers.types";

export const getCustomers = () => async (dispatch: AppDispatch) => {
  dispatch(fetchCustomers());

  try {
    const response = await axiosInstance.get<Customer[]>(
      "/customers/getcustomers"
    );
    dispatch(fetchCustomersSuccess(response.data));
  } catch (error: any) {
    dispatch(fetchCustomersFailure(error.message));
  }
};