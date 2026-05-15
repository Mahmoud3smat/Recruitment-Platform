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

export interface Course {
  _id: string;
  title: string;
  instructor: string;
  description: string;
  category: string;
  duration: string;
  lessons: number;
  enrolled: number;
  rating: number;
  level: string;
}

export interface SkillTest {
  _id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  questions: number;
  duration: string;
}

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
