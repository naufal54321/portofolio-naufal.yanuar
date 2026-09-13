import { useProjects } from "../../hooks/useProjects"
import { useSkills } from "../../hooks/useSkills"
import { useExperiences } from "../../hooks/useExperiences"
import { useTestimonials } from "../../hooks/useTestimonials"
import { HiBriefcase, HiChip, HiCollection, HiStar } from "react-icons/hi"

export default function Dashboard() {
  const { data: projects } = useProjects()
  const { data: skills } = useSkills()
  const { data: experiences } = useExperiences()
  const { data: testimonials } = useTestimonials()

  const stats = [
    { label: "Projects", value: projects.length, icon: HiBriefcase, color: "bg-blue-500" },
    { label: "Skills", value: skills.length, icon: HiChip, color: "bg-green-500" },
    { label: "Experience", value: experiences.length, icon: HiCollection, color: "bg-purple-500" },
    { label: "Testimoni", value: testimonials.length, icon: HiStar, color: "bg-yellow-500" },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-8">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700"
          >
            <div className="flex items-center gap-4">
              <div className={`${s.color} p-3 rounded-xl`}>
                <s.icon className="text-xl text-white" />
              </div>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {s.label}
                </p>
                <p className="text-2xl font-bold text-slate-800 dark:text-white">
                  {s.value}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
