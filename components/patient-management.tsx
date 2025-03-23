import { useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type Patient = {
  assigned_doctor: string
  _id: string
  name: string
  age: number
  medical_conditions: string[]
  device_id: string
}

export function PatientManagement() {
  const [patients, setPatients] = useState<Patient[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const backend = process.env.NEXT_PUBLIC_BACKEND_URL

  useEffect(() => {
    const fetchPatients = async () => {
      const token = localStorage.getItem("token")
      if (!token) {
        setError("No token found")
        setIsLoading(false)
        return
      }

      try {
        const response = await fetch(backend + "/api/patients", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        })

        if (!response.ok) {
          throw new Error("Failed to fetch patients")
        }

        const data: Patient[] = await response.json()
        setPatients(data)
      } catch (error) {
        setError((error as Error).message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPatients()
  }, [])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

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
              <TableHead>SigmaCare Device ID</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {patients.map((patient) => (
              <TableRow key={patient._id}>
                <TableCell>{patient.name}</TableCell>
                <TableCell>{patient.age}</TableCell>
                <TableCell>{patient.medical_conditions.join(", ")}</TableCell>
                <TableCell>{patient.assigned_doctor || "N/A"}</TableCell>
                <TableCell>{patient.device_id}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}