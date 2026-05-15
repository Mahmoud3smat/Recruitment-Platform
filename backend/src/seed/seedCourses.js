require("dotenv").config();

const connectDB = require("../config/db");
const Course = require("../models/Course");

const courses = [
  {
    title: "Modern React with TypeScript",
    instructor: "Ahmed Hassan",
    duration: "12 hours",
    lessons: 48,
    level: "Intermediate",
    category: "Frontend",
    description:
      "Master React 18 with TypeScript, hooks, context, and performance optimization.",
    rating: 4.8,
    enrolled: 1240,
  },
  {
    title: "Fullstack Development Bootcamp",
    instructor: "Nour Ibrahim",
    duration: "24 hours",
    lessons: 96,
    level: "Beginner",
    category: "Fullstack",
    description:
      "From zero to fullstack, learn React, Node.js, PostgreSQL, and deployment.",
    rating: 4.9,
    enrolled: 2100,
  },
  {
    title: "Advanced Node.js Patterns",
    instructor: "Omar Ali",
    duration: "8 hours",
    lessons: 32,
    level: "Advanced",
    category: "Backend",
    description:
      "Microservices, event-driven architecture, and scalable backend design.",
    rating: 4.7,
    enrolled: 890,
  },
  {
    title: "UI/UX Design Fundamentals",
    instructor: "Sara Mohamed",
    duration: "10 hours",
    lessons: 40,
    level: "Beginner",
    category: "Design",
    description:
      "Learn Figma, design systems, user research, and prototyping from scratch.",
    rating: 4.6,
    enrolled: 1560,
  },
  {
    title: "DevOps & Cloud Infrastructure",
    instructor: "Youssef Khaled",
    duration: "14 hours",
    lessons: 56,
    level: "Intermediate",
    category: "DevOps",
    description:
      "Docker, Kubernetes, CI/CD pipelines, and AWS cloud architecture.",
    rating: 4.8,
    enrolled: 670,
  },
];

const seedCourses = async () => {
  try {
    await connectDB();

    await Course.deleteMany();
    await Course.insertMany(courses);

    console.log("Courses data seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error("Courses seeding failed:", error.message);
    process.exit(1);
  }
};

seedCourses();
