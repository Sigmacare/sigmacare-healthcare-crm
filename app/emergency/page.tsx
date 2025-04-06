"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { EmergencyTracking } from "@/components/emergency-tracking"
import PatientDetails from "@/components/PatientDetails"
import mqtt from "mqtt"
import { getDistance } from "geolib"

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

export default function EmergencyPage() {
  const [emergencies, setEmergencies] = useState<Emergency[]>([])
  const [newEmergency, setNewEmergency] = useState<Emergency>({ device_code: "", alertType: [], details: "", location: "" })
  const [selectedEmergency, setSelectedEmergency] = useState<Emergency | null>(null)
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [isPatientDetailsOpen, setIsPatientDetailsOpen] = useState(false)
  const backend = process.env.NEXT_PUBLIC_IOT_BACKEND_URL

  useEffect(() => {
    // Fetch pending alerts from the backend
    const fetchPendingAlerts = async () => {
      try {
        const response = await fetch(backend + "/alerts/pending-alerts")
        const data = await response.json()
        // Add approximate location to each alert
        for (const alert of data) {
          console.log("Alert location:", alert)
          alert.device_location = await getApproximateLocation(alert.alertData.device_location)
          alert.latitude = alert.alertData.device_location?.latitude || 0
          alert.longitude = alert.alertData.device_location?.longitude || 0
        }
        setEmergencies(data)
      } catch (error) {
        console.error("Error fetching pending alerts:", error)
      }
    }

    fetchPendingAlerts()

    const options = {
      host: process.env.NEXT_PUBLIC_HIVEMQ_HOST,
      port: 8884,
      protocol: 'wss' as 'wss',
      path: '/mqtt',
      username: process.env.NEXT_PUBLIC_HIVEMQ_USER,
      password: process.env.NEXT_PUBLIC_HIVEMQ_PASSWORD,
    }

    const client = mqtt.connect(options)

    client.on("connect", () => {
      console.log("Connected to HiveMQ Cloud via WebSocket")
      client.subscribe("alerts/fall")
      client.subscribe("alerts/heartRate")
      client.subscribe("alerts/oxygen")
    })

    client.on("message", async (topic, message) => {
      const alert = JSON.parse(message.toString())
      console.log("Received alert:", alert)
      try {
        const approximateLocation = await getApproximateLocation(alert.alertData.device_location)

        setEmergencies((prevEmergencies) => {
          const existingAlert = prevEmergencies.find((emergency) => emergency.device_code === alert.device_code)

          if (existingAlert) {
            // Update the existing alert
            return prevEmergencies.map((emergency) =>
              emergency.device_code === alert.device_code
                ? { ...emergency, ...alert, resolved: false, device_location: approximateLocation }
                : emergency
            )
          } else {
            // Insert the new alert
            return [
              ...prevEmergencies,
              {
                device_code: alert.device_code,
                alertType: alert.alertType,
                details: `Device: ${alert.device_code}`,
                latitude: alert.alertData.device_location?.latitude || 0,
                longitude: alert.alertData.device_location?.longitude || 0,
                device_location: approximateLocation,
                resolved: false,
              },
            ]
          }
        })
      } catch (error) {
        console.error("Error processing alert:", error)
      }
    })

    return () => {
      client.end()
    }
  }, [])

  const handleAddEmergency = () => {
    setEmergencies([...emergencies, { ...newEmergency }])
    setNewEmergency({ device_code: "", alertType: [], details: "", location: "" })
  }

  const handleResolveEmergency = async (device_code: string) => {
    try {
      await fetch(backend + "/alerts/resolve-alert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ device_code }),
      })
      setEmergencies(emergencies.filter((emergency) => emergency.device_code !== device_code))
    } catch (error) {
      console.error("Error resolving alert:", error)
    }
  }

  const getApproximateLocation = async (device_location: { latitude: number, longitude: number } | undefined): Promise<string> => {
    if (!device_location) return "Unknown"
    // Use a reverse geocoding service to convert coordinates to a human-readable address
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${device_location.latitude}&lon=${device_location.longitude}`)
    const data = await response.json()
    return data.display_name || `Lat: ${device_location.latitude}, Long: ${device_location.longitude}`
  }

  const handleViewPatientMetrics = async (device_code: string) => {
    const token = localStorage.getItem("token")
    if (!token) {
      console.error("No token found")
      return
    }
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + `/api/patients/device/${device_code}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      })
      const data = await response.json()
      setSelectedPatient(data)
      setIsPatientDetailsOpen(true)
    } catch (error) {
      console.error("Error fetching patient details:", error)
    }
  }

  return (
    <>
      <h1 className="text-3xl font-semibold mb-6">Emergency Management</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Active Emergencies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Report Emergency</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Report New Emergency</DialogTitle>
                    <DialogDescription>Provide details about the emergency situation.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="device_code" className="text-right">
                        Device Code
                      </Label>
                      <Input
                        id="device_code"
                        value={newEmergency.device_code}
                        onChange={(e) => setNewEmergency({ ...newEmergency, device_code: e.target.value })}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="alertType" className="text-right">
                        Alert Type
                      </Label>
                      <Input
                        id="alertType"
                        value={newEmergency.alertType.join(", ")}
                        onChange={(e) => setNewEmergency({ ...newEmergency, alertType: e.target.value.split(", ") })}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="details" className="text-right">
                        Details
                      </Label>
                      <Input
                        id="details"
                        value={newEmergency.details}
                        onChange={(e) => setNewEmergency({ ...newEmergency, details: e.target.value })}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="location" className="text-right">
                        Location
                      </Label>
                      <Input
                        id="location"
                        value={newEmergency.location}
                        onChange={(e) => setNewEmergency({ ...newEmergency, location: e.target.value })}
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={handleAddEmergency}>Report Emergency</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {emergencies.map((emergency) => (
                <Alert variant="destructive" key={emergency.device_code} className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>{emergency.alertType.join(", ")} Emergency</AlertTitle>
                  <AlertDescription>
                    {emergency.details} at {emergency.location} (Approx. Location: {emergency.device_location})
                    <p> Device id : {emergency.device_code}</p>
                  </AlertDescription>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={() => handleResolveEmergency(emergency.device_code)}
                  >
                    Resolve
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2 ml-2"
                    onClick={() => setSelectedEmergency(emergency.latitude && emergency.longitude ? { ...emergency, latitude: emergency.latitude, longitude: emergency.longitude } : null)}
                  >Track on Map
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2 ml-2"
                    onClick={() => handleViewPatientMetrics(emergency.device_code)}
                  >
                    View Patient Metrics
                  </Button>
                </Alert>
              ))}
            </div>
          </CardContent>
        </Card>
        <EmergencyTracking selectedEmergency={selectedEmergency} />
      </div>
      <Dialog open={isPatientDetailsOpen} onOpenChange={setIsPatientDetailsOpen}>
        <DialogContent className="max-w-4xl z-50"> {/* Ensure the dialog has a higher z-index */}
          <DialogHeader>
            <DialogTitle>Patient Details</DialogTitle>
          </DialogHeader>
          {selectedPatient && <PatientDetails patient={selectedPatient} onDelete={() => { }} />}
        </DialogContent>
      </Dialog>
    </>
  )
}