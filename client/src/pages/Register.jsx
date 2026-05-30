import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import API from "../api/api";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/register", formData);

      alert("Registration Successful");

      navigate("/login");
    } catch (error) {
      console.log(error);

      alert("Registration Failed");
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-2xl shadow-md w-[400px]"
        >
          <h1 className="text-3xl font-bold mb-6 text-center">
            Register
          </h1>

          <input
            type="text"
            name="username"
            placeholder="Username"
            className="w-full p-3 border rounded-lg mb-4"
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-3 border rounded-lg mb-4"
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-3 border rounded-lg mb-4"
            onChange={handleChange}
          />

          <button className="w-full bg-black text-white p-3 rounded-lg">
            Register
          </button>

          <p className="mt-4 text-center">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-500"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
      <Navbar />
    </>
  );
}

export default Register;