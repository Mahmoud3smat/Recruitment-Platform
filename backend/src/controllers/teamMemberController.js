const TeamMember = require("../models/TeamMember");
const APIFeatures = require("../utils/apiFeatures");

/**
 * GET /api/team-members
 * Get all team members with search, filters, sort, fields, and pagination
 */
const getTeamMembers = async (req, res) => {
  try {
    const features = new APIFeatures(TeamMember.find(), req.query)
      .search(["name", "role", "bio"])
      .filter()
      .sort()
      .fields()
      .pagination();

    const teamMembers = await features.query;

    res.status(200).json({
      success: true,
      count: teamMembers.length,
      data: teamMembers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch team members",
      error: error.message,
    });
  }
};

/**
 * GET /api/team-members/:id
 * Get single team member by id
 */
const getTeamMemberById = async (req, res) => {
  try {
    const teamMember = await TeamMember.findById(req.params.id).select("-__v");

    if (!teamMember) {
      return res.status(404).json({
        success: false,
        message: "Team member not found",
      });
    }

    res.status(200).json({
      success: true,
      data: teamMember,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch team member",
      error: error.message,
    });
  }
};

/**
 * POST /api/team-members
 * Create new team member
 */
const createTeamMember = async (req, res) => {
  try {
    const teamMember = await TeamMember.create(req.body);

    res.status(201).json({
      success: true,
      message: "Team member created successfully",
      data: teamMember,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create team member",
      error: error.message,
    });
  }
};

/**
 * PUT /api/team-members/:id
 * Update team member
 */
const updateTeamMember = async (req, res) => {
  try {
    const teamMember = await TeamMember.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    ).select("-__v");

    if (!teamMember) {
      return res.status(404).json({
        success: false,
        message: "Team member not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Team member updated successfully",
      data: teamMember,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update team member",
      error: error.message,
    });
  }
};

/**
 * DELETE /api/team-members/:id
 * Delete team member
 */
const deleteTeamMember = async (req, res) => {
  try {
    const teamMember = await TeamMember.findByIdAndDelete(req.params.id);

    if (!teamMember) {
      return res.status(404).json({
        success: false,
        message: "Team member not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Team member deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete team member",
      error: error.message,
    });
  }
};

module.exports = {
  getTeamMembers,
  getTeamMemberById,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
};
