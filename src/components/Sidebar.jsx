import { Home, Users, Activity, Settings } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-5">
      <h2 className="text-xl font-bold mb-5">Hospital Dashboard</h2>
      <ul>
        <li className="flex items-center p-2 hover:bg-gray-700 rounded">
          <Home className="w-5 h-5 mr-2" /> Dashboard
        </li>
        <li className="flex items-center p-2 hover:bg-gray-700 rounded">
          <Users className="w-5 h-5 mr-2" /> Patients
        </li>
        <li className="flex items-center p-2 hover:bg-gray-700 rounded">
          <Activity className="w-5 h-5 mr-2" /> Reports
        </li>
        <li className="flex items-center p-2 hover:bg-gray-700 rounded">
          <Settings className="w-5 h-5 mr-2" /> Settings
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
