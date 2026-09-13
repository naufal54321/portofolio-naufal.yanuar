import { NavLink, Outlet, useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import {
  HiOutlineHome,
  HiOutlineBriefcase,
  HiOutlineChip,
  HiOutlineCollection,
  HiOutlineStar,
  HiOutlineCog,
  HiOutlineDocumentText,
  HiOutlineLogout,
} from "react-icons/hi"

const links = [
  { to: "/admin", icon: HiOutlineHome, label: "Dashboard", end: true },
  { to: "/admin/projects", icon: HiOutlineBriefcase, label: "Projects" },
  { to: "/admin/skills", icon: HiOutlineChip, label: "Skills" },
  { to: "/admin/experience", icon: HiOutlineCollection, label: "Experience" },
  { to: "/admin/testimonials", icon: HiOutlineStar, label: "Testimoni" },
  { to: "/admin/blog", icon: HiOutlineDocumentText, label: "Blog" },
  { to: "/admin/settings", icon: HiOutlineCog, label: "Settings" },
]

export default function AdminLayout() {
  const { signOut } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await signOut()
    navigate("/admin/login")
  }

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-900">
      <aside className="w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 flex flex-col">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-lg font-bold text-slate-800 dark:text-white">
            Portfolio Admin
          </h2>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
                }`
              }
            >
              <link.icon className="text-lg" />
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-200 dark:border-slate-700">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            <HiOutlineLogout className="text-lg" />
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}
