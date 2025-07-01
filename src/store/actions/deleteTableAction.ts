import api from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

interface DeleteTableParams {
  tableId: string;
  token: string;
}

export const deleteTableAction = createAsyncThunk(
  "restaurant/deleteTable",
  async ({ tableId, token }: DeleteTableParams, {rejectWithValue}) => {
    try {
       await api.delete(`/tables/${tableId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return tableId;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
