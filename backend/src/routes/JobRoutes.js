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
 * GET /jobs/filters/options
 * Returns available filter options (e.g. categories, locations, etc.)
 *
 * ⚠️ IMPORTANT:
 * This route must be declared BEFORE "/:id"
 * because Express matches routes in order, and otherwise "filters"
 * could be interpreted as an :id parameter.
 */
router.get("/filters/options", getJobFilterOptions);

/**
 * GET /jobs
 * Fetch all jobs (with optional query filters)
 *
 * POST /jobs
 * Create a new job posting
 */
router.route("/").get(getJobs).post(validate(createJobSchema), createJob);

/**
 * GET /jobs/:id
 * Fetch a single job by its ID
 *
 * PUT /jobs/:id
 * Fully update a job (replace entire resource)
 *
 * PATCH /jobs/:id
 * Partially update a job (only provided fields)
 *
 * DELETE /jobs/:id
 * Remove a job by its ID
 */
router
  .route("/:id")
  .get(getJobById)
  .put(validate(updateJobSchema), updateJob)
  .patch(validate(updateJobSchema), updateJob)
  .delete(deleteJob);

module.exports = router;
