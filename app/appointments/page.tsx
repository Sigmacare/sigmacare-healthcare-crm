"use client"

import { useState, useEffect } from "react"
import { format, parseISO, isAfter } from "date-fns"
import { CalendarIcon, Clock, Search, Plus, Filter, MoreHorizontal } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

// Mock data for appointments
const initialAppointments = [
  {
    id: 1,
    patientName: "John Doe",
    patientId: "P-1001",
    doctorName: "Dr. Smith",
    doctorId: "D-501",
    department: "Cardiology",
    date: "2025-03-20",
    time: "09:00",
    duration: 30,
    status: "Scheduled",
    type: "Check-up",
    notes: "Regular cardiac check-up",
    room: "304",
    createdAt: "2025-03-10T10:30:00",
    updatedAt: "2025-03-10T10:30:00",
  },
  {
    id: 2,
    patientName: "Jane Smith",
    patientId: "P-1002",
    doctorName: "Dr. Johnson",
    doctorId: "D-502",
    department: "Neurology",
    date: "2025-03-15",
    time: "14:30",
    duration: 45,
    status: "Completed",
    type: "Consultation",
    notes: "Follow-up on previous treatment",
    room: "201",
    createdAt: "2025-03-05T09:15:00",
    updatedAt: "2025-03-15T15:30:00",
  },
  {
    id: 3,
    patientName: "Robert Brown",
    patientId: "P-1003",
    doctorName: "Dr. Williams",
    doctorId: "D-503",
    department: "Orthopedics",
    date: "2025-03-18",
    time: "11:15",
    duration: 60,
    status: "Cancelled",
    type: "Surgery Consultation",
    notes: "Patient requested cancellation",
    room: "105",
    createdAt: "2025-03-01T14:20:00",
    updatedAt: "2025-03-16T09:45:00",
  },
  {
    id: 4,
    patientName: "Emily Davis",
    patientId: "P-1004",
    doctorName: "Dr. Martinez",
    doctorId: "D-504",
    department: "Pediatrics",
    date: "2025-03-15",
    time: "10:00",
    duration: 30,
    status: "In Progress",
    type: "Vaccination",
    notes: "Regular vaccination schedule",
    room: "202",
    createdAt: "2025-03-08T11:30:00",
    updatedAt: "2025-03-15T10:05:00",
  },
  {
    id: 5,
    patientName: "Michael Wilson",
    patientId: "P-1005",
    doctorName: "Dr. Anderson",
    doctorId: "D-505",
    department: "Dermatology",
    date: "2025-03-22",
    time: "13:45",
    duration: 30,
    status: "Scheduled",
    type: "Consultation",
    notes: "Skin condition assessment",
    room: "303",
    createdAt: "2025-03-12T16:20:00",
    updatedAt: "2025-03-12T16:20:00",
  },
  {
    id: 6,
    patientName: "Sarah Johnson",
    patientId: "P-1006",
    doctorName: "Dr. Thompson",
    doctorId: "D-506",
    department: "Ophthalmology",
    date: "2025-03-16",
    time: "09:30",
    duration: 45,
    status: "Rescheduled",
    type: "Eye Examination",
    notes: "Rescheduled from previous week",
    room: "101",
    createdAt: "2025-03-02T10:15:00",
    updatedAt: "2025-03-14T11:20:00",
  },
  {
    id: 7,
    patientName: "David Lee",
    patientId: "P-1007",
    doctorName: "Dr. Garcia",
    doctorId: "D-507",
    department: "Gastroenterology",
    date: "2025-03-17",
    time: "15:00",
    duration: 30,
    status: "Scheduled",
    type: "Follow-up",
    notes: "Follow-up after medication change",
    room: "205",
    createdAt: "2025-03-10T09:45:00",
    updatedAt: "2025-03-10T09:45:00",
  },
  {
    id: 8,
    patientName: "Jennifer White",
    patientId: "P-1008",
    doctorName: "Dr. Robinson",
    doctorId: "D-508",
    department: "Endocrinology",
    date: "2025-03-19",
    time: "11:30",
    duration: 45,
    status: "Scheduled",
    type: "Consultation",
    notes: "Diabetes management review",
    room: "302",
    createdAt: "2025-03-11T14:30:00",
    updatedAt: "2025-03-11T14:30:00",
  },
]

// Mock data for doctors and departments
const doctors = [
  { id: "D-501", name: "Dr. Smith", department: "Cardiology" },
  { id: "D-502", name: "Dr. Johnson", department: "Neurology" },
  { id: "D-503", name: "Dr. Williams", department: "Orthopedics" },
  { id: "D-504", name: "Dr. Martinez", department: "Pediatrics" },
  { id: "D-505", name: "Dr. Anderson", department: "Dermatology" },
  { id: "D-506", name: "Dr. Thompson", department: "Ophthalmology" },
  { id: "D-507", name: "Dr. Garcia", department: "Gastroenterology" },
  { id: "D-508", name: "Dr. Robinson", department: "Endocrinology" },
]

const departments = [
  "Cardiology",
  "Neurology",
  "Orthopedics",
  "Pediatrics",
  "Dermatology",
  "Ophthalmology",
  "Gastroenterology",
  "Endocrinology",
]

const appointmentTypes = [
  "Check-up",
  "Consultation",
  "Follow-up",
  "Surgery Consultation",
  "Vaccination",
  "Eye Examination",
  "Emergency",
  "Procedure",
]

const appointmentStatuses = [
  "Scheduled",
  "Confirmed",
  "In Progress",
  "Completed",
  "Cancelled",
  "Rescheduled",
  "No Show",
]

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState(initialAppointments)
  const [filteredAppointments, setFilteredAppointments] = useState(initialAppointments)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDate, setSelectedDate] = useState(null)
  const [filters, setFilters] = useState({
    department: "",
    doctor: "",
    status: "",
    type: "",
  })
  const [activeTab, setActiveTab] = useState("all")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [newAppointment, setNewAppointment] = useState({
    patientName: "",
    patientId: "",
    doctorId: "",
    department: "",
    date: "",
    time: "",
    duration: 30,
    status: "Scheduled",
    type: "",
    notes: "",
    room: "",
  })

  // Apply filters and search
  useEffect(() => {
    let result = [...appointments]

    // Apply search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      result = result.filter(
        (appointment) =>
          appointment.patientName.toLowerCase().includes(term) ||
          appointment.patientId.toLowerCase().includes(term) ||
          appointment.doctorName.toLowerCase().includes(term) ||
          appointment.department.toLowerCase().includes(term),
      )
    }

    // Apply date filter
    if (selectedDate) {
      const dateStr = format(selectedDate, "yyyy-MM-dd")
      result = result.filter((appointment) => appointment.date === dateStr)
    }

    // Apply department filter
    if (filters.department) {
      result = result.filter((appointment) => appointment.department === filters.department)
    }

    // Apply doctor filter
    if (filters.doctor) {
      result = result.filter((appointment) => appointment.doctorId === filters.doctor)
    }

    // Apply status filter
    if (filters.status) {
      result = result.filter((appointment) => appointment.status === filters.status)
    }

    // Apply type filter
    if (filters.type) {
      result = result.filter((appointment) => appointment.type === filters.type)
    }

    // Apply tab filters
    if (activeTab === "today") {
      result = result.filter((appointment) => appointment.date === format(new Date(), "yyyy-MM-dd"))
    } else if (activeTab === "upcoming") {
      result = result.filter(
        (appointment) =>
          isAfter(parseISO(appointment.date), new Date()) &&
          appointment.status !== "Cancelled" &&
          appointment.status !== "Completed",
      )
    } else if (activeTab === "completed") {
      result = result.filter((appointment) => appointment.status === "Completed")
    } else if (activeTab === "cancelled") {
      result = result.filter((appointment) => appointment.status === "Cancelled")
    }

    setFilteredAppointments(result)
  }, [appointments, searchTerm, selectedDate, filters, activeTab])

  const handleSearch = (e) => {
    e.preventDefault()
    // Search is already handled in the useEffect
  }

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const resetFilters = () => {
    setSearchTerm("")
    setSelectedDate(null)
    setFilters({
      department: "",
      doctor: "",
      status: "",
      type: "",
    })
  }

  const handleAddAppointment = () => {
    // Find doctor name from doctor ID
    const doctor = doctors.find((doc) => doc.id === newAppointment.doctorId)

    const appointment = {
      id: appointments.length + 1,
      doctorName: doctor ? doctor.name : "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...newAppointment,
    }

    setAppointments([...appointments, appointment])
    setNewAppointment({
      patientName: "",
      patientId: "",
      doctorId: "",
      department: "",
      date: "",
      time: "",
      duration: 30,
      status: "Scheduled",
      type: "",
      notes: "",
      room: "",
    })
  }

  const handleEditAppointment = () => {
    const updatedAppointments = appointments.map((appointment) =>
      appointment.id === selectedAppointment.id
        ? { ...selectedAppointment, updatedAt: new Date().toISOString() }
        : appointment,
    )
    setAppointments(updatedAppointments)
    setIsEditModalOpen(false)
  }

  const handleDeleteAppointment = () => {
    const updatedAppointments = appointments.filter((appointment) => appointment.id !== selectedAppointment.id)
    setAppointments(updatedAppointments)
    setIsDeleteModalOpen(false)
    setSelectedAppointment(null)
  }

  const handleStatusChange = (appointmentId, newStatus) => {
    const updatedAppointments = appointments.map((appointment) =>
      appointment.id === appointmentId
        ? { ...appointment, status: newStatus, updatedAt: new Date().toISOString() }
        : appointment,
    )
    setAppointments(updatedAppointments)
  }

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case "Scheduled":
        return "outline"
      case "Confirmed":
        return "secondary"
      case "In Progress":
        return "default"
      case "Completed":
        return "success"
      case "Cancelled":
        return "destructive"
      case "Rescheduled":
        return "warning"
      case "No Show":
        return "destructive"
      default:
        return "outline"
    }
  }

  return (
    <div className="flex flex-col h-full">
      <h1 className="text-3xl font-semibold mb-6">Appointment Management</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-grow">
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              placeholder="Search by patient, doctor, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow"
              startIcon={<Search className="h-4 w-4" />}
            />
            <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-4">
                  <h4 className="font-medium">Filter Appointments</h4>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Select
                      value={filters.department}
                      onValueChange={(value) => handleFilterChange("department", value)}
                    >
                      <SelectTrigger id="department">
                        <SelectValue placeholder="All Departments" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Departments</SelectItem>
                        {departments.map((dept) => (
                          <SelectItem key={dept} value={dept}>
                            {dept}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="doctor">Doctor</Label>
                    <Select value={filters.doctor} onValueChange={(value) => handleFilterChange("doctor", value)}>
                      <SelectTrigger id="doctor">
                        <SelectValue placeholder="All Doctors" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Doctors</SelectItem>
                        {doctors.map((doctor) => (
                          <SelectItem key={doctor.id} value={doctor.id}>
                            {doctor.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select value={filters.status} onValueChange={(value) => handleFilterChange("status", value)}>
                      <SelectTrigger id="status">
                        <SelectValue placeholder="All Statuses" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        {appointmentStatuses.map((status) => (
                          <SelectItem key={status} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Type</Label>
                    <Select value={filters.type} onValueChange={(value) => handleFilterChange("type", value)}>
                      <SelectTrigger id="type">
                        <SelectValue placeholder="All Types" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        {appointmentTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex justify-between">
                    <Button variant="outline" size="sm" onClick={resetFilters}>
                      Reset
                    </Button>
                    <Button size="sm" onClick={() => setIsFilterOpen(false)}>
                      Apply
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
              </PopoverContent>
            </Popover>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Appointment
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Add New Appointment</DialogTitle>
                  <DialogDescription>Enter the details for the new appointment.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="patientName">Patient Name</Label>
                      <Input
                        id="patientName"
                        value={newAppointment.patientName}
                        onChange={(e) => setNewAppointment({ ...newAppointment, patientName: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="patientId">Patient ID</Label>
                      <Input
                        id="patientId"
                        value={newAppointment.patientId}
                        onChange={(e) => setNewAppointment({ ...newAppointment, patientId: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="doctor">Doctor</Label>
                      <Select
                        value={newAppointment.doctorId}
                        onValueChange={(value) =>
                          setNewAppointment({
                            ...newAppointment,
                            doctorId: value,
                            department: doctors.find((d) => d.id === value)?.department || "",
                          })
                        }
                      >
                        <SelectTrigger id="doctor">
                          <SelectValue placeholder="Select Doctor" />
                        </SelectTrigger>
                        <SelectContent>
                          {doctors.map((doctor) => (
                            <SelectItem key={doctor.id} value={doctor.id}>
                              {doctor.name} ({doctor.department})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <Input id="department" value={newAppointment.department} disabled />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Date</Label>
                      <Input
                        id="date"
                        type="date"
                        value={newAppointment.date}
                        onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="time">Time</Label>
                      <Input
                        id="time"
                        type="time"
                        value={newAppointment.time}
                        onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="duration">Duration (minutes)</Label>
                      <Input
                        id="duration"
                        type="number"
                        value={newAppointment.duration}
                        onChange={(e) =>
                          setNewAppointment({
                            ...newAppointment,
                            duration: Number.parseInt(e.target.value),
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="room">Room</Label>
                      <Input
                        id="room"
                        value={newAppointment.room}
                        onChange={(e) => setNewAppointment({ ...newAppointment, room: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="type">Appointment Type</Label>
                      <Select
                        value={newAppointment.type}
                        onValueChange={(value) => setNewAppointment({ ...newAppointment, type: value })}
                      >
                        <SelectTrigger id="type">
                          <SelectValue placeholder="Select Type" />
                        </SelectTrigger>
                        <SelectContent>
                          {appointmentTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="status">Status</Label>
                      <Select
                        value={newAppointment.status}
                        onValueChange={(value) => setNewAppointment({ ...newAppointment, status: value })}
                      >
                        <SelectTrigger id="status">
                          <SelectValue placeholder="Select Status" />
                        </SelectTrigger>
                        <SelectContent>
                          {appointmentStatuses.map((status) => (
                            <SelectItem key={status} value={status}>
                              {status}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea
                      id="notes"
                      value={newAppointment.notes}
                      onChange={(e) => setNewAppointment({ ...newAppointment, notes: e.target.value })}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={handleAddAppointment}>
                    Add Appointment
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </form>
        </div>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All Appointments</TabsTrigger>
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>
      </Tabs>

      <Card className="flex-grow">
        <CardHeader>
          <CardTitle>
            Appointments ({filteredAppointments.length})
            {selectedDate && (
              <span className="ml-2 text-sm font-normal">for {format(selectedDate, "MMMM d, yyyy")}</span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Doctor</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAppointments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4">
                      No appointments found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredAppointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell>
                        <div className="font-medium">{appointment.patientName}</div>
                        <div className="text-sm text-muted-foreground">{appointment.patientId}</div>
                      </TableCell>
                      <TableCell>
                        <div>{appointment.doctorName}</div>
                        <div className="text-sm text-muted-foreground">{appointment.doctorId}</div>
                      </TableCell>
                      <TableCell>{appointment.department}</TableCell>
                      <TableCell>
                        <div>{format(parseISO(appointment.date), "MMM d, yyyy")}</div>
                        <div className="text-sm text-muted-foreground flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {appointment.time} ({appointment.duration} min)
                        </div>
                      </TableCell>
                      <TableCell>{appointment.type}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadgeVariant(appointment.status)}>{appointment.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedAppointment(appointment)
                                setIsViewModalOpen(true)
                              }}
                            >
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedAppointment(appointment)
                                setIsEditModalOpen(true)
                              }}
                            >
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuLabel>Change Status</DropdownMenuLabel>
                            {appointmentStatuses
                              .filter((status) => status !== appointment.status)
                              .map((status) => (
                                <DropdownMenuItem
                                  key={status}
                                  onClick={() => handleStatusChange(appointment.id, status)}
                                >
                                  Mark as {status}
                                </DropdownMenuItem>
                              ))}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={() => {
                                setSelectedAppointment(appointment)
                                setIsDeleteModalOpen(true)
                              }}
                            >
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* View Appointment Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Appointment Details</DialogTitle>
          </DialogHeader>
          {selectedAppointment && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium">Patient</h4>
                  <p>{selectedAppointment.patientName}</p>
                  <p className="text-sm text-muted-foreground">{selectedAppointment.patientId}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Doctor</h4>
                  <p>{selectedAppointment.doctorName}</p>
                  <p className="text-sm text-muted-foreground">{selectedAppointment.doctorId}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium">Department</h4>
                  <p>{selectedAppointment.department}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Room</h4>
                  <p>{selectedAppointment.room}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium">Date & Time</h4>
                  <p>{format(parseISO(selectedAppointment.date), "MMMM d, yyyy")}</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedAppointment.time} ({selectedAppointment.duration} minutes)
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Status</h4>
                  <Badge variant={getStatusBadgeVariant(selectedAppointment.status)}>
                    {selectedAppointment.status}
                  </Badge>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium">Type</h4>
                <p>{selectedAppointment.type}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium">Notes</h4>
                <p className="text-sm">{selectedAppointment.notes}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                <div>
                  <p>Created: {format(parseISO(selectedAppointment.createdAt), "MMM d, yyyy h:mm a")}</p>
                </div>
                <div>
                  <p>Updated: {format(parseISO(selectedAppointment.updatedAt), "MMM d, yyyy h:mm a")}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Appointment Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Appointment</DialogTitle>
          </DialogHeader>
          {selectedAppointment && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-patientName">Patient Name</Label>
                  <Input
                    id="edit-patientName"
                    value={selectedAppointment.patientName}
                    onChange={(e) =>
                      setSelectedAppointment({
                        ...selectedAppointment,
                        patientName: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-patientId">Patient ID</Label>
                  <Input
                    id="edit-patientId"
                    value={selectedAppointment.patientId}
                    onChange={(e) =>
                      setSelectedAppointment({
                        ...selectedAppointment,
                        patientId: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-doctor">Doctor</Label>
                  <Select
                    value={selectedAppointment.doctorId}
                    onValueChange={(value) => {
                      const doctor = doctors.find((d) => d.id === value)
                      setSelectedAppointment({
                        ...selectedAppointment,
                        doctorId: value,
                        doctorName: doctor ? doctor.name : "",
                        department: doctor ? doctor.department : "",
                      })
                    }}
                  >
                    <SelectTrigger id="edit-doctor">
                      <SelectValue placeholder="Select Doctor" />
                    </SelectTrigger>
                    <SelectContent>
                      {doctors.map((doctor) => (
                        <SelectItem key={doctor.id} value={doctor.id}>
                          {doctor.name} ({doctor.department})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-department">Department</Label>
                  <Input id="edit-department" value={selectedAppointment.department} disabled />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-date">Date</Label>
                  <Input
                    id="edit-date"
                    type="date"
                    value={selectedAppointment.date}
                    onChange={(e) =>
                      setSelectedAppointment({
                        ...selectedAppointment,
                        date: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-time">Time</Label>
                  <Input
                    id="edit-time"
                    type="time"
                    value={selectedAppointment.time}
                    onChange={(e) =>
                      setSelectedAppointment({
                        ...selectedAppointment,
                        time: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-duration">Duration (minutes)</Label>
                  <Input
                    id="edit-duration"
                    type="number"
                    value={selectedAppointment.duration}
                    onChange={(e) =>
                      setSelectedAppointment({
                        ...selectedAppointment,
                        duration: Number.parseInt(e.target.value),
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-room">Room</Label>
                  <Input
                    id="edit-room"
                    value={selectedAppointment.room}
                    onChange={(e) =>
                      setSelectedAppointment({
                        ...selectedAppointment,
                        room: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-type">Appointment Type</Label>
                  <Select
                    value={selectedAppointment.type}
                    onValueChange={(value) =>
                      setSelectedAppointment({
                        ...selectedAppointment,
                        type: value,
                      })
                    }
                  >
                    <SelectTrigger id="edit-type">
                      <SelectValue placeholder="Select Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {appointmentTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-status">Status</Label>
                  <Select
                    value={selectedAppointment.status}
                    onValueChange={(value) =>
                      setSelectedAppointment({
                        ...selectedAppointment,
                        status: value,
                      })
                    }
                  >
                    <SelectTrigger id="edit-status">
                      <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent>
                      {appointmentStatuses.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-notes">Notes</Label>
                <Textarea
                  id="edit-notes"
                  value={selectedAppointment.notes}
                  onChange={(e) =>
                    setSelectedAppointment({
                      ...selectedAppointment,
                      notes: e.target.value,
                    })
                  }
                />
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleEditAppointment}>
                  Save Changes
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this appointment? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteAppointment}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

