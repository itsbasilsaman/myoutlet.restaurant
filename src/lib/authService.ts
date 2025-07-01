import { store } from "@/store";
import { clearRestaurant, setTokens } from "@/store/slices/restaurantSlice";
import Cookies from "js-cookie";
import api from "./axios";
import axios from "axios";

interface TokenResponse {
    access_token: string;
    refresh_token: string;
}

interface FailedRequest {
  resolve: (token: string) => void;
  reject: (err: unknown) => void;
}


class AuthService {
    private isRefreshing = false;
    private failedRequestsQueue: FailedRequest[] = [];

    constructor() {
        this.setupInterceptors();
    }

    private setupInterceptors() {
        // Request interceptor to add token
        api.interceptors.request.use(
            (config) => {
                const token = this.getToken();
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
                },
            (error) => {
                return Promise.reject(error);
            }
        );
        // Response interceptor to handle token refresh
        api.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config;
                if(error.response?.status === 401 && !originalRequest._retry && this.getRefreshToken()) {
                    if(this.isRefreshing) {
                        return new Promise((resolve, reject) => {
                            this.failedRequestsQueue.push({resolve, reject});
                        })
                        .then((token) => {
                            originalRequest.headers.Authorization = `Bearer ${token}`;
                            return api(originalRequest);
                        })
                        .catch((error) => {
                            Promise.reject(error);
                            });
                    }
                    originalRequest._retry = true;
                    this.isRefreshing = true;
                    try {
                        const newToken = await this.refreshToken();
                        this.processQueue(null, newToken);
                        originalRequest.headers.Authorization = `Bearer ${newToken}`;
                        return api(originalRequest);
                        } catch (refreshError) {
                        this.processQueue(refreshError, null);
                        this.clearAuthData();
                        
                        if(typeof window !== "undefined") {
                            window.location.href = "/";
                            }
                            return Promise.reject(refreshError);
                        } finally {
                        this.isRefreshing = false;
                        }
                        
                }
                return Promise.reject(error);
            }
        )
        
}

private processQueue(error: unknown, token: string | null) {
  this.failedRequestsQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token!);
    }
  });
  this.failedRequestsQueue = [];
}


  private async refreshToken(): Promise<string> {
   const refreshToken = this.getRefreshToken();
   if(!refreshToken) {
      throw new Error("Refresh token not found");
    }
   
    try {
        const response = await axios.post<TokenResponse>(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
            { refresh_token: refreshToken },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            },
        );
        const { access_token, refresh_token } = response.data;
        this.setTokens(access_token, refresh_token || refreshToken);
        return access_token;
        } catch (error) {
        console.error("Error refreshing token:", error);
        throw error;
        }
        
    }


  public getToken(): string | null {
   return store.getState().restaurant.token || Cookies.get("access_token") || null;   
  }

  public getRefreshToken(): string | null {
    return store.getState().restaurant.refreshToken || Cookies.get("refresh_token") || null;
  }

  public setTokens(token: string, refreshToken: string) {
    store.dispatch(setTokens({ token, refreshToken }));
    Cookies.set("access_token", token);
    Cookies.set("refresh_token", refreshToken);
  }

  public clearAuthData() {
    store.dispatch(setTokens(clearRestaurant()));
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    Cookies.remove("user");
  }

  public isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token;
  }

  public hasStoreData(): boolean {
    const storeData = store.getState().restaurant.data;
    return !!(storeData && Array.isArray(storeData) && storeData.length > 0);
  }

  public getAuthStatus(): {
    hasToken: boolean;
    hasStoreData: boolean;
    shouldRedirectTo: string | null;
  } {
    const hasToken = this.isAuthenticated();
    const hasStoreData = this.hasStoreData();
    let shouldRedirectTo: string | null = null;
    if (!hasToken && !hasStoreData) {
      shouldRedirectTo = "/";
    } else if (hasToken && !hasStoreData) {
      shouldRedirectTo = "/register";
    } else if (hasToken && hasStoreData) {
      shouldRedirectTo = "/dashboard";
    } else if (!hasToken && hasStoreData) {
      this.clearAuthData();
      shouldRedirectTo = "/";
    }
    return {
      hasToken,
      hasStoreData,
      shouldRedirectTo,
    };
  }
}

const authService = new AuthService();
export default authService;
    