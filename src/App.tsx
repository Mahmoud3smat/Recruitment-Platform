import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "@/Components/Navbar.tsx";
import { Footer } from "@/Components/Footer.tsx";
import { AuthProvider } from "./Contexts/AuthContext";
import { Index } from "@/Pages/Index.tsx";

const AppRoutes = () => (
  <div className="flex min-h-screen flex-col">
    <Navbar />

    {/* Main Contents (Routes) */}
    <main className="flex-1">
      <Routes>
        <Route path="/" element={<Index />} />
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
