const SkillTest = require("../models/SkillTest");
const APIFeatures = require("../utils/apiFeatures");

/**
 * GET /api/skill-tests
 * Get all skill tests with search, filters, sort, fields, and pagination
 */
const getSkillTests = async (req, res) => {
  try {
    const features = new APIFeatures(SkillTest.find(), req.query)
      .search(["title", "category", "difficulty", "description"])
      .filter()
      .sort()
      .fields()
      .pagination();

    const skillTests = await features.query;

    res.status(200).json({
      success: true,
      count: skillTests.length,
      data: skillTests,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch skill tests",
      error: error.message,
    });
  }
};

/**
 * GET /api/skill-tests/:id
 * Get single skill test by id
 */
const getSkillTestById = async (req, res) => {
  try {
    const skillTest = await SkillTest.findById(req.params.id).select("-__v");

    if (!skillTest) {
      return res.status(404).json({
        success: false,
        message: "Skill test not found",
      });
    }

    res.status(200).json({
      success: true,
      data: skillTest,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch skill test",
      error: error.message,
    });
  }
};

/**
 * POST /api/skill-tests
 * Create new skill test
 */
const createSkillTest = async (req, res) => {
  try {
    const skillTest = await SkillTest.create(req.body);

    res.status(201).json({
      success: true,
      message: "Skill test created successfully",
      data: skillTest,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create skill test",
      error: error.message,
    });
  }
};

/**
 * PUT /api/skill-tests/:id
 * Update skill test
 */
const updateSkillTest = async (req, res) => {
  try {
    const skillTest = await SkillTest.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    ).select("-__v");

    if (!skillTest) {
      return res.status(404).json({
        success: false,
        message: "Skill test not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Skill test updated successfully",
      data: skillTest,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update skill test",
      error: error.message,
    });
  }
};

/**
 * DELETE /api/skill-tests/:id
 * Delete skill test
 */
const deleteSkillTest = async (req, res) => {
  try {
    const skillTest = await SkillTest.findByIdAndDelete(req.params.id);

    if (!skillTest) {
      return res.status(404).json({
        success: false,
        message: "Skill test not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Skill test deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete skill test",
      error: error.message,
    });
  }
};

/**
 * GET /api/skill-tests/filters/options
 * Get skill test filter options from skill tests collection
 */
const getSkillTestFilterOptions = async (req, res) => {
  try {
    const categories = await SkillTest.distinct("category");
    const difficulties = await SkillTest.distinct("difficulty");
    const durations = await SkillTest.distinct("duration");

    res.status(200).json({
      success: true,
      data: {
        categories,
        difficulties,
        durations,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch skill test filter options",
      error: error.message,
    });
  }
};

module.exports = {
  getSkillTests,
  getSkillTestById,
  createSkillTest,
  updateSkillTest,
  deleteSkillTest,
  getSkillTestFilterOptions,
};
