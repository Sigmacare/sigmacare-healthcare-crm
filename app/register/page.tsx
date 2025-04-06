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

export default function RegisterPage() {
  const [isHospitalAdmin, setIsHospitalAdmin] = useState(false)
  const backend = process.env.NEXT_PUBLIC_BACKEND_URL
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    hospital: {
      name: "",
      email: "",
      contact: "",
      city: "",
      state: "",
      address: ""
    }
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name.startsWith("hospital.")) {
      const hospitalField = name.split(".")[1]
      setFormData((prev) => ({
        ...prev,
        hospital: {
          ...prev.hospital,
          [hospitalField]: value
        }
      }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const endpoint = isHospitalAdmin ? "/api/admin/register" : "/api/users/register"
      const response = await fetch(backend + endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()
      console.log("Registration response:", data)

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
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Create an Account</CardTitle>
          <CardDescription className="text-center">Enter your details to register</CardDescription>
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
              <div className="space-y-2">
                <Label htmlFor="username">User Name</Label>
                <Input
                  id="username"
                  name="username"
                  placeholder="johndoe(No spaces)"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  placeholder="1234567890"
                  value={formData.phone}
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
              {isHospitalAdmin && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="hospital.name">Renai Medicity</Label>
                    <Input
                      id="hospital.name"
                      name="hospital.name"
                      placeholder="City Hospital"
                      value={formData.hospital.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hospital.email">Hospital Email</Label>
                    <Input
                      id="hospital.email"
                      name="hospital.email"
                      type="email"
                      placeholder="contact@cityhospital.com"
                      value={formData.hospital.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hospital.contact">Hospital Contact</Label>
                    <Input
                      id="hospital.contact"
                      name="hospital.contact"
                      placeholder="1234567890"
                      value={formData.hospital.contact}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hospital.city">City</Label>
                    <Input
                      id="hospital.city"
                      name="hospital.city"
                      placeholder="New York"
                      value={formData.hospital.city}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hospital.state">State</Label>
                    <Input
                      id="hospital.state"
                      name="hospital.state"
                      placeholder="NY"
                      value={formData.hospital.state}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hospital.address">Address</Label>
                    <Input
                      id="hospital.address"
                      name="hospital.address"
                      placeholder="123 Main St"
                      value={formData.hospital.address}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </>
              )}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating Account..." : "Create Account"}
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
        <div className="flex justify-center mt-4">
          <Button variant="link" onClick={() => setIsHospitalAdmin(!isHospitalAdmin)}>
            {isHospitalAdmin ? "Switch to User Registration" : "Switch to Hospital Admin Registration"}
          </Button>
        </div>
      </Card>
    </div>
  )
}