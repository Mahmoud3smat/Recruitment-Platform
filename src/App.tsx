import { BrowserRouter, Routes, Route } from "react-router-dom";

// -------------- Contexts --------------
import { AuthProvider } from "./Contexts/AuthContext";

// -------------- Fixed Components --------------
import { Navbar } from "@/Components/Navbar";
import { Footer } from "@/Components/Footer";

// -------------- Pages --------------
import { Index } from "@/Pages/Index";
import { Jobs } from "@/Pages/Jobs";
import { JobDetail } from "@/Pages/JobDetail";
import { About } from "@/Pages/About";
import { Team } from "@/Pages/Team";
import { Login } from "@/Pages/Login";
import { Register } from "@/Pages/Register";
import { NotFound } from "@/Components/NotFound";
import { SeekerDashboard } from "@/Pages/SeekerDashboard";

const AppRoutes = () => (
  <div className="flex min-h-screen flex-col">
    <Navbar />

    {/* Main Contents (Routes) */}
    <main className="flex-1">
      <Routes>
        {/* --------- Main Page --------- */}
        <Route path="/" element={<Index />} />

        {/* --------- Four Tabs --------- */}
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:id" element={<JobDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/team" element={<Team />} />

        {/* --------- Login & Register --------- */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* --------- Seeker & Company --------- */}
        <Route path="/seeker-dashboard" element={<SeekerDashboard />} />

        {/* --------- Not Found --------- */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>

    <Footer />
  </div>
);

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  </BrowserRouter>
);

export default App;