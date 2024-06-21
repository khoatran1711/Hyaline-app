import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useRootDispatch, useRootSelector } from "../domain";
import { AuthenticationSelectors, checkToken } from "./state";
import { useEffect } from "react";
import { PagePath } from "../constants/page-path.constant";

export const RequireAuth = () => {
  const token = useRootSelector(AuthenticationSelectors.tokenSelector);
  const location = useLocation();
  const dispatch = useRootDispatch();

  useEffect(() => {
    dispatch(checkToken());
  }, []);

  return token ? (
    <Outlet />
  ) : (
    <Navigate to={PagePath.Login} state={{ from: location }} />
  );
};
