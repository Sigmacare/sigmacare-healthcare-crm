const patients = [
    { id: 1, name: "John Doe", age: 45, condition: "Diabetes" },
    { id: 2, name: "Jane Smith", age: 38, condition: "Heart Disease" },
    { id: 3, name: "David Brown", age: 60, condition: "Hypertension" }
  ];
  
  const PatientTable = () => {
    return (
      <div className="bg-white p-5 shadow-md rounded-lg">
        <h2 className="text-lg font-bold mb-3">Recent Patients</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">ID</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Age</th>
              <th className="border p-2">Condition</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.id} className="text-center">
                <td className="border p-2">{patient.id}</td>
                <td className="border p-2">{patient.name}</td>
                <td className="border p-2">{patient.age}</td>
                <td className="border p-2">{patient.condition}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default PatientTable;
  