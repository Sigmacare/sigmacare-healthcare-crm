import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { email, password, hospital } = await request.json()

    // Validate input
    if (!email || !password || !hospital) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 })
    }

    // Validate hospital fields
    const requiredHospitalFields = ["name", "email", "contact", "city", "state", "address"]
    for (const field of requiredHospitalFields) {
      if (!hospital[field]) {
        return NextResponse.json({ message: `Hospital ${field} is required` }, { status: 400 })
      }
    }

    // In a real app, you would call the SigmaCare API
    // For example:
    // const response = await fetch('https://sigmacare-api.example.com/api/admin/register', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ email, password, hospital }),
    // })
    // const data = await response.json()
    // if (!response.ok) {
    //   throw new Error(data.message || 'Registration failed')
    // }

    // For now, we'll simulate a successful registration
    return NextResponse.json({ message: "Admin registered successfully, pending verification" }, { status: 201 })
  } catch (error) {
    console.error("Admin registration error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

