const Joi = require("joi");

const registerSchema = Joi.object({
  role: Joi.string().valid("job_seeker", "company").required().messages({
    "any.only": "Role must be either job_seeker or company",
    "any.required": "Role is required",
  }),

  fullName: Joi.when("role", {
    is: "job_seeker",
    then: Joi.string().trim().min(2).max(100).required().messages({
      "string.empty": "Full name is required",
      "any.required": "Full name is required",
    }),
    otherwise: Joi.string().trim().allow(""),
  }),

  preferredField: Joi.when("role", {
    is: "job_seeker",
    then: Joi.string().trim().min(2).max(100).required().messages({
      "string.empty": "Preferred field is required",
      "any.required": "Preferred field is required",
    }),
    otherwise: Joi.string().trim().allow(""),
  }),

  companyName: Joi.when("role", {
    is: "company",
    then: Joi.string().trim().min(2).max(150).required().messages({
      "string.empty": "Company name is required",
      "any.required": "Company name is required",
    }),
    otherwise: Joi.string().trim().allow(""),
  }),

  industry: Joi.when("role", {
    is: "company",
    then: Joi.string().trim().min(2).max(100).required().messages({
      "string.empty": "Industry is required",
      "any.required": "Industry is required",
    }),
    otherwise: Joi.string().trim().allow(""),
  }),

  location: Joi.when("role", {
    is: "company",
    then: Joi.string().trim().min(2).max(150).required().messages({
      "string.empty": "Location is required",
      "any.required": "Location is required",
    }),
    otherwise: Joi.string().trim().allow(""),
  }),

  email: Joi.string().trim().lowercase().email().required().messages({
    "string.email": "Please enter a valid email address",
    "string.empty": "Email is required",
    "any.required": "Email is required",
  }),

  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least 6 characters",
    "string.empty": "Password is required",
    "any.required": "Password is required",
  }),
});

const loginSchema = Joi.object({
  role: Joi.string().valid("job_seeker", "company").required().messages({
    "any.only": "Role must be either job_seeker or company",
    "any.required": "Role is required",
  }),

  email: Joi.string().trim().lowercase().email().required().messages({
    "string.email": "Please enter a valid email address",
    "string.empty": "Email is required",
    "any.required": "Email is required",
  }),

  password: Joi.string().required().messages({
    "string.empty": "Password is required",
    "any.required": "Password is required",
  }),
});

module.exports = {
  registerSchema,
  loginSchema,
};
