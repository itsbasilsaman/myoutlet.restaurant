import { useState } from "react";
import { ChevronDown, Utensils, Check, ArrowRight, Shield } from "lucide-react";

interface RegistrationFormProps {
  onDetailsSubmit?: () => void;
}

export default function RegistrationForm({ onDetailsSubmit }: RegistrationFormProps) {
  const [restaurantName, setRestaurantName] = useState("");
  const [branch, setBranch] = useState("");
  const [currency, setCurrency] = useState("");
  const [language, setLanguage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log({ restaurantName, branch, currency, language });
      setIsSubmitting(false);
      setShowSuccess(true);
      
      setTimeout(() => {
        setShowSuccess(false);
        onDetailsSubmit?.();
      }, 2000);
    }, 1500);
  };

  return (
    <>
      {/* Background Pattern */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100 -z-10"></div>
      
      {/* Floating Decorative Elements */}
      <div className="fixed top-10 left-10 w-20 h-20 bg-yellow-400/10 rounded-full blur-xl animate-pulse"></div>
      <div className="fixed bottom-20 right-20 w-32 h-32 bg-red-500/10 rounded-full blur-xl animate-pulse animate-float"></div>
      
      <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-md lg:max-w-lg animate-slide-up">
          {/* Main Card Container */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-500">
            
            {/* Header Section */}
            <div className="relative bg-gradient-to-r from-red-500 to-red-600 p-6 sm:p-8 text-center">
              {/* Logo Container */}
              <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm rounded-xl p-2 animate-scale-in">
                <Utensils className="text-white text-xl sm:text-2xl w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              
              {/* Header Content */}
              <div className="pt-4 animate-fade-in">
                <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Restaurant Setup</h1>
                <p className="text-white/90 text-sm sm:text-base font-light">Complete your restaurant profile to get started</p>
              </div>
              
              {/* Decorative Wave */}
              <div className="absolute bottom-0 left-0 right-0 h-4 bg-white" style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0, 0 80%)" }}></div>
            </div>

            {/* Form Section */}
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
              {/* Restaurant Name Field */}
              <div className="space-y-2 animate-fade-in animation-delay-100">
                <label htmlFor="restaurantName" className="block text-sm font-semibold text-gray-900 mb-2">
                  Restaurant Name <span className="text-red-500">*</span>
                </label>
                <div className="relative group">
                  <input
                    id="restaurantName"
                    name="restaurantName"
                    type="text"
                    placeholder="e.g., The Golden Spoon"
                    required
                    value={restaurantName}
                    onChange={(e) => setRestaurantName(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-300 text-gray-900 placeholder-gray-500 group-hover:border-gray-300 text-sm sm:text-base"
                  />
                  {restaurantName && (
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none opacity-100 transition-opacity duration-300">
                      <Check className="text-yellow-500 text-sm w-4 h-4" />
                    </div>
                  )}
                </div>
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
      </div>
    </>
  );
}
