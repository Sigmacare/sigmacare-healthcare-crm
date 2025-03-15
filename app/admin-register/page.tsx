"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"

export default function AdminRegisterPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    hospital: {
      name: "",
      email: "",
      contact: "",
      city: "",
      state: "",
      address: "",
    },
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleHospitalChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      hospital: {
        ...prev.hospital,
        [name]: value,
      },
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/auth/admin-register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Registration failed")
      }

      // Registration successful, redirect to login
      router.push("/login?registered=true")
    } catch (error) {
      setError(error.message || "An error occurred during registration")
      console.error("Registration error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-2xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Register Hospital</CardTitle>
          <CardDescription className="text-center">Create a hospital admin account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Admin Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Admin Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="admin@hospital.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <Separator className="my-4" />

              <h3 className="text-lg font-medium">Hospital Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="hospital-name">Hospital Name</Label>
                  <Input
                    id="hospital-name"
                    name="name"
                    placeholder="City Hospital"
                    value={formData.hospital.name}
                    onChange={handleHospitalChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hospital-email">Hospital Email</Label>
                  <Input
                    id="hospital-email"
                    name="email"
                    type="email"
                    placeholder="contact@hospital.com"
                    value={formData.hospital.email}
                    onChange={handleHospitalChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hospital-contact">Contact Number</Label>
                  <Input
                    id="hospital-contact"
                    name="contact"
                    placeholder="1234567890"
                    value={formData.hospital.contact}
                    onChange={handleHospitalChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hospital-city">City</Label>
                  <Input
                    id="hospital-city"
                    name="city"
                    placeholder="New York"
                    value={formData.hospital.city}
                    onChange={handleHospitalChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hospital-state">State</Label>
                  <Input
                    id="hospital-state"
                    name="state"
                    placeholder="NY"
                    value={formData.hospital.state}
                    onChange={handleHospitalChange}
                    required
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="hospital-address">Address</Label>
                  <Input
                    id="hospital-address"
                    name="address"
                    placeholder="123 Main St"
                    value={formData.hospital.address}
                    onChange={handleHospitalChange}
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full mt-6" disabled={isLoading}>
                {isLoading ? "Registering..." : "Register Hospital"}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

