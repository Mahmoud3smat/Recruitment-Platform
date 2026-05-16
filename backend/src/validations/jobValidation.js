const Joi = require("joi");

/**
 * CREATE JOB
 */
const createJobSchema = Joi.object({
  title: Joi.string().trim().min(2).max(100).required().messages({
    "string.empty": "Job title is required",
    "string.min": "Job title must be at least 2 characters",
    "string.max": "Job title must not exceed 100 characters",
    "any.required": "Job title is required",
  }),

  company: Joi.string().trim().min(2).max(100).required().messages({
    "string.empty": "Company name is required",
    "any.required": "Company name is required",
  }),

  location: Joi.string().trim().required().messages({
    "string.empty": "Location is required",
    "any.required": "Location is required",
  }),

  type: Joi.string()
    .valid("Full-time", "Part-time", "Contract", "Remote", "Internship")
    .required()
    .messages({
      "any.only":
        "Job type must be one of: Full-time, Part-time, Contract, Remote, Internship",
      "any.required": "Job type is required",
    }),

  salary: Joi.string().trim().required().messages({
    "string.empty": "Salary is required",
    "any.required": "Salary is required",
  }),

  category: Joi.string()
    .valid(
      "Frontend",
      "Backend",
      "Fullstack",
      "Mobile",
      "DevOps",
      "Design",
      "Data Science",
      "QA",
      "Product Management",
    )
    .required()
    .messages({
      "any.only": "Invalid job category",
      "any.required": "Job category is required",
    }),

  postedAt: Joi.string().trim().required().messages({
    "string.empty": "Posted date is required",
    "any.required": "Posted date is required",
  }),

  experience: Joi.string().trim().required().messages({
    "string.empty": "Experience level is required",
    "any.required": "Experience level is required",
  }),

  skills: Joi.array().items(Joi.string().trim()).min(1).required().messages({
    "array.base": "Skills must be an array",
    "array.min": "At least one skill is required",
    "any.required": "Skills are required",
  }),

  description: Joi.string().trim().min(20).required().messages({
    "string.empty": "Job description is required",
    "string.min": "Job description must be at least 20 characters",
    "any.required": "Job description is required",
  }),

  benefits: Joi.array().items(Joi.string().trim()).default([]),

  isSaved: Joi.boolean().default(false),
});

/**
 * UPDATE / PATCH JOB
 */
const updateJobSchema = Joi.object({
  title: Joi.string().trim().min(2).max(100),

  active: Joi.boolean(),

  company: Joi.string().trim().min(2).max(100),

  location: Joi.string().trim(),

  type: Joi.string().valid(
    "Full-time",
    "Part-time",
    "Contract",
    "Remote",
    "Internship",
  ),

  salary: Joi.string().trim(),

  category: Joi.string().valid(
    "Frontend",
    "Backend",
    "Fullstack",
    "Mobile",
    "DevOps",
    "Design",
    "Data Science",
    "QA",
    "Product Management",
  ),

  postedAt: Joi.string().trim(),

  experience: Joi.string().trim(),

  skills: Joi.array().items(Joi.string().trim()),

  description: Joi.string().trim().min(20),

  benefits: Joi.array().items(Joi.string().trim()),

  isSaved: Joi.boolean(),
})
  .min(1)
  .unknown(false)
  .messages({
    "object.min": "At least one field is required to update the job",
  });

module.exports = {
  createJobSchema,
  updateJobSchema,
};
