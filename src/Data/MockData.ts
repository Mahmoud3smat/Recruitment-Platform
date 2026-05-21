export const API_URL =
  "https://recruitment-platform-backend-azure.vercel.app/api";

export interface JobPosting {
  _id: string;
  active: boolean;
  company: string;
  title: string;
  description: string;
  category: string;
  location: string;
  type: string;
  salaryMin: string;
  salaryMax: string;
  experience: string;
  skills: string;
  workHours: string;
  benefits: string[];
  expiryDate: string;
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

export interface Profile {
  name: string;
  email: string;
  title: string;
  location: string;
  experience: string;
  education: string;
  skills: string[];
  certifications: string[];
  preferredField: string;
  bio: string;
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

export interface Candidate {
  _id: string;
  name: string;
  title: string;
  location: string;
  experience: string;
  education: string;
  skills: string[];
  matchScore: number;
}
