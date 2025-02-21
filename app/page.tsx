import { OverviewPanel } from "@/components/overview-panel"
import { PatientManagement } from "@/components/patient-management"
import { DoctorSchedule } from "@/components/doctor-schedule"
import { LiveHealthMonitoring } from "@/components/live-health-monitoring"
import { AppointmentsAndBilling } from "@/components/appointments-and-billing"
import { EmergencyAlerts } from "@/components/emergency-alerts"

export default function Dashboard() {
  return (
    <>
      <h1 className="text-3xl font-semibold mb-6">Hospital Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <OverviewPanel />
        <LiveHealthMonitoring />
        <EmergencyAlerts />
      </div>
      <div className="mt-6">
        <PatientManagement />
      </div>
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DoctorSchedule />
        <AppointmentsAndBilling />
      </div>
    </>
  )
}

