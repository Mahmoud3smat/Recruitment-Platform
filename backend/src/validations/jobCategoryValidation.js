const Joi = require("joi");

const createJobCategorySchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required().messages({
    "string.empty": "Category name is required",
    "string.min": "Category name must be at least 2 characters",
    "string.max": "Category name must not exceed 100 characters",
    "any.required": "Category name is required",
  }),

  slug: Joi.string()
    .trim()
    .lowercase()
    .pattern(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .required()
    .messages({
      "string.empty": "Category slug is required",
      "string.pattern.base": "Slug must be lowercase and use hyphens only",
      "any.required": "Category slug is required",
    }),

  description: Joi.string().trim().allow("").max(500).messages({
    "string.max": "Description must not exceed 500 characters",
  }),

  isActive: Joi.boolean().default(true),

  order: Joi.number().integer().min(0).default(0),
});

const updateJobCategorySchema = Joi.object({
  name: Joi.string().trim().min(2).max(100),

  slug: Joi.string()
    .trim()
    .lowercase()
    .pattern(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),

  description: Joi.string().trim().allow("").max(500),

  isActive: Joi.boolean(),

  order: Joi.number().integer().min(0),
})
  .min(1)
  .messages({
    "object.min": "At least one field is required to update the category",
  });

module.exports = {
  createJobCategorySchema,
  updateJobCategorySchema,
};
