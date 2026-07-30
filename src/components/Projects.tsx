import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { HiExternalLink, HiCode } from "react-icons/hi"
import projects from "../data/projects"

const allTags = [...new Set(projects.flatMap((p) => p.tech))].sort()

export default function Projects() {
  const [activeTag, setActiveTag] = useState("Semua")

  const filtered = useMemo(
    () =>
      activeTag === "Semua"
        ? projects
        : projects.filter((p) => p.tech.includes(activeTag)),
    [activeTag]
  )

  return (
    <section id="projects" className="py-20 scroll-mt-16 bg-white dark:bg-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-white mb-4">
            Projects
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-8" />
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {["Semua", ...allTags].map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                activeTag === tag
                  ? "bg-primary text-white shadow-lg shadow-primary/30"
                  : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                className="group bg-slate-50 dark:bg-slate-700/50 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-600 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300"
              >
                <div className="relative overflow-hidden h-48">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4 gap-3">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-white/90 rounded-full text-slate-800 hover:bg-white transition-colors"
                      >
                        <HiCode size={20} />
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-white/90 rounded-full text-slate-800 hover:bg-white transition-colors"
                      >
                        <HiExternalLink size={20} />
                      </a>
                    )}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
