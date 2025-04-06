"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapContainer, TileLayer, Marker } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import RoutingMachine from "./RoutingMachine" // Custom routing component

interface Emergency {
  device_code: string
  alertType: string[]
  details: string
  location: string
  device_location?: string
  latitude?: number
  longitude?: number
  resolved?: boolean
}

interface EmergencyTrackingProps {
  selectedEmergency: Emergency | null
}

const mapContainerStyle = {
  width: "100%",
  height: "400px",
}

const center = { lat: 10.0384, lng: 76.2803 }
const hospitalLocation = { lat: 9.9816, lng: 76.2803 }

// Define custom icons
const hospitalIcon = new L.Icon({
  iconUrl: "/hospital-icon.png", // Ensure the path is correct
  iconSize: [25, 25], // Adjusted size
  iconAnchor: [12, 25],
})

const emergencyIcon = new L.Icon({
  iconUrl: "/emergency-icon.png", // Ensure the path is correct
  iconSize: [25, 25], // Adjusted size
  iconAnchor: [12, 25],
})

export function EmergencyTracking({ selectedEmergency }: EmergencyTrackingProps) {
  return (
    <Card className="z-0">
      <CardHeader>
        <CardTitle>Emergency Tracking</CardTitle>
      </CardHeader>
      <CardContent>
        <MapContainer style={mapContainerStyle} center={center} zoom={10}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {/* Hospital Marker */}
          <Marker position={hospitalLocation} icon={hospitalIcon} />
          {/* Emergency Marker and Routing */}
          {selectedEmergency && (
            <>
              <Marker position={[selectedEmergency.latitude!, selectedEmergency.longitude!]} icon={emergencyIcon} />
              <RoutingMachine from={hospitalLocation} to={{ lat: selectedEmergency.latitude!, lng: selectedEmergency.longitude! }} />
            </>
          )}
        </MapContainer>
      </CardContent>
    </Card>
  )
}
