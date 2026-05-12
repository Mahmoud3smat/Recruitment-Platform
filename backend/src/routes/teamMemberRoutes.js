const express = require("express");

const {
  getTeamMembers,
  getTeamMemberById,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
} = require("../controllers/teamMemberController");

const validate = require("../middlewares/validate");

const {
  createTeamMemberSchema,
  updateTeamMemberSchema,
} = require("../validations/teamMemberValidation");

const router = express.Router();

router
  .route("/")
  .get(getTeamMembers)
  .post(validate(createTeamMemberSchema), createTeamMember);

router
  .route("/:id")
  .get(getTeamMemberById)
  .put(validate(updateTeamMemberSchema), updateTeamMember)
  .delete(deleteTeamMember);

module.exports = router;
