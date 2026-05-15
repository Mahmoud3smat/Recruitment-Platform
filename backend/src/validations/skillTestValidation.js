const Joi = require("joi");

const createSkillTestSchema = Joi.object({
  title: Joi.string().trim().min(2).max(150).required().messages({
    "string.empty": "Skill test title is required",
    "string.min": "Skill test title must be at least 2 characters",
    "string.max": "Skill test title must not exceed 150 characters",
    "any.required": "Skill test title is required",
  }),

  category: Joi.string().trim().min(2).max(100).required().messages({
    "string.empty": "Category is required",
    "string.min": "Category must be at least 2 characters",
    "string.max": "Category must not exceed 100 characters",
    "any.required": "Category is required",
  }),

  questions: Joi.number().integer().min(1).required().messages({
    "number.base": "Questions must be a number",
    "number.integer": "Questions must be an integer",
    "number.min": "Questions must be at least 1",
    "any.required": "Questions count is required",
  }),

  duration: Joi.string().trim().required().messages({
    "string.empty": "Duration is required",
    "any.required": "Duration is required",
  }),

  difficulty: Joi.string()
    .valid("Beginner", "Intermediate", "Advanced")
    .required()
    .messages({
      "any.only": "Difficulty must be one of: Beginner, Intermediate, Advanced",
      "any.required": "Difficulty is required",
    }),

  description: Joi.string().trim().min(10).max(1000).required().messages({
    "string.empty": "Description is required",
    "string.min": "Description must be at least 10 characters",
    "string.max": "Description must not exceed 1000 characters",
    "any.required": "Description is required",
  }),
});

const updateSkillTestSchema = Joi.object({
  title: Joi.string().trim().min(2).max(150),

  category: Joi.string().trim().min(2).max(100),

  questions: Joi.number().integer().min(1),

  duration: Joi.string().trim(),

  difficulty: Joi.string().valid("Beginner", "Intermediate", "Advanced"),

  description: Joi.string().trim().min(10).max(1000),
})
  .min(1)
  .messages({
    "object.min": "At least one field is required to update the skill test",
  });

module.exports = {
  createSkillTestSchema,
  updateSkillTestSchema,
};
