import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";



const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};


export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      provider: "local",
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
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};



export const login = async (req, res) => {
  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid Credentials",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Credentials",
      });
    }

    const token = generateToken(user);

    res.status(200).json({
      message: "Login Successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};


export const getCurrentUser = async (req, res) => {

  try {

    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json(user);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }
};

export const googleCallback = async (req, res) => {
  try {
    console.log("Google Callback Hit");

    const token = generateToken(req.user);

    const redirectUrl = `http://localhost:5173/oauth-success?token=${token}`;

    console.log("Redirecting to:", redirectUrl);

    return res.redirect(redirectUrl);

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Google Authentication Failed",
    });
  }
};


export const githubCallback = async (req, res) => {
  try {
    const token = generateToken(req.user);

    res.redirect(
      `http://localhost:5173/oauth-success?token=${token}`
    );
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "GitHub Authentication Failed",
    });
  }
};