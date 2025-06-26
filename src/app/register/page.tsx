"use client";

import RegistrationForm from "@/components/registration-form";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <RegistrationForm
        onDetailsSubmit={() => {
          router.replace("/dashboard");
        }}
      />
    </div>
  );
}
