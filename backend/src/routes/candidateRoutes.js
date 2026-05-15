const express = require("express");

const {
  getCandidates,
  getCandidateById,
  createCandidate,
  updateCandidate,
  deleteCandidate,
  getCandidateFilterOptions,
} = require("../controllers/candidateController");

const validate = require("../middlewares/validate");

const {
  createCandidateSchema,
  updateCandidateSchema,
} = require("../validations/candidateValidation");

const router = express.Router();

/**
 * IMPORTANT:
 * Put /filters/options before /:id
 */
router.get("/filters/options", getCandidateFilterOptions);

router
  .route("/")
  .get(getCandidates)
  .post(validate(createCandidateSchema), createCandidate);

router
  .route("/:id")
  .get(getCandidateById)
  .put(validate(updateCandidateSchema), updateCandidate)
  .delete(deleteCandidate);

module.exports = router;
