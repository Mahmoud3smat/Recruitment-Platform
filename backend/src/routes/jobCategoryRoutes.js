const express = require("express");

const {
  getJobCategories,
  getActiveJobCategories,
  getJobCategoryById,
  createJobCategory,
  updateJobCategory,
  deleteJobCategory,
} = require("../controllers/jobCategoryController");

const validate = require("../middlewares/validate");

const {
  createJobCategorySchema,
  updateJobCategorySchema,
} = require("../validations/jobCategoryValidation");

const router = express.Router();

/**
 * IMPORTANT:
 * Put /active before /:id
 */
router.get("/active", getActiveJobCategories);

router
  .route("/")
  .get(getJobCategories)
  .post(validate(createJobCategorySchema), createJobCategory);

router
  .route("/:id")
  .get(getJobCategoryById)
  .put(validate(updateJobCategorySchema), updateJobCategory)
  .delete(deleteJobCategory);

module.exports = router;
