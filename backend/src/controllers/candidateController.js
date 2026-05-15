const Candidate = require("../models/Candidate");
const APIFeatures = require("../utils/apiFeatures");

/**
 * GET /api/candidates
 * Get all candidates with search, filters, sort, fields, and pagination
 */
const getCandidates = async (req, res) => {
  try {
    const features = new APIFeatures(Candidate.find(), req.query)
      .search(["name", "title", "location", "skills", "education"])
      .filter()
      .sort()
      .fields()
      .pagination();

    const candidates = await features.query;

    res.status(200).json({
      success: true,
      count: candidates.length,
      data: candidates,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch candidates",
      error: error.message,
    });
  }
};

/**
 * GET /api/candidates/:id
 * Get single candidate by id
 */
const getCandidateById = async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id).select("-__v");

    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: "Candidate not found",
      });
    }

    res.status(200).json({
      success: true,
      data: candidate,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch candidate",
      error: error.message,
    });
  }
};

/**
 * POST /api/candidates
 * Create new candidate
 */
const createCandidate = async (req, res) => {
  try {
    const candidate = await Candidate.create(req.body);

    res.status(201).json({
      success: true,
      message: "Candidate created successfully",
      data: candidate,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create candidate",
      error: error.message,
    });
  }
};

/**
 * PUT /api/candidates/:id
 * Update candidate
 */
const updateCandidate = async (req, res) => {
  try {
    const candidate = await Candidate.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    ).select("-__v");

    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: "Candidate not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Candidate updated successfully",
      data: candidate,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update candidate",
      error: error.message,
    });
  }
};

/**
 * DELETE /api/candidates/:id
 * Delete candidate
 */
const deleteCandidate = async (req, res) => {
  try {
    const candidate = await Candidate.findByIdAndDelete(req.params.id);

    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: "Candidate not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Candidate deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete candidate",
      error: error.message,
    });
  }
};

/**
 * GET /api/candidates/filters/options
 * Get candidate filter options from candidates collection
 */
const getCandidateFilterOptions = async (req, res) => {
  try {
    const titles = await Candidate.distinct("title");
    const locations = await Candidate.distinct("location");
    const education = await Candidate.distinct("education");
    const skills = await Candidate.distinct("skills");

    res.status(200).json({
      success: true,
      data: {
        titles,
        locations,
        education,
        skills,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch candidate filter options",
      error: error.message,
    });
  }
};

module.exports = {
  getCandidates,
  getCandidateById,
  createCandidate,
  updateCandidate,
  deleteCandidate,
  getCandidateFilterOptions,
};
