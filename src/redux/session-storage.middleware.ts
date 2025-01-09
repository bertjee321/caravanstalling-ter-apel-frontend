import { Middleware } from "redux";

const sessionStorageMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);

  // Get the state after the action is processed
  const state = store.getState();

  // Save specific parts of the state to sessionStorage
  sessionStorage.setItem("reduxState", JSON.stringify(state));

  return result;
};

export const rehydrateState = () => {
  const savedState = sessionStorage.getItem("reduxState");
  return savedState ? JSON.parse(savedState) : undefined;
};

export default sessionStorageMiddleware;
