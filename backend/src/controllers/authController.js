const jwt = require("jsonwebtoken");
const User = require("../models/User");

const generateToken = (userId, role) => {
  return jwt.sign(
    {
      id: userId,
      role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    },
  );
};

/**
 * POST /api/auth/register
 */
const register = async (req, res) => {
  try {
    const {
      role,
      fullName,
      preferredField,
      companyName,
      industry,
      location,
      email,
      password,
    } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already exists",
      });
    }

    const userPayload = {
      role,
      email,
      password,
    };

    if (role === "job_seeker") {
      userPayload.fullName = fullName;
      userPayload.preferredField = preferredField;
    }

    if (role === "company") {
      userPayload.companyName = companyName;
      userPayload.industry = industry;
      userPayload.location = location;
    }

    const user = await User.create(userPayload);

    const token = generateToken(user._id, user.role);

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      token,
      data: {
        _id: user._id,
        role: user.role,
        email: user.email,
        fullName: user.fullName,
        preferredField: user.preferredField,
        companyName: user.companyName,
        industry: user.industry,
        location: user.location,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Registration failed",
      error: error.message,
    });
  }
};

/**
 * POST /api/auth/login
 */
const login = async (req, res) => {
  try {
    const { role, email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user || user.role !== role) {
      return res.status(401).json({
        success: false,
        message: "Invalid email, password, or account type",
      });
    }

    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid email, password, or account type",
      });
    }

    const token = generateToken(user._id, user.role);

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      data: {
        _id: user._id,
        role: user.role,
        email: user.email,
        fullName: user.fullName,
        preferredField: user.preferredField,
        companyName: user.companyName,
        industry: user.industry,
        location: user.location,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Login failed",
      error: error.message,
    });
  }
};

/**
 * GET /api/auth/me
 */
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-__v");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch user",
      error: error.message,
    });
  }
};

module.exports = {
  register,
  login,
  getMe,
};
