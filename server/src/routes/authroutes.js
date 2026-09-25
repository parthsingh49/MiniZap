import express from "express";
import passport from "passport";

import {
  register,
  login,
  getCurrentUser,
  googleCallback,
  githubCallback,
} from "../controllers/authcontroller.js";

import authMiddleware from "../middleware/authmiddleware.js";

const router = express.Router();

// ===============================
// NORMAL AUTHENTICATION
// ===============================

router.post("/register", register);

router.post("/login", login);

router.get("/me", authMiddleware, getCurrentUser);

// ===============================
// GOOGLE OAUTH
// ===============================

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
   failureRedirect: `${process.env.FRONTEND_URL}/login?error=google`
  }),
  googleCallback
);

// ===============================
// GITHUB OAUTH
// ===============================

router.get(
  "/github",
  passport.authenticate("github", {
    scope: ["user:email"],
  })
);

router.get(
  "/github/callback",
  passport.authenticate("github", {
    session: false,
   failureRedirect: `${process.env.FRONTEND_URL}/login?error=github`
  }),
  githubCallback
);

export default router;