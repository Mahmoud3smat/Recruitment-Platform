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
import { Label } from "@/Components/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/tabs";

// Contexts Hooks
import { useAuth } from "@/Contexts/AuthContext";

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [seekerLogin, setSeekerLogin] = useState({
    email: "",
    password: "",
  });

  const [companyLogin, setCompanyLogin] = useState({
    email: "",
    password: "",
  });

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
            Welcome back
          </h1>
          <p className="mt-1 text-muted-foreground">Sign in to your account</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 card-elevated">
          <Tabs defaultValue="seeker">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="seeker" className="gap-2">
                <User className="h-4 w-4" /> Job Seeker
              </TabsTrigger>
              <TabsTrigger value="company" className="gap-2">
                <Building2 className="h-4 w-4" /> Company
              </TabsTrigger>
            </TabsList>

            <TabsContent value="seeker">
              <form
                className="space-y-4"
                onSubmit={async (e) => {
                  e.preventDefault();

                  try {
                    const res = await axios.post(
                      "http://localhost:5000/api/auth/login",
                      {
                        email: seekerLogin.email,
                        password: seekerLogin.password,
                        role: "job_seeker",
                      },
                    );

                    login(res.data.user, res.data.token);
                    toast.success("Welcome back!");

                    navigate("/seeker-dashboard");
                  } catch (err: unknown) {
                    if (axios.isAxiosError(err)) {
                      const message =
                        err.response?.data?.message ||
                        err.response?.data?.errors?.[0]?.message ||
                        "Login failed";

                      toast.error(message);

                      console.log("STATUS:", err.response?.status);
                      console.log("DATA:", err.response?.data);
                    } else {
                      toast.error("Something went wrong");
                      console.log(err);
                    }
                  }
                }}
              >
                <div>
                  <Label htmlFor="seeker-email">Email</Label>

                  <Input
                    value={seekerLogin.email}
                    onChange={(e) =>
                      setSeekerLogin({
                        ...seekerLogin,
                        email: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="seeker-pass">Password</Label>
                  <Input
                    value={seekerLogin.password}
                    onChange={(e) =>
                      setSeekerLogin({
                        ...seekerLogin,
                        password: e.target.value,
                      })
                    }
                  />
                </div>
                <Button className="w-full" type="submit">
                  Sign In as Job Seeker
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="company">
              <form
                className="space-y-4"
                onSubmit={async (e) => {
                  e.preventDefault();

                  try {
                    const res = await axios.post(
                      "http://localhost:5000/api/auth/login",
                      {
                        email: companyLogin.email,
                        password: companyLogin.password,
                        role: "company",
                      },
                    );

                    login(res.data.user, res.data.token);
                    toast.success("Welcome back!");

                    navigate("/company-dashboard");
                  } catch (err: unknown) {
                    if (axios.isAxiosError(err)) {
                      const message =
                        err.response?.data?.message ||
                        err.response?.data?.errors?.[0]?.message ||
                        "Login failed";

                      toast.error(message);

                      console.log("STATUS:", err.response?.status);
                      console.log("DATA:", err.response?.data);
                    } else {
                      toast.error("Something went wrong");
                      console.log(err);
                    }
                  }
                }}
              >
                <div>
                  <Label htmlFor="company-email">Company Email</Label>
                  <Input
                    value={companyLogin.email}
                    onChange={(e) =>
                      setCompanyLogin({
                        ...companyLogin,
                        email: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="company-pass">Password</Label>
                  <Input
                    value={companyLogin.password}
                    onChange={(e) =>
                      setCompanyLogin({
                        ...companyLogin,
                        password: e.target.value,
                      })
                    }
                  />
                </div>
                <Button className="w-full" type="submit">
                  Sign In as Company
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-primary hover:underline font-medium"
            >
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};
