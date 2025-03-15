"use client"

import { ProtectedRoute } from "@/components/protected-route"
// ... other imports

export default function DoctorsPage() {
  // ... existing component code

  return <ProtectedRoute allowedRoles={["admin"]}>{/* Existing component JSX */}</ProtectedRoute>
}

