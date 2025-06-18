"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Chrome } from "lucide-react"
import Image from "next/image"

interface RegistrationPageProps {
  onRegisterSuccess: () => void
}

export default function RegistrationPage({ onRegisterSuccess }: RegistrationPageProps) {
  return (
    <Card className="w-full max-w-sm sm:max-w-md lg:max-w-lg mx-auto shadow-lg hover:shadow-xl transition-shadow duration-200">
      <CardHeader className="text-center p-4 sm:p-6">
        <div className="flex justify-center mb-4">
          <Image 
            src="/myoutlet.logo.png" 
            alt="MyOutlet Logo" 
            width={60} 
            height={60} 
            className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 object-contain"
          />
        </div>
        <CardTitle className="text-xl sm:text-2xl lg:text-3xl font-serif">Welcome to MyOutlet</CardTitle>
        <CardDescription className="text-sm sm:text-base">Register your restaurant to get started</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4 p-4 sm:p-6">
        <Button
          onClick={onRegisterSuccess}
          className="w-full py-4 sm:py-6 text-base sm:text-lg flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-black transition-colors duration-200"
        >
          <Chrome className="h-5 w-5 sm:h-6 sm:w-6" />
          Sign in with Google
        </Button>
        <p className="text-xs sm:text-sm text-muted-foreground text-center">
          By signing in, you agree to our Terms of Service and Privacy Policy.
        </p>
      </CardContent>
    </Card>
  )
}
