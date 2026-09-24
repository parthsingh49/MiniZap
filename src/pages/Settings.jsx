import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  User,
  Palette,
  Link,
  Shield,
  Trash2,
} from "lucide-react";

import API from "../api/axios";

function Settings() {
  const navigate = useNavigate();

  // =========================
  // USER
  // =========================

  const [user, setUser] = useState(null);

  // =========================
  // PROFILE
  // =========================

  const [name, setName] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);

  // =========================
  // THEME
  // =========================

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "dark"
  );

  // =========================
  // PASSWORD
  // =========================

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [changingPassword, setChangingPassword] = useState(false);

  // =========================
  // CONNECTED APPS
  // =========================

  const [connectedApps, setConnectedApps] = useState({
    google: false,
    github: false,
  });

  // =========================
  // LOAD THEME
  // =========================

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  // =========================
  // LOAD SETTINGS
  // =========================

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login");
          return;
        }

        // Get profile
        const profileResponse = await API.get(
          "/settings/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const currentUser = profileResponse.data.user;

        setUser(currentUser);
        setName(currentUser.name || "");

        localStorage.setItem(
          "user",
          JSON.stringify(currentUser)
        );

        // Get connected apps
        const appsResponse = await API.get(
          "/settings/connected-apps",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setConnectedApps(appsResponse.data);
      } catch (error) {
        console.log(
          "Settings Load Error:",
          error.response?.data || error
        );

        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");

          navigate("/login");
        }
      }
    };

    loadSettings();
  }, [navigate]);

  // =========================
  // PROFILE UPDATE
  // =========================

  const handleSaveProfile = async () => {
    try {
      if (!name.trim()) {
        alert("Name cannot be empty.");
        return;
      }

      setSavingProfile(true);

      const token = localStorage.getItem("token");

      const response = await API.put(
        "/settings/profile",
        {
          name: name.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedUser = response.data.user;

      setUser(updatedUser);

      localStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      );

      alert("Profile updated successfully! ✅");
    } catch (error) {
      console.log(
        "Profile Update Error:",
        error.response?.data || error
      );

      alert(
        error.response?.data?.message ||
          "Failed to update profile."
      );
    } finally {
      setSavingProfile(false);
    }
  };

  // =========================
  // CHANGE PASSWORD
  // =========================

  const handleChangePassword = async (event) => {
    event.preventDefault();

    if (!currentPassword || !newPassword) {
      alert("Please enter both passwords.");
      return;
    }

    if (newPassword.length < 6) {
      alert(
        "New password must be at least 6 characters."
      );
      return;
    }

    try {
      setChangingPassword(true);

      const token = localStorage.getItem("token");

      const response = await API.put(
        "/settings/password",
        {
          currentPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(
        response.data.message ||
          "Password changed successfully."
      );

      setCurrentPassword("");
      setNewPassword("");

      // Password change invalidates the current session
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      navigate("/login");
    } catch (error) {
      console.log(
        "Change Password Error:",
        error.response?.data || error
      );

      alert(
        error.response?.data?.message ||
          "Failed to change password."
      );
    } finally {
      setChangingPassword(false);
    }
  };

  // =========================
  // LOGOUT ALL DEVICES
  // =========================

  const handleLogoutAll = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to logout from all devices?"
    );

    if (!confirmed) return;

    try {
      const token = localStorage.getItem("token");

      const response = await API.post(
        "/settings/logout-all",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(
        response.data.message ||
          "Logged out from all devices."
      );

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      navigate("/login");
    } catch (error) {
      console.log(
        "Logout All Error:",
        error.response?.data || error
      );

      alert(
        error.response?.data?.message ||
          "Failed to logout from all devices."
      );
    }
  };

  // =========================
  // DELETE ACCOUNT
  // =========================

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "This will permanently delete your account and all your workflows. Continue?"
    );

    if (!confirmed) return;

    try {
      const token = localStorage.getItem("token");

      const response = await API.delete(
        "/settings/account",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(
        response.data.message ||
          "Account deleted successfully."
      );

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      navigate("/register");
    } catch (error) {
      console.log(
        "Delete Account Error:",
        error.response?.data || error
      );

      alert(
        error.response?.data?.message ||
          "Failed to delete account."
      );
    }
  };

  // =========================
  // THEME COLORS
  // =========================

  const isDark = theme === "dark";

  const pageClass = isDark
    ? "bg-gray-950 text-white"
    : "bg-gray-100 text-gray-900";

  const headerClass = isDark
    ? "border-gray-800 bg-gray-950"
    : "border-gray-200 bg-white";

  const sectionClass = isDark
    ? "bg-gray-900 border-gray-800"
    : "bg-white border-gray-200";

  const inputClass = isDark
    ? "bg-gray-950 border-gray-700 text-white"
    : "bg-gray-50 border-gray-300 text-gray-900";

  const secondaryText = isDark
    ? "text-gray-400"
    : "text-gray-600";

  const mutedText = isDark
    ? "text-gray-500"
    : "text-gray-500";

  const innerBoxClass = isDark
    ? "bg-gray-950 border-gray-800"
    : "bg-gray-50 border-gray-200";

  // =========================
  // UI
  // =========================

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${pageClass}`}
    >
      {/* ================= HEADER ================= */}

      <header
        className={`h-16 border-b flex items-center px-8 transition-colors duration-300 ${headerClass}`}
      >
        <button
          onClick={() => navigate("/dashboard")}
          className={`flex items-center gap-2 transition ${
            isDark
              ? "text-gray-400 hover:text-white"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          <ArrowLeft size={20} />

          Back to Dashboard
        </button>

        <h1 className="text-xl font-bold ml-8">
          Settings
        </h1>
      </header>

      {/* ================= MAIN ================= */}

      <main className="max-w-5xl mx-auto px-6 py-10 space-y-8">

        {/* ================= PROFILE ================= */}

        <section
          className={`border rounded-2xl p-6 transition-colors duration-300 ${sectionClass}`}
        >
          <div className="flex items-center gap-3 mb-6">
            <User className="text-blue-500" />

            <div>
              <h2 className="text-xl font-semibold">
                Profile
              </h2>

              <p className={`text-sm ${secondaryText}`}>
                Manage your account information
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">

            {/* Name */}

            <div>
              <label
                className={`block text-sm mb-2 ${secondaryText}`}
              >
                Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                className={`w-full border rounded-lg px-4 py-3 outline-none focus:border-blue-500 transition-colors ${inputClass}`}
              />
            </div>

            {/* Email */}

            <div>
              <label
                className={`block text-sm mb-2 ${secondaryText}`}
              >
                Email
              </label>

              <input
                type="email"
                value={user?.email || ""}
                disabled
                className={`w-full border rounded-lg px-4 py-3 cursor-not-allowed ${
                  isDark
                    ? "bg-gray-800 border-gray-700 text-gray-500"
                    : "bg-gray-200 border-gray-300 text-gray-500"
                }`}
              />
            </div>
          </div>

          <button
            onClick={handleSaveProfile}
            disabled={savingProfile}
            className="mt-5 bg-blue-600 hover:bg-blue-700 px-5 py-2.5 rounded-lg transition disabled:opacity-50"
          >
            {savingProfile
              ? "Saving..."
              : "Save Changes"}
          </button>
        </section>

        {/* ================= APPEARANCE ================= */}

        <section
          className={`border rounded-2xl p-6 transition-colors duration-300 ${sectionClass}`}
        >
          <div className="flex items-center gap-3 mb-6">
            <Palette className="text-purple-500" />

            <div>
              <h2 className="text-xl font-semibold">
                Appearance
              </h2>

              <p className={`text-sm ${secondaryText}`}>
                Customize how MiniZap looks
              </p>
            </div>
          </div>

          <div className="flex gap-4">

            {/* DARK */}

            <button
              onClick={() => {
                setTheme("dark");
                localStorage.setItem(
                  "theme",
                  "dark"
                );
              }}
              className={`px-6 py-3 rounded-lg border transition ${
                theme === "dark"
                  ? "border-blue-500 bg-blue-500/10 text-blue-400"
                  : isDark
                  ? "border-gray-700 text-gray-400 hover:bg-gray-800"
                  : "border-gray-300 text-gray-600 hover:bg-gray-100"
              }`}
            >
              Dark
            </button>

            {/* LIGHT */}

            <button
              onClick={() => {
                setTheme("light");
                localStorage.setItem(
                  "theme",
                  "light"
                );
              }}
              className={`px-6 py-3 rounded-lg border transition ${
                theme === "light"
                  ? "border-blue-500 bg-blue-500/10 text-blue-600"
                  : isDark
                  ? "border-gray-700 text-gray-400 hover:bg-gray-800"
                  : "border-gray-300 text-gray-600 hover:bg-gray-100"
              }`}
            >
              Light
            </button>
          </div>
        </section>

        {/* ================= CONNECTED APPS ================= */}

        <section
          className={`border rounded-2xl p-6 transition-colors duration-300 ${sectionClass}`}
        >
          <div className="flex items-center gap-3 mb-6">
            <Link className="text-green-500" />

            <div>
              <h2 className="text-xl font-semibold">
                Connected Apps
              </h2>

              <p className={`text-sm ${secondaryText}`}>
                View authentication providers connected
                to your account
              </p>
            </div>
          </div>

          <div className="space-y-4">

            {/* GOOGLE */}

            <div
              className={`flex items-center justify-between border rounded-xl p-4 transition-colors ${innerBoxClass}`}
            >
              <div>
                <h3 className="font-medium">
                  Google
                </h3>

                <p className={`text-sm ${mutedText}`}>
                  Google OAuth
                </p>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  connectedApps.google
                    ? "bg-green-500/10 text-green-500"
                    : isDark
                    ? "bg-gray-800 text-gray-500"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {connectedApps.google
                  ? "Connected"
                  : "Not Connected"}
              </span>
            </div>

            {/* GITHUB */}

            <div
              className={`flex items-center justify-between border rounded-xl p-4 transition-colors ${innerBoxClass}`}
            >
              <div>
                <h3 className="font-medium">
                  GitHub
                </h3>

                <p className={`text-sm ${mutedText}`}>
                  GitHub OAuth
                </p>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  connectedApps.github
                    ? "bg-green-500/10 text-green-500"
                    : isDark
                    ? "bg-gray-800 text-gray-500"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {connectedApps.github
                  ? "Connected"
                  : "Not Connected"}
              </span>
            </div>
          </div>
        </section>

        {/* ================= SECURITY ================= */}

        <section
          className={`border rounded-2xl p-6 transition-colors duration-300 ${sectionClass}`}
        >
          <div className="flex items-center gap-3 mb-6">
            <Shield className="text-yellow-500" />

            <div>
              <h2 className="text-xl font-semibold">
                Security
              </h2>

              <p className={`text-sm ${secondaryText}`}>
                Manage your password and active sessions
              </p>
            </div>
          </div>

          <form
            onSubmit={handleChangePassword}
            className="space-y-4"
          >
            {/* CURRENT PASSWORD */}

            <div>
              <label
                className={`block text-sm mb-2 ${secondaryText}`}
              >
                Current Password
              </label>

              <input
                type="password"
                value={currentPassword}
                onChange={(e) =>
                  setCurrentPassword(e.target.value)
                }
                placeholder="Enter current password"
                className={`w-full border rounded-lg px-4 py-3 outline-none focus:border-blue-500 transition-colors ${inputClass}`}
              />
            </div>

            {/* NEW PASSWORD */}

            <div>
              <label
                className={`block text-sm mb-2 ${secondaryText}`}
              >
                New Password
              </label>

              <input
                type="password"
                value={newPassword}
                onChange={(e) =>
                  setNewPassword(e.target.value)
                }
                placeholder="Enter new password"
                className={`w-full border rounded-lg px-4 py-3 outline-none focus:border-blue-500 transition-colors ${inputClass}`}
              />
            </div>

            <button
              type="submit"
              disabled={changingPassword}
              className="bg-blue-600 hover:bg-blue-700 px-5 py-2.5 rounded-lg transition disabled:opacity-50"
            >
              {changingPassword
                ? "Changing..."
                : "Change Password"}
            </button>
          </form>

          {/* LOGOUT ALL */}

          <div
            className={`mt-8 pt-6 border-t ${
              isDark
                ? "border-gray-800"
                : "border-gray-200"
            } flex items-center justify-between`}
          >
            <div>
              <h3 className="font-medium">
                Logout from all devices
              </h3>

              <p className={`text-sm mt-1 ${mutedText}`}>
                Invalidate all active login sessions
              </p>
            </div>

            <button
              onClick={handleLogoutAll}
              className={`border px-4 py-2 rounded-lg transition ${
                isDark
                  ? "border-gray-700 hover:bg-gray-800"
                  : "border-gray-300 hover:bg-gray-100"
              }`}
            >
              Logout All
            </button>
          </div>
        </section>

        {/* ================= DANGER ZONE ================= */}

        <section
          className={`border rounded-2xl p-6 transition-colors duration-300 ${
            isDark
              ? "bg-gray-900 border-red-900/50"
              : "bg-white border-red-200"
          }`}
        >
          <div className="flex items-center gap-3 mb-6">
            <Trash2 className="text-red-500" />

            <div>
              <h2 className="text-xl font-semibold text-red-500">
                Danger Zone
              </h2>

              <p className={`text-sm ${secondaryText}`}>
                Permanent account actions
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">
                Delete Account
              </h3>

              <p className={`text-sm mt-1 ${mutedText}`}>
                Permanently delete your account and all
                workflows.
              </p>
            </div>

            <button
              onClick={handleDeleteAccount}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
            >
              Delete Account
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Settings;