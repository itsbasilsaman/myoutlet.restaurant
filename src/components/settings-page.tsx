"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";

// Custom Dropdown Component
interface DropdownProps {
  value: string;
  onValueChange: (value: string) => void;
  placeholder: string;
  options: Array<{
    value: string;
    label: string;
    icon?: string;
    status?: string;
  }>;
  className?: string;
}

const CustomDropdown: React.FC<DropdownProps> = ({
  value,
  onValueChange,
  placeholder,
  options,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find((option) => option.value === value);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "maintenance":
        return "bg-[#fece00]";
      case "inactive":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-10 w-full items-center justify-between rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-[#040919] hover:border-[#fece00] focus:outline-none focus:ring-2 focus:ring-[#fece00] focus:border-[#fece00] transition-all duration-200"
      >
        <span className="block truncate">
          {selectedOption ? (
            <div className="flex items-center gap-2">
              {selectedOption.icon && <span>{selectedOption.icon}</span>}
              <span>{selectedOption.label}</span>
              {selectedOption.status && (
                <div
                  className={`w-2 h-2 rounded-full ${getStatusColor(
                    selectedOption.status
                  )}`}
                ></div>
              )}
            </div>
          ) : (
            placeholder
          )}
        </span>
        <svg
          className={`h-4 w-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg">
          <div className="max-h-60 overflow-auto">
            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => {
                  onValueChange(option.value);
                  setIsOpen(false);
                }}
                className="flex items-center gap-2 px-3 py-2 text-sm text-[#040919] hover:bg-[#fece00]/10 cursor-pointer transition-colors duration-150"
              >
                {option.icon && <span className="text-lg">{option.icon}</span>}
                <span className="flex-1">{option.label}</span>
                {option.status && (
                  <div
                    className={`w-2 h-2 rounded-full ${getStatusColor(
                      option.status
                    )}`}
                  ></div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default function SettingsPage() {
  const [theme, setTheme] = useState("light");
  const [logoUrl, setLogoUrl] = useState("");
  const [brandColor, setBrandColor] = useState("#fece00");
  const [currentBranch, setCurrentBranch] = useState("main");
  const [preferredLanguage, setPreferredLanguage] = useState("en");
  const [defaultCurrency, setDefaultCurrency] = useState("INR");
  const [notifications, setNotifications] = useState(true);
  const [autoSave, setAutoSave] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveSettings = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Saving settings:", {
      logoUrl,
      brandColor,
      currentBranch,
      preferredLanguage,
      defaultCurrency,
      theme,
      notifications,
      autoSave,
    });
    setIsSaving(false);
    // Show success feedback
    const button = document.querySelector(".save-button");
    if (button) {
      button.classList.add("saved");
      setTimeout(() => button.classList.remove("saved"), 2000);
    }
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogoUrl(e.target.value);
  };

  const handleBrandColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBrandColor(e.target.value);
  };

  const handleThemeChange = (value: string) => {
    setTheme(value);
    console.log("Theme changed to:", value);
  };

  const branches = [
    { value: "main", label: "Main Branch", status: "active" },
    { value: "downtown", label: "Downtown", status: "active" },
    { value: "uptown", label: "Uptown", status: "maintenance" },
    { value: "online", label: "Online Only", status: "active" },
    { value: "other", label: "Other", status: "inactive" },
  ];

  const languages = [
    { value: "en", label: "English", icon: "🇺🇸" },
    { value: "hi", label: "Hindi", icon: "🇮🇳" },
    { value: "es", label: "Spanish", icon: "🇪🇸" },
    { value: "fr", label: "French", icon: "🇫🇷" },
  ];

  const currencies = [
    { value: "USD", label: "USD - United States Dollar", icon: "$" },
    { value: "INR", label: "INR - Indian Rupee", icon: "₹" },
    { value: "EUR", label: "EUR - Euro", icon: "€" },
    { value: "GBP", label: "GBP - British Pound", icon: "£" },
  ];

  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-semibold text-[#fe0000] font-['Playfair_Display']">
          Restaurant Settings
        </h1>
        <p className="text-[#696868] text-sm sm:text-base lg:text-lg">
          Customize your restaurant&apos;s digital experience
        </p>
      </div>

      {/* Branding & Appearance */}
      <Card className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200">
        <CardHeader className="bg-[#fece00]/10 rounded-t-lg p-4 sm:p-6">
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl lg:text-2xl font-['Playfair_Display'] text-[#040919]">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#fece00] rounded-lg flex items-center justify-center">
              <span className="text-white text-xs sm:text-sm">🎨</span>
            </div>
            Branding & Appearance
          </CardTitle>
          <CardDescription className="text-[#696868] text-sm sm:text-base">
            Customize your restaurant&apos;s digital presence and visual identity.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="logoUrl"
                className="text-sm font-medium text-[#040919]"
              >
                Restaurant Logo URL
              </Label>
              <div className="relative">
                <Input
                  id="logoUrl"
                  placeholder="https://your-logo.com/logo.png"
                  value={logoUrl}
                  onChange={handleLogoChange}
                  className="transition-all duration-200 focus:ring-2 focus:ring-[#fece00] focus:border-[#fece00] bg-white border-gray-200 text-[#040919] placeholder-[#696868] focus-visible:ring-[#fece00] focus-visible:ring-offset-0 focus-visible:outline-none"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <span className="text-[#696868]">📷</span>
                </div>
              </div>
              {logoUrl && (
                <div className="mt-3">
                  <div className="h-20 w-20 bg-[#fece00]/20 rounded-xl border-2 border-dashed border-[#fece00] flex items-center justify-center shadow-sm">
                    <span className="text-[#fe0000] text-xs font-medium">
                      Logo Preview
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="brandColor"
                className="text-sm font-medium text-[#040919]"
              >
                Primary Brand Color
              </Label>
              <div className="flex gap-3 items-center">
                <div className="relative">
                  <Input
                    id="brandColor"
                    type="color"
                    value={brandColor}
                    onChange={handleBrandColorChange}
                    className="h-12 w-16 p-1 rounded-lg cursor-pointer border-2 border-gray-200 hover:border-[#fece00] transition-colors"
                  />
                  <div className="absolute inset-0 rounded-lg shadow-inner pointer-events-none"></div>
                </div>
                <Input
                  type="text"
                  value={brandColor}
                  onChange={handleBrandColorChange}
                  className="flex-1 transition-all duration-200 focus:ring-2 focus:ring-[#fece00] focus:border-[#fece00] bg-white border-gray-200 text-[#040919] placeholder-[#696868] focus-visible:ring-[#fece00] focus-visible:ring-offset-0 focus-visible:outline-none"
                  placeholder="#fece00"
                />
                <div
                  className="w-8 h-8 rounded-lg border-2 border-gray-200"
                  style={{ backgroundColor: brandColor }}
                ></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Branch & Localization */}
      <Card className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200">
        <CardHeader className="bg-[#fe0000]/10 rounded-t-lg">
          <CardTitle className="flex items-center gap-2 text-xl font-['Playfair_Display'] text-[#040919]">
            <div className="w-8 h-8 bg-[#fe0000] rounded-lg flex items-center justify-center">
              <span className="text-white text-sm">🌍</span>
            </div>
            Branch & Localization
          </CardTitle>
          <CardDescription className="text-[#696868]">
            Manage your restaurant&apos;s branch, language, and currency settings.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-[#040919]">
                Current Branch
              </Label>
              <CustomDropdown
                value={currentBranch}
                onValueChange={setCurrentBranch}
                placeholder="Select branch"
                options={branches}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-[#040919]">
                Preferred Language
              </Label>
              <CustomDropdown
                value={preferredLanguage}
                onValueChange={setPreferredLanguage}
                placeholder="Select language"
                options={languages}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-[#040919]">
                Default Currency
              </Label>
              <CustomDropdown
                value={defaultCurrency}
                onValueChange={setDefaultCurrency}
                placeholder="Select currency"
                options={currencies}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Application Theme */}
      <Card className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200">
        <CardHeader className="bg-[#fece00]/10 rounded-t-lg">
          <CardTitle className="flex items-center gap-2 text-xl font-['Playfair_Display'] text-[#040919]">
            <div className="w-8 h-8 bg-[#fece00] rounded-lg flex items-center justify-center">
              <span className="text-white text-sm">🎨</span>
            </div>
            Application Theme
          </CardTitle>
          <CardDescription className="text-[#696868]">
            Choose the visual theme for your dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <RadioGroup
            value={theme}
            onValueChange={handleThemeChange}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            <div className="relative">
              <RadioGroupItem value="light" id="theme-light" />
              <label
                htmlFor="theme-light"
                className={`block p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                  theme === "light"
                    ? "border-[#fe0000] bg-[#fe0000]/5"
                    : "border-gray-200 hover:border-[#fece00]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full border-2 border-gray-300 flex items-center justify-center">
                    {theme === "light" && (
                      <div className="w-2 h-2 bg-[#fe0000] rounded-full"></div>
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-[#040919]">Light</div>
                    <div className="text-sm text-[#696868]">
                      Clean and bright
                    </div>
                  </div>
                </div>
              </label>
            </div>

            <div className="relative">
              <RadioGroupItem value="dark" id="theme-dark" />
              <label
                htmlFor="theme-dark"
                className={`block p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                  theme === "dark"
                    ? "border-[#fe0000] bg-[#fe0000]/5"
                    : "border-gray-200 hover:border-[#fece00]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full border-2 border-gray-300 flex items-center justify-center">
                    {theme === "dark" && (
                      <div className="w-2 h-2 bg-[#fe0000] rounded-full"></div>
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-[#040919]">Dark</div>
                    <div className="text-sm text-[#696868]">
                      Easy on the eyes
                    </div>
                  </div>
                </div>
              </label>
            </div>

            <div className="relative">
              <RadioGroupItem value="system" id="theme-system" />
              <label
                htmlFor="theme-system"
                className={`block p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                  theme === "system"
                    ? "border-[#fe0000] bg-[#fe0000]/5"
                    : "border-gray-200 hover:border-[#fece00]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full border-2 border-gray-300 flex items-center justify-center">
                    {theme === "system" && (
                      <div className="w-2 h-2 bg-[#fe0000] rounded-full"></div>
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-[#040919]">System</div>
                    <div className="text-sm text-[#696868]">
                      Follows OS setting
                    </div>
                  </div>
                </div>
              </label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Additional Settings */}
      <Card className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200">
        <CardHeader className="bg-[#fe0000]/10 rounded-t-lg">
          <CardTitle className="flex items-center gap-2 text-xl font-['Playfair_Display'] text-[#040919]">
            <div className="w-8 h-8 bg-[#fe0000] rounded-lg flex items-center justify-center">
              <span className="text-white text-sm">⚙️</span>
            </div>
            Additional Settings
          </CardTitle>
          <CardDescription className="text-[#696868]">
            Configure additional preferences for your dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:bg-[#fdfafa] transition-colors">
            <div className="space-y-1">
              <div className="font-medium text-[#040919]">
                Push Notifications
              </div>
              <div className="text-sm text-[#696868]">
                Receive updates about orders and system changes
              </div>
            </div>
            <Switch
              checked={notifications}
              onCheckedChange={setNotifications}
              className="data-[state=checked]:bg-[#fe0000]"
            />
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:bg-[#fdfafa] transition-colors">
            <div className="space-y-1">
              <div className="font-medium text-[#040919]">Auto Save</div>
              <div className="text-sm text-[#696868]">
                Automatically save changes as you make them
              </div>
            </div>
            <Switch
              checked={autoSave}
              onCheckedChange={setAutoSave}
              className="data-[state=checked]:bg-[#fe0000]"
            />
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <Card className="bg-white rounded-lg shadow-sm border border-gray-200">
        <CardFooter className="flex justify-end p-6">
          <Button
            onClick={handleSaveSettings}
            disabled={isSaving}
            className="save-button relative overflow-hidden bg-[#fe0000] hover:bg-red-700 text-white font-medium px-8 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Saving...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span>💾</span>
                Save Settings
              </div>
            )}
          </Button>
        </CardFooter>
      </Card>

      <style jsx>{`
        .save-button.saved {
          background: #10b981 !important;
        }

        .save-button.saved::after {
          content: "✓ Saved!";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: inherit;
          border-radius: inherit;
        }
      `}</style>
    </div>
  );
}
