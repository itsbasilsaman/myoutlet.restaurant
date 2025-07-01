import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/axios";

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
    } catch (error: unknown) {
      return rejectWithValue(error?.message || "Failed to fetch store");
    }
  }
);
