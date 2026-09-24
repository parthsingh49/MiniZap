import bcrypt from "bcryptjs";
import User from "../models/User.js";
import Workflow from "../models/Workflow.js";

// ==========================================
// GET PROFILE
// ==========================================

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      user,
    });
  } catch (error) {
    console.log("Get Profile Error:", error);

    res.status(500).json({
      message: "Failed to fetch profile",
    });
  }
};

// ==========================================
// UPDATE PROFILE
// ==========================================

export const updateProfile = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        message: "Name is required",
      });
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        name: name.trim(),
      },
      {
        new: true,
        runValidators: true,
      }
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    console.log("Update Profile Error:", error);

    res.status(500).json({
      message: "Failed to update profile",
    });
  }
};

// ==========================================
// CHANGE PASSWORD
// ==========================================

export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        message:
          "Current password and new password are required",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        message:
          "New password must be at least 6 characters",
      });
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // OAuth-only accounts don't have a password
    if (!user.password) {
      return res.status(400).json({
        message:
          "This account does not have a password. Please use your OAuth provider.",
      });
    }

    const passwordCorrect = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!passwordCorrect) {
      return res.status(400).json({
        message: "Current password is incorrect",
      });
    }

    const hashedPassword = await bcrypt.hash(
      newPassword,
      10
    );

    user.password = hashedPassword;

    // Invalidate all existing JWT tokens
    user.tokenVersion = (user.tokenVersion || 0) + 1;

    await user.save();

    res.status(200).json({
      message:
        "Password changed successfully. Please login again.",
    });
  } catch (error) {
    console.log("Change Password Error:", error);

    res.status(500).json({
      message: "Failed to change password",
    });
  }
};

// ==========================================
// LOGOUT ALL DEVICES
// ==========================================

export const logoutAllDevices = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.tokenVersion = (user.tokenVersion || 0) + 1;

    await user.save();

    res.status(200).json({
      message:
        "Logged out from all devices successfully",
    });
  } catch (error) {
    console.log("Logout All Error:", error);

    res.status(500).json({
      message:
        "Failed to logout from all devices",
    });
  }
};

// ==========================================
// GET CONNECTED APPS
// ==========================================

export const getConnectedApps = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      google: !!user.googleId,
      github: !!user.githubId,
    });
  } catch (error) {
    console.log("Connected Apps Error:", error);

    res.status(500).json({
      message:
        "Failed to fetch connected apps",
    });
  }
};

// ==========================================
// DELETE ACCOUNT
// ==========================================

export const deleteAccount = async (req, res) => {
  try {
    const userId = req.user._id;

    // Delete all workflows belonging to user
    await Workflow.deleteMany({
      userId,
    });

    // Delete user
    await User.findByIdAndDelete(userId);

    res.status(200).json({
      message:
        "Account and workflows deleted successfully",
    });
  } catch (error) {
    console.log("Delete Account Error:", error);

    res.status(500).json({
      message:
        "Failed to delete account",
    });
  }
};