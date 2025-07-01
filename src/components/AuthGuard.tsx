"use client";

import { useAppDispatch } from "@/hooks/useDispatch";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { checkUserStoreAction } from "@/store/actions/checkUserStore";
import authService from "@/lib/authService";
import Cookies from "js-cookie";
import { setTokens } from "@/store/slices/restaurantSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  const { data, token } = useSelector((state: RootState) => state.restaurant);

  useEffect(() => {
    const initializedAuth = async () => {
      try {
        const cookieToken = Cookies.get("access_token");
        const cookieRefreshToken = Cookies.get("refresh_token");

      if (!cookieToken && cookieRefreshToken) {
        try {
          const newToken = await authService.getRefreshToken();
          dispatch(
            setTokens({
              token: newToken,
              refreshToken: cookieRefreshToken,
            })
          );
        } catch {
          authService.clearAuthData();
          router.replace("/");
          setIsInitialized(true);
          return;
        }
      }

        const currentToken = token || cookieToken;
        if (
          currentToken &&
          (!data || (Array.isArray(data) && data.length === 0))
        ) {
          try {
            await dispatch(checkUserStoreAction(currentToken));
          } catch {
            // Optionally log error for debugging
          }
        }

        setIsInitialized(true);
      } catch {
        // Optionally log error for debugging
        setIsInitialized(true);
      }
    };
    initializedAuth();
  }, [dispatch, token, data, router]);

  useEffect(() => {
    if (!isInitialized) {
      return;
    }
    const handleRouting = async () => {
      const { hasToken, hasStoreData, shouldRedirectTo } =
        authService.getAuthStatus();

      console.log("Auth status:", {
        hasToken,
        hasStoreData,
        shouldRedirectTo,
        currentPath: pathname,
      });

      const protectedRoutes = [
        "/dashboard",
      ];
      const authRoutes = ["/register"];
      const publicRoutes = ["/"];

      const isProtectedRoute = protectedRoutes.some((route) =>
        pathname.startsWith(route)
      );
      const isAuthRoute = authRoutes.some((route) =>
        pathname.startsWith(route)
      );
      const isPublicRoute = publicRoutes.includes(pathname);

      if (isProtectedRoute && (!hasToken || !hasStoreData)) {
        if (!hasToken) {
          router.replace("/");
        } else if (!hasStoreData) {
          router.replace("/register");
        }
      } else if (isAuthRoute && (!hasToken || hasStoreData)) {
        if (!hasToken) {
          router.replace("/");
        } else if (hasStoreData) {
          router.replace("/dashboard");
        }
      } else if (isPublicRoute && hasToken && hasStoreData) {
        router.replace("/dashboard");
      } else if (isPublicRoute && hasToken && hasStoreData) {
        router.replace("/dashboard");
      } else if (pathname === "google/redirect") {
      } else if (shouldRedirectTo && shouldRedirectTo !== pathname) {
        router.replace(shouldRedirectTo);
      }
      setIsLoading(false);
    };

    const timeoutId = setTimeout(handleRouting, 100);

    return () => clearTimeout(timeoutId);
  }, [token, isInitialized, pathname, router, data]);
  if (isLoading || !isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#fe0000] mx-auto mb-4"></div>
          <p className="text-[#696868]">Loading...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
