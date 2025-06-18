"use client"

import { useState } from "react"
import { AnimatePresence } from "framer-motion"
import RegistrationPage from "@/components/registration-page"
import RegistrationForm from "@/components/registration-form"
import OwnerDashboard from "@/components/owner-dashboard"
import AnimatedDiv from "@/components/ui/animated-div"

export default function Home() {
  const [currentPage, setCurrentPage] = useState<"register" | "details" | "dashboard">("register")

  const handleRegisterSuccess = () => {
    setCurrentPage("details")
  }

  const handleDetailsSubmit = () => {
    setCurrentPage("dashboard")
  }

  return (
    <div className="min-h-screen bg-white text-[#040919] flex items-center justify-center p-4">
      <AnimatePresence mode="wait">
        {currentPage === "register" && (
          <AnimatedDiv key="register">
            <RegistrationPage onRegisterSuccess={handleRegisterSuccess} />
          </AnimatedDiv>
        )}
        {currentPage === "details" && (
          <AnimatedDiv key="details">
            <RegistrationForm onDetailsSubmit={handleDetailsSubmit} />
          </AnimatedDiv>
        )}
        {currentPage === "dashboard" && (
          <AnimatedDiv key="dashboard">
            <OwnerDashboard />
          </AnimatedDiv>
        )}
      </AnimatePresence>
    </div>
  )
}
