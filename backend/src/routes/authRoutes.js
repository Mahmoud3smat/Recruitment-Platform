const express = require("express");

const { register, login, getMe } = require("../controllers/authController");

const validate = require("../middlewares/validate");

const {
  registerSchema,
  loginSchema,
} = require("../validations/authValidation");

const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", validate(registerSchema), register);

router.post("/login", validate(loginSchema), login);

router.get("/me", protect, getMe);

module.exports = router;
