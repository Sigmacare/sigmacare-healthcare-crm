"use client"

import { ProtectedRoute } from "@/components/protected-route"
// ... other imports

export default function BillingPage() {
  // ... existing component code

  return <ProtectedRoute allowedRoles={["admin", "staff"]}>{/* Existing component JSX */}</ProtectedRoute>
}

