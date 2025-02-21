import Link from "next/link"
import { Home, Users, UserIcon as UserMd, Activity, AlertCircle, DollarSign } from "lucide-react"

export function Sidebar() {
  return (
    <div className="bg-card text-card-foreground w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
      <nav>
        <Link href="/" className="flex items-center space-x-2 px-4 py-2 hover:bg-accent rounded-lg">
          <Home className="h-5 w-5" />
          <span>Dashboard</span>
        </Link>
        <Link href="/patients" className="flex items-center space-x-2 px-4 py-2 mt-4 hover:bg-accent rounded-lg">
          <Users className="h-5 w-5" />
          <span>Patients</span>
        </Link>
        <Link href="/doctors" className="flex items-center space-x-2 px-4 py-2 mt-4 hover:bg-accent rounded-lg">
          <UserMd className="h-5 w-5" />
          <span>Doctors</span>
        </Link>
        <Link href="/monitoring" className="flex items-center space-x-2 px-4 py-2 mt-4 hover:bg-accent rounded-lg">
          <Activity className="h-5 w-5" />
          <span>Health Monitoring</span>
        </Link>
        <Link href="/emergency" className="flex items-center space-x-2 px-4 py-2 mt-4 hover:bg-accent rounded-lg">
          <AlertCircle className="h-5 w-5" />
          <span>Emergency</span>
        </Link>
        <Link href="/billing" className="flex items-center space-x-2 px-4 py-2 mt-4 hover:bg-accent rounded-lg">
          <DollarSign className="h-5 w-5" />
          <span>Billing</span>
        </Link>
      </nav>
    </div>
  )
}

