import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './root.reducer';
import sessionStorageMiddleware, { rehydrateState } from './session-storage.middleware';

const preloadedState = rehydrateState()

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sessionStorageMiddleware),
  preloadedState,
});

export type AppDispatch = typeof store.dispatch;
export default store;