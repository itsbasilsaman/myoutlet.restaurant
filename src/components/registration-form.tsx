"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { useAuthorizedApi } from "@/hooks/useAuthorizedApi";
import { useAppDispatch } from "@/hooks/useDispatch";
import { setRestaurantData } from "@/store/slices/restaurantSlice";

// Add RestaurantSuggestion interface for type safety
interface RestaurantSuggestion {
  id: string;
  name: string;
}

interface RegistrationFormProps {
  onDetailsSubmit?: () => void;
}

export default function RegistrationForm({ onDetailsSubmit }: RegistrationFormProps) {
  const [restaurantName, setRestaurantName] = useState("");
  const [subBranch, setSubBranch] = useState("");
  const [currency, setCurrency] = useState("");
  const [language, setLanguage] = useState("");
  const [suggestions, setSuggestions] = useState<RestaurantSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<string | null>(null);


  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const suggestionRef = useRef<HTMLDivElement>(null);
  const api = useAuthorizedApi();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    if (restaurantName.trim().length > 2) {
      debounceTimeoutRef.current = setTimeout(async () => {
        setIsLoading(true);
        try {
          const response = await api.get(
            `/store/main-branches?search=${restaurantName}`
          );
          const data = response.data;
          console.log(data, "response suggestions");
          setSuggestions(data);
          setShowSuggestions(true);
        } catch {
          setSuggestions([]);
        } finally {
          setIsLoading(false);
        }
      }, 300);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }

    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [restaurantName, api]);

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
    setSelectedRestaurantId(suggestion.id);
    setShowSuggestions(false);
  };

  const handleRestaurantNameChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setRestaurantName(value);
    setSelectedRestaurantId(null);
    if (value.trim().length <= 2) {
      setShowSuggestions(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const storeData = {
        parent_store_id: selectedRestaurantId,
        parent_store_name: restaurantName,
        name: subBranch,
        currency,
        language,
      };
      const response = await api.post("/store", storeData);
      dispatch(setRestaurantData(response.data));
      if (onDetailsSubmit) onDetailsSubmit();
    } catch {
      // Optionally log error for debugging
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

          {/* Currency Selection */}
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

          {/* Language Selection */}
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

        {/* Submit Button */}
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