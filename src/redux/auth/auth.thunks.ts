import axios from "axios";
import axiosInstance from "../../api/axios";
import { AppDispatch } from "../store";
import {
  setLogin,
  setLoginFail,
  setLoginSuccess,
  setLogout,
} from "./auth.slice";
import { ApiResponse } from "./auth.types";

export const login =
  (email: string, password: string) => async (dispatch: AppDispatch) => {
    dispatch(setLogin());

    try {
      const response = await axiosInstance.post<ApiResponse>("/auth/login", {
        email,
        password,
      });

      const { session, user } = response?.data;

      if (!session?.access_token || !user?.id || !user?.email) {
        const error: string =
          "Invalid API response: missing session or user data";
        throw new Error(error);
      }

      localStorage.setItem("token", session?.access_token);
      dispatch(
        setLoginSuccess({
          id: user.id,
          email: user.email,
        })
      );
    } catch (error: any) {
      let errorMessage = "Er is een onverwachte fout opgetreden";

      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.error;
      }

      dispatch(setLoginFail(errorMessage));
    }
  };

export const logout = () => (dispatch: AppDispatch) => {
  dispatch(setLogout());

  localStorage.removeItem("token");

  try {
    axiosInstance.get("/auth/logout");
  } catch (error) {
    console.error("Failed to logout", error);
  }
};
