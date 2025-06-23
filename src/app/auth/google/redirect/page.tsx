"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import { useAppDispatch } from "@/hooks/useDispatch";
import { checkUserStoreAction } from "@/store/actions/checkUserStore";
import { setRestaurant } from "@/store/slices/restaurantSlice";

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
          Cookies.set("access_token", accessToken);
          Cookies.set("user", JSON.stringify(user));
          if(refreshToken) {
            Cookies.set('refresh_token', refreshToken);
          }

          dispatch(setRestaurant({token: accessToken, ...user}));
          
          const res = await dispatch(checkUserStoreAction(accessToken));

          console.log(res,"response")


          if (Array.isArray(res.payload) && res.payload.length > 0) {
            router.replace("/dashboard");
          } else {
            router.replace("/register");
          }
        } catch (error) {
          console.error("Auth handling error:", error);
        }
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
