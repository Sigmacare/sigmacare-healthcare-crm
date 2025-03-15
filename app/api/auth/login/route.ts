import { NextResponse } from "next/server"

// Mock user database - in a real app, this would be in a database
const users = [
  {
    id: "1",
    username: "John Doe",
    email: "user@example.com",
    password: "password123", // In a real app, this would be hashed
    role: "user",
  },
  {
    id: "2",
    username: "Dr. Smith",
    email: "doctor@example.com",
    password: "doctor123",
    role: "doctor",
  },
  {
    id: "3",
    username: "Nurse Johnson",
    email: "nurse@example.com",
    password: "nurse123",
    role: "nurse",
  },
]

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    // In a real app, you would call the SigmaCare API
    // For example:
    // const response = await fetch('https://sigmacare-api.example.com/api/users/login', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ email, password }),
    // })
    // const data = await response.json()
    // if (!response.ok) {
    //   throw new Error(data.message || 'Login failed')
    // }

    // For now, we'll simulate the API call
    // Find user by email
    const user = users.find((u) => u.email === email)

    // Check if user exists and password matches
    if (!user || user.password !== password) {
      return NextResponse.json({ message: "Invalid email or password" }, { status: 401 })
    }

    const { password: _, ...userWithoutPassword } = user

    // For this example, we'll simulate setting a session
    return NextResponse.json(
      { user: userWithoutPassword, token: "mock-token" },
      {
        status: 200,
        headers: {
          "Set-Cookie": `auth-token=mock-token; Path=/; HttpOnly; SameSite=Strict; Max-Age=${60 * 60 * 24 * 7}`, // 1 week
        },
      },
    )
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

