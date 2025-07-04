import api from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const fetchTablesAction = createAsyncThunk(
  "restaurant/fetchTables",
  async ({storeId, token}:{storeId: string, token: string}, { rejectWithValue }) => {
    try {
      const response = await api.get(`/tables/${storeId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(error.response?.data?.message || "Failed to fetch tables");
    }
  }
);
