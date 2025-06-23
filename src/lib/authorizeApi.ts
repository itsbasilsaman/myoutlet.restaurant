import api from "@/lib/axios";
import { store } from "@/store";
import Cookies from "js-cookie";

export const authorizedApi = () => {
  const token = store.getState().restaurant.token || Cookies.get("access_token");

  console.log(store.getState().restaurant.token,"-===========================")

  api.defaults.headers.common["Authorization"] = token ? `Bearer ${token}` : "";
  return api;
};
