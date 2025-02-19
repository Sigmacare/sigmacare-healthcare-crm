const Navbar = () => {
    return (
      <div className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-lg font-bold">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <input type="text" placeholder="Search..." className="border p-2 rounded"/>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">Logout</button>
        </div>
      </div>
    );
  };
  
  export default Navbar;
  