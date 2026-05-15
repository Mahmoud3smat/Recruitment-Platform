const Course = require("../models/Course");
const APIFeatures = require("../utils/apiFeatures");

/**
 * GET /api/courses
 * Get all courses with search, filters, sort, fields, and pagination
 */
const getCourses = async (req, res) => {
  try {
    const features = new APIFeatures(Course.find(), req.query)
      .search(["title", "instructor", "category", "description"])
      .filter()
      .sort()
      .fields()
      .pagination();

    const courses = await features.query;

    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch courses",
      error: error.message,
    });
  }
};

/**
 * GET /api/courses/:id
 * Get single course by id
 */
const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).select("-__v");

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    res.status(200).json({
      success: true,
      data: course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch course",
      error: error.message,
    });
  }
};

/**
 * POST /api/courses
 * Create new course
 */
const createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);

    res.status(201).json({
      success: true,
      message: "Course created successfully",
      data: course,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create course",
      error: error.message,
    });
  }
};

/**
 * PUT /api/courses/:id
 * Update course
 */
const updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).select("-__v");

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Course updated successfully",
      data: course,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update course",
      error: error.message,
    });
  }
};

/**
 * DELETE /api/courses/:id
 * Delete course
 */
const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete course",
      error: error.message,
    });
  }
};

/**
 * GET /api/courses/filters/options
 * Get course filter options from courses collection
 */
const getCourseFilterOptions = async (req, res) => {
  try {
    const levels = await Course.distinct("level");
    const categories = await Course.distinct("category");
    const instructors = await Course.distinct("instructor");

    res.status(200).json({
      success: true,
      data: {
        levels,
        categories,
        instructors,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch course filter options",
      error: error.message,
    });
  }
};

module.exports = {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  getCourseFilterOptions,
};
