import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

const emergencies = [
  { patient: "Jane Smith", condition: "Critical", location: "ICU-3" },
  { type: "Ambulance", eta: "5 minutes", location: "Emergency Entrance" },
]

export function EmergencyAlerts() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Emergency Alerts</CardTitle>
      </CardHeader>
      <CardContent>
        {emergencies.map((emergency, index) => (
          <Alert variant="destructive" key={index} className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Emergency</AlertTitle>
            <AlertDescription>
              {emergency.patient ? (
                <>
                  Patient {emergency.patient} in {emergency.condition} condition at {emergency.location}
                </>
              ) : (
                <>
                  {emergency.type} arriving in {emergency.eta} at {emergency.location}
                </>
              )}
            </AlertDescription>
          </Alert>
        ))}
      </CardContent>
    </Card>
  )
}

