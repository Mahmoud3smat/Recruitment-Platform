const express = require("express");

const {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  getCourseFilterOptions,
} = require("../controllers/courseController");

const validate = require("../middlewares/validate");

const {
  createCourseSchema,
  updateCourseSchema,
} = require("../validations/courseValidation");

const router = express.Router();

/**
 * IMPORTANT:
 * Put /filters/options before /:id
 */
router.get("/filters/options", getCourseFilterOptions);

router
  .route("/")
  .get(getCourses)
  .post(validate(createCourseSchema), createCourse);

router
  .route("/:id")
  .get(getCourseById)
  .put(validate(updateCourseSchema), updateCourse)
  .delete(deleteCourse);

module.exports = router;
