import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-black/60 backdrop-blur-xl border-b border-gray-800">

      <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-5">

        {/* Logo */}

        <Link
          to="/"
          className="text-3xl font-bold text-blue-500 hover:text-blue-400 transition"
        >
          MiniZap
        </Link>

        {/* Navigation */}

        <div className="hidden md:flex items-center gap-8">

          <a
            href="#features"
            className="text-gray-300 hover:text-white transition"
          >
            Features
          </a>

          <a
            href="#about"
            className="text-gray-300 hover:text-white transition"
          >
            About
          </a>

          <a
            href="#roadmap"
            className="text-gray-300 hover:text-white transition"
          >
            Roadmap
          </a>

        </div>

        {/* Right Buttons */}

        <div className="flex items-center gap-3">

          <Link
            to="/login"
            className="px-5 py-2.5 text-gray-300 hover:text-white transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="
              bg-blue-600
              hover:bg-blue-700
              transition
              px-5
              py-2.5
              rounded-lg
              font-medium
              shadow-lg
              shadow-blue-500/20
            "
          >
            Get Started
          </Link>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;