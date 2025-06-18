"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, CheckCircle, AlertTriangle, XCircle, RefreshCw } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function MenuManagement() {
  const googleSheetStatus = {
    lastSync: "2024-06-14, 10:30 AM",
    status: "healthy", // "healthy", "warning", "error"
    errorMessage: "", // "Some items missing prices", "API connection failed"
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "healthy":
        return <Badge className="bg-green-500 hover:bg-green-600 text-white">Healthy</Badge>
      case "warning":
        return (
          <Badge className="bg-[#fece00] hover:bg-yellow-500 text-[#040919]">
            Warning
          </Badge>
        )
      case "error":
        return <Badge className="bg-[#fe0000] hover:bg-red-700 text-white">Error</Badge>
      default:
        return <Badge className="bg-gray-200 text-[#040919] border border-gray-300">Unknown</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy":
        return <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-[#fece00]" />
      case "error":
        return <XCircle className="h-4 w-4 sm:h-5 sm:w-5 text-[#fe0000]" />
      default:
        return null
    }
  }

  const handleRefreshSync = () => {
    console.log("Refreshing Google Sheet sync...")
    alert("Refreshing sync with Google Sheet...")
  }

  const handleOpenGoogleSheet = () => {
    console.log("Opening Google Sheet...")
    alert("Opening Google Sheet in new tab...")
    // In a real app, this would open the actual Google Sheet URL
    // window.open('https://docs.google.com/spreadsheets/d/your-sheet-id', '_blank')
  }

  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold font-['Playfair_Display'] text-[#040919]">Menu Management</h1>
      <Card className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl lg:text-2xl font-['Playfair_Display'] text-[#040919]">Google Sheet Menu Integration</CardTitle>
          <CardDescription className="text-sm sm:text-base text-[#696868]">Your menu is managed directly through your linked Google Sheet.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 sm:space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between p-4 border border-gray-200 rounded-lg bg-[#fdfafa] gap-4 lg:gap-6">
            <div className="flex items-start lg:items-center space-x-3">
              {getStatusIcon(googleSheetStatus.status)}
              <div className="space-y-1">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <p className="font-medium text-sm sm:text-base text-[#040919]">Integration Status:</p>
                  {getStatusBadge(googleSheetStatus.status)}
                </div>
                <p className="text-xs sm:text-sm text-[#696868]">Last Synced: {googleSheetStatus.lastSync}</p>
                {googleSheetStatus.errorMessage && (
                  <p className="text-xs sm:text-sm text-[#fe0000]">{googleSheetStatus.errorMessage}</p>
                )}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <Button 
                variant="outline" 
                onClick={handleRefreshSync} 
                className="w-full sm:w-auto border-gray-200 text-[#040919] hover:bg-[#fdfafa]"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh Sync
              </Button>
              <Button 
                onClick={handleOpenGoogleSheet} 
                className="w-full sm:w-auto bg-[#fe0000] hover:bg-red-700 text-white"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Open Google Sheet
              </Button>
            </div>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <h3 className="font-semibold text-base sm:text-lg lg:text-xl text-[#040919]">How it works:</h3>
            <ul className="list-disc list-inside text-[#696868] space-y-2 sm:space-y-3 text-sm sm:text-base">
              <li>Your menu categories, items, and prices are pulled directly from your Google Sheet.</li>
              <li>
                Any changes you make in the Google Sheet will reflect on your digital menu in real-time (or after a
                short sync).
              </li>
              <li>Ensure your sheet follows the specified format for proper display.</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
