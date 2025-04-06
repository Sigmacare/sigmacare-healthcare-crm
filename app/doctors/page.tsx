"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const specialties = ["Cardiology", "Pediatrics", "Neurology", "Orthopedics", "General Practice"]

type Doctor = {
  _id: string
  name: string
  specialization: string
  experience: number
  contact: string
  hospitalId: string
  createdAt: string
  updatedAt: string
}

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const backend = process.env.NEXT_PUBLIC_BACKEND_URL

  useEffect(() => {
    const fetchDoctors = async () => {
      const token = localStorage.getItem("token")
      if (!token) {
        console.error("No token found")
        return
      }

      try {
        const response = await fetch(backend + "/api/admin/doctors", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        })

        if (!response.ok) {
          throw new Error("Failed to fetch doctors")
        }

        const data = await response.json()
        setDoctors(data.doctors)
      } catch (error) {
        console.error("Error fetching doctors:", error)
      }
    }

    fetchDoctors()
  }, [])

  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddDoctor = async (newDoctor: Doctor) => {
    const token = localStorage.getItem("token")
    if (!token) {
      console.error("No token found")
      return
    }

    try {
      const response = await fetch(backend + "/api/admin/add-doctor", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newDoctor)
      })

      if (!response.ok) {
        throw new Error("Failed to add doctor")
      }

      const data = await response.json()
      setDoctors((prevDoctors) => [...prevDoctors, data.doctor])
      setIsAddDialogOpen(false) // Close the dialog on successful submission
    } catch (error) {
      console.error("Error adding doctor:", error)
    }
  }

  const handleEditDoctor = async (editedDoctor: Doctor) => {
    const token = localStorage.getItem("token")
    if (!token) {
      console.error("No token found")
      return
    }

    try {
      const response = await fetch(backend + `/api/admin/doctor/${editedDoctor._id}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(editedDoctor)
      })

      if (!response.ok) {
        throw new Error("Failed to update doctor")
      }

      const data = await response.json()
      setDoctors((prevDoctors) => prevDoctors.map((d) => (d._id === data.doctor._id ? data.doctor : d)))
      setIsEditing(false)
      setSelectedDoctor(data.doctor)
      setIsEditDialogOpen(false) // Close the dialog on successful submission
    } catch (error) {
      console.error("Error updating doctor:", error)
    }
  }

  const handleDeleteDoctor = async (id: string) => {
    const token = localStorage.getItem("token")
    if (!token) {
      console.error("No token found")
      return
    }

    try {
      const response = await fetch(backend + `/api/admin/doctor/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      })

      if (!response.ok) {
        throw new Error("Failed to delete doctor")
      }

      setDoctors((prevDoctors) => prevDoctors.filter((d) => d._id !== id))
      setSelectedDoctor(null)
    } catch (error) {
      console.error("Error deleting doctor:", error)
    }
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
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => { setIsAddDialogOpen(true); setIsEditing(false); setSelectedDoctor(null); }}>Add Doctor</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Doctor</DialogTitle>
                </DialogHeader>
                <DoctorForm onSubmit={handleAddDoctor} specialties={specialties} closeDialog={() => setIsAddDialogOpen(false)} />
              </DialogContent>
            </Dialog>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Specialization</TableHead>
                <TableHead>Experience</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDoctors.map((doctor) => (
                <TableRow key={doctor._id}>
                  <TableCell>{doctor.name}</TableCell>
                  <TableCell>{doctor.specialization}</TableCell>
                  <TableCell>{doctor.experience}</TableCell>
                  <TableCell>{doctor.contact}</TableCell>
                  <TableCell>
                    <Button onClick={() => { setSelectedDoctor(doctor); setIsEditDialogOpen(true); setIsEditing(true); }}>Edit</Button>
                    <Button variant="secondary" onClick={() => { setSelectedDoctor(doctor); setIsViewDialogOpen(true); setIsEditing(false); }}>View Details</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {selectedDoctor && (
        <>
          <Dialog
            open={isEditDialogOpen}
            onOpenChange={(open) => {
              setIsEditDialogOpen(open)
              if (!open) {
                setSelectedDoctor(null)
                setIsEditing(false)
              }
            }}
          >
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Doctor</DialogTitle>
              </DialogHeader>
              <DoctorForm onSubmit={handleEditDoctor} initialData={selectedDoctor} specialties={specialties} closeDialog={() => setIsEditDialogOpen(false)} />
            </DialogContent>
          </Dialog>

          <Dialog
            open={isViewDialogOpen}
            onOpenChange={(open) => {
              setIsViewDialogOpen(open)
              if (!open) {
                setSelectedDoctor(null)
                setIsEditing(false)
              }
            }}
          >
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Doctor Details</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Name</Label>
                  <div className="col-span-3">{selectedDoctor.name}</div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Specialization</Label>
                  <div className="col-span-3">{selectedDoctor.specialization}</div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Experience</Label>
                  <div className="col-span-3">{selectedDoctor.experience}</div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Contact</Label>
                  <div className="col-span-3">{selectedDoctor.contact}</div>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={() => { setIsEditDialogOpen(true); setIsViewDialogOpen(false); }}>Edit</Button>
                <Button variant="destructive" onClick={() => handleDeleteDoctor(selectedDoctor._id)}>
                  Delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      )}
    </>
  )
}

type DoctorFormProps = {
  onSubmit: (doctor: Doctor) => void
  initialData?: Partial<Doctor>
  specialties: string[]
  closeDialog: () => void
}

function DoctorForm({ onSubmit, initialData = {}, specialties, closeDialog }: DoctorFormProps) {
  const [doctor, setDoctor] = useState<Doctor>({
    _id: initialData._id || "",
    name: initialData.name || "",
    specialization: initialData.specialization || "",
    experience: initialData.experience || 0,
    contact: initialData.contact || "",
    hospitalId: initialData.hospitalId || "",
    createdAt: initialData.createdAt || "",
    updatedAt: initialData.updatedAt || ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(doctor)
    closeDialog()
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
            value={doctor.name}
            onChange={(e) => setDoctor({ ...doctor, name: e.target.value })}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="specialization" className="text-right">
            Specialization
          </Label>
          <Select value={doctor.specialization} onValueChange={(value) => setDoctor({ ...doctor, specialization: value })}>
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Select a specialization" />
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
          <Label htmlFor="experience" className="text-right">
            Experience
          </Label>
          <Input
            id="experience"
            type="number"
            value={doctor.experience}
            onChange={(e) => setDoctor({ ...doctor, experience: Number.parseInt(e.target.value) })}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="contact" className="text-right">
            Contact
          </Label>
          <Input
            id="contact"
            value={doctor.contact}
            onChange={(e) => setDoctor({ ...doctor, contact: e.target.value })}
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