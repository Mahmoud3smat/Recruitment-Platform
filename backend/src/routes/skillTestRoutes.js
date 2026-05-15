const express = require("express");

const {
  getSkillTests,
  getSkillTestById,
  createSkillTest,
  updateSkillTest,
  deleteSkillTest,
  getSkillTestFilterOptions,
} = require("../controllers/skillTestController");

const validate = require("../middlewares/validate");

const {
  createSkillTestSchema,
  updateSkillTestSchema,
} = require("../validations/skillTestValidation");

const router = express.Router();

/**
 * IMPORTANT:
 * Put /filters/options before /:id
 */
router.get("/filters/options", getSkillTestFilterOptions);

router
  .route("/")
  .get(getSkillTests)
  .post(validate(createSkillTestSchema), createSkillTest);

router
  .route("/:id")
  .get(getSkillTestById)
  .put(validate(updateSkillTestSchema), updateSkillTest)
  .delete(deleteSkillTest);

module.exports = router;
