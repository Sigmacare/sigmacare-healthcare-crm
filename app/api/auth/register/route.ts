import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { username, email, password, phone } = await request.json()

    // Validate input
    if (!username || !email || !password || !phone) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 })
    }

    // In a real app, you would call the SigmaCare API
    // For example:
    // const response = await fetch('https://sigmacare-api.example.com/api/users/register', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ username, email, password, phone }),
    // })
    // const data = await response.json()
    // if (!response.ok) {
    //   throw new Error(data.message || 'Registration failed')
    // }

    // For now, we'll simulate a successful registration
    return NextResponse.json({ message: "User registered successfully" }, { status: 201 })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

