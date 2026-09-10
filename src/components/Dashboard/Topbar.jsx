import {
  Bell,
  Search,
  Plus,
  UserCircle,
} from "lucide-react";

function Topbar() {
  return (
    <header className="h-20 border-b border-gray-800 bg-[#030712] flex items-center justify-between px-8">

      {/* Left Side */}
      <div>
        <h1 className="text-3xl font-bold text-white">
          Welcome back 👋
        </h1>

        <p className="text-gray-400 mt-1">
          Manage and monitor your automation workflows.
        </p>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-5">

        {/* Search */}
        <div className="relative">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
          />

          <input
            type="text"
            placeholder="Search workflows..."
            className="bg-gray-900 border border-gray-800 rounded-xl pl-11 pr-4 py-3 w-72 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
          />

        </div>

        {/* New Workflow Button */}
        <button
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 transition px-5 py-3 rounded-xl text-white font-medium shadow-lg shadow-blue-600/20"
        >
          <Plus size={18} />

          New Workflow
        </button>

        {/* Notification */}
        <button
          className="p-3 rounded-xl bg-gray-900 border border-gray-800 hover:border-blue-500 transition"
        >
          <Bell size={20} className="text-gray-300" />
        </button>

        {/* Profile */}
        <button
          className="flex items-center gap-3 bg-gray-900 border border-gray-800 rounded-xl px-4 py-2 hover:border-blue-500 transition"
        >
          <UserCircle size={34} className="text-blue-400" />

          <div className="text-left">

            <p className="text-white font-medium">
              Parth Singh
            </p>

            <p className="text-gray-400 text-sm">
              Free Plan
            </p>

          </div>

        </button>

      </div>

    </header>
  );
}

export default Topbar;