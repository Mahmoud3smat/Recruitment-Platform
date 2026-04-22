import { BrowserRouter } from "react-router-dom";
import { Navbar } from "@/Components/Navbar.tsx";
import { Footer } from "@/Components/Footer.tsx";

const AppRoutes = () => (
  <div className="flex min-h-screen flex-col">
    <Navbar />

    {/* Main Contents (Routes) */}
    <main></main>

    <Footer />
  </div>
);

const App = () => (
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>
);

export default App;
