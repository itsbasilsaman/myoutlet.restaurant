import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart2, ShoppingCart, DollarSign, UtensilsCrossed, Star, RefreshCw, Utensils, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

interface DashboardHomeProps {
  restaurantName: string
  ownerEmail: string
}

export default function DashboardHome({ restaurantName, ownerEmail }: DashboardHomeProps) {
  // Dummy Data for Analytics
  const analyticsData = {
    ordersToday: 125,
    totalRevenue: 15230, // in INR
    bestSellingItem: "Chicken Biryani",
    customerRating: 4.7,
    totalCustomers: 580,
    newCustomersToday: 15,
    averageOrderValue: 121.84,
  }

  const handleRefreshData = () => {
    console.log("Refreshing dashboard data...")
    // Add actual refresh logic here
  }

  const handleViewAnalytics = () => {
    console.log("Opening full analytics...")
    // Add navigation to analytics page
  }

  const handleManageMenu = () => {
    console.log("Opening menu management...")
    // Add navigation to menu management
  }

  const handleRestaurantSettings = () => {
    console.log("Opening restaurant settings...")
    // Add navigation to settings
  }

  const handleManageSubscriptions = () => {
    console.log("Opening subscription management...")
    // Add navigation to subscriptions
  }

  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-semibold font-['Playfair_Display']">Welcome, {restaurantName}!</h1>
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        <Card className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-[#040919]">Orders Today</CardTitle>
            <ShoppingCart className="h-4 w-4 text-[#696868]" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#040919]">{analyticsData.ordersToday}</div>
            <p className="text-xs text-[#696868]">+{analyticsData.newCustomersToday} new customers</p>
          </CardContent>
        </Card>

        <Card className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-[#040919]">Total Revenue (Today)</CardTitle>
            <DollarSign className="h-4 w-4 text-[#696868]" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#040919]">₹{analyticsData.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-[#696868]">Avg. Order: ₹{analyticsData.averageOrderValue.toFixed(2)}</p>
          </CardContent>
        </Card>

        <Card className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-[#040919]">Best-Selling Item</CardTitle>
            <UtensilsCrossed className="h-4 w-4 text-[#696868]" />
          </CardHeader>
          <CardContent>
            <div className="text-lg sm:text-xl lg:text-2xl font-bold leading-tight text-[#040919]">{analyticsData.bestSellingItem}</div>
            <p className="text-xs text-[#696868]">Based on last 7 days</p>
          </CardContent>
        </Card>

        <Card className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-[#040919]">Customer Rating</CardTitle>
            <Star className="h-4 w-4 text-[#fece00]" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#040919]">{analyticsData.customerRating}/5</div>
            <Progress value={(analyticsData.customerRating / 5) * 100} className="mt-2" />
            <p className="text-xs text-[#696868] mt-2">{analyticsData.totalCustomers} total reviews</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <Card className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl font-['Playfair_Display'] text-[#040919]">Restaurant Information</CardTitle>
            <CardDescription className="text-sm text-[#696868]">Your basic restaurant details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
              <span className="font-medium text-sm sm:text-base text-[#040919]">Restaurant Name:</span>
              <span className="text-sm sm:text-base text-[#696868]">{restaurantName}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
              <span className="font-medium text-sm sm:text-base text-[#040919]">Owner Email:</span>
              <span className="text-sm sm:text-base break-all text-[#696868]">{ownerEmail}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
              <span className="font-medium text-sm sm:text-base text-[#040919]">Branch:</span>
              <span className="text-sm sm:text-base text-[#696868]">Main Branch (Dummy)</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
              <span className="font-medium text-sm sm:text-base text-[#040919]">Default Currency:</span>
              <span className="text-sm sm:text-base text-[#696868]">INR (Dummy)</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
              <span className="font-medium text-sm sm:text-base text-[#040919]">Preferred Language:</span>
              <span className="text-sm sm:text-base text-[#696868]">English (Dummy)</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl font-['Playfair_Display'] text-[#040919]">Quick Actions</CardTitle>
            <CardDescription className="text-sm text-[#696868]">Manage your restaurant operations.</CardDescription>
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
    </div>
  )
}
