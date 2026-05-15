require("dotenv").config();

const connectDB = require("../config/db");
const SkillTest = require("../models/SkillTest");

const skillTests = [
  {
    title: "React Fundamentals",
    category: "Frontend",
    questions: 25,
    duration: "30 min",
    difficulty: "Intermediate",
    description:
      "Test your knowledge of React hooks, components, state management, and lifecycle.",
  },
  {
    title: "Node.js & Express",
    category: "Backend",
    questions: 20,
    duration: "25 min",
    difficulty: "Intermediate",
    description:
      "Cover REST APIs, middleware, authentication, and database integration with Node.js.",
  },
  {
    title: "TypeScript Mastery",
    category: "Frontend",
    questions: 30,
    duration: "40 min",
    difficulty: "Advanced",
    description:
      "Advanced TypeScript types, generics, utility types, and design patterns.",
  },
  {
    title: "SQL & Database Design",
    category: "Backend",
    questions: 20,
    duration: "25 min",
    difficulty: "Beginner",
    description:
      "Fundamentals of SQL queries, joins, normalization, and indexing.",
  },
  {
    title: "CSS & Responsive Design",
    category: "Design",
    questions: 15,
    duration: "20 min",
    difficulty: "Beginner",
    description: "Flexbox, Grid, media queries, and modern CSS techniques.",
  },
];

const seedSkillTests = async () => {
  try {
    await connectDB();

    await SkillTest.deleteMany();
    await SkillTest.insertMany(skillTests);

    console.log("Skill tests data seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error("Skill tests seeding failed:", error.message);
    process.exit(1);
  }
};

seedSkillTests();
