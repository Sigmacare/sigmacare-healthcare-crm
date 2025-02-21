"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

const initialBillings = [
  { id: 1, patient: "John Doe", service: "Check-up", amount: 150, status: "Paid" },
  { id: 2, patient: "Jane Smith", service: "Lab Tests", amount: 300, status: "Pending" },
  { id: 3, patient: "Bob Brown", service: "X-Ray", amount: 200, status: "Overdue" },
]

export default function BillingPage() {
  const [billings, setBillings] = useState(initialBillings)
  const [searchTerm, setSearchTerm] = useState("")
  const [newBilling, setNewBilling] = useState({ patient: "", service: "", amount: "", status: "" })

  const filteredBillings = billings.filter(
    (billing) =>
      billing.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      billing.service.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddBilling = () => {
    setBillings([...billings, { id: billings.length + 1, ...newBilling, amount: Number.parseFloat(newBilling.amount) }])
    setNewBilling({ patient: "", service: "", amount: "", status: "" })
  }

  return (
    <>
      <h1 className="text-3xl font-semibold mb-6">Billing Management</h1>
      <Card>
        <CardHeader>
          <CardTitle>Billing Records</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-4">
            <Input
              placeholder="Search billings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
            <Dialog>
              <DialogTrigger asChild>
                <Button>Add Billing</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Billing</DialogTitle>
                  <DialogDescription>Enter the details of the new billing record here.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="patient" className="text-right">
                      Patient
                    </Label>
                    <Input
                      id="patient"
                      value={newBilling.patient}
                      onChange={(e) => setNewBilling({ ...newBilling, patient: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="service" className="text-right">
                      Service
                    </Label>
                    <Input
                      id="service"
                      value={newBilling.service}
                      onChange={(e) => setNewBilling({ ...newBilling, service: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="amount" className="text-right">
                      Amount
                    </Label>
                    <Input
                      id="amount"
                      type="number"
                      value={newBilling.amount}
                      onChange={(e) => setNewBilling({ ...newBilling, amount: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="status" className="text-right">
                      Status
                    </Label>
                    <Input
                      id="status"
                      value={newBilling.status}
                      onChange={(e) => setNewBilling({ ...newBilling, status: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleAddBilling}>Add Billing</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBillings.map((billing) => (
                <TableRow key={billing.id}>
                  <TableCell>{billing.patient}</TableCell>
                  <TableCell>{billing.service}</TableCell>
                  <TableCell>${billing.amount}</TableCell>
                  <TableCell>{billing.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  )
}

