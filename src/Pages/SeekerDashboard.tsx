// React Libraries
import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { toast } from "sonner";
import {
  User,
  Briefcase,
  GraduationCap,
  Award,
  BookOpen,
  Star,
  Clock,
  Users,
  CheckCircle,
  Play,
  Edit,
  Save,
  X,
} from "lucide-react";

// Animations
import { motion } from "framer-motion";

// Components
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/tabs";
import { Button } from "@/Components/button";
import { Input } from "@/Components/input";
import { Label } from "@/Components/label";
import { Badge } from "@/Components/badge";
import { Textarea } from "@/Components/textarea";
import JobCard from "@/Components/JobCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/Components/dialog";

// Data
import { Course, SkillTest, API_URL, Profile } from "@/Data/MockData";

// Custom Hooks
import { useJobs } from "@/Hooks/useJobs";
import { useAuth } from "@/Contexts/AuthContext";
import { getUserFirstName } from "@/Utils/authDisplay";

export const SeekerDashboard = () => {
  const { user } = useAuth();
  const firstName = getUserFirstName(user, "Job Seeker");
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditing, setIsEditing] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [testDialog, setTestDialog] = useState<string | null>(null);
  const [enrollDialog, setEnrollDialog] = useState<string | null>(null);
  const { jobs, jobCategories } = useJobs();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loadingCourses, setLoadingCourses] = useState(false);
  const [skillTests, setSkillTests] = useState<SkillTest[]>([]);
  const [loadingTests, setLoadingTests] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [profile, setProfile] = useState<Profile>({
    name: "",
    email: "",
    title: "",
    location: "",
    experience: "",
    education: "",
    skills: [],
    certifications: [],
    preferredField: "",
    bio: "",
  });

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoadingCourses(true);

        const response = await axios.get<{
          success: boolean;
          count: number;
          data: Course[];
        }>(`${API_URL}/courses`);

        setCourses(response.data.data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load courses");
      } finally {
        setLoadingCourses(false);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    const fetchSkillTests = async () => {
      try {
        setLoadingTests(true);

        const response = await axios.get<{
          success: boolean;
          count: number;
          data: SkillTest[];
        }>(`${API_URL}/skill-tests`);

        setSkillTests(response.data.data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load skill tests");
      } finally {
        setLoadingTests(false);
      }
    };

    fetchSkillTests();
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoadingProfile(true);

      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(`${API_URL}/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const userData = response.data?.data ?? {};

        setProfile({
          name: userData.name || "",
          email: userData.email || "",
          title: userData.title || "",
          location: userData.location || "",
          experience: userData.experience || "",
          education: userData.education || "",
          skills: userData.skills || [],
          certifications: userData.certifications || [],
          preferredField: userData.preferredField || "",
          bio: userData.bio || "",
        });
      } catch (error) {
        console.error(error);
        toast.error("Failed to load profile");
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchProfile();
  }, []);

  const recommendedJobs = useMemo(() => {
    return jobs.filter(
      (j) =>
        j.category === profile.preferredField ||
        profile.skills.some((s) =>
          (j.description || "").toLowerCase().includes(s.toLowerCase()),
        ),
    );
  }, [jobs, profile.preferredField, profile.skills]);

  const addSkill = () => {
    if (
      newSkill.trim() &&
      !profile.skills.some(
        (s) => s.toLowerCase() === newSkill.trim().toLowerCase(),
      )
    ) {
      setProfile((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }));

      setNewSkill("");
      toast.success("Skill added!");
    }
  };

  const removeSkill = (skill: string) => {
    setProfile((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }));
  };

  const handleSaveProfile = async () => {
    try {
      setSavingProfile(true); // 👈 start loading

      const token = localStorage.getItem("token");

      await axios.put(`${API_URL}/auth/profile`, profile, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Profile saved!");
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to save profile");
    } finally {
      setSavingProfile(false); // 👈 stop loading
    }
  };

  if (loadingProfile) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">
              Welcome back, {firstName}!
            </h1>
            <p className="text-muted-foreground">
              Manage your profile and discover opportunities
            </p>
          </div>
          <Badge
            variant="outline"
            className="w-fit gap-1.5 px-3 py-1.5 text-sm"
          >
            <User className="h-3.5 w-3.5" /> Job Seeker
          </Badge>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8 flex w-full flex-wrap justify-start gap-1 bg-transparent p-0">
            {[
              { value: "overview", icon: Briefcase, label: "Overview" },
              { value: "profile", icon: User, label: "Profile" },
              { value: "tests", icon: Award, label: "Skill Tests" },
              { value: "courses", icon: BookOpen, label: "Courses" },
            ].map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="gap-2 rounded-lg border border-transparent px-4 py-2.5 data-[state=active]:border-border data-[state=active]:bg-card data-[state=active]:shadow-sm"
              >
                <tab.icon className="h-4 w-4" /> {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* OVERVIEW TAB */}
          <TabsContent value="overview">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
              {[
                {
                  label: "Profile Completion",
                  value: "85%",
                  icon: User,
                  color: "text-primary",
                },
                {
                  label: "Matching Jobs",
                  value: String(recommendedJobs.length),
                  icon: Briefcase,
                  color: "text-accent",
                },
                {
                  label: "Tests Completed",
                  value: "2",
                  icon: Award,
                  color: "text-primary",
                },
                {
                  label: "Courses Enrolled",
                  value: "1",
                  icon: BookOpen,
                  color: "text-accent",
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-border bg-card p-5 card-elevated"
                >
                  <div className="flex items-center justify-between">
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                    <span className="font-display text-2xl font-bold text-card-foreground">
                      {stat.value}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <div>
              <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                Recommended for You
              </h2>
              {loadingCourses ? (
                <p className="text-muted-foreground">Loading courses...</p>
              ) : courses?.length === 0 ? (
                <p className="text-muted-foreground">No courses available.</p>
              ) : recommendedJobs.length === 0 ? (
                <p className="text-muted-foreground">
                  Update your profile to get personalized recommendations.
                </p>
              ) : (
                <div className="grid items-stretch gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {recommendedJobs.map((job, i) => (
                    <JobCard key={job._id} job={job} index={i} />
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          {/* PROFILE TAB */}
          <TabsContent value="profile">
            <div className="max-w-2xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-xl font-semibold text-foreground">
                  Your Profile
                </h2>
                <Button
                  variant={isEditing ? "default" : "outline"}
                  size="sm"
                  className="gap-2"
                  disabled={savingProfile}
                  onClick={() => {
                    if (isEditing) {
                      handleSaveProfile();
                    } else {
                      setIsEditing(true);
                    }
                  }}
                >
                  {isEditing ? (
                    savingProfile ? (
                      <>
                        <Clock className="h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4" /> Save
                      </>
                    )
                  ) : (
                    <>
                      <Edit className="h-4 w-4" /> Edit
                    </>
                  )}
                </Button>
              </div>

              <div className="space-y-6 rounded-xl border border-border bg-card p-6 card-elevated">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label>Full Name</Label>
                    <Input
                      disabled={!isEditing}
                      value={profile.name}
                      onChange={(e) =>
                        setProfile((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input
                      disabled={!isEditing}
                      value={profile.email}
                      onChange={(e) =>
                        setProfile((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <Label>Job Title</Label>
                    <Input
                      disabled={!isEditing}
                      value={profile.title}
                      onChange={(e) =>
                        setProfile((prev) => ({
                          ...prev,
                          title: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <Label>Location</Label>
                    <Input
                      disabled={!isEditing}
                      value={profile.location}
                      onChange={(e) =>
                        setProfile({ ...profile, location: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label>Experience</Label>
                    <Input
                      disabled={!isEditing}
                      value={profile.experience}
                      onChange={(e) =>
                        setProfile((prev) => ({
                          ...prev,
                          experience: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <Label>Preferred Job Field</Label>
                    <Select
                      disabled={!isEditing}
                      value={profile.preferredField}
                      onValueChange={(v) =>
                        setProfile((prev) => ({ ...prev, preferredField: v }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {jobCategories.map((c) => (
                          <SelectItem key={c} value={c}>
                            {c}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label>Education</Label>
                  <Input
                    disabled={!isEditing}
                    value={profile.education}
                    onChange={(e) =>
                      setProfile((prev) => ({
                        ...prev,
                        education: e.target.value,
                      }))
                    }
                  />
                </div>

                <div>
                  <Label>Bio</Label>
                  <Textarea
                    disabled={!isEditing}
                    value={profile.bio}
                    onChange={(e) =>
                      setProfile((prev) => ({ ...prev, bio: e.target.value }))
                    }
                    rows={3}
                  />
                </div>

                <div>
                  <Label className="mb-2 block">Skills</Label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {profile.skills.map((s) => (
                      <Badge
                        key={s}
                        variant="secondary"
                        className="gap-1 pr-1.5"
                      >
                        {s}
                        {isEditing && (
                          <button
                            onClick={() => removeSkill(s)}
                            className="ml-1 rounded-full hover:bg-destructive/20 p-0.5"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        )}
                      </Badge>
                    ))}
                  </div>
                  {isEditing && (
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a skill..."
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && addSkill()}
                      />
                      <Button variant="outline" onClick={addSkill}>
                        Add
                      </Button>
                    </div>
                  )}
                </div>

                <div>
                  <Label className="mb-2 block">Certifications</Label>
                  <div className="flex flex-wrap gap-2">
                    {profile.certifications.map((c) => (
                      <Badge key={c} variant="outline" className="gap-1">
                        <Award className="h-3 w-3" /> {c}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* SKILL TESTS TAB */}
          <TabsContent value="tests">
            <h2 className="font-display text-xl font-semibold text-foreground mb-4">
              Available Skill Tests
            </h2>
            <p className="text-muted-foreground mb-6">
              Take skill assessments to validate your expertise and stand out to
              employers.
            </p>
            <div className="grid items-stretch gap-4 md:grid-cols-2 lg:grid-cols-3">
              {loadingTests ? (
                <p className="text-muted-foreground">Loading tests...</p>
              ) : skillTests?.length === 0 ? (
                <p className="text-muted-foreground">No tests available.</p>
              ) : (
                skillTests.map((test, i) => (
                  <motion.div
                    key={test._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex h-full min-h-[260px] flex-col rounded-xl border border-border bg-card p-5 card-elevated"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <Badge variant="secondary">{test.category}</Badge>
                      <Badge variant="outline" className="text-xs">
                        {test.difficulty}
                      </Badge>
                    </div>
                    <h3 className="font-display text-lg font-semibold text-card-foreground">
                      {test.title}
                    </h3>
                    <p className="mt-2 line-clamp-3 min-h-[3.75rem] text-sm text-muted-foreground">
                      {test.description}
                    </p>
                    <div className="mt-auto flex items-center gap-4 pt-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <CheckCircle className="h-3.5 w-3.5" /> {test.questions}{" "}
                        questions
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" /> {test.duration}
                      </span>
                    </div>
                    <Dialog
                      open={testDialog === test._id}
                      onOpenChange={(o) => setTestDialog(o ? test._id : null)}
                    >
                      <DialogTrigger asChild>
                        <Button className="mt-4 w-full gap-2" variant="outline">
                          <Play className="h-4 w-4" /> Start Test
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle className="font-display">
                            {test.title}
                          </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <p className="text-muted-foreground">
                            {test.description}
                          </p>
                          <div className="rounded-lg bg-muted p-4 space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                Questions:
                              </span>
                              <span className="font-medium text-foreground">
                                {test.questions}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                Duration:
                              </span>
                              <span className="font-medium text-foreground">
                                {test.duration}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                Difficulty:
                              </span>
                              <span className="font-medium text-foreground">
                                {test.difficulty}
                              </span>
                            </div>
                          </div>
                          <Button
                            className="w-full"
                            onClick={() => {
                              setTestDialog(null);
                              toast.success("Test started! Good luck! 🎯");
                            }}
                          >
                            Begin Assessment
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </motion.div>
                ))
              )}
            </div>
          </TabsContent>

          {/* COURSES TAB */}
          <TabsContent value="courses">
            <h2 className="font-display text-xl font-semibold text-foreground mb-4">
              Improve Your Skills
            </h2>
            <p className="text-muted-foreground mb-6">
              Enroll in courses to sharpen your skills and boost your career
              prospects.
            </p>
            {loadingCourses ? (
              <p className="text-muted-foreground">Loading courses...</p>
            ) : (
              <div className="grid items-stretch gap-4 md:grid-cols-2 lg:grid-cols-3">
                {courses.map((course, i) => (
                  <motion.div
                    key={course._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex h-full min-h-[300px] flex-col rounded-xl border border-border bg-card p-5 card-elevated"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <Badge variant="secondary">{course.category}</Badge>
                      <div className="flex items-center gap-1 text-sm text-accent">
                        <Star className="h-3.5 w-3.5 fill-current" />{" "}
                        {course.rating}
                      </div>
                    </div>
                    <h3 className="font-display text-lg font-semibold text-card-foreground">
                      {course.title}
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      by {course.instructor}
                    </p>
                    <p className="mt-2 line-clamp-3 min-h-[3.75rem] text-sm text-muted-foreground">
                      {course.description}
                    </p>
                    <div className="mt-auto flex flex-wrap items-center gap-3 pt-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" /> {course.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <BookOpen className="h-3.5 w-3.5" /> {course.lessons}{" "}
                        lessons
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3.5 w-3.5" />{" "}
                        {course.enrolled.toLocaleString()}
                      </span>
                    </div>
                    <Dialog
                      open={enrollDialog === course._id}
                      onOpenChange={(o) =>
                        setEnrollDialog(o ? course._id : null)
                      }
                    >
                      <DialogTrigger asChild>
                        <Button className="mt-4 w-full gap-2">
                          <GraduationCap className="h-4 w-4" /> Enroll Now
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle className="font-display">
                            {course.title}
                          </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <p className="text-muted-foreground">
                            {course.description}
                          </p>
                          <div className="rounded-lg bg-muted p-4 space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                Instructor:
                              </span>
                              <span className="font-medium text-foreground">
                                {course.instructor}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                Duration:
                              </span>
                              <span className="font-medium text-foreground">
                                {course.duration}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                Level:
                              </span>
                              <span className="font-medium text-foreground">
                                {course.level}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                Enrolled:
                              </span>
                              <span className="font-medium text-foreground">
                                {course.enrolled.toLocaleString()} students
                              </span>
                            </div>
                          </div>
                          <Button
                            className="w-full"
                            onClick={() => {
                              setEnrollDialog(null);
                              toast.success(`Enrolled in "${course.title}" 🎓`);
                            }}
                          >
                            Confirm Enrollment
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};
