require("dotenv").config();

const connectDB = require("../config/db");
const Job = require("../models/Job");

const jobs = [
  {
    title: "Senior Frontend Developer",
    company: "TechCorp",
    location: "Cairo, Egypt",
    type: "Full-time",
    salary: "EGP 25,000 - 35,000",
    category: "Frontend",
    postedAt: "2 days ago",
    experience: "3-5 years",
    skills: ["React", "TypeScript", "Tailwind CSS", "Next.js", "Redux"],
    description:
      "We are looking for a Senior Frontend Developer to join our growing team. You will be responsible for building and maintaining high-quality web applications using modern frameworks.",
    benefits: ["Medical Insurance", "Housing Allowance", "Remote Friendly"],
  },
  {
    title: "Full Stack Engineer",
    company: "Digital Solutions",
    location: "Alexandria, Egypt",
    type: "Full-time",
    salary: "EGP 30,000 - 40,000",
    category: "Fullstack",
    postedAt: "1 week ago",
    experience: "4-6 years",
    skills: ["React", "Node.js", "PostgreSQL", "Docker", "AWS"],
    description:
      "Join our innovative team as a Full Stack Engineer. You will work on cutting-edge projects and collaborate with cross-functional teams to deliver exceptional products.",
    benefits: ["Transport Allowance", "Social Insurance", "Annual Bonus"],
  },
  {
    title: "Backend Developer (Node.js)",
    company: "DataFlow Systems",
    location: "Dubai, UAE",
    type: "Full-time",
    salary: "EGP 35,000 - 50,000",
    category: "Backend",
    postedAt: "3 days ago",
    experience: "3-5 years",
    skills: ["Node.js", "Express", "MongoDB", "Redis", "GraphQL"],
    description:
      "Build scalable APIs and microservices using Node.js, PostgreSQL, and cloud infrastructure for our enterprise clients.",
    benefits: ["Housing Allowance", "Medical Insurance", "Transport Allowance"],
  },
  {
    title: "UI/UX Designer",
    company: "CreativeHub",
    location: "Remote",
    type: "Contract",
    salary: "EGP 15,000 - 25,000",
    category: "Design",
    postedAt: "5 days ago",
    experience: "1-3 years",
    skills: ["Figma", "Adobe XD", "CSS", "User Research"],
    description:
      "Design beautiful, intuitive interfaces for our SaaS products. Strong Figma skills and a great portfolio required.",
    benefits: ["Remote Friendly", "Flexible Hours"],
  },
  {
    title: "DevOps Engineer",
    company: "CloudNet Solutions",
    location: "Riyadh, Saudi Arabia",
    type: "Full-time",
    salary: "EGP 40,000 - 60,000",
    category: "DevOps",
    postedAt: "1 week ago",
    experience: "5+ years",
    skills: ["Docker", "Kubernetes", "AWS", "CI/CD", "Terraform"],
    description:
      "Manage and optimize our cloud infrastructure on AWS. Experience with Docker, Kubernetes, and CI/CD pipelines required.",
    benefits: ["Housing Allowance", "Medical Insurance", "Transport Allowance"],
  },
  {
    title: "Mobile Developer (React Native)",
    company: "AppForge",
    location: "Amman, Jordan",
    type: "Full-time",
    salary: "EGP 20,000 - 30,000",
    category: "Mobile",
    postedAt: "4 days ago",
    experience: "2-4 years",
    skills: ["React Native", "TypeScript", "Redux", "Firebase"],
    description:
      "Build cross-platform mobile applications using React Native. Knowledge of native iOS/Android development is a plus.",
    benefits: ["Social Insurance", "Annual Bonus", "Flexible Hours"],
  },
  {
    title: "Junior Frontend Developer",
    company: "StartUp Hub",
    location: "Cairo, Egypt",
    type: "Full-time",
    salary: "EGP 8,000 - 15,000",
    category: "Frontend",
    postedAt: "1 day ago",
    experience: "0-1 years",
    skills: ["HTML", "CSS", "JavaScript", "React"],
    description:
      "Great opportunity for fresh graduates to kick-start their career in frontend development with mentorship and training.",
    benefits: ["Medical Insurance", "Training Budget"],
  },
  {
    title: "Data Analyst",
    company: "Insight Analytics",
    location: "Cairo, Egypt",
    type: "Part-time",
    salary: "EGP 12,000 - 18,000",
    category: "Data Science",
    postedAt: "3 days ago",
    experience: "1-3 years",
    skills: ["Python", "SQL", "Power BI", "Excel"],
    description:
      "Analyze business data and create insightful reports and dashboards to drive decision-making across the organization.",
    benefits: ["Flexible Hours", "Remote Friendly"],
  },
];

const seedJobs = async () => {
  try {
    await connectDB();

    await Job.deleteMany();
    await Job.insertMany(jobs);

    console.log("Jobs data seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error("Jobs seeding failed:", error.message);
    process.exit(1);
  }
};

seedJobs();
