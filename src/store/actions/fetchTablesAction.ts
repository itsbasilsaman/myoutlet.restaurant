import api from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

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
    } catch (err: unknown) {
      return rejectWithValue(err instanceof Error ? err.message : "Failed to fetch tables");
    }
  }
);
