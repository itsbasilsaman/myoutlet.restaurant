"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import { useAppDispatch } from "@/hooks/useDispatch";
import { checkUserStoreAction } from "@/store/actions/checkUserStore";
import { setTokens } from "@/store/slices/restaurantSlice";
import authService from "@/lib/authService";

export default function GoogleRedirectPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const dispatch = useAppDispatch();

  useEffect(() => {
    const accessToken = searchParams.get("access_token");
    const encodedUser = searchParams.get("user");
    const handleAuthRedirect = async () => {
      if (accessToken && encodedUser) {
        try {
          const user = JSON.parse(encodedUser);
          const refreshToken = user.refresh_token;
          // Save in cookies
          authService.setTokens(accessToken, refreshToken);
          
          const res = await dispatch(checkUserStoreAction(accessToken));

          console.log(res,"response")

          const { shouldRedirectTo } = authService.getAuthStatus();

          if (shouldRedirectTo) {
            router.replace(shouldRedirectTo);
          } else {
            // Fallback logic
            if (Array.isArray(res.payload) && res.payload.length > 0) {
              router.replace("/dashboard");
            } else {
              router.replace("/register");
            }
          }
        } catch (error) {
          console.error("Auth handling error:", error);
          authService.clearAuthData();
          router.replace("/");
        }
      } else {
        console.error("Missing authentication parameters");
        router.replace("/");
      }
    };

    handleAuthRedirect();
  }, [searchParams, router, dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center text-center">
      <p className="text-lg font-semibold">Signing you in, please wait...</p>
    </div>
  );
}
