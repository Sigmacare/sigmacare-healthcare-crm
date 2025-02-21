import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const schedule = [
  { doctor: "Dr. Smith", availability: "9:00 AM - 5:00 PM", appointments: 8 },
  { doctor: "Dr. Johnson", availability: "10:00 AM - 6:00 PM", appointments: 6 },
  { doctor: "Dr. Williams", availability: "8:00 AM - 4:00 PM", appointments: 7 },
  { doctor: "Dr. Davis", availability: "11:00 AM - 7:00 PM", appointments: 5 },
]

export function DoctorSchedule() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Doctor Schedule</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Doctor</TableHead>
              <TableHead>Availability</TableHead>
              <TableHead>Appointments</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {schedule.map((item) => (
              <TableRow key={item.doctor}>
                <TableCell>{item.doctor}</TableCell>
                <TableCell>{item.availability}</TableCell>
                <TableCell>{item.appointments}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

