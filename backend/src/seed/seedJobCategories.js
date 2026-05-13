require("dotenv").config();

const connectDB = require("../config/db");
const JobCategory = require("../models/JobCategory");

const jobCategories = [
  {
    name: "Frontend",
    slug: "frontend",
    description:
      "Jobs related to frontend web development and UI implementation.",
    order: 1,
  },
  {
    name: "Backend",
    slug: "backend",
    description: "Jobs related to backend APIs, servers, and database logic.",
    order: 2,
  },
  {
    name: "Fullstack",
    slug: "fullstack",
    description:
      "Jobs that include both frontend and backend responsibilities.",
    order: 3,
  },
  {
    name: "Mobile",
    slug: "mobile",
    description: "Jobs related to mobile application development.",
    order: 4,
  },
  {
    name: "DevOps",
    slug: "devops",
    description:
      "Jobs related to deployment, cloud, CI/CD, and infrastructure.",
    order: 5,
  },
  {
    name: "Design",
    slug: "design",
    description: "Jobs related to UI, UX, and product design.",
    order: 6,
  },
  {
    name: "Data Science",
    slug: "data-science",
    description:
      "Jobs related to data analysis, machine learning, and analytics.",
    order: 7,
  },
  {
    name: "QA",
    slug: "qa",
    description: "Jobs related to quality assurance and software testing.",
    order: 8,
  },
  {
    name: "Product Management",
    slug: "product-management",
    description: "Jobs related to product planning, delivery, and management.",
    order: 9,
  },
];

const seedJobCategories = async () => {
  try {
    await connectDB();

    await JobCategory.deleteMany();
    await JobCategory.insertMany(jobCategories);

    console.log("Job categories data seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error("Job categories seeding failed:", error.message);
    process.exit(1);
  }
};

seedJobCategories();
