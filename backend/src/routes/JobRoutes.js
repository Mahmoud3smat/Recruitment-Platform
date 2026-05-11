const express = require("express");

const {
  getJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
} = require("../controllers/jobController");

const validate = require("../middlewares/validate");

const {
  createJobSchema,
  updateJobSchema,
} = require("../validations/jobValidation");

const router = express.Router();

router.route("/").get(getJobs).post(validate(createJobSchema), createJob);

router
  .route("/:id")
  .get(getJobById)
  .put(validate(updateJobSchema), updateJob)
  .delete(deleteJob);

module.exports = router;
