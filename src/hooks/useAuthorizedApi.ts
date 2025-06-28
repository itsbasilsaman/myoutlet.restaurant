import { useMemo } from "react";
import api from "@/lib/axios";

export const useAuthorizedApi = () => {
  return useMemo(() => {
    return api;
  }, []);
};
