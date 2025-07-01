import { createSlice } from "@reduxjs/toolkit";
import { checkUserStoreAction } from "../actions/checkUserStore";
import { fetchTablesAction } from "../actions/fetchTablesAction";
import { addTableAction } from "../actions/addTableAction";
import { deleteTableAction } from "../actions/deleteTableAction";
import { updateTableAction } from "../actions/updateTableAction";

export interface RestaurantStateType {
  loading: boolean;
  data: unknown;
  token: string | null;
  refreshToken: string | null;
  error: string | null;
  tables: unknown[];
}

const initialState: RestaurantStateType = {
  loading: false,
  data: null,
  token: null,
  refreshToken: null,
  error: null,
  tables: []
};

const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {

     setTokens: (state: RestaurantStateType, action) => {
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
    },

    setRestaurantData: (state: RestaurantStateType, action) => {
      state.data = Array.isArray(action.payload) ? action.payload : [action.payload];
    },

    clearRestaurant: (state: RestaurantStateType) => {
      state.data = null;
      state.token = null;
      state.refreshToken = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
    // checkUserStore
      .addCase(checkUserStoreAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkUserStoreAction.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(checkUserStoreAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Table fetch
      .addCase(fetchTablesAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTablesAction.fulfilled, (state, action) => {
        state.loading = false;
        state.tables = action.payload;
      })
      .addCase(fetchTablesAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Add Table
      .addCase(addTableAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTableAction.fulfilled, (state, action) => {
        state.loading = false;
        state.tables.push(action.payload);
      })
      .addCase(addTableAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Update Table
      .addCase(updateTableAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTableAction.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.tables.findIndex(table => typeof table === 'object' && table !== null && 'id' in table && (table as any).id === action.payload.id);
        if (index !== -1) {
          state.tables[index] = action.payload;
        }
      })
      .addCase(updateTableAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Delete Table
      .addCase(deleteTableAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTableAction.fulfilled, (state, action) => {
        state.loading = false;
        state.tables = state.tables.filter(table => typeof table === 'object' && table !== null && 'id' in table && (table as any).id !== action.payload);
      })
      .addCase(deleteTableAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setTokens, setRestaurantData, clearRestaurant } = restaurantSlice.actions;
export default restaurantSlice.reducer;
