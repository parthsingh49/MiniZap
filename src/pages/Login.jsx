import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope as Mail, FaLock as Lock, FaChrome as Chrome, FaGithub as Github } from "react-icons/fa";
import API from "../api/axios";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await API.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);

      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] flex items-center justify-center px-6 relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute w-[700px] h-[700px] bg-blue-600/20 blur-[180px] rounded-full -top-48"></div>

      {/* Card */}
      <div className="relative w-full max-w-md bg-gray-900/80 backdrop-blur-xl border border-gray-800 rounded-3xl p-8 shadow-2xl">

        <div className="text-center">
          <h1 className="text-4xl font-bold text-white">
            Welcome Back
          </h1>

          
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">

          {/* Email */}
          <div className="relative">

            <Mail
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
              size={18}
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              onChange={handleChange}
              className="w-full bg-gray-800 border border-gray-700 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />

          </div>

          {/* Password */}
          <div className="relative">

            <Lock
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
              size={18}
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              onChange={handleChange}
              className="w-full bg-gray-800 border border-gray-700 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />

          </div>

          {/* Login Button */}
          <button
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 transition rounded-xl py-3 font-semibold text-white"
          >
            {loading ? "Signing In..." : "Login"}
          </button>

        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-8">
          <div className="flex-1 h-px bg-gray-700"></div>

          <span className="text-gray-500 text-sm">
            OR
          </span>

          <div className="flex-1 h-px bg-gray-700"></div>
        </div>

        {/* OAuth Buttons */}
        <div className="space-y-4">

          <button className="w-full flex items-center justify-center gap-3 border border-gray-700 rounded-xl py-3 hover:bg-gray-800 transition text-white"
          
  onClick={() => {
    window.location.href = "http://localhost:5000/api/auth/google";
  }}
>
            <Chrome size={20} />

            Continue with Google

          </button>

          <button className="w-full flex items-center justify-center gap-3 border border-gray-700 rounded-xl py-3 hover:bg-gray-800 transition text-white"
            onClick={() => {
    window.location.href = "http://localhost:5000/api/auth/github";
  }}
          >

            <Github size={20} />

            Continue with GitHub

          </button>

        </div>

        {/* Register */}
        <p className="text-center text-gray-400 mt-8">

          Don't have an account?

          <Link
            to="/register"
            className="text-blue-500 hover:text-blue-400 ml-2"
          >
            Register
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Login;