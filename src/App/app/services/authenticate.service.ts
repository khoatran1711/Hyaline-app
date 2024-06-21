import { HttpService } from "../http-services";
import { RootStore, RootStoreType } from "../../domain";
import { GoogleLogin, LoginResponse } from "../models/authenticate.model";
import { CodeResponse } from "@react-oauth/google";
import { AuthenticationActions } from "../state";

export class AuthenticateService {
  private httpService: HttpService;

  constructor(private store: RootStoreType = RootStore) {
    this.httpService = new HttpService(
      ...Array(1),
      true,
      process.env.REACT_APP_HYALINE_AUTHENTICATE_URL
    );
  }

  login(username: string, password: string) {
    return this.httpService
      .post<
        {
          username: string;
          password: string;
        },
        LoginResponse
      >("/authenticate/login", {
        username: username,
        password: password,
      })
      .then((res) => {
        if (res?.data && res?.isSuccess) {
          const response = res?.data;
          response?.accessToken &&
            RootStore.dispatch(
              AuthenticationActions.setToken(response.accessToken)
            );
          response.data?.id &&
            RootStore.dispatch(AuthenticationActions.setId(response.data.id));
          response.data?.name &&
            RootStore.dispatch(
              AuthenticationActions.setName(response.data.name)
            );
          response.data?.phone &&
            RootStore.dispatch(
              AuthenticationActions.setPhone(response.data.phone)
            );
        }
        return res;
      });
  }

  googleLogin(
    req?: Omit<CodeResponse, "error" | "error_description" | "error_uri">
  ) {
    return this.httpService.post<any, any>("/authenticate/google-login", req);
  }

  refreshToken() {
    return this.httpService.post<any, any>("/authenticate/refresh-token", {});
  }
}
