"use client"

import OwnerDashboard from "@/components/owner-dashboard";
import RegistrationForm from "@/components/registration-form";
import { useState } from "react";

export default function Registration() {

    const [currentPage, setCurrentPage] = useState<"register" | "details" | "dashboard">("register")

    const handleDetailsSubmit = () => {
        setCurrentPage("dashboard")
      }

    return (
        <>
          <OwnerDashboard/>
        </>
    )
}