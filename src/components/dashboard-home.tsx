import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart2,
  ShoppingCart,
  DollarSign,
  UtensilsCrossed,
  Star,
  RefreshCw,
  Utensils,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import QRCodeModal from "./QRCodeModal";
import { QrCode } from "lucide-react";
import { useState } from "react";

export default function DashboardHome() {
  const data = useSelector((state: RootState) => state.restaurant.data);

  const [showQRModal, setShowQRModal] = useState(false);

  
  console.log(data, "dataaa in the dashboard");
  const restaurantData = Array.isArray(data) && data.length > 0 ? data[0] : null;

  // Extract restaurant information
  const restaurantName = restaurantData?.name || "Restaurant Name";
  const customDomain = restaurantData?.qrcode || "";
  const currency = restaurantData?.currency || "";
  const language =
    restaurantData?.language === "en"
      ? "English"
      : restaurantData?.language || "English";
  const isActive = restaurantData?.is_active || false;

  // Mock analytics data (you'll need to replace this with actual analytics from your API)
  const analyticsData = {
    ordersToday: 125,
    totalRevenue: 15230,
    bestSellingItem: "Chicken Biryani",
    customerRating: 4.7,
    totalCustomers: 580,
    newCustomersToday: 15,
    averageOrderValue: 121.84,
  };

  const handleRefreshData = () => {
    console.log("Refreshing dashboard data...");
    // Add actual refresh logic here
  };

  const handleViewAnalytics = () => {
    console.log("Opening full analytics...");
    // Add navigation to analytics page
  };

  const handleManageMenu = () => {
    console.log("Opening menu management...");
    // Add navigation to menu management
  };

  const handleRestaurantSettings = () => {
    console.log("Opening restaurant settings...");
    // Add navigation to settings
  };

  const handleManageSubscriptions = () => {
    console.log("Opening subscription management...");
    // Add navigation to subscriptions
  };

  const getCurrencySymbol = (currency: string) => {
    switch (currency) {
      case "INR":
        return "₹";
      case "USD":
        return "$";
      case "EUR":
        return "€";
      case "GBP":
        return "£";
      default:
        return currency;
    }
  };

  const handleDomainClick = () => {
    const domain = customDomain || (restaurantData ? `${restaurantData.subdomain}.myoutlet.app` : "");
    const url = domain.startsWith("http") ? domain : `https://${domain}`;
    window.open(url, "_blank");
  };

  // Show loading state if data is not available
  if (!restaurantData) {
    return (
      <div className="space-y-4 sm:space-y-6 lg:space-y-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#fe0000] mx-auto mb-4"></div>
            <p className="text-[#696868]">Loading restaurant data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4">
        <div className="flex flex-col">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-semibold font-['Playfair_Display']">
            Welcome, {restaurantName}!
          </h1>
          <div className="flex items-center gap-2 mt-2">
            <div
              className={`w-2 h-2 rounded-full ${
                isActive ? "bg-green-500" : "bg-red-500"
              }`}
            ></div>
            <span className="text-sm text-[#696868]">
              {isActive ? "Active" : "Inactive"}
            </span>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleRefreshData}
          className="w-full sm:w-auto border-[#fe0000] text-[#fe0000] hover:bg-[#fe0000] hover:text-white transition-colors"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh Data
        </Button>
      </div>

      {/* Share your store Section */}
      <Card className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold text-[#040919]">
            Share your store
          </CardTitle>
          <CardDescription className="text-sm text-[#696868]">
            Share it across social media for wider reach
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <span
              className="text-sm sm:text-base text-blue-600 hover:text-blue-800 cursor-pointer hover:underline transition-colors select-all font-medium"
              onClick={handleDomainClick}
              title="Click to visit your restaurant page"
            >
              {customDomain || `${restaurantData.subdomain}.myoutlet.app`}
            </span>
            <div className="flex items-center gap-3">
              <div className="relative group">
                <button
                  onClick={() => setShowQRModal(true)}
                  className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200"
                >
                  <QrCode className="h-5 w-5 text-gray-600" />
                </button>
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                  Get QR code
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                </div>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                className="bg-gray-500 text-white border-gray-800 transition-colors duration-200"
                onClick={() => {
                  const domain =
                    customDomain || `${restaurantData.subdomain}.myoutlet.app`;
                  navigator.clipboard.writeText(domain);
                }}
              >
                Get QR code
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        <Card className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-[#040919]">
              Orders Today
            </CardTitle>
            <ShoppingCart className="h-4 w-4 text-[#696868]" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#040919]">
              {analyticsData.ordersToday}
            </div>
            <p className="text-xs text-[#696868]">
              +{analyticsData.newCustomersToday} new customers
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-[#040919]">
              Total Revenue (Today)
            </CardTitle>
            <DollarSign className="h-4 w-4 text-[#696868]" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#040919]">
              {getCurrencySymbol(currency)}
              {analyticsData.totalRevenue.toLocaleString()}
            </div>
            <p className="text-xs text-[#696868]">
              Avg. Order: {getCurrencySymbol(currency)}
              {analyticsData.averageOrderValue.toFixed(2)}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-[#040919]">
              Best-Selling Item
            </CardTitle>
            <UtensilsCrossed className="h-4 w-4 text-[#696868]" />
          </CardHeader>
          <CardContent>
            <div className="text-lg sm:text-xl lg:text-2xl font-bold leading-tight text-[#040919]">
              {analyticsData.bestSellingItem}
            </div>
            <p className="text-xs text-[#696868]">Based on last 7 days</p>
          </CardContent>
        </Card>

        <Card className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-[#040919]">
              Customer Rating
            </CardTitle>
            <Star className="h-4 w-4 text-[#fece00]" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#040919]">
              {analyticsData.customerRating}/5
            </div>
            <Progress
              value={(analyticsData.customerRating / 5) * 100}
              className="mt-2"
            />
            <p className="text-xs text-[#696868] mt-2">
              {analyticsData.totalCustomers} total reviews
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <Card className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl font-['Playfair_Display'] text-[#040919]">
              Restaurant Information
            </CardTitle>
            <CardDescription className="text-sm text-[#696868]">
              Your basic restaurant details.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
              <span className="font-medium text-sm sm:text-base text-[#040919]">
                Restaurant Name:
              </span>
              <span className="text-sm sm:text-base text-[#696868]">
                {restaurantName}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
              <span className="font-medium text-sm sm:text-base text-[#040919]">
                Restaurant ID:
              </span>
              <span className="text-sm sm:text-base text-[#696868] font-mono">
                {restaurantData.id}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
              <span className="font-medium text-sm sm:text-base text-[#040919]">
                Subdomain:
              </span>
              <span className="text-sm sm:text-base text-[#696868]">
                {restaurantData.subdomain}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
              <span className="font-medium text-sm sm:text-base text-[#040919]">
                Default Currency:
              </span>
              <span className="text-sm sm:text-base text-[#696868]">
                {currency}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
              <span className="font-medium text-sm sm:text-base text-[#040919]">
                Preferred Language:
              </span>
              <span className="text-sm sm:text-base text-[#696868]">
                {language}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
              <span className="font-medium text-sm sm:text-base text-[#040919]">
                Google Sheet ID:
              </span>
              <span className="text-sm sm:text-base text-[#696868] font-mono break-all">
                {restaurantData.google_sheet_id || "Not configured"}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
              <span className="font-medium text-sm sm:text-base text-[#040919]">
                Created:
              </span>
              <span className="text-sm sm:text-base text-[#696868]">
                {new Date(restaurantData.created_at).toLocaleDateString()}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl font-['Playfair_Display'] text-[#040919]">
              Quick Actions
            </CardTitle>
            <CardDescription className="text-sm text-[#696868]">
              Manage your restaurant operations.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <Button
              variant="outline"
              className="flex flex-col h-auto py-4 sm:py-6 hover:bg-[#fdfafa] transition-colors border-gray-200 text-[#040919]"
              onClick={handleViewAnalytics}
            >
              <BarChart2 className="h-5 w-5 sm:h-6 sm:w-6 mb-2" />
              <span className="text-sm sm:text-base">View Full Analytics</span>
            </Button>
            <Button
              variant="outline"
              className="flex flex-col h-auto py-4 sm:py-6 hover:bg-[#fdfafa] transition-colors border-gray-200 text-[#040919]"
              onClick={handleManageMenu}
            >
              <Utensils className="h-5 w-5 sm:h-6 sm:w-6 mb-2" />
              <span className="text-sm sm:text-base">Manage Menu</span>
            </Button>
            <Button
              variant="outline"
              className="flex flex-col h-auto py-4 sm:py-6 hover:bg-[#fdfafa] transition-colors border-gray-200 text-[#040919]"
              onClick={handleRestaurantSettings}
            >
              <Settings className="h-5 w-5 sm:h-6 sm:w-6 mb-2" />
              <span className="text-sm sm:text-base">Restaurant Settings</span>
            </Button>
            <Button
              variant="outline"
              className="flex flex-col h-auto py-4 sm:py-6 hover:bg-[#fdfafa] transition-colors border-gray-200 text-[#040919]"
              onClick={handleManageSubscriptions}
            >
              <DollarSign className="h-5 w-5 sm:h-6 sm:w-6 mb-2" />
              <span className="text-sm sm:text-base">Manage Subscriptions</span>
            </Button>
          </CardContent>
        </Card>
      </div>
      {showQRModal && (
        <QRCodeModal
          domain={customDomain || `${restaurantData.subdomain}.myoutlet.app`}
          onClose={() => setShowQRModal(false)}
        />
      )}
    </div>
  );
}