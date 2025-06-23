"use client";

import RegistrationForm from "@/components/registration-form";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <RegistrationForm onDetailsSubmit={() => {
        window.location.href = "/dashboard";
      }} />
    </div>
  );
}
