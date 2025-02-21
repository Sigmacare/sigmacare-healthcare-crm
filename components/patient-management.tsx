import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const patients = [
  { name: "John Doe", age: 45, condition: "Stable", doctor: "Dr. Smith", room: "201" },
  { name: "Jane Smith", age: 32, condition: "Critical", doctor: "Dr. Johnson", room: "ICU-3" },
  { name: "Bob Brown", age: 58, condition: "Recovering", doctor: "Dr. Williams", room: "305" },
  { name: "Alice Green", age: 27, condition: "Stable", doctor: "Dr. Davis", room: "102" },
]

export function PatientManagement() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Patient Management</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Condition</TableHead>
              <TableHead>Assigned Doctor</TableHead>
              <TableHead>Room</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {patients.map((patient) => (
              <TableRow key={patient.name}>
                <TableCell>{patient.name}</TableCell>
                <TableCell>{patient.age}</TableCell>
                <TableCell>{patient.condition}</TableCell>
                <TableCell>{patient.doctor}</TableCell>
                <TableCell>{patient.room}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

