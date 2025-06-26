import { useMemo } from "react";
// import { authorizedApi } from "@/lib/authorizeApi";
import api from "@/lib/axios";

export const useAuthorizedApi = () => {
  return useMemo(() => {
    return api;
  }, []);
};
