import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider, useAuth } from "./context/AuthContext"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import About from "./components/About"
import Skills from "./components/Skills"
import Projects from "./components/Projects"
import Experience from "./components/Experience"
import Testimonials from "./components/Testimonials"
import Contact from "./components/Contact"
import Footer from "./components/Footer"
import Login from "./pages/Login"
import AdminLayout from "./pages/admin/AdminLayout"
import Dashboard from "./pages/admin/Dashboard"
import ProjectsAdmin from "./pages/admin/ProjectsAdmin"
import SkillsAdmin from "./pages/admin/SkillsAdmin"
import ExperienceAdmin from "./pages/admin/ExperienceAdmin"
import TestimonialsAdmin from "./pages/admin/TestimonialsAdmin"
import SettingsAdmin from "./pages/admin/SettingsAdmin"
import { useState } from "react"

function Portfolio() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem("darkMode")
    return saved ? JSON.parse(saved) : false
  })

  const toggleDarkMode = () => setDarkMode((prev) => !prev)

  return (
    <>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  )
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  if (!user) return <Navigate to="/admin/login" replace />
  return <>{children}</>
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/admin/login" element={<Login />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="projects" element={<ProjectsAdmin />} />
            <Route path="skills" element={<SkillsAdmin />} />
            <Route path="experience" element={<ExperienceAdmin />} />
            <Route path="testimonials" element={<TestimonialsAdmin />} />
            <Route path="settings" element={<SettingsAdmin />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
