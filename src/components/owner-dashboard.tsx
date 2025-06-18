"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { AnimatePresence } from "framer-motion"
import { Bell, Home, LogOut, Menu, Utensils, Settings, DollarSign, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import DashboardHome from "@/components/dashboard-home"
import MenuManagement from "@/components/menu-management"
import SettingsPage from "@/components/settings-page"
import SubscriptionPage from "@/components/subscription-page"
import AnimatedDiv from "@/components/ui/animated-div"

export default function OwnerDashboard() {
  const [darkMode, setDarkMode] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [notifications, setNotifications] = useState(3)

  const restaurantName = "The Golden Spoon"
  const ownerEmail = "owner@goldenspoon.com"

  const menuItems = [
    {
      title: "Home",
      icon: <Home className="h-4 w-4 sm:h-5 sm:w-5" />,
      path: "home",
      active: activeSection === "home",
    },
    {
      title: "Menu Management",
      icon: <Utensils className="h-4 w-4 sm:h-5 sm:w-5" />,
      path: "menu",
      active: activeSection === "menu",
    },
    {
      title: "Settings",
      icon: <Settings className="h-4 w-4 sm:h-5 sm:w-5" />,
      path: "settings",
      active: activeSection === "settings",
    },
    {
      title: "Subscriptions",
      icon: <DollarSign className="h-4 w-4 sm:h-5 sm:w-5" />,
      path: "subscriptions",
      active: activeSection === "subscriptions",
    },
  ]

  const navigateToSection = (section: string) => {
    setActiveSection(section)
    setMobileMenuOpen(false)
  }

  const handleNotificationClick = () => {
    // Handle notification click - could open a notification panel
    console.log("Notifications clicked")
    setNotifications(0) // Clear notifications for demo
  }

  const handleLogout = () => {
    // Handle logout functionality
    console.log("Logout clicked")
    // Add actual logout logic here
  }

  const handleSupport = () => {
    // Handle support click
    console.log("Support clicked")
    // Add actual support logic here
  }

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  return (
    <div className="flex min-h-screen w-full bg-white text-[#040919] transition-colors duration-300">
      {/* Mobile menu button */}
      <button
        className="lg:hidden fixed top-3 left-3 z-[60] p-2.5 rounded-lg bg-[#fe0000] text-white hover:bg-red-700 transition-colors duration-200 shadow-lg"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle mobile menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-50 z-[45] lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 fixed lg:static inset-y-0 left-0 w-72 lg:w-64 xl:w-72 border-r border-gray-200 bg-white flex-shrink-0 z-[50] transition-transform duration-300 ease-in-out shadow-xl lg:shadow-none`}
      >
        <div className="p-4 lg:p-4 xl:p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <Link href="#" className="flex items-center">
              <div className="flex items-center space-x-2 lg:space-x-3">
                <div className="w-8 h-8 lg:w-28 lg:h-12 flex items-center justify-center">
                  <Image 
                    src="/myoutlet.logo.png" 
                    alt="MyOutlet Logo" 
                    width={40} 
                    height={40} 
                    className="w-full h-full object-contain"
                  />
                </div>
             
              </div>
            </Link>
            {/* Close button for mobile */}
            <button
              className="lg:hidden p-1 rounded-md hover:bg-[#fdfafa] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <p className="text-sm lg:text-base text-[#696868] mt-2 lg:mt-3">Restaurant Owner</p>
        </div>
        <nav className="p-4 lg:p-4 xl:p-6 flex-1">
          <ul className="space-y-1 lg:space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <button
                  onClick={() => navigateToSection(item.path)}
                  className={`flex items-center w-full p-3 lg:p-3 xl:p-4 rounded-lg transition-all duration-200 text-left ${
                    item.active
                      ? "bg-[#fe0000] text-white shadow-md"
                      : "hover:bg-[#fdfafa]"
                  } ${item.active ? "font-medium" : ""}`}
                >
                  <span className="mr-3 lg:mr-4">{item.icon}</span>
                  <span className="text-sm lg:text-base">{item.title}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 lg:h-20 border-b border-gray-200 bg-white flex items-center justify-between px-3 sm:px-4 lg:px-6 xl:px-8 sticky top-0 z-30 shadow-sm">
          <div className="flex items-center space-x-3 lg:space-x-4">
            <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-semibold hidden sm:block font-['Playfair_Display']">{restaurantName}</h1>
            <h1 className="text-base font-semibold sm:hidden font-['Playfair_Display']">{restaurantName.split(' ').slice(0, 2).join(' ')}</h1>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
            <div className="relative">
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full h-9 w-9 lg:h-10 lg:w-10 hover:bg-[#fdfafa]"
                onClick={handleNotificationClick}
              >
                <Bell className="h-4 w-4 lg:h-5 lg:w-5" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#fe0000] text-white text-xs rounded-full h-4 w-4 lg:h-5 lg:w-5 flex items-center justify-center animate-pulse">
                    {notifications}
                  </span>
                )}
              </Button>
            </div>

            <div className="flex items-center space-x-2 bg-[#fdfafa] px-3 py-2 lg:px-4 lg:py-2.5 rounded-full border border-gray-200">
              <span className="text-xs lg:text-sm font-medium text-[#696868]">Dark mode</span>
              <Switch 
                checked={darkMode} 
                onCheckedChange={setDarkMode} 
                className="data-[state=checked]:bg-[#fece00] data-[state=unchecked]:bg-gray-300" 
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full border w-8 h-8 lg:w-10 lg:h-10 hover:bg-[#fdfafa]">
                  <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-gray-700 font-medium text-sm lg:text-base">
                      {ownerEmail.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{ownerEmail}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigateToSection("settings")}>Settings</DropdownMenuItem>
                <DropdownMenuItem onClick={handleSupport}>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6 xl:p-8">
          <AnimatePresence mode="wait">
            {activeSection === "home" && (
              <AnimatedDiv key="home">
                <DashboardHome restaurantName={restaurantName} ownerEmail={ownerEmail} />
              </AnimatedDiv>
            )}
            {activeSection === "menu" && (
              <AnimatedDiv key="menu">
                <MenuManagement />
              </AnimatedDiv>
            )}
            {activeSection === "settings" && (
              <AnimatedDiv key="settings">
                <SettingsPage />
              </AnimatedDiv>
            )}
            {activeSection === "subscriptions" && (
              <AnimatedDiv key="subscriptions">
                <SubscriptionPage />
              </AnimatedDiv>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}
