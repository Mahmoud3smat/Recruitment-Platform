export interface JobPosting {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  type: string;
  salaryMin: string;
  salaryMax: string;
  workHours: string;
  benefits: string[];
  expiryDate: string;
  active: boolean;
  createdAt: string;
}

export interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  category: string;
  postedAt: string;
  experience: string;
  skills: string[];
  description: string;
  benefits: string[];
  isSaved: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface JobsResponse {
  success: boolean;
  count: number;
  data: Job[];
}

export const skillTests = [
  {
    id: "t1",
    title: "React Fundamentals",
    category: "Frontend",
    questions: 25,
    duration: "30 min",
    difficulty: "Intermediate",
    description:
      "Test your knowledge of React hooks, components, state management, and lifecycle.",
  },
  {
    id: "t2",
    title: "Node.js & Express",
    category: "Backend",
    questions: 20,
    duration: "25 min",
    difficulty: "Intermediate",
    description:
      "Cover REST APIs, middleware, authentication, and database integration with Node.js.",
  },
  {
    id: "t3",
    title: "TypeScript Mastery",
    category: "Frontend",
    questions: 30,
    duration: "40 min",
    difficulty: "Advanced",
    description:
      "Advanced TypeScript types, generics, utility types, and design patterns.",
  },
  {
    id: "t4",
    title: "SQL & Database Design",
    category: "Backend",
    questions: 20,
    duration: "25 min",
    difficulty: "Beginner",
    description:
      "Fundamentals of SQL queries, joins, normalization, and indexing.",
  },
  {
    id: "t5",
    title: "CSS & Responsive Design",
    category: "Design",
    questions: 15,
    duration: "20 min",
    difficulty: "Beginner",
    description: "Flexbox, Grid, media queries, and modern CSS techniques.",
  },
];

export const courses = [
  {
    id: "c1",
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
    id: "c2",
    title: "Fullstack Development Bootcamp",
    instructor: "Nour Ibrahim",
    duration: "24 hours",
    lessons: 96,
    level: "Beginner",
    category: "Fullstack",
    description:
      "From zero to fullstack — learn React, Node.js, PostgreSQL, and deployment.",
    rating: 4.9,
    enrolled: 2100,
  },
  {
    id: "c3",
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
    id: "c4",
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
    id: "c5",
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

export const mockCandidates = [
  {
    id: "cand1",
    name: "Ali Mostafa",
    title: "Frontend Developer",
    location: "Cairo, Egypt",
    skills: ["React", "TypeScript", "Tailwind CSS", "Next.js"],
    experience: "3 years",
    education: "BSc Computer Science",
    matchScore: 92,
  },
  {
    id: "cand2",
    name: "Layla Ahmed",
    title: "Fullstack Developer",
    location: "Alexandria, Egypt",
    skills: ["React", "Node.js", "PostgreSQL", "Docker"],
    experience: "5 years",
    education: "MSc Software Engineering",
    matchScore: 88,
  },
  {
    id: "cand3",
    name: "Karim Youssef",
    title: "Backend Developer",
    location: "Dubai, UAE",
    skills: ["Node.js", "Python", "AWS", "MongoDB"],
    experience: "4 years",
    education: "BSc Information Technology",
    matchScore: 85,
  },
  {
    id: "cand4",
    name: "Nada Ibrahim",
    title: "UI/UX Designer",
    location: "Remote",
    skills: ["Figma", "Adobe XD", "CSS", "User Research"],
    experience: "2 years",
    education: "BSc Fine Arts",
    matchScore: 78,
  },
];
