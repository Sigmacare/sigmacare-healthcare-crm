const DashboardCard = () => {
    const stats = [
      { title: "Total Patients", value: "450", color: "bg-blue-500" },
      { title: "New Admissions", value: "25", color: "bg-green-500" },
      { title: "Doctors On Duty", value: "18", color: "bg-yellow-500" },
      { title: "Available Beds", value: "12", color: "bg-red-500" }
    ];
  
    return (
      <div className="grid grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className={`${stat.color} text-white p-5 rounded-lg shadow-md`}>
            <h3 className="text-lg font-bold">{stat.title}</h3>
            <p className="text-2xl">{stat.value}</p>
          </div>
        ))}
      </div>
    );
  };
  
  export default DashboardCard;
  