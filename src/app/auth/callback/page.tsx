"use client";

import { setAuth } from "@/store/authSlice";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";


export default function AuthCallback() {
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const accessToken = params.get("accessToken");
        const refreshToken = params.get("refreshToken");
        const userStr = params.get("user");

        if(accessToken && refreshToken && userStr) {
            const user = JSON.parse(decodeURIComponent(userStr));
            dispatch(setAuth({accessToken, refreshToken, user}));
             // Optionally persist in localStorage
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
            localStorage.setItem("user", JSON.stringify(user));

            router.replace("/")
        } else {
            router.replace("/?error=oauth_failed");
        }
    }, [dispatch, router])

    return <div>Signing you in...</div>
}