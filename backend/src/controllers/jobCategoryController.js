const JobCategory = require("../models/JobCategory");
const APIFeatures = require("../utils/apiFeatures");

/**
 * GET /api/job-categories
 * Get all job categories
 */
const getJobCategories = async (req, res) => {
  try {
    const features = new APIFeatures(JobCategory.find(), req.query)
      .search(["name", "slug", "description"])
      .filter()
      .sort()
      .fields()
      .pagination();

    const categories = await features.query;

    res.status(200).json({
      success: true,
      count: categories.length,
      data: categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch job categories",
      error: error.message,
    });
  }
};

/**
 * GET /api/job-categories/active
 * Get active job categories only
 */
const getActiveJobCategories = async (req, res) => {
  try {
    const categories = await JobCategory.find({ isActive: true })
      .sort({ order: 1, name: 1 })
      .select("-__v");

    res.status(200).json({
      success: true,
      count: categories.length,
      data: categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch active job categories",
      error: error.message,
    });
  }
};

/**
 * GET /api/job-categories/:id
 * Get single job category by id
 */
const getJobCategoryById = async (req, res) => {
  try {
    const category = await JobCategory.findById(req.params.id).select("-__v");

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Job category not found",
      });
    }

    res.status(200).json({
      success: true,
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch job category",
      error: error.message,
    });
  }
};

/**
 * POST /api/job-categories
 * Create new job category
 */
const createJobCategory = async (req, res) => {
  try {
    const category = await JobCategory.create(req.body);

    res.status(201).json({
      success: true,
      message: "Job category created successfully",
      data: category,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create job category",
      error: error.message,
    });
  }
};

/**
 * PUT /api/job-categories/:id
 * Update job category
 */
const updateJobCategory = async (req, res) => {
  try {
    const category = await JobCategory.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    ).select("-__v");

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Job category not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Job category updated successfully",
      data: category,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update job category",
      error: error.message,
    });
  }
};

/**
 * DELETE /api/job-categories/:id
 * Delete job category
 */
const deleteJobCategory = async (req, res) => {
  try {
    const category = await JobCategory.findByIdAndDelete(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Job category not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Job category deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete job category",
      error: error.message,
    });
  }
};

module.exports = {
  getJobCategories,
  getActiveJobCategories,
  getJobCategoryById,
  createJobCategory,
  updateJobCategory,
  deleteJobCategory,
};
