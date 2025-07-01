import api from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const addTableAction = createAsyncThunk(
  "restaurant/addTable",
  async (
    {
      storeId,
      token,
      data,
    }: {
      storeId: string;
      token: string;
      data: { table_name: string; seat_count: number };
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post(`/tables/${storeId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch tables"
      );
    }
  }
);
