"use client"

import { Bell, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"

export function Header() {
  return (
    <header className="bg-background border-b border-border h-16 flex items-center justify-between px-6">
      <div className="flex items-center">
        <h2 className="text-2xl font-semibold">Hospital Name</h2>
      </div>
      <div className="flex items-center space-x-4">
        <ModeToggle />
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
      </div>
    </header>
  )
}

