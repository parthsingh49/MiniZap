import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function Dashboard() {
  const navigate = useNavigate();

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "dark"
  );

  const [workflows, setWorkflows] = useState([]);
  const [loading, setLoading] = useState(true);

  // =========================
  // THEME
  // =========================

  useEffect(() => {
    const handleStorageChange = () => {
      setTheme(localStorage.getItem("theme") || "dark");
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener(
        "storage",
        handleStorageChange
      );
    };
  }, []);

  // =========================
  // FETCH WORKFLOWS
  // =========================

  useEffect(() => {
    const fetchWorkflows = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login");
          return;
        }

        const response = await API.get("/workflows", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setWorkflows(response.data);
      } catch (error) {
        console.log(
          "Dashboard Error:",
          error.response?.data || error
        );

        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchWorkflows();
  }, [navigate]);

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const isDark = theme === "dark";

  // =========================
  // THEME CLASSES
  // =========================

  const pageClass = isDark
    ? "bg-gray-950 text-white"
    : "bg-gray-100 text-gray-900";

  const cardClass = isDark
    ? "bg-gray-900 border-gray-800"
    : "bg-white border-gray-200";

  const secondaryText = isDark
    ? "text-gray-400"
    : "text-gray-600";

  const mutedText = isDark
    ? "text-gray-500"
    : "text-gray-500";

  // =========================
  // UI
  // =========================

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${pageClass}`}
    >
      {/* ================= HEADER ================= */}

      <header
        className={`h-16 border-b flex items-center justify-between px-8 transition-colors duration-300 ${
          isDark
            ? "border-gray-800 bg-gray-950"
            : "border-gray-200 bg-white"
        }`}
      >
        <div>
          <h1 className="text-2xl font-bold text-blue-500">
            MiniZap
          </h1>

          <p className={`text-sm ${secondaryText}`}>
            Workflow Automation Dashboard
          </p>
        </div>

        <div className="flex items-center gap-4">
          <span className={secondaryText}>
            Welcome, {user.name || "User"}
          </span>

          <button
            onClick={() => navigate("/settings")}
            className={`px-4 py-2 rounded-lg border transition ${
              isDark
                ? "border-gray-700 hover:bg-gray-800"
                : "border-gray-300 hover:bg-gray-100"
            }`}
          >
            Settings
          </button>

          <button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              navigate("/login");
            }}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
          >
            Logout
          </button>
        </div>
      </header>

      {/* ================= MAIN ================= */}

      <main className="max-w-7xl mx-auto px-8 py-10">

        {/* WELCOME */}

        <div className="mb-8">
          <h2 className="text-3xl font-bold">
            Dashboard
          </h2>

          <p className={`mt-2 ${secondaryText}`}>
            Manage and create your automated workflows.
          </p>
        </div>

        {/* ================= CREATE ================= */}

        <div
          className={`border rounded-2xl p-6 mb-8 transition-colors duration-300 ${cardClass}`}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold">
                Create a Workflow
              </h3>

              <p
                className={`text-sm mt-1 ${secondaryText}`}
              >
                Build event-driven automations using
                MiniZap.
              </p>
            </div>

            <button
              onClick={() => navigate("/builder")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg transition"
            >
              Create Workflow
            </button>
          </div>
        </div>

        {/* ================= SAVED WORKFLOWS ================= */}

        <div>
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-xl font-semibold">
              Your Workflows
            </h3>

            <span
              className={`text-sm ${secondaryText}`}
            >
              {workflows.length} workflow
              {workflows.length !== 1 ? "s" : ""}
            </span>
          </div>

          {loading ? (
            <div
              className={`border rounded-2xl p-8 text-center ${cardClass}`}
            >
              <p className={secondaryText}>
                Loading workflows...
              </p>
            </div>
          ) : workflows.length === 0 ? (
            <div
              className={`border rounded-2xl p-10 text-center ${cardClass}`}
            >
              <h4 className="text-lg font-semibold">
                No workflows yet
              </h4>

              <p
                className={`mt-2 mb-5 ${secondaryText}`}
              >
                Create your first workflow to get
                started.
              </p>

              <button
                onClick={() => navigate("/builder")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg transition"
              >
                Create Workflow
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {workflows.map((workflow) => (
                <div
                  key={workflow._id}
                  className={`border rounded-2xl p-5 transition-colors duration-300 ${cardClass}`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-lg">
                        {workflow.name}
                      </h4>

                      <p
                        className={`text-sm mt-1 ${mutedText}`}
                      >
                        {workflow.nodes?.length || 0} nodes
                        {" • "}
                        {workflow.edges?.length || 0} connections
                      </p>
                    </div>

                    <span className="text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-500">
                      {workflow.active
                        ? "Active"
                        : "Inactive"}
                    </span>
                  </div>

                  <button
                    onClick={() =>
                      navigate(
                        `/builder/${workflow._id}`
                      )
                    }
                    className="w-full mt-5 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
                  >
                    Open Workflow
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;