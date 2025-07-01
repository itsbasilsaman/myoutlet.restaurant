import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/axios";
import { AxiosError } from "axios";

export const checkUserStoreAction = createAsyncThunk(
  "restaurant/checkUserStore",
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await api.get("/store/by-owner", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(error?.message || "Failed to fetch store");
    }
  }
);
