import { motion } from "framer-motion"
import { useSkills } from "../hooks/useSkills"

export default function Skills() {
  const { data: skills, loading } = useSkills()
  const categories = [...new Set(skills.map((s) => s.category))]

  if (loading) return null
  if (skills.length === 0) return null

  return (
    <section id="skills" className="py-20 scroll-mt-16 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-white mb-4">
            Skills
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, catIdx) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: catIdx * 0.1 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-md border border-slate-200 dark:border-slate-700"
            >
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-6">
                {category}
              </h3>
              <div className="space-y-5">
                {skills
                  .filter((s) => s.category === category)
                  .map((skill, i) => (
                    <div key={skill.id}>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="font-medium text-slate-700 dark:text-slate-300">
                          {skill.name}
                        </span>
                        <span className="text-primary font-semibold">
                          {skill.level}%
                        </span>
                      </div>
                      <div
                        className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden"
                        role="progressbar"
                        aria-valuenow={skill.level}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label={`${skill.name}: ${skill.level}%`}
                      >
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 + i * 0.1, duration: 1, ease: "easeOut" }}
                          className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
