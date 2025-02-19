import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import PatientTable from "../components/PatientTable";
import DashboardCard from "../components/Dashboardcard";

const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-5">
        <Navbar />
        <div className="mt-5">
          <DashboardCard />
        </div>
        <div className="mt-5">
          <PatientTable />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
