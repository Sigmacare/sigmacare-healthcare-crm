"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin } from "lucide-react"
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api"

// This would typically come from an API
const initialEmergencies = [
  { id: 1, type: "Heart Attack", location: "123 Main St", status: "En Route", lat: 40.7128, lng: -74.006 },
  { id: 2, type: "Car Accident", location: "456 Elm St", status: "Reported", lat: 40.7282, lng: -73.7949 },
]

const mapContainerStyle = {
  width: "100%",
  height: "400px",
}

const center = {
  lat: 40.7128,
  lng: -74.006,
}

export function EmergencyTracking() {
  const [emergencies, setEmergencies] = useState(initialEmergencies)
  const [selectedEmergency, setSelectedEmergency] = useState(null)

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  })

  useEffect(() => {
    // In a real application, you would fetch emergencies from an API
    // and update their status periodically
    const interval = setInterval(() => {
      setEmergencies((prevEmergencies) =>
        prevEmergencies.map((emergency) => ({
          ...emergency,
          status: Math.random() > 0.5 ? "En Route" : "Reported",
        })),
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const handleEmergencyClick = (emergency) => {
    setSelectedEmergency(emergency)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Emergency Tracking</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            {emergencies.map((emergency) => (
              <div key={emergency.id} className="mb-4 p-4 border rounded-lg">
                <h3 className="text-lg font-semibold">{emergency.type}</h3>
                <p>
                  <MapPin className="inline mr-2" />
                  {emergency.location}
                </p>
                <Badge variant={emergency.status === "En Route" ? "default" : "secondary"}>{emergency.status}</Badge>
                <Button className="mt-2" onClick={() => handleEmergencyClick(emergency)}>
                  Track on Map
                </Button>
              </div>
            ))}
          </div>
          <div>
            {isLoaded ? (
              <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={10}>
                {emergencies.map((emergency) => (
                  <Marker
                    key={emergency.id}
                    position={{ lat: emergency.lat, lng: emergency.lng }}
                    icon={emergency.status === "En Route" ? "/ambulance-icon.png" : "/emergency-icon.png"}
                  />
                ))}
              </GoogleMap>
            ) : (
              <div>Loading map...</div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

