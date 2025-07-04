import api from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

interface UpdateTableParams {
  tableId: string;
  token: string;
  data: {
    table_name: string;
    seat_count: number;
  };
}

export const updateTableAction = createAsyncThunk(
  "restaurant/updateTable",
  async ({ tableId, token, data }: UpdateTableParams, {rejectWithValue}) => {
    try {
      const response = await api.patch(
        `/tables/${tableId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
