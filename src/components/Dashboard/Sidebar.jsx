import {
  LayoutDashboard,
  Workflow,
  Plug,
  History,
  Settings,
  LogOut,
  Zap,
} from "lucide-react";
import { NavLink } from "react-router-dom";

function Sidebar() {
  const menuItems = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/dashboard",
    },
    {
      name: "Workflows",
      icon: <Workflow size={20} />,
      path: "/dashboard/workflows",
    },
    {
      name: "Integrations",
      icon: <Plug size={20} />,
      path: "/dashboard/integrations",
    },
    {
      name: "History",
      icon: <History size={20} />,
      path: "/dashboard/history",
    },
    {
      name: "Settings",
      icon: <Settings size={20} />,
      path: "/dashboard/settings",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <aside className="w-64 h-screen bg-[#0B1120] border-r border-gray-800 flex flex-col justify-between">

      {/* Logo */}

      <div>

        <div className="flex items-center gap-3 px-8 py-8 border-b border-gray-800">

          <div className="bg-blue-600 p-2 rounded-xl">

            <Zap size={24} className="text-white" />

          </div>

          <div>

            <h1 className="text-2xl font-bold text-white">
              MiniZap
            </h1>

            <p className="text-xs text-gray-400">
              Workflow Automation
            </p>

          </div>

        </div>

        {/* Navigation */}

        <nav className="mt-8 flex flex-col gap-2 px-4">

          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200
                ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }`
              }
            >
              {item.icon}

              <span className="font-medium">
                {item.name}
              </span>

            </NavLink>
          ))}

        </nav>

      </div>

      {/* Logout */}

      <div className="p-4 border-t border-gray-800">

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition"
        >

          <LogOut size={20} />

          Logout

        </button>

      </div>

    </aside>
  );
}

export default Sidebar; 