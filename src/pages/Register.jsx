import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope as Mail, FaLock as Lock, FaUser as User, FaChrome as Chrome, FaGithub as Github } from "react-icons/fa";
import API from "../api/axios";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/auth/register", {
        name: form.name,
        email: form.email,
        password: form.password,
      });

      // Save JWT
      localStorage.setItem("token", res.data.token);

      // Optional: Save user info
      if (res.data.user) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
      }

      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

 const googleLogin = () => {
  window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
};

const githubLogin = () => {
  window.location.href = `${import.meta.env.VITE_API_URL}/auth/github`;
};

  return (
    <div className="min-h-screen bg-[#030712] flex items-center justify-center px-6 relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute w-[700px] h-[700px] bg-blue-600/20 blur-[180px] rounded-full -top-48"></div>

      {/* Register Card */}
      <div className="relative w-full max-w-md bg-gray-900/80 backdrop-blur-xl border border-gray-800 rounded-3xl p-8 shadow-2xl">

        <div className="text-center">

          <h1 className="text-4xl font-bold text-white">
            Create Account
          </h1>

          <p className="text-gray-400 mt-2">
            Start building automations with MiniZap
          </p>

        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">

          {/* Name */}
          <div className="relative">

            <User
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
            />

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full bg-gray-800 border border-gray-700 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />

          </div>

          {/* Email */}
          <div className="relative">

            <Mail
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full bg-gray-800 border border-gray-700 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />

          </div>

          {/* Password */}
          <div className="relative">

            <Lock
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full bg-gray-800 border border-gray-700 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />

          </div>

          {/* Confirm Password */}
          <div className="relative">

            <Lock
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              className="w-full bg-gray-800 border border-gray-700 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />

          </div>

          {/* Register Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 transition rounded-xl py-3 font-semibold text-white"
          >
            {loading ? "Creating Account..." : "Create Account"}
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

          <button
            onClick={googleLogin}
            className="w-full flex items-center justify-center gap-3 border border-gray-700 rounded-xl py-3 hover:bg-gray-800 transition text-white"
          >
            <Chrome size={20} />
            Continue with Google
          </button>

          <button
            onClick={githubLogin}
            className="w-full flex items-center justify-center gap-3 border border-gray-700 rounded-xl py-3 hover:bg-gray-800 transition text-white"
          >
            <Github size={20} />
            Continue with GitHub
          </button>

        </div>

        {/* Login */}
        <p className="text-center text-gray-400 mt-8">
          Already have an account?

          <Link
            to="/login"
            className="text-blue-500 hover:text-blue-400 ml-2"
          >
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Register;