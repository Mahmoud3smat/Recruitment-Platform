const Joi = require("joi");

const createTeamMemberSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required().messages({
    "string.empty": "Team member name is required",
    "string.min": "Team member name must be at least 2 characters",
    "string.max": "Team member name must not exceed 100 characters",
    "any.required": "Team member name is required",
  }),

  role: Joi.string().trim().min(2).max(150).required().messages({
    "string.empty": "Role is required",
    "string.min": "Role must be at least 2 characters",
    "string.max": "Role must not exceed 150 characters",
    "any.required": "Role is required",
  }),

  bio: Joi.string().trim().min(10).max(1000).required().messages({
    "string.empty": "Bio is required",
    "string.min": "Bio must be at least 10 characters",
    "string.max": "Bio must not exceed 1000 characters",
    "any.required": "Bio is required",
  }),

  isLeader: Joi.boolean().default(false),

  linkedin: Joi.string().trim().allow("").uri().messages({
    "string.uri": "LinkedIn must be a valid URL",
  }),

  facebook: Joi.string().trim().allow("").uri().messages({
    "string.uri": "Facebook must be a valid URL",
  }),

  whatsapp: Joi.string().trim().allow("").uri().messages({
    "string.uri": "WhatsApp must be a valid URL",
  }),
});

const updateTeamMemberSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100),

  role: Joi.string().trim().min(2).max(150),

  bio: Joi.string().trim().min(10).max(1000),

  isLeader: Joi.boolean(),

  linkedin: Joi.string().trim().allow("").uri(),

  facebook: Joi.string().trim().allow("").uri(),

  whatsapp: Joi.string().trim().allow("").uri(),
})
  .min(1)
  .messages({
    "object.min": "At least one field is required to update the team member",
  });

module.exports = {
  createTeamMemberSchema,
  updateTeamMemberSchema,
};
