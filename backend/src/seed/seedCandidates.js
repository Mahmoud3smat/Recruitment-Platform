require("dotenv").config();

const connectDB = require("../config/db");
const Candidate = require("../models/Candidate");

const candidates = [
  {
    name: "Ali Mostafa",
    title: "Frontend Developer",
    location: "Cairo, Egypt",
    skills: ["React", "TypeScript", "Tailwind CSS", "Next.js"],
    experience: "3 years",
    education: "BSc Computer Science",
    matchScore: 92,
  },
  {
    name: "Layla Ahmed",
    title: "Fullstack Developer",
    location: "Alexandria, Egypt",
    skills: ["React", "Node.js", "PostgreSQL", "Docker"],
    experience: "5 years",
    education: "MSc Software Engineering",
    matchScore: 88,
  },
  {
    name: "Karim Youssef",
    title: "Backend Developer",
    location: "Dubai, UAE",
    skills: ["Node.js", "Python", "AWS", "MongoDB"],
    experience: "4 years",
    education: "BSc Information Technology",
    matchScore: 85,
  },
  {
    name: "Nada Ibrahim",
    title: "UI/UX Designer",
    location: "Remote",
    skills: ["Figma", "Adobe XD", "CSS", "User Research"],
    experience: "2 years",
    education: "BSc Fine Arts",
    matchScore: 78,
  },
];

const seedCandidates = async () => {
  try {
    await connectDB();

    await Candidate.deleteMany();
    await Candidate.insertMany(candidates);

    console.log("Candidates data seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error("Candidates seeding failed:", error.message);
    process.exit(1);
  }
};

seedCandidates();
