import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Crown, Sparkles } from "lucide-react"

type PlanType = "Basic" | "Premium" | "Enterprise"
type DomainStatus = "active" | "pending" | "failed" | "none"

export default function SubscriptionPage() {
  const currentPlan = "Premium" as PlanType // Dummy: Basic, Premium, Enterprise
  const customDomainStatus = "pending" as DomainStatus // Dummy: "active", "pending", "failed", "none"
  const customDomain = "myrestaurant.com" // Dummy domain

  const getDomainStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500 hover:bg-green-600 text-white">Active</Badge>
      case "pending":
        return (
          <Badge className="bg-[#fece00] hover:bg-yellow-500 text-[#040919]">
            Pending DNS Verification
          </Badge>
        )
      case "failed":
        return <Badge className="bg-[#fe0000] hover:bg-red-700 text-white">Failed</Badge>
      case "none":
      default:
        return <Badge className="bg-gray-200 text-[#040919] border border-gray-300">Not Configured</Badge>
    }
  }

  const handleManageSubscription = () => {
    console.log("Opening subscription management...")
    alert("Opening subscription management portal...")
  }

  const handleLinkCustomDomain = () => {
    console.log("Linking custom domain...")
    alert("Custom domain linking initiated. Check your email for DNS instructions.")
  }

  const handleRetryVerification = () => {
    console.log("Retrying domain verification...")
    alert("Domain verification retry initiated.")
  }

  const handlePlanSelection = (plan: PlanType) => {
    console.log(`Selected plan: ${plan}`)
    if (plan === currentPlan) {
      alert("This is your current plan!")
    } else {
      alert(`Upgrading to ${plan} plan...`)
    }
  }

  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold font-['Playfair_Display'] text-[#040919]">Subscription & Billing</h1>

      <Card className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl lg:text-2xl font-['Playfair_Display'] text-[#040919]">Your Current Plan</CardTitle>
          <CardDescription className="text-sm sm:text-base text-[#696868]">Details about your active subscription.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between p-4 border border-gray-200 rounded-lg bg-[#fdfafa] gap-4">
            <div className="flex items-center space-x-3">
              <Crown className="h-5 w-5 sm:h-6 sm:w-6 text-[#fece00]" />
              <div>
                <p className="font-medium text-base sm:text-lg lg:text-xl text-[#040919]">{currentPlan} Plan</p>
                <p className="text-xs sm:text-sm text-[#696868]">Next billing: July 14, 2025</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              onClick={handleManageSubscription} 
              className="w-full lg:w-auto border-gray-200 text-[#040919] hover:bg-[#fdfafa]"
            >
              Manage Subscription
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl lg:text-2xl font-['Playfair_Display'] text-[#040919]">Custom Domain Linking</CardTitle>
          <CardDescription className="text-sm sm:text-base text-[#696868]">Link your own custom domain to remove MyOutlet branding.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="customDomain" className="text-sm sm:text-base text-[#040919]">Your Custom Domain</Label>
            <Input
              id="customDomain"
              placeholder="e.g., yourrestaurant.com"
              defaultValue={customDomainStatus !== "none" ? customDomain : ""}
              disabled={customDomainStatus === "active"}
              className="text-sm sm:text-base border-gray-200 text-[#040919] placeholder-[#696868] focus:ring-2 focus:ring-[#fece00] focus:border-[#fece00]"
            />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <p className="text-sm font-medium text-[#040919]">Status:</p>
            {getDomainStatusBadge(customDomainStatus)}
          </div>
          {customDomainStatus === "pending" && (
            <div className="text-xs sm:text-sm text-[#696868]">
              Please update your DNS records to point to MyOutlet. Instructions sent to your email.
            </div>
          )}
          {customDomainStatus === "none" && (
            <Button className="bg-[#fece00] hover:bg-yellow-500 text-[#040919] w-full sm:w-auto" onClick={handleLinkCustomDomain}>
              Link Custom Domain
            </Button>
          )}
          {(customDomainStatus === "pending" || customDomainStatus === "failed") && (
            <Button 
              variant="outline" 
              onClick={handleRetryVerification} 
              className="w-full sm:w-auto border-gray-200 text-[#040919] hover:bg-[#fdfafa]"
            >
              Retry Verification
            </Button>
          )}
        </CardContent>
      </Card>

      <Card className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl lg:text-2xl font-['Playfair_Display'] text-[#040919]">Upgrade Your Plan</CardTitle>
          <CardDescription className="text-sm sm:text-base text-[#696868]">Unlock more features and benefits with a higher plan.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Basic Plan */}
          <Card className="flex flex-col bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg sm:text-xl text-[#040919]">Basic</CardTitle>
              <CardDescription className="text-sm text-[#696868]">Perfect for small restaurants.</CardDescription>
              <div className="text-2xl sm:text-3xl font-bold mt-2 text-[#040919]">
                ₹999<span className="text-sm sm:text-base font-normal text-[#696868]">/month</span>
              </div>
            </CardHeader>
            <CardContent className="flex-1 space-y-2 text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-[#040919]">QR Code Ordering</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-[#040919]">Google Sheet Menu</span>
              </div>
              <div className="flex items-center gap-2 text-[#696868]">
                <XCircle className="h-4 w-4 text-[#fe0000]" />
                <span>Custom Domain</span>
              </div>
              <div className="flex items-center gap-2 text-[#696868]">
                <XCircle className="h-4 w-4 text-[#fe0000]" />
                <span>Advanced Analytics</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full border-gray-200 text-[#040919] hover:bg-[#fdfafa]" 
                variant="outline" 
                disabled={currentPlan === "Basic"}
                onClick={() => handlePlanSelection("Basic")}
              >
                {currentPlan === "Basic" ? "Current Plan" : "Choose Basic"}
              </Button>
            </CardFooter>
          </Card>

          {/* Premium Plan */}
          <Card className="flex flex-col bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border-2 border-[#fece00]">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg sm:text-xl flex items-center gap-2 text-[#040919]">
                Premium <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-[#fece00] fill-[#fece00]" />
              </CardTitle>
              <CardDescription className="text-sm text-[#696868]">Ideal for growing businesses.</CardDescription>
              <div className="text-2xl sm:text-3xl font-bold mt-2 text-[#040919]">
                ₹1999<span className="text-sm sm:text-base font-normal text-[#696868]">/month</span>
              </div>
            </CardHeader>
            <CardContent className="flex-1 space-y-2 text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-[#040919]">All Basic Features</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-[#040919]">Custom Domain Linking</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-[#040919]">Basic Analytics</span>
              </div>
              <div className="flex items-center gap-2 text-[#696868]">
                <XCircle className="h-4 w-4 text-[#fe0000]" />
                <span>Priority Support</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full bg-[#fece00] hover:bg-yellow-500 text-[#040919]"
                disabled={currentPlan === "Premium"}
                onClick={() => handlePlanSelection("Premium")}
              >
                {currentPlan === "Premium" ? "Current Plan" : "Choose Premium"}
              </Button>
            </CardFooter>
          </Card>

          {/* Enterprise Plan */}
          <Card className="flex flex-col bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg sm:text-xl text-[#040919]">Enterprise</CardTitle>
              <CardDescription className="text-sm text-[#696868]">For large chains and advanced needs.</CardDescription>
              <div className="text-2xl sm:text-3xl font-bold mt-2 text-[#040919]">
                ₹4999<span className="text-sm sm:text-base font-normal text-[#696868]">/month</span>
              </div>
            </CardHeader>
            <CardContent className="flex-1 space-y-2 text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-[#040919]">All Premium Features</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-[#040919]">Advanced Analytics</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-[#040919]">Priority Support</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-[#040919]">Dedicated Account Manager</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full border-gray-200 text-[#040919] hover:bg-[#fdfafa]" 
                variant="outline" 
                disabled={currentPlan === "Enterprise"}
                onClick={() => handlePlanSelection("Enterprise")}
              >
                {currentPlan === "Enterprise" ? "Current Plan" : "Choose Enterprise"}
              </Button>
            </CardFooter>
          </Card>
        </CardContent>
      </Card>
    </div>
  )
}
