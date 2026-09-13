import { useProjects } from "../../hooks/useProjects"
import { useSkills } from "../../hooks/useSkills"
import { useExperiences } from "../../hooks/useExperiences"
import { useTestimonials } from "../../hooks/useTestimonials"
import { usePosts } from "../../hooks/usePosts"
import { useSettings } from "../../hooks/useSettings"
import { useAuth } from "../../context/AuthContext"
import { useNavigate } from "react-router-dom"
import {
  HiBriefcase,
  HiChip,
  HiCollection,
  HiStar,
  HiDocumentText,
  HiCheckCircle,
  HiPencil,
  HiCog,
  HiPlus,
} from "react-icons/hi"

interface Activity {
  type: string
  icon: string
  title: string
  date: string
}

export default function Dashboard() {
  const { data: projects } = useProjects()
  const { data: skills } = useSkills()
  const { data: experiences } = useExperiences()
  const { data: testimonials } = useTestimonials()
  const { data: posts } = usePosts()
  const { data: settings } = useSettings()
  const { user } = useAuth()
  const navigate = useNavigate()

  const publishedPosts = posts.filter((p) => p.published).length
  const draftPosts = posts.length - publishedPosts
  const totalPublished = projects.length + skills.length + experiences.length + testimonials.length + publishedPosts

  const stats = [
    { label: "Projects", value: projects.length, icon: HiBriefcase, color: "bg-blue-500" },
    { label: "Skills", value: skills.length, icon: HiChip, color: "bg-green-500" },
    { label: "Experience", value: experiences.length, icon: HiCollection, color: "bg-purple-500" },
    { label: "Testimoni", value: testimonials.length, icon: HiStar, color: "bg-yellow-500" },
    { label: "Blog Posts", value: `${publishedPosts}/${posts.length}`, icon: HiDocumentText, color: "bg-pink-500" },
    { label: "Published", value: totalPublished, icon: HiCheckCircle, color: "bg-emerald-600" },
  ]

  const quickActions = [
    { label: "Add Project", icon: HiPlus, path: "/admin/projects", color: "bg-blue-500 hover:bg-blue-600" },
    { label: "Add Skill", icon: HiPlus, path: "/admin/skills", color: "bg-green-500 hover:bg-green-600" },
    { label: "Write Post", icon: HiPencil, path: "/admin/blog", color: "bg-pink-500 hover:bg-pink-600" },
    { label: "Settings", icon: HiCog, path: "/admin/settings", color: "bg-slate-500 hover:bg-slate-600" },
  ]

  const activities: Activity[] = [
    ...projects.map((p) => ({ type: "Project", icon: "📁", title: p.title, date: p.created_at })),
    ...posts.map((p) => ({ type: "Post", icon: "📝", title: p.title, date: p.created_at })),
    ...experiences.map((e) => ({ type: "Experience", icon: "💼", title: e.title, date: e.created_at })),
    ...testimonials.map((t) => ({ type: "Testimoni", icon: "⭐", title: t.name, date: t.created_at })),
  ]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5)

  const timeAgo = (date: string) => {
    const diff = Date.now() - new Date(date).getTime()
    const mins = Math.floor(diff / 60000)
    if (mins < 1) return "baru saja"
    if (mins < 60) return `${mins} menit lalu`
    const hours = Math.floor(mins / 60)
    if (hours < 24) return `${hours} jam lalu`
    const days = Math.floor(hours / 24)
    if (days < 30) return `${days} hari lalu`
    return new Date(date).toLocaleDateString("id-ID", { day: "numeric", month: "short" })
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-8">
        Dashboard
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-200 dark:border-slate-700"
          >
            <div className={`${s.color} w-10 h-10 rounded-xl flex items-center justify-center mb-3`}>
              <s.icon className="text-lg text-white" />
            </div>
            <p className="text-2xl font-bold text-slate-800 dark:text-white">{s.value}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Quick Actions */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action) => (
              <button
                key={action.label}
                onClick={() => navigate(action.path)}
                className={`${action.color} text-white rounded-xl px-4 py-3 text-sm font-medium transition-colors flex items-center gap-2 justify-center`}
              >
                <action.icon size={16} />
                {action.label}
              </button>
            ))}
          </div>
        </div>

        {/* Profile Summary */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Profile</h2>
          <div className="flex items-center gap-4">
            <img
              src={settings.profile_image || "/images/profile.png"}
              alt="Profile"
              className="w-14 h-14 rounded-full object-cover bg-slate-200 dark:bg-slate-700"
            />
            <div className="min-w-0">
              <p className="font-semibold text-slate-800 dark:text-white truncate">
                {settings.hero_name || "Muhammad Naufal Yanuar"}
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
                {settings.hero_title || "Full Stack Web Developer"}
              </p>
              <p className="text-xs text-slate-400 dark:text-slate-500 truncate mt-0.5">
                {user?.email || "—"}
              </p>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Recent Activity</h2>
          {activities.length === 0 ? (
            <p className="text-sm text-slate-400 dark:text-slate-500 text-center py-6">Belum ada aktivitas.</p>
          ) : (
            <div className="space-y-3">
              {activities.map((a, i) => (
                <div key={`${a.type}-${i}`} className="flex items-center gap-3 text-sm">
                  <span className="text-lg flex-shrink-0">{a.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-slate-700 dark:text-slate-300 truncate">{a.title}</p>
                    <p className="text-xs text-slate-400 dark:text-slate-500">{a.type}</p>
                  </div>
                  <span className="text-xs text-slate-400 dark:text-slate-500 flex-shrink-0">
                    {timeAgo(a.date)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
