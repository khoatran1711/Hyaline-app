export interface GoogleLogin {
  authuser?: "string";
  code?: "string";
  prompt?: "string";
  scope?: "string";
}

export interface LoginResponse {
  data?: {
    id?: string;
    name?: string;
    phone?: string;
  };
  accessToken?: string;
  isSuccess?: boolean;
  message?: string;
}
