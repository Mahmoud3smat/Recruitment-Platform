const express = require("express");

const {
  getJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  getJobFilterOptions,
} = require("../controllers/jobController");

const validate = require("../middlewares/validate");

const {
  createJobSchema,
  updateJobSchema,
} = require("../validations/jobValidation");

const router = express.Router();

/**
 * IMPORTANT:
 * Put this route before "/:id"
 * لأن Express لو شاف /:id الأول هيعتبر filters كأنه id
 */
router.get("/filters/options", getJobFilterOptions);

router.route("/").get(getJobs).post(validate(createJobSchema), createJob);

router
  .route("/:id")
  .get(getJobById)
  .put(validate(updateJobSchema), updateJob)
  .delete(deleteJob);

module.exports = router;
