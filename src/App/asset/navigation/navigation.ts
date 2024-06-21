import { navigation } from "../../app/browser.component";

export const globalNavigation = (route?: string, data?: any) => {
  const navRoute = route ? route : "/";
  navigation(navRoute, { state: data });
};

export const globalGoBack = () => {
  navigation(-1);
};

export const globalReplacePage = (route?: string) => {
  const navRoute = route ? route : "/";

  navigation(navRoute, { replace: true });
};

export const globalRefresh = () => {
  navigation(0);
};
