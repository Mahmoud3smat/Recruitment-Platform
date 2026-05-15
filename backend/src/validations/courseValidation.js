const Joi = require("joi");

const createCourseSchema = Joi.object({
  title: Joi.string().trim().min(2).max(150).required().messages({
    "string.empty": "Course title is required",
    "string.min": "Course title must be at least 2 characters",
    "string.max": "Course title must not exceed 150 characters",
    "any.required": "Course title is required",
  }),

  instructor: Joi.string().trim().min(2).max(100).required().messages({
    "string.empty": "Instructor name is required",
    "string.min": "Instructor name must be at least 2 characters",
    "string.max": "Instructor name must not exceed 100 characters",
    "any.required": "Instructor name is required",
  }),

  duration: Joi.string().trim().required().messages({
    "string.empty": "Course duration is required",
    "any.required": "Course duration is required",
  }),

  lessons: Joi.number().integer().min(1).required().messages({
    "number.base": "Lessons must be a number",
    "number.integer": "Lessons must be an integer",
    "number.min": "Lessons must be at least 1",
    "any.required": "Lessons count is required",
  }),

  level: Joi.string()
    .valid("Beginner", "Intermediate", "Advanced")
    .required()
    .messages({
      "any.only": "Level must be one of: Beginner, Intermediate, Advanced",
      "any.required": "Course level is required",
    }),

  category: Joi.string().trim().min(2).max(100).required().messages({
    "string.empty": "Course category is required",
    "any.required": "Course category is required",
  }),

  description: Joi.string().trim().min(10).max(1000).required().messages({
    "string.empty": "Course description is required",
    "string.min": "Course description must be at least 10 characters",
    "string.max": "Course description must not exceed 1000 characters",
    "any.required": "Course description is required",
  }),

  rating: Joi.number().min(0).max(5).default(0).messages({
    "number.min": "Rating cannot be less than 0",
    "number.max": "Rating cannot be more than 5",
  }),

  enrolled: Joi.number().integer().min(0).default(0).messages({
    "number.integer": "Enrolled must be an integer",
    "number.min": "Enrolled cannot be less than 0",
  }),
});

const updateCourseSchema = Joi.object({
  title: Joi.string().trim().min(2).max(150),

  instructor: Joi.string().trim().min(2).max(100),

  duration: Joi.string().trim(),

  lessons: Joi.number().integer().min(1),

  level: Joi.string().valid("Beginner", "Intermediate", "Advanced"),

  category: Joi.string().trim().min(2).max(100),

  description: Joi.string().trim().min(10).max(1000),

  rating: Joi.number().min(0).max(5),

  enrolled: Joi.number().integer().min(0),
})
  .min(1)
  .messages({
    "object.min": "At least one field is required to update the course",
  });

module.exports = {
  createCourseSchema,
  updateCourseSchema,
};
