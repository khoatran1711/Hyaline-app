import { AuthenticationSelectors } from "./authentication.selector";
import { AuthenticationActions } from "./authentication.state";
import { Action, ThunkAction, ThunkDispatch } from "@reduxjs/toolkit";
import { JwtService } from "../../http-services/jwt.service";
import { AuthenticateService } from "../../services/authenticate.service";
import { RootState } from "../../../domain";
import { HttpResult } from "../../http-services";

let refreshToken: Promise<HttpResult<any>> | null = null;

export const checkToken =
  (): ThunkAction<void, RootState, void, Action> =>
  async (
    dispatch: ThunkDispatch<RootState, void, Action>,
    getState: () => RootState
  ) => {
    const jwtService = new JwtService();
    const authenticateService = new AuthenticateService();

    const state = getState();
    const token = AuthenticationSelectors.tokenSelector(state);
    const isLoading = AuthenticationSelectors.isLoadingSelector(state);

    if (!token) {
      refreshToken = refreshToken
        ? refreshToken
        : authenticateService.refreshToken();
      await refreshToken;
      refreshToken = null;
    } else {
      const valid = jwtService.validate(token);

      if (valid) {
        //dispatch(checkToken());
      } else {
        refreshToken = refreshToken
          ? refreshToken
          : authenticateService.refreshToken();
        await refreshToken;
        refreshToken = null;
      }
    }
  };
