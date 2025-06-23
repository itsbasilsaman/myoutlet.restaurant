"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react"; // Import Lucide React icon
import Image from "next/image";
import { useAuthorizedApi } from "@/hooks/useAuthorizedApi";

interface RegistrationFormProps {
  onDetailsSubmit: () => void;
}

interface RestaurantSuggestion {
  id: string;
  name: string;
}

export default function RegistrationForm({
  onDetailsSubmit,
}: RegistrationFormProps) {
  const [restaurantName, setRestaurantName] = useState("");
  const [subBranch, setSubBranch] = useState("");
  const [currency, setCurrency] = useState("");
  const [language, setLanguage] = useState("");
  const [suggestions, setSuggestions] = useState<RestaurantSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const suggestionRef = useRef<HTMLDivElement>(null);
  const api = useAuthorizedApi();
  useEffect(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    if (restaurantName.trim().length > 2) {
      debounceTimeoutRef.current = setTimeout(async () => {
        setIsLoading(true);
        try {
          const response = await api.get(
            `/store/parent?search=${restaurantName}`
          );
          const data = response.data;
          console.log(data, "response suggestions");
          setSuggestions(data);
          setShowSuggestions(true);
        } catch (error) {
          setSuggestions([]);
        } finally {
          setIsLoading(false);
        }
      }, 300); // 300ms debounce delay
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }

    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [restaurantName]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionRef.current &&
        !suggestionRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSuggestionClick = (suggestion: RestaurantSuggestion) => {
    setRestaurantName(suggestion.name);
    setShowSuggestions(false);
  };

  const handleRestaurantNameChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setRestaurantName(value);
    if (value.trim().length <= 2) {
      setShowSuggestions(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const storeData = {
        parent_store_name: restaurantName,
        sub_branch: subBranch,
        currency,
        language,
      };
      
      const response = await api.post("/store", storeData);
      console.log(response.data, "response");

      const res = response.data;
      console.log("Store created successfuly:", res);
      onDetailsSubmit();
    } catch (error) {
      console.error("Error creating store:", error);
    }
  };

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
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-white mb-2 sm:mb-3 mt-2 sm:mt-4 font-['Playfair_Display']">
          Restaurant Details
        </h2>
        <p className="text-white/90 text-xs sm:text-sm">
          Please fill in the required information for your restaurant.
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="p-4 sm:p-6 lg:p-8 grid gap-4 sm:gap-6">
          {/* Restaurant Name with Autocomplete */}
          <div className="grid gap-2 relative" ref={suggestionRef}>
            <label
              htmlFor="restaurantName"
              className="text-sm font-semibold text-[#040919]"
            >
              Restaurant Name
            </label>
            <div className="relative">
              <input
                id="restaurantName"
                name="restaurantName"
                placeholder="e.g., The Golden Spoon"
                value={restaurantName}
                onChange={handleRestaurantNameChange}
                required
                className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fece00] focus:border-[#fe0000] transition-all duration-300 ease-in-out shadow-sm text-[#040919] placeholder-[#696868] hover:border-[#fe0000] text-sm sm:text-base"
              />
              {isLoading && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#fe0000]"></div>
                </div>
              )}
            </div>

            {/* Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 z-10 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto mt-1">
                {suggestions.map((suggestion) => (
                  <div
                    key={suggestion.id}
                    className="px-3 sm:px-4 py-2 hover:bg-[#fdfafa] cursor-pointer transition-colors duration-200 text-sm sm:text-base text-[#040919] border-b border-gray-100 last:border-b-0"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sub Branch Input */}
          <div className="grid gap-2">
            <label
              htmlFor="subBranch"
              className="text-sm font-semibold text-[#040919]"
            >
              Sub Branch (Optional)
            </label>
            <input
              id="subBranch"
              name="subBranch"
              placeholder="e.g., Downtown, Mall Location, etc."
              value={subBranch}
              onChange={(e) => setSubBranch(e.target.value)}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fece00] focus:border-[#fe0000] transition-all duration-300 ease-in-out shadow-sm text-[#040919] placeholder-[#696868] hover:border-[#fe0000] text-sm sm:text-base"
            />
          </div>

          <div className="grid gap-2">
            <label
              htmlFor="currency"
              className="text-sm font-semibold text-[#040919]"
            >
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
                <option
                  value="USD"
                  className="text-[#040919] hover:bg-[#fdfafa]"
                >
                  USD - United States Dollar
                </option>
                <option
                  value="INR"
                  className="text-[#040919] hover:bg-[#fdfafa]"
                >
                  INR - Indian Rupee
                </option>
                <option
                  value="EUR"
                  className="text-[#040919] hover:bg-[#fdfafa]"
                >
                  EUR - Euro
                </option>
                <option
                  value="GBP"
                  className="text-[#040919] hover:bg-[#fdfafa]"
                >
                  GBP - British Pound
                </option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-[#696868]" />
              </div>
              
              {/* Decorative Wave */}
              <div className="absolute bottom-0 left-0 right-0 h-4 bg-white" style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0, 0 80%)" }}></div>
            </div>
          </div>
          <div className="grid gap-2">
            <label
              htmlFor="language"
              className="text-sm font-semibold text-[#040919]"
            >
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
                <option
                  value="en"
                  className="text-[#040919] hover:bg-[#fdfafa]"
                >
                  English
                </option>
                <option
                  value="hi"
                  className="text-[#040919] hover:bg-[#fdfafa]"
                >
                  Hindi
                </option>
                <option
                  value="es"
                  className="text-[#040919] hover:bg-[#fdfafa]"
                >
                  Spanish
                </option>
                <option
                  value="fr"
                  className="text-[#040919] hover:bg-[#fdfafa]"
                >
                  French
                </option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-[#696868]" />
              </div>

              {/* Branch Selection */}
              <div className="space-y-2 animate-fade-in animation-delay-200">
                <label htmlFor="branch" className="block text-sm font-semibold text-gray-900 mb-2">
                  Branch Location <span className="text-gray-500 font-normal">(Optional)</span>
                </label>
                <div className="relative group">
                  <select
                    id="branch"
                    name="branch"
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-300 text-gray-900 appearance-none cursor-pointer group-hover:border-gray-300 text-sm sm:text-base"
                  >
                    <option value="" className="text-gray-500">Select branch location</option>
                    <option value="main">Main Branch</option>
                    <option value="downtown">Downtown</option>
                    <option value="uptown">Uptown</option>
                    <option value="mall">Shopping Mall</option>
                    <option value="online">Online Only</option>
                    <option value="other">Other Location</option>
                  </select>
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                    <ChevronDown className="text-gray-500 text-sm w-4 h-4 group-focus-within:text-yellow-500 transition-colors duration-300" />
                  </div>
                </div>
              </div>

              {/* Currency Selection */}
              <div className="space-y-2 animate-fade-in animation-delay-300">
                <label htmlFor="currency" className="block text-sm font-semibold text-gray-900 mb-2">
                  Default Currency <span className="text-red-500">*</span>
                </label>
                <div className="relative group">
                  <select
                    id="currency"
                    name="currency"
                    required
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-300 text-gray-900 appearance-none cursor-pointer group-hover:border-gray-300 text-sm sm:text-base"
                  >
                    <option value="" className="text-gray-500">Select your currency</option>
                    <option value="USD">🇺🇸 USD - US Dollar</option>
                    <option value="EUR">🇪🇺 EUR - Euro</option>
                    <option value="GBP">🇬🇧 GBP - British Pound</option>
                    <option value="INR">🇮🇳 INR - Indian Rupee</option>
                    <option value="CAD">🇨🇦 CAD - Canadian Dollar</option>
                    <option value="AUD">🇦🇺 AUD - Australian Dollar</option>
                  </select>
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                    <ChevronDown className="text-gray-500 text-sm w-4 h-4 group-focus-within:text-yellow-500 transition-colors duration-300" />
                  </div>
                </div>
              </div>

              {/* Language Selection */}
              <div className="space-y-2 animate-fade-in animation-delay-400">
                <label htmlFor="language" className="block text-sm font-semibold text-gray-900 mb-2">
                  Preferred Language <span className="text-red-500">*</span>
                </label>
                <div className="relative group">
                  <select
                    id="language"
                    name="language"
                    required
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-300 text-gray-900 appearance-none cursor-pointer group-hover:border-gray-300 text-sm sm:text-base"
                  >
                    <option value="" className="text-gray-500">Select interface language</option>
                    <option value="en">🇺🇸 English</option>
                    <option value="es">🇪🇸 Español</option>
                    <option value="fr">🇫🇷 Français</option>
                    <option value="de">🇩🇪 Deutsch</option>
                    <option value="hi">🇮🇳 हिंदी</option>
                    <option value="zh">🇨🇳 中文</option>
                  </select>
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                    <ChevronDown className="text-gray-500 text-sm w-4 h-4 group-focus-within:text-yellow-500 transition-colors duration-300" />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4 animate-fade-in animation-delay-500">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 px-6 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 active:scale-[0.98] flex items-center justify-center space-x-2 group ${
                    showSuccess
                      ? 'bg-green-500 hover:bg-green-600 text-white'
                      : 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white'
                  } ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Processing...</span>
                    </>
                  ) : showSuccess ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Success!</span>
                    </>
                  ) : (
                    <>
                      <span>Continue Setup</span>
                      <ArrowRight className="text-sm w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </>
                  )}
                </button>
              </div>

              {/* Additional Info */}
              <div className="text-center pt-2 animate-fade-in animation-delay-600">
                <p className="text-xs text-gray-600 flex items-center justify-center">
                  <Shield className="text-yellow-500 mr-1 w-3 h-3" />
                  Your information is secure and encrypted
                </p>
              </div>
            </form>
          </div>

          {/* Footer Info */}
          <div className="text-center mt-6 animate-fade-in animation-delay-700">
            <p className="text-sm text-gray-600">
              Need help? <a href="#" className="text-red-500 hover:text-red-600 font-medium transition-colors duration-300">Contact Support</a>
            </p>
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
  );
}
