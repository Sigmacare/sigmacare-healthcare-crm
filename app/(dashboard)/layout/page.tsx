"use client"

import { ProtectedRoute } from "@/components/protected-route"
// ... other imports

export default function HospitalLayoutPage() {
  // ... existing component code

  return <ProtectedRoute allowedRoles={["admin", "doctor"]}>{/* Existing component JSX */}</ProtectedRoute>
}

