import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const [search, setSearch] = useState("");

  console.log("TOKEN:", localStorage.getItem("token"));
  console.log("USER:", localStorage.getItem("user"));
  
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const handleSearch = (e) => {
    e.preventDefault();

    if (!search.trim()) return;

    navigate(`/search?q=${search}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <nav className="bg-[#1a1a1a] text-white shadow-lg px-8 py-4">
  <div className="flex items-center justify-between">
    
    {/* Logo */}
    <Link
      to="/"
      className="text-4xl font-bold"
    >
      Pinspace
    </Link>

    {/* Right Section */}
    <div className="flex items-center gap-6">
      
      <Link
        to="/profile"
        className="font-medium hover:text-red-400 transition"
      >
        👤 {user?.username}
      </Link>

      <Link
        to="/create"
        className="bg-black text-white px-6 py-2 rounded-full"
      >
        Create
      </Link>

      <form
        onSubmit={handleSearch}
      >
        <input
          type="text"
          placeholder="Search pins..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-80 px-4 py-2 rounded-full bg-[#2a2a2a] border border-gray-700 text-white"
        />
      </form>

      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-6 py-2 rounded-full"
      >
        Logout
      </button>

    </div>
  </div>
</nav>
);
}
export default Navbar;