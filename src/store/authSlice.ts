
 
import { createSlice , PayloadAction } from "@reduxjs/toolkit";


interface User {
    id: string;
    email: string;
    name: string;
    role: string;
}

interface AuthState {
    accessToken: string | null;
    refreshToken: string | null;
    user: User | null;
}

const initialState : AuthState = {
    accessToken: null,
    refreshToken: null,
    user: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<AuthState>) => {
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.user = action.payload.user;
        },
        clearAuth: (state) => {
            state.accessToken = null;
            state.refreshToken = null;
            state.user = null;
        }
    }
});

export const {setAuth , clearAuth} = authSlice.actions;
export default authSlice.reducer;