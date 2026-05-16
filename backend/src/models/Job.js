const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    company: {
      type: String,
      required: true,
      trim: true,
    },

    active: {
      type: Boolean,
      default: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      required: true,
      enum: ["Full-time", "Part-time", "Contract", "Remote", "Internship"],
    },

    salary: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
      enum: [
        "Frontend",
        "Backend",
        "Fullstack",
        "Mobile",
        "DevOps",
        "Design",
        "Data Science",
        "QA",
        "Product Management",
      ],
    },

    postedAt: {
      type: String,
      required: true,
    },

    experience: {
      type: String,
      required: true,
    },

    skills: {
      type: [String],
      default: [],
    },

    description: {
      type: String,
      required: true,
    },

    benefits: {
      type: [String],
      default: [],
    },

    isSaved: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Job", jobSchema);
