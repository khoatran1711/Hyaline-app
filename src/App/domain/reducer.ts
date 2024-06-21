import { AUTHENTICATION_STATE_NAME, AuthenticationReducer } from "../app/state";

export const RootReducer = {
  [AUTHENTICATION_STATE_NAME]: AuthenticationReducer,
};
