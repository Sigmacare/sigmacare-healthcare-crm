import { NextResponse } from "next/server"

export async function POST() {
  // Clear the auth cookie
  return NextResponse.json(
    { message: "Logged out successfully" },
    {
      status: 200,
      headers: {
        "Set-Cookie": "auth-token=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0",
      },
    },
  )
}

