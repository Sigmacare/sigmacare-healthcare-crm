"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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

export function QuickActions() {
  const [alerts, setAlerts] = useState([
    { id: 1, type: "Critical", message: "Room 101: Patient requires immediate attention" },
    { id: 2, type: "Equipment", message: "Room 205: Ventilator malfunction" },
  ])

  const [newAlert, setNewAlert] = useState({ type: "", message: "" })

  const handleAddAlert = () => {
    setAlerts([...alerts, { id: alerts.length + 1, ...newAlert }])
    setNewAlert({ type: "", message: "" })
  }

  const handleResolveAlert = (id) => {
    setAlerts(alerts.filter((alert) => alert.id !== id))
  }

  return (
    <div className="space-y-4">
      <div className="flex space-x-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add/Edit Room</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add/Edit Room</DialogTitle>
              <DialogDescription>Enter room details here.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="room-number" className="text-right">
                  Room Number
                </Label>
                <Input id="room-number" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="room-type" className="text-right">
                  Room Type
                </Label>
                <Input id="room-type" className="col-span-3" />
              </div>
              {/* Add more fields as needed */}
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Request Bed Allocation</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Request Bed Allocation</DialogTitle>
              <DialogDescription>Enter allocation details here.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="patient-name" className="text-right">
                  Patient Name
                </Label>
                <Input id="patient-name" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="room-preference" className="text-right">
                  Room Preference
                </Label>
                <Input id="room-preference" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Submit Request</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Button variant="outline">Request Sanitization</Button>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Alerts</h3>
        {alerts.map((alert) => (
          <Alert variant="destructive" key={alert.id} className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>{alert.type} Alert</AlertTitle>
            <AlertDescription>{alert.message}</AlertDescription>
            <Button variant="outline" size="sm" className="mt-2" onClick={() => handleResolveAlert(alert.id)}>
              Resolve
            </Button>
          </Alert>
        ))}
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Add New Alert</h3>
        <div className="space-y-2">
          <Input
            placeholder="Alert Type"
            value={newAlert.type}
            onChange={(e) => setNewAlert({ ...newAlert, type: e.target.value })}
          />
          <Textarea
            placeholder="Alert Message"
            value={newAlert.message}
            onChange={(e) => setNewAlert({ ...newAlert, message: e.target.value })}
          />
          <Button onClick={handleAddAlert}>Add Alert</Button>
        </div>
      </div>
    </div>
  )
}

