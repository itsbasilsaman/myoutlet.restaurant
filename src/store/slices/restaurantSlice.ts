import { createSlice } from "@reduxjs/toolkit";
import { checkUserStoreAction } from "../actions/checkUserStore";

export interface RestaurantStateType {
  loading: boolean;
  data: any;
  token: string | null;
  error: string | null;
}

const initialState: RestaurantStateType = {
  loading: false,
  data: null,
  token: null,
  error: null,
};

const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {
    setRestaurant: (state: RestaurantStateType, action) => {
      state.token = action.payload.token;
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
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
      });
  },
});

export const { setRestaurant } = restaurantSlice.actions;
export default restaurantSlice.reducer;
