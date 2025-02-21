"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const initialPatients = [
  { id: 1, name: "John Doe", heartRate: 72, bloodPressure: "120/80", oxygenLevel: 98 },
  { id: 2, name: "Jane Smith", heartRate: 68, bloodPressure: "118/75", oxygenLevel: 97 },
  { id: 3, name: "Bob Brown", heartRate: 75, bloodPressure: "130/85", oxygenLevel: 96 },
]

const mockChartData = [
  { time: "00:00", heartRate: 72, bloodPressure: 120, oxygenLevel: 98 },
  { time: "04:00", heartRate: 68, bloodPressure: 118, oxygenLevel: 97 },
  { time: "08:00", heartRate: 70, bloodPressure: 122, oxygenLevel: 99 },
  { time: "12:00", heartRate: 75, bloodPressure: 125, oxygenLevel: 98 },
  { time: "16:00", heartRate: 72, bloodPressure: 121, oxygenLevel: 98 },
  { time: "20:00", heartRate: 70, bloodPressure: 119, oxygenLevel: 97 },
]

export default function HealthMonitoringPage() {
  const [patients, setPatients] = useState(initialPatients)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPatient, setSelectedPatient] = useState(null)

  const filteredPatients = patients.filter((patient) => patient.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <>
      <h1 className="text-3xl font-semibold mb-6">Health Monitoring</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Patient Vitals</CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              placeholder="Search patients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mb-4"
            />
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Heart Rate</TableHead>
                  <TableHead>Blood Pressure</TableHead>
                  <TableHead>Oxygen Level</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPatients.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell>{patient.name}</TableCell>
                    <TableCell>{patient.heartRate}</TableCell>
                    <TableCell>{patient.bloodPressure}</TableCell>
                    <TableCell>{patient.oxygenLevel}</TableCell>
                    <TableCell>
                      <Button onClick={() => setSelectedPatient(patient)}>View Details</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Patient Vitals Chart</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedPatient ? (
              <div>
                <h3 className="text-lg font-semibold mb-2">{selectedPatient.name}</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={mockChartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="heartRate" stroke="#8884d8" name="Heart Rate" />
                      <Line type="monotone" dataKey="bloodPressure" stroke="#82ca9d" name="Blood Pressure" />
                      <Line type="monotone" dataKey="oxygenLevel" stroke="#ffc658" name="Oxygen Level" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            ) : (
              <p>Select a patient to view their vitals chart.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  )
}

