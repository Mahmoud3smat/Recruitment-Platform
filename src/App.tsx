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
import { Login } from "@/Pages/Login";
import { Register } from "@/Pages/Register";
import { NotFound } from "@/Components/NotFound";

const AppRoutes = () => (
  <div className="flex min-h-screen flex-col">
    <Navbar />

    {/* Main Contents (Routes) */}
    <main className="flex-1">
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:id" element={<JobDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
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
