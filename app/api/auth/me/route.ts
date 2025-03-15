import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// Mock user database - in a real app, this would be in a database
const users = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@hospital.com",
    password: "admin123", // In a real app, this would be hashed
    role: "admin",
  },
  {
    id: "2",
    name: "Dr. Smith",
    email: "doctor@hospital.com",
    password: "doctor123",
    role: "doctor",
  },
  {
    id: "3",
    name: "Nurse Johnson",
    email: "nurse@hospital.com",
    password: "nurse123",
    role: "nurse",
  },
  {
    id: "4",
    name: "Staff Member",
    email: "staff@hospital.com",
    password: "staff123",
    role: "staff",
  },
];

export async function GET() {
  try {
    // Get the token from cookies
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token");

    if (!token) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 }
      );
    }

    // In a real app, you would:
    // 1. Verify the JWT token
    // 2. Get the user ID from the token
    // 3. Fetch the user from the database

    // For this example, we'll simulate a logged-in user (admin)
    const user = users[0];
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({ user: userWithoutPassword }, { status: 200 });
  } catch (error) {
    console.error("Auth check error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
