import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../domain";
import {
  AuthenticationState,
  AUTHENTICATION_STATE_NAME,
} from "./authentication.constant";

const authenticateStateSelector = (state: RootState): AuthenticationState =>
  state[AUTHENTICATION_STATE_NAME];

const tokenSelector = createSelector(authenticateStateSelector, (state) => {
  return state?.token;
});

const isLoadingSelector = createSelector(
  authenticateStateSelector,
  (state) => state.isLoading
);

const idSelector = createSelector(
  authenticateStateSelector,
  (state) => state.id
);

const nameSelector = createSelector(
  authenticateStateSelector,
  (state) => state.name
);

const phoneSelector = createSelector(
  authenticateStateSelector,
  (state) => state.phone
);

export const AuthenticationSelectors = {
  tokenSelector,
  isLoadingSelector,
  idSelector,
  nameSelector,
  phoneSelector,
};
