"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import PatientDetails from "./Components/PatientDetails" // Import the new component

export type Patient = {
  _id: string
  name: string
  age: number
  medical_conditions: string[]
  device_id?: string
  assigned_doctor?: string
}

const doctors = ["Dr. Smith", "Dr. Johnson", "Dr. Williams", "Dr. Davis"]

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isViewingDetails, setIsViewingDetails] = useState(false)
  const backend = process.env.NEXT_PUBLIC_BACKEND_URL

  useEffect(() => {
    const fetchPatients = async () => {
      const token = localStorage.getItem("token")
      if (!token) {
        console.error("No token found")
        return
      }

      try {
        const response = await fetch(`${backend}/api/patients`, {
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
        console.log(data)
        setPatients(data)
      } catch (error) {
        console.error("Error fetching patients:", error)
      }
    }

    fetchPatients()
  }, [backend])

  const filteredPatients = patients.filter((patient) => patient.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const handleAddPatient = async (newPatient: Omit<Patient, "_id">) => {
    const token = localStorage.getItem("token")
    if (!token) {
      console.error("No token found")
      return
    }

    try {
      const response = await fetch(`${backend}/api/patients`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newPatient)
      })

      if (!response.ok) {
        throw new Error("Failed to add patient")
      }

      const data = await response.json()
      setPatients((prevPatients) => [...prevPatients, data.patient])
      setIsDialogOpen(false) // Close the dialog on successful submission
    } catch (error) {
      console.error("Error adding patient:", error)
    }
  }

  const handleEditPatient = async (editedPatient: Patient) => {
    const token = localStorage.getItem("token")
    console.log(editedPatient)
    if (!token) {
      console.error("No token found")
      return
    }

    try {
      const response = await fetch(`${backend}/api/patients/${editedPatient._id}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(editedPatient)
      })
      console.log(response)

      if (!response.ok) {
        throw new Error("Failed to update patient")
      }

      const data = await response.json()
      setPatients((prevPatients) => prevPatients.map((p) => (p._id === data.patient._id ? data.patient : p)))
      setIsEditing(false)
      setSelectedPatient(data.patient)
      setIsDialogOpen(false) // Close the dialog on successful submission
    } catch (error) {
      console.error("Error updating patient:", error)
    }
  }

  const handleDeletePatient = async (id: string) => {
    const token = localStorage.getItem("token")
    if (!token) {
      console.error("No token found")
      return
    }

    try {
      const response = await fetch(`${backend}/api/patients/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      })

      if (!response.ok) {
        throw new Error("Failed to delete patient")
      }

      setPatients((prevPatients) => prevPatients.filter((p) => p._id !== id))
      setSelectedPatient(null)
    } catch (error) {
      console.error("Error deleting patient:", error)
    }
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
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => { setIsDialogOpen(true); setIsEditing(false); setSelectedPatient(null); setIsViewingDetails(false); }}>Add Patient</Button>
              </DialogTrigger>
              {!isEditing && !isViewingDetails && (
                <DialogContent className="max-w-4xl"> {/* Adjust the width of the dialog */}
                  <DialogHeader>
                    <DialogTitle>Add Patient</DialogTitle>
                  </DialogHeader>
                  <PatientForm onSubmit={handleAddPatient} doctors={doctors} />
                </DialogContent>
              )}
            </Dialog>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Condition</TableHead>
                <TableHead>Assigned Doctor</TableHead>
                <TableHead>Device ID</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPatients.map((patient) => (
                <TableRow key={patient._id}>
                  <TableCell>{patient.name}</TableCell>
                  <TableCell>{patient.age}</TableCell>
                  <TableCell>{patient.medical_conditions.join(", ")}</TableCell>
                  <TableCell>{patient.assigned_doctor || "N/A"}</TableCell>
                  <TableCell>{patient.device_id || "N/A"}</TableCell>
                  <TableCell>
                    <Button onClick={() => { setSelectedPatient(patient); setIsDialogOpen(true); setIsEditing(true); setIsViewingDetails(false); }}>Edit</Button>
                    <Button variant="secondary" onClick={() => { setSelectedPatient(patient); setIsDialogOpen(true); setIsEditing(false); setIsViewingDetails(true); }}>View Details</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {selectedPatient && (
        <Dialog
          open={isDialogOpen}
          onOpenChange={(open) => {
            setIsDialogOpen(open)
            if (!open) {
              setSelectedPatient(null)
              setIsEditing(false)
              setIsViewingDetails(false)
            }
          }}
        >
          <DialogContent className="max-w-4xl"> {/* Adjust the width of the dialog */}
            <DialogHeader>
              <DialogTitle>{isEditing ? "Edit Patient" : "Patient Details"}</DialogTitle>
            </DialogHeader>
            {isEditing ? (
              <PatientForm onSubmit={() => handleEditPatient(selectedPatient)} initialData={selectedPatient} doctors={doctors} />
            ) : (
              <PatientDetails patient={selectedPatient} onDelete={handleDeletePatient} />
            )}
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}

type PatientFormProps = {
  onSubmit: (patient: Omit<Patient, "_id">) => void | Promise<void>
  initialData?: Partial<Patient>
  doctors: string[]
}

function PatientForm({ onSubmit, initialData = {}, doctors }: PatientFormProps) {
  const [patient, setPatient] = useState<Omit<Patient, "_id">>({
    name: initialData.name || "",
    age: initialData.age || 0,
    medical_conditions: initialData.medical_conditions || [],
    device_id: initialData.device_id || "",
    assigned_doctor: initialData.assigned_doctor || ""
  })

  const handleSubmit = (e: React.FormEvent) => {
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
            value={patient.name}
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
            value={patient.age}
            onChange={(e) => setPatient({ ...patient, age: Number.parseInt(e.target.value) })}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="medical_conditions" className="text-right">
            Condition
          </Label>
          <Input
            id="medical_conditions"
            value={patient.medical_conditions.join(", ")}
            onChange={(e) => setPatient({ ...patient, medical_conditions: e.target.value.split(", ") })}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="doctor" className="text-right">
            Doctor
          </Label>
          <Select value={patient.assigned_doctor} onValueChange={(value) => setPatient({ ...patient, assigned_doctor: value })}>
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
          <Label htmlFor="device_id" className="text-right">
            Device ID
          </Label>
          <Input
            id="device_id"
            value={patient.device_id}
            onChange={(e) => setPatient({ ...patient, device_id: e.target.value })}
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