"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// This would typically come from an API
const initialPatients = [
  { id: 1, name: "John Doe", age: 45, condition: "Stable", doctor: "Dr. Smith", room: "201", caretaker: "Jane Doe" },
  {
    id: 2,
    name: "Jane Smith",
    age: 32,
    condition: "Critical",
    doctor: "Dr. Johnson",
    room: "ICU-3",
    caretaker: "John Smith",
  },
  {
    id: 3,
    name: "Bob Brown",
    age: 58,
    condition: "Recovering",
    doctor: "Dr. Williams",
    room: "305",
    caretaker: "Alice Brown",
  },
  {
    id: 4,
    name: "Alice Green",
    age: 27,
    condition: "Stable",
    doctor: "Dr. Davis",
    room: "102",
    caretaker: "Tom Green",
  },
]

// This would typically come from an API
const doctors = ["Dr. Smith", "Dr. Johnson", "Dr. Williams", "Dr. Davis"]

export default function PatientsPage() {
  const [patients, setPatients] = useState(initialPatients)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editedPatient, setEditedPatient] = useState(null)

  // Simulating API call
  useEffect(() => {
    // In a real application, this would be an API call
    // For example:
    // const fetchPatients = async () => {
    //   const response = await fetch('/api/patients');
    //   const data = await response.json();
    //   setPatients(data);
    // }
    // fetchPatients();

    // For now, we'll just use the initial data
    setPatients(initialPatients)
  }, [])

  const filteredPatients = patients.filter((patient) => patient.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const handleAddPatient = (newPatient) => {
    // In a real application, this would be an API call
    // For example:
    // const addPatient = async (patient) => {
    //   const response = await fetch('/api/patients', {
    //     method: 'POST',
    //     body: JSON.stringify(patient),
    //     headers: {
    //       'Content-Type': 'application/json'
    //     }
    //   });
    //   const data = await response.json();
    //   setPatients(prevPatients => [...prevPatients, data]);
    // }
    // addPatient(newPatient);

    // For now, we'll just add it to the local state
    setPatients((prevPatients) => [...prevPatients, { id: prevPatients.length + 1, ...newPatient }])
  }

  const handleEditPatient = (editedPatient) => {
    // In a real application, this would be an API call
    // For example:
    // const updatePatient = async (patient) => {
    //   const response = await fetch(`/api/patients/${patient.id}`, {
    //     method: 'PUT',
    //     body: JSON.stringify(patient),
    //     headers: {
    //       'Content-Type': 'application/json'
    //     }
    //   });
    //   const data = await response.json();
    //   setPatients(prevPatients => prevPatients.map(p => p.id === data.id ? data : p));
    // }
    // updatePatient(editedPatient);

    // For now, we'll just update the local state
    setPatients((prevPatients) => prevPatients.map((p) => (p.id === editedPatient.id ? editedPatient : p)))
    setIsEditing(false)
    setSelectedPatient(editedPatient)
  }

  const handleDeletePatient = (id) => {
    // In a real application, this would be an API call
    // For example:
    // const deletePatient = async (id) => {
    //   await fetch(`/api/patients/${id}`, {
    //     method: 'DELETE'
    //   });
    //   setPatients(prevPatients => prevPatients.filter(p => p.id !== id));
    // }
    // deletePatient(id);

    // For now, we'll just update the local state
    setPatients((prevPatients) => prevPatients.filter((p) => p.id !== id))
    setSelectedPatient(null)
  }

  return (
    <>
      <h1 className="text-3xl font-semibold mb-6">Patient Management</h1>
      <Card>
        <CardHeader>
          <CardTitle>Patients</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-4">
            <Input
              placeholder="Search patients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
            <Dialog>
              <DialogTrigger asChild>
                <Button>Add Patient</Button>
              </DialogTrigger>
              <DialogContent>
                <PatientForm onSubmit={handleAddPatient} doctors={doctors} />
              </DialogContent>
            </Dialog>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Condition</TableHead>
                <TableHead>Assigned Doctor</TableHead>
                <TableHead>Room</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPatients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell>{patient.name}</TableCell>
                  <TableCell>{patient.age}</TableCell>
                  <TableCell>{patient.condition}</TableCell>
                  <TableCell>{patient.doctor}</TableCell>
                  <TableCell>{patient.room}</TableCell>
                  <TableCell>
                    <Button onClick={() => setSelectedPatient(patient)}>View Details</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {selectedPatient && (
        <Dialog
          open={!!selectedPatient}
          onOpenChange={() => {
            setSelectedPatient(null)
            setIsEditing(false)
          }}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{isEditing ? "Edit Patient" : "Patient Details"}</DialogTitle>
            </DialogHeader>
            {isEditing ? (
              <PatientForm onSubmit={handleEditPatient} initialData={selectedPatient} doctors={doctors} />
            ) : (
              <>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">Name</Label>
                    <div className="col-span-3">{selectedPatient.name}</div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">Age</Label>
                    <div className="col-span-3">{selectedPatient.age}</div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">Condition</Label>
                    <div className="col-span-3">{selectedPatient.condition}</div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">Doctor</Label>
                    <div className="col-span-3">{selectedPatient.doctor}</div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">Room</Label>
                    <div className="col-span-3">{selectedPatient.room}</div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">Caretaker</Label>
                    <div className="col-span-3">{selectedPatient.caretaker}</div>
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={() => setIsEditing(true)}>Edit</Button>
                  <Button variant="destructive" onClick={() => handleDeletePatient(selectedPatient.id)}>
                    Delete
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}

function PatientForm({ onSubmit, initialData = {}, doctors }) {
  const [patient, setPatient] = useState(initialData)

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(patient)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input
            id="name"
            value={patient.name || ""}
            onChange={(e) => setPatient({ ...patient, name: e.target.value })}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="age" className="text-right">
            Age
          </Label>
          <Input
            id="age"
            type="number"
            value={patient.age || ""}
            onChange={(e) => setPatient({ ...patient, age: Number.parseInt(e.target.value) })}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="condition" className="text-right">
            Condition
          </Label>
          <Input
            id="condition"
            value={patient.condition || ""}
            onChange={(e) => setPatient({ ...patient, condition: e.target.value })}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="doctor" className="text-right">
            Doctor
          </Label>
          <Select value={patient.doctor || ""} onValueChange={(value) => setPatient({ ...patient, doctor: value })}>
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Select a doctor" />
            </SelectTrigger>
            <SelectContent>
              {doctors.map((doctor) => (
                <SelectItem key={doctor} value={doctor}>
                  {doctor}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="room" className="text-right">
            Room
          </Label>
          <Input
            id="room"
            value={patient.room || ""}
            onChange={(e) => setPatient({ ...patient, room: e.target.value })}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="caretaker" className="text-right">
            Caretaker
          </Label>
          <Input
            id="caretaker"
            value={patient.caretaker || ""}
            onChange={(e) => setPatient({ ...patient, caretaker: e.target.value })}
            className="col-span-3"
          />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">Save</Button>
      </DialogFooter>
    </form>
  )
}

