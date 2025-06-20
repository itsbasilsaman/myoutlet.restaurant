"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Chrome } from "lucide-react"
import Image from "next/image"

const GOOGLE_AUTH_URL = "https://api.myoutlet.app/auth/google";

interface RegistrationPageProps {
  onRegisterSuccess: () => void
}

export default function RegistrationPage({ onRegisterSuccess }: RegistrationPageProps) {
  const handleGoogleLogin = () => {
    window.location.href = GOOGLE_AUTH_URL;
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-[#fffbe6] to-[#fdfafa] p-2 sm:p-4 animate-slideup overflow-x-hidden">
      <Card className="w-full max-w-full sm:max-w-md lg:max-w-lg mx-auto rounded-xl border border-gray-200 shadow-2xl overflow-hidden bg-white">
        {/* Header with logo and brand color */}
        <div className="p-4 sm:p-6 lg:p-8 text-center bg-[#fe0000] rounded-t-xl relative break-words">
          <div className="flex justify-center mb-2">
            <Image 
              src="/myoutlet.logo.png" 
              alt="MyOutlet Logo" 
              width={56} 
              height={56} 
              className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 object-contain drop-shadow-lg bg-white rounded-full p-1 border-2 border-[#fece00]"
              priority
            />
          </div>
          <CardTitle className="text-xl sm:text-2xl lg:text-3xl font-playfair font-semibold text-white mb-1 break-words">Welcome to MyOutlet</CardTitle>
          <CardDescription className="text-xs sm:text-sm text-white/90 break-words">Register your restaurant to get started</CardDescription>
        </div>
        {/* Content */}
        <CardContent className="flex flex-col items-center gap-5 p-4 sm:p-6 lg:p-8 bg-white w-full break-words">
          <Button
            onClick={handleGoogleLogin}
            aria-label="Sign in with Google"
            className="w-full py-4 sm:py-5 text-base sm:text-lg flex items-center justify-center gap-2 bg-[#fece00] hover:bg-[#ffd900] text-[#040919] transition-colors duration-200 font-semibold rounded-lg shadow-md hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fece00] focus-visible:ring-offset-2"
          >
            <Chrome className="h-5 w-5 sm:h-6 sm:w-6" />
            <span className="font-medium">Sign in with Google</span>
          </Button>
          <p className="text-xs sm:text-sm text-gray-500 text-center max-w-xs break-words">
            By signing in, you agree to our <a href="#" className="underline hover:text-[#fe0000]">Terms of Service</a> and <a href="#" className="underline hover:text-[#fe0000]">Privacy Policy</a>.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
