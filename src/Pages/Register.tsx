// React Libraries
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Briefcase, User, Building2 } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

// Animations
import { motion } from "framer-motion";

// Components
import { Button } from "@/Components/button";
import { Input } from "@/Components/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/select";

// Context Hooks
import { useAuth } from "@/Contexts/AuthContext";
import { normalizeAuthUser } from "@/Utils/authDisplay";

// Custom Hooks
import { useJobs } from "@/Hooks/useJobs";

// Data
import { API_URL } from "@/Data/MockData";

export const Register = () => {
  const [seekerData, setSeekerData] = useState({
    name: "",
    email: "",
    password: "",
    field: "",
  });

  const [companyData, setCompanyData] = useState({
    name: "",
    email: "",
    password: "",
    industry: "",
    location: "",
  });

  const navigate = useNavigate();
  const { login } = useAuth();
  const { jobCategories } = useJobs();

  // ---------------- VALIDATION ----------------
  const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  const validatePassword = (password: string) => password.length >= 6;

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl hero-gradient">
            <Briefcase className="h-7 w-7 text-primary-foreground" />
          </div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            Create your account
          </h1>
          <p className="mt-1 text-muted-foreground">Join JobConnect today</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 card-elevated">
          <Tabs defaultValue="seeker">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="seeker">
                <User className="h-4 w-4" /> Job Seeker
              </TabsTrigger>
              <TabsTrigger value="company">
                <Building2 className="h-4 w-4" /> Company
              </TabsTrigger>
            </TabsList>

            {/* ---------------- SEEKER ---------------- */}
            <TabsContent value="seeker">
              <form
                className="space-y-4"
                onSubmit={async (e) => {
                  e.preventDefault();

                  // validation
                  if (!seekerData.name.trim())
                    return toast.error("Name is required");

                  if (!validateEmail(seekerData.email))
                    return toast.error("Invalid email");

                  if (!validatePassword(seekerData.password))
                    return toast.error(
                      "Password must be at least 6 characters",
                    );

                  if (!seekerData.field) return toast.error("Select a field");

                  try {
                    const res = await axios.post(`${API_URL}/auth/register`, {
                      fullName: seekerData.name,
                      email: seekerData.email,
                      password: seekerData.password,
                      preferredField: seekerData.field,
                      role: "job_seeker",
                    });

                    login(
                      normalizeAuthUser(res.data, {
                        fullName: seekerData.name,
                        name: seekerData.name,
                        email: seekerData.email,
                        preferredField: seekerData.field,
                        role: "job_seeker",
                      }),
                      res.data.token,
                    );

                    toast.success("Account created successfully!");

                    navigate("/seeker-dashboard");
                  } catch (err: unknown) {
                    console.log("FULL ERROR:", err);

                    if (axios.isAxiosError(err)) {
                      console.log("STATUS:", err.response?.status);
                      console.log("DATA:", err.response?.data);
                      console.log("MESSAGE:", err.message);

                      toast.error(
                        err.response?.data?.message || "Registration failed",
                      );
                    } else {
                      console.log("UNKNOWN ERROR:", err);
                      toast.error("Something went wrong");
                    }
                  }
                }}
              >
                <Input
                  placeholder="Full Name"
                  value={seekerData.name}
                  onChange={(e) =>
                    setSeekerData({
                      ...seekerData,
                      name: e.target.value,
                    })
                  }
                />

                <Input
                  type="email"
                  placeholder="Email"
                  value={seekerData.email}
                  onChange={(e) =>
                    setSeekerData({
                      ...seekerData,
                      email: e.target.value,
                    })
                  }
                />

                <Input
                  type="password"
                  placeholder="Password"
                  value={seekerData.password}
                  onChange={(e) =>
                    setSeekerData({
                      ...seekerData,
                      password: e.target.value,
                    })
                  }
                />

                <Select
                  value={seekerData.field}
                  onValueChange={(v) =>
                    setSeekerData({
                      ...seekerData,
                      field: v,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select field" />
                  </SelectTrigger>

                  <SelectContent>
                    {jobCategories.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button type="submit" className="w-full">
                  Create Job Seeker Account
                </Button>
              </form>
            </TabsContent>

            {/* ---------------- COMPANY ---------------- */}
            <TabsContent value="company">
              <form
                className="space-y-4"
                onSubmit={async (e) => {
                  e.preventDefault();

                  // validation
                  if (!companyData.name.trim())
                    return toast.error("Company name required");

                  if (!validateEmail(companyData.email))
                    return toast.error("Invalid email");

                  if (!validatePassword(companyData.password))
                    return toast.error(
                      "Password must be at least 6 characters",
                    );

                  if (!companyData.industry.trim())
                    return toast.error("Industry required");

                  if (!companyData.location.trim())
                    return toast.error("Location required");

                  try {
                    const res = await axios.post(`${API_URL}/auth/register`, {
                      companyName: companyData.name,
                      email: companyData.email,
                      password: companyData.password,
                      industry: companyData.industry,
                      location: companyData.location,
                      role: "company",
                    });

                    localStorage.setItem("token", res.data.token);

                    login(
                      normalizeAuthUser(res.data, {
                        companyName: companyData.name,
                        name: companyData.name,
                        email: companyData.email,
                        industry: companyData.industry,
                        location: companyData.location,
                        role: "company",
                      }),
                      res.data.token,
                    );

                    toast.success("Company account created!");

                    navigate("/company-dashboard");
                  } catch (err: unknown) {
                    if (axios.isAxiosError(err)) {
                      toast.error(
                        err.response?.data?.message || "Registration failed",
                      );
                    } else {
                      toast.error("Something went wrong");
                    }
                  }
                }}
              >
                <Input
                  placeholder="Company Name"
                  value={companyData.name}
                  onChange={(e) =>
                    setCompanyData({
                      ...companyData,
                      name: e.target.value,
                    })
                  }
                />

                <Input
                  type="email"
                  placeholder="Email"
                  value={companyData.email}
                  onChange={(e) =>
                    setCompanyData({
                      ...companyData,
                      email: e.target.value,
                    })
                  }
                />

                <Input
                  type="password"
                  placeholder="Password"
                  value={companyData.password}
                  onChange={(e) =>
                    setCompanyData({
                      ...companyData,
                      password: e.target.value,
                    })
                  }
                />

                <Input
                  placeholder="Industry"
                  value={companyData.industry}
                  onChange={(e) =>
                    setCompanyData({
                      ...companyData,
                      industry: e.target.value,
                    })
                  }
                />

                <Input
                  placeholder="Location"
                  value={companyData.location}
                  onChange={(e) =>
                    setCompanyData({
                      ...companyData,
                      location: e.target.value,
                    })
                  }
                />

                <Button type="submit" className="w-full">
                  Create Company Account
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary hover:underline font-medium"
            >
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};
