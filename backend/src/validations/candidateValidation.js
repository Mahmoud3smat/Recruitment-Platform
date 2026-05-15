const Joi = require("joi");

const createCandidateSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required().messages({
    "string.empty": "Candidate name is required",
    "string.min": "Candidate name must be at least 2 characters",
    "string.max": "Candidate name must not exceed 100 characters",
    "any.required": "Candidate name is required",
  }),

  title: Joi.string().trim().min(2).max(150).required().messages({
    "string.empty": "Candidate title is required",
    "string.min": "Candidate title must be at least 2 characters",
    "string.max": "Candidate title must not exceed 150 characters",
    "any.required": "Candidate title is required",
  }),

  location: Joi.string().trim().min(2).max(150).required().messages({
    "string.empty": "Location is required",
    "string.min": "Location must be at least 2 characters",
    "string.max": "Location must not exceed 150 characters",
    "any.required": "Location is required",
  }),

  skills: Joi.array().items(Joi.string().trim()).min(1).required().messages({
    "array.base": "Skills must be an array",
    "array.min": "At least one skill is required",
    "any.required": "Skills are required",
  }),

  experience: Joi.string().trim().min(2).max(100).required().messages({
    "string.empty": "Experience is required",
    "string.min": "Experience must be at least 2 characters",
    "string.max": "Experience must not exceed 100 characters",
    "any.required": "Experience is required",
  }),

  education: Joi.string().trim().min(2).max(200).required().messages({
    "string.empty": "Education is required",
    "string.min": "Education must be at least 2 characters",
    "string.max": "Education must not exceed 200 characters",
    "any.required": "Education is required",
  }),

  matchScore: Joi.number().min(0).max(100).required().messages({
    "number.base": "Match score must be a number",
    "number.min": "Match score cannot be less than 0",
    "number.max": "Match score cannot be more than 100",
    "any.required": "Match score is required",
  }),
});

const updateCandidateSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100),

  title: Joi.string().trim().min(2).max(150),

  location: Joi.string().trim().min(2).max(150),

  skills: Joi.array().items(Joi.string().trim()).min(1),

  experience: Joi.string().trim().min(2).max(100),

  education: Joi.string().trim().min(2).max(200),

  matchScore: Joi.number().min(0).max(100),
})
  .min(1)
  .messages({
    "object.min": "At least one field is required to update the candidate",
  });

module.exports = {
  createCandidateSchema,
  updateCandidateSchema,
};
