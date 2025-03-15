"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { HospitalMap } from "@/components/hospital-map"
import { RoomDetails } from "@/components/room-details"
import { QuickActions } from "@/components/quick-actions"

export default function HospitalLayoutPage() {
  const [selectedRoom, setSelectedRoom] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({
    department: "",
    floor: "",
    availability: "",
    equipmentStatus: "",
    patientStatus: "",
  })

  const handleSearch = (e) => {
    e.preventDefault()
    // Implement search logic here
    console.log("Searching for:", searchTerm)
  }

  const handleFilterChange = (key, value) => {
    setFilters((prev) => {
      const newFilters = { ...prev, [key]: value }
      return newFilters
    })
  }

  const handleRoomSelect = (room) => {
    setSelectedRoom(room)
  }

  useEffect(() => {
    // This effect will run whenever filters change
    console.log("Filters updated:", filters)
    // You can add additional logic here if needed
  }, [filters])

  return (
    <div className="flex flex-col h-full text-foreground">
      <h1 className="text-3xl font-semibold mb-6">Hospital Layout</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Search and Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex gap-4 mb-4">
            <Input
              placeholder="Search rooms, wards, or patients"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow"
            />
            <Button type="submit">Search</Button>
          </form>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <Select onValueChange={(value) => handleFilterChange("department", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="icu">ICU</SelectItem>
                <SelectItem value="emergency">Emergency</SelectItem>
                <SelectItem value="general">General Ward</SelectItem>
                {/* Add more departments as needed */}
              </SelectContent>
            </Select>
            <Select onValueChange={(value) => handleFilterChange("floor", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Floor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1st Floor</SelectItem>
                <SelectItem value="2">2nd Floor</SelectItem>
                <SelectItem value="3">3rd Floor</SelectItem>
                {/* Add more floors as needed */}
              </SelectContent>
            </Select>
            <Select onValueChange={(value) => handleFilterChange("availability", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="vacant">Vacant</SelectItem>
                <SelectItem value="occupied">Occupied</SelectItem>
              </SelectContent>
            </Select>
            <Select onValueChange={(value) => handleFilterChange("equipmentStatus", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Equipment Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="operational">Operational</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>
            <Select onValueChange={(value) => handleFilterChange("patientStatus", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Patient Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="stable">Stable</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col lg:flex-row gap-6 flex-grow">
        <Card className="flex-grow">
          <CardHeader>
            <CardTitle>Hospital Map</CardTitle>
          </CardHeader>
          <CardContent className="h-[600px] overflow-y-auto p-6">
            <div className="w-full dark:text-white">
              <HospitalMap onRoomSelect={handleRoomSelect} filters={filters} />
            </div>
          </CardContent>
        </Card>

        <Card className="w-full lg:w-1/3">
          <CardHeader>
            <CardTitle>Room Details</CardTitle>
          </CardHeader>
          <CardContent>
            <RoomDetails room={selectedRoom} />
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Quick Actions & Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <QuickActions />
        </CardContent>
      </Card>
    </div>
  )
}

