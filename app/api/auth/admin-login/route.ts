import { NextResponse } from "next/server"

// Mock admin database - in a real app, this would be in a database
const admins = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@hospital.com",
    password: "admin123", // In a real app, this would be hashed
    role: "admin",
    hospitalId: "hospital-123",
  },
]

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    // In a real app, you would call the SigmaCare API
    // For example:
    // const response = await fetch('https://sigmacare-api.example.com/api/admin/login', {
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
    // Find admin by email
    const admin = admins.find((a) => a.email === email)

    // Check if admin exists and password matches
    if (!admin || admin.password !== password) {
      return NextResponse.json({ message: "Invalid email or password" }, { status: 401 })
    }

    const { password: _, ...adminWithoutPassword } = admin

    // For this example, we'll simulate setting a session
    return NextResponse.json(
      { user: adminWithoutPassword, token: "mock-token" },
      {
        status: 200,
        headers: {
          "Set-Cookie": `auth-token=mock-token; Path=/; HttpOnly; SameSite=Strict; Max-Age=${60 * 60 * 24 * 7}`, // 1 week
        },
      },
    )
  } catch (error) {
    console.error("Admin login error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

