import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistStore,
} from "redux-persist";
import { RootReducer } from "./reducer";
import storage from "redux-persist/lib/storage";
import { AUTHENTICATION_STATE_NAME } from "../app/state";

const reducer = combineReducers(RootReducer);

const persistedReducer = persistReducer(
  {
    key: "root",
    storage,
    whitelist: [AUTHENTICATION_STATE_NAME],
  },
  reducer
);

const middlewareCallback = (getDefaultMiddleware: any) => {
  return getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  });
};

export const RootStore: any = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    middlewareCallback(getDefaultMiddleware),
});

export const RootPersistor = persistStore(RootStore);

export type RootStoreType = typeof RootStore;
export type RootState = ReturnType<typeof RootStore.getState>;
export type RootDispatch = typeof RootStore.dispatch;
