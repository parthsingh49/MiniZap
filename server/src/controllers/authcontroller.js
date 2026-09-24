import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      tokenVersion: user.tokenVersion || 0,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

// ===============================
// REGISTER
// ===============================

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists with this email",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      tokenVersion: 0,
    });

    const token = generateToken(user);

    res.status(201).json({
      message: "Registration successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log("Register Error:", error);

    res.status(500).json({
      message: "Registration failed",
    });
  }
};

// ===============================
// LOGIN
// ===============================

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const user = await User.findOne({
      email: normalizedEmail,
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    if (!user.password) {
      return res.status(400).json({
        message:
          "This account uses OAuth login. Please login using Google or GitHub.",
      });
    }

    const passwordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordCorrect) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = generateToken(user);

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log("Login Error:", error);

    res.status(500).json({
      message: "Login failed",
    });
  }
};

// ===============================
// GET CURRENT USER
// ===============================

export const getCurrentUser = async (req, res) => {
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
    console.log("Get Current User Error:", error);

    res.status(500).json({
      message: "Failed to fetch current user",
    });
  }
};

// ===============================
// GOOGLE OAUTH CALLBACK
// ===============================

export const googleCallback = async (req, res) => {
  try {
    const token = generateToken(req.user);

    res.redirect(
      `http://localhost:5173/oauth-success?token=${token}`
    );
  } catch (error) {
    console.log("Google OAuth Error:", error);

    res.redirect(
      "http://localhost:5173/login?error=google"
    );
  }
};

// ===============================
// GITHUB OAUTH CALLBACK
// ===============================

export const githubCallback = async (req, res) => {
  try {
    const token = generateToken(req.user);

    res.redirect(
      `http://localhost:5173/oauth-success?token=${token}`
    );
  } catch (error) {
    console.log("GitHub OAuth Error:", error);

    res.redirect(
      "http://localhost:5173/login?error=github"
    );
  }
};