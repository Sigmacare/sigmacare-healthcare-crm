"use client"

import { useState } from "react"
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

const initialEmergencies = [
  { id: 1, type: "Patient", details: "Jane Smith in critical condition", location: "ICU-3" },
  { id: 2, type: "Ambulance", details: "ETA 5 minutes", location: "Emergency Entrance" },
]

export default function EmergencyPage() {
  const [emergencies, setEmergencies] = useState(initialEmergencies)
  const [newEmergency, setNewEmergency] = useState({ type: "", details: "", location: "" })

  const handleAddEmergency = () => {
    setEmergencies([...emergencies, { id: emergencies.length + 1, ...newEmergency }])
    setNewEmergency({ type: "", details: "", location: "" })
  }

  const handleResolveEmergency = (id) => {
    setEmergencies(emergencies.filter((emergency) => emergency.id !== id))
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
                      <Label htmlFor="type" className="text-right">
                        Type
                      </Label>
                      <Input
                        id="type"
                        value={newEmergency.type}
                        onChange={(e) => setNewEmergency({ ...newEmergency, type: e.target.value })}
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
            {emergencies.map((emergency) => (
              <Alert variant="destructive" key={emergency.id} className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>{emergency.type} Emergency</AlertTitle>
                <AlertDescription>
                  {emergency.details} at {emergency.location}
                </AlertDescription>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={() => handleResolveEmergency(emergency.id)}
                >
                  Resolve
                </Button>
              </Alert>
            ))}
          </CardContent>
        </Card>
        <EmergencyTracking />
      </div>
    </>
  )
}

