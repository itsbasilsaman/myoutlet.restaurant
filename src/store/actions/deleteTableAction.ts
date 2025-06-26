import api from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

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
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
