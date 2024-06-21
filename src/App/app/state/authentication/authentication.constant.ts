export const AUTHENTICATION_STATE_NAME = "authentication";

export interface AuthenticationState {
  id?: string | null;
  name?: string | null;
  phone?: string | null;
  token: string | null;
  isLoading: boolean;
}
