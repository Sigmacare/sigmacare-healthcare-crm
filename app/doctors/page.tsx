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
const initialDoctors = [
  { id: 1, name: "Dr. Smith", specialty: "Cardiology", availability: "9:00 AM - 5:00 PM", appointments: 8 },
  { id: 2, name: "Dr. Johnson", specialty: "Pediatrics", availability: "10:00 AM - 6:00 PM", appointments: 6 },
  { id: 3, name: "Dr. Williams", specialty: "Neurology", availability: "8:00 AM - 4:00 PM", appointments: 7 },
  { id: 4, name: "Dr. Davis", specialty: "Orthopedics", availability: "11:00 AM - 7:00 PM", appointments: 5 },
]

// This would typically come from an API
const specialties = ["Cardiology", "Pediatrics", "Neurology", "Orthopedics", "General Practice"]

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState(initialDoctors)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDoctor, setSelectedDoctor] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editedDoctor, setEditedDoctor] = useState(null)

  // Simulating API call
  useEffect(() => {
    // In a real application, this would be an API call
    // For example:
    // const fetchDoctors = async () => {
    //   const response = await fetch('/api/doctors');
    //   const data = await response.json();
    //   setDoctors(data);
    // }
    // fetchDoctors();

    // For now, we'll just use the initial data
    setDoctors(initialDoctors)
  }, [])

  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddDoctor = (newDoctor) => {
    // In a real application, this would be an API call
    // For example:
    // const addDoctor = async (doctor) => {
    //   const response = await fetch('/api/doctors', {
    //     method: 'POST',
    //     body: JSON.stringify(doctor),
    //     headers: {
    //       'Content-Type': 'application/json'
    //     }
    //   });
    //   const data = await response.json();
    //   setDoctors(prevDoctors => [...prevDoctors, data]);
    // }
    // addDoctor(newDoctor);

    // For now, we'll just add it to the local state
    setDoctors((prevDoctors) => [...prevDoctors, { id: prevDoctors.length + 1, ...newDoctor }])
  }

  const handleEditDoctor = (editedDoctor) => {
    // In a real application, this would be an API call
    // For example:
    // const updateDoctor = async (doctor) => {
    //   const response = await fetch(`/api/doctors/${doctor.id}`, {
    //     method: 'PUT',
    //     body: JSON.stringify(doctor),
    //     headers: {
    //       'Content-Type': 'application/json'
    //     }
    //   });
    //   const data = await response.json();
    //   setDoctors(prevDoctors => prevDoctors.map(d => d.id === data.id ? data : d));
    // }
    // updateDoctor(editedDoctor);

    // For now, we'll just update the local state
    setDoctors((prevDoctors) => prevDoctors.map((d) => (d.id === editedDoctor.id ? editedDoctor : d)))
    setIsEditing(false)
    setSelectedDoctor(editedDoctor)
  }

  const handleDeleteDoctor = (id) => {
    // In a real application, this would be an API call
    // For example:
    // const deleteDoctor = async (id) => {
    //   await fetch(`/api/doctors/${id}`, {
    //     method: 'DELETE'
    //   });
    //   setDoctors(prevDoctors => prevDoctors.filter(d => d.id !== id));
    // }
    // deleteDoctor(id);

    // For now, we'll just update the local state
    setDoctors((prevDoctors) => prevDoctors.filter((d) => d.id !== id))
    setSelectedDoctor(null)
  }

  return (
    <>
      <h1 className="text-3xl font-semibold mb-6">Doctor Management</h1>
      <Card>
        <CardHeader>
          <CardTitle>Doctors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-4">
            <Input
              placeholder="Search doctors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
            <Dialog>
              <DialogTrigger asChild>
                <Button>Add Doctor</Button>
              </DialogTrigger>
              <DialogContent>
                <DoctorForm onSubmit={handleAddDoctor} specialties={specialties} />
              </DialogContent>
            </Dialog>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Specialty</TableHead>
                <TableHead>Availability</TableHead>
                <TableHead>Appointments</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDoctors.map((doctor) => (
                <TableRow key={doctor.id}>
                  <TableCell>{doctor.name}</TableCell>
                  <TableCell>{doctor.specialty}</TableCell>
                  <TableCell>{doctor.availability}</TableCell>
                  <TableCell>{doctor.appointments}</TableCell>
                  <TableCell>
                    <Button onClick={() => setSelectedDoctor(doctor)}>View Details</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {selectedDoctor && (
        <Dialog
          open={!!selectedDoctor}
          onOpenChange={() => {
            setSelectedDoctor(null)
            setIsEditing(false)
          }}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{isEditing ? "Edit Doctor" : "Doctor Details"}</DialogTitle>
            </DialogHeader>
            {isEditing ? (
              <DoctorForm onSubmit={handleEditDoctor} initialData={selectedDoctor} specialties={specialties} />
            ) : (
              <>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">Name</Label>
                    <div className="col-span-3">{selectedDoctor.name}</div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">Specialty</Label>
                    <div className="col-span-3">{selectedDoctor.specialty}</div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">Availability</Label>
                    <div className="col-span-3">{selectedDoctor.availability}</div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">Appointments</Label>
                    <div className="col-span-3">{selectedDoctor.appointments}</div>
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={() => setIsEditing(true)}>Edit</Button>
                  <Button variant="destructive" onClick={() => handleDeleteDoctor(selectedDoctor.id)}>
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

function DoctorForm({ onSubmit, initialData = {}, specialties }) {
  const [doctor, setDoctor] = useState(initialData)

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(doctor)
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
            value={doctor.name || ""}
            onChange={(e) => setDoctor({ ...doctor, name: e.target.value })}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="specialty" className="text-right">
            Specialty
          </Label>
          <Select value={doctor.specialty || ""} onValueChange={(value) => setDoctor({ ...doctor, specialty: value })}>
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Select a specialty" />
            </SelectTrigger>
            <SelectContent>
              {specialties.map((specialty) => (
                <SelectItem key={specialty} value={specialty}>
                  {specialty}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="availability" className="text-right">
            Availability
          </Label>
          <Input
            id="availability"
            value={doctor.availability || ""}
            onChange={(e) => setDoctor({ ...doctor, availability: e.target.value })}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="appointments" className="text-right">
            Appointments
          </Label>
          <Input
            id="appointments"
            type="number"
            value={doctor.appointments || ""}
            onChange={(e) => setDoctor({ ...doctor, appointments: Number.parseInt(e.target.value) })}
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

