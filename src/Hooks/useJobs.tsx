// React Libraries
import { useEffect, useState } from "react";
import axios from "axios";

// Data
import { Job } from "@/Data/MockData";

export const useJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [jobCategories, setJobCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get<{
          success: boolean;
          data: Job[];
        }>("https://recruitment-platform-backend-azure.vercel.app/api/jobs");
  
        const fetchedJobs = response.data.data;
  
        setJobs(fetchedJobs);
  
        const categories = [
          ...new Set(fetchedJobs.map((job) => job.category)),
        ];
  
        setJobCategories(categories);
      } catch (err) {
        setError("Failed to fetch jobs");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchJobs();
  }, []);

  return { jobs, loading, error, jobCategories, setJobCategories };
};
