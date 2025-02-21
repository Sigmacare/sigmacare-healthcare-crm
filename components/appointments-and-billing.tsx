import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const appointments = [
  { patient: "John Doe", doctor: "Dr. Smith", time: "10:00 AM", type: "Check-up" },
  { patient: "Jane Smith", doctor: "Dr. Johnson", time: "11:30 AM", type: "Follow-up" },
  { patient: "Bob Brown", doctor: "Dr. Williams", time: "2:00 PM", type: "Consultation" },
]

const billings = [
  { patient: "John Doe", service: "Check-up", amount: "$150" },
  { patient: "Jane Smith", service: "Lab Tests", amount: "$300" },
  { patient: "Bob Brown", service: "X-Ray", amount: "$200" },
]

export function AppointmentsAndBilling() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Appointments & Billing</CardTitle>
      </CardHeader>
      <CardContent>
        <h3 className="text-lg font-semibold mb-2">Upcoming Appointments</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient</TableHead>
              <TableHead>Doctor</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Type</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments.map((appointment) => (
              <TableRow key={`${appointment.patient}-${appointment.time}`}>
                <TableCell>{appointment.patient}</TableCell>
                <TableCell>{appointment.doctor}</TableCell>
                <TableCell>{appointment.time}</TableCell>
                <TableCell>{appointment.type}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <h3 className="text-lg font-semibold mt-6 mb-2">Billing Summary</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {billings.map((billing) => (
              <TableRow key={`${billing.patient}-${billing.service}`}>
                <TableCell>{billing.patient}</TableCell>
                <TableCell>{billing.service}</TableCell>
                <TableCell>{billing.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

