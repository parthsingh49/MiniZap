import express from "express";

import {
  getProfile,
  updateProfile,
  changePassword,
  logoutAllDevices,
  getConnectedApps,
  deleteAccount,
} from "../controllers/settingsController.js";

import authMiddleware from "../middleware/authmiddleware.js";

const router = express.Router();

router.get(
  "/profile",
  authMiddleware,
  getProfile
);

router.put(
  "/profile",
  authMiddleware,
  updateProfile
);

router.put(
  "/password",
  authMiddleware,
  changePassword
);

router.post(
  "/logout-all",
  authMiddleware,
  logoutAllDevices
);

router.get(
  "/connected-apps",
  authMiddleware,
  getConnectedApps
);

router.delete(
  "/account",
  authMiddleware,
  deleteAccount
);

export default router;