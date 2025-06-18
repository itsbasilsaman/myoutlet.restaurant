"use client"

import type React from "react"
import { useState } from "react"
import { ChevronDown } from "lucide-react" // Import Lucide React icon
import Image from "next/image"

interface RegistrationFormProps {
  onDetailsSubmit: () => void
}

export default function RegistrationForm({ onDetailsSubmit }: RegistrationFormProps) {
  const [restaurantName, setRestaurantName] = useState("")
  const [branch, setBranch] = useState("")
  const [currency, setCurrency] = useState("")
  const [language, setLanguage] = useState("")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // In a real app, you'd send this data to your backend
    console.log({ restaurantName, branch, currency, language })
    onDetailsSubmit()
  }

  return (
    <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg mx-auto shadow-2xl rounded-xl border border-gray-200 bg-white overflow-hidden animate-slide-in-up">
      <div className="p-4 sm:p-6 lg:p-8 text-center bg-[#fe0000] rounded-t-xl relative">
        {/* Logo */}
        <div className="absolute top-2 sm:top-4 left-2 sm:left-4">
          <Image 
            src="/myoutlet.logo.png" 
            alt="MyOutlet Logo" 
            width={40} 
            height={40} 
            className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 object-contain"
          />
        </div>
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-white mb-2 sm:mb-3 mt-2 sm:mt-4 font-['Playfair_Display']">Restaurant Details</h2>
        <p className="text-white/90 text-xs sm:text-sm">Please fill in the required information for your restaurant.</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="p-4 sm:p-6 lg:p-8 grid gap-4 sm:gap-6">
          <div className="grid gap-2">
            <label htmlFor="restaurantName" className="text-sm font-semibold text-[#040919]">
              Restaurant Name
            </label>
            <input
              id="restaurantName"
              name="restaurantName"
              placeholder="e.g., The Golden Spoon"
              value={restaurantName}
              onChange={(e) => setRestaurantName(e.target.value)}
              required
              className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fece00] focus:border-[#fe0000] transition-all duration-300 ease-in-out shadow-sm text-[#040919] placeholder-[#696868] hover:border-[#fe0000] text-sm sm:text-base"
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="branch" className="text-sm font-semibold text-[#040919]">
              Branch (Optional)
            </label>
            <div className="relative">
              <select
                id="branch"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fece00] focus:border-[#fe0000] transition-all duration-300 ease-in-out shadow-sm appearance-none cursor-pointer text-[#040919] hover:border-[#fe0000] text-sm sm:text-base"
              >
                <option value="" className="text-[#696868]">
                  Select branch
                </option>
                <option value="main" className="text-[#040919] hover:bg-[#fdfafa]">
                  Main Branch
                </option>
                <option value="downtown" className="text-[#040919] hover:bg-[#fdfafa]">
                  Downtown
                </option>
                <option value="uptown" className="text-[#040919] hover:bg-[#fdfafa]">
                  Uptown
                </option>
                <option value="online" className="text-[#040919] hover:bg-[#fdfafa]">
                  Online Only
                </option>
                <option value="other" className="text-[#040919] hover:bg-[#fdfafa]">
                  Other
                </option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-[#696868]" />
              </div>
            </div>
          </div>
          <div className="grid gap-2">
            <label htmlFor="currency" className="text-sm font-semibold text-[#040919]">
              Default Currency
            </label>
            <div className="relative">
              <select
                id="currency"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                required
                className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fece00] focus:border-[#fe0000] transition-all duration-300 ease-in-out shadow-sm appearance-none cursor-pointer text-[#040919] hover:border-[#fe0000] text-sm sm:text-base"
              >
                <option value="" className="text-[#696868]">
                  Select currency
                </option>
                <option value="USD" className="text-[#040919] hover:bg-[#fdfafa]">
                  USD - United States Dollar
                </option>
                <option value="INR" className="text-[#040919] hover:bg-[#fdfafa]">
                  INR - Indian Rupee
                </option>
                <option value="EUR" className="text-[#040919] hover:bg-[#fdfafa]">
                  EUR - Euro
                </option>
                <option value="GBP" className="text-[#040919] hover:bg-[#fdfafa]">
                  GBP - British Pound
                </option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-[#696868]" />
              </div>
            </div>
          </div>
          <div className="grid gap-2">
            <label htmlFor="language" className="text-sm font-semibold text-[#040919]">
              Preferred Language
            </label>
            <div className="relative">
              <select
                id="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                required
                className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fece00] focus:border-[#fe0000] transition-all duration-300 ease-in-out shadow-sm appearance-none cursor-pointer text-[#040919] hover:border-[#fe0000] text-sm sm:text-base"
              >
                <option value="" className="text-[#696868]">
                  Select language
                </option>
                <option value="en" className="text-[#040919] hover:bg-[#fdfafa]">
                  English
                </option>
                <option value="hi" className="text-[#040919] hover:bg-[#fdfafa]">
                  Hindi
                </option>
                <option value="es" className="text-[#040919] hover:bg-[#fdfafa]">
                  Spanish
                </option>
                <option value="fr" className="text-[#040919] hover:bg-[#fdfafa]">
                  French
                </option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-[#696868]" />
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 sm:p-6 lg:p-8 border-t border-gray-200 bg-[#fdfafa] rounded-b-xl">
          <button
            type="submit"
            className="w-full bg-[#fe0000] hover:bg-red-700 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#fece00] focus:ring-offset-2 shadow-lg text-sm sm:text-base"
          >
            Save Details & Continue
          </button>
        </div>
      </form>
    </div>
  )
}
