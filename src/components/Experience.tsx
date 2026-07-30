import { motion } from "framer-motion"
import experiences from "../data/experience"

export default function Experience() {
  return (
    <section id="experience" className="py-20 scroll-mt-16 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-white mb-4">
            Experience
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-700 hidden sm:block" />

          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.15 }}
                className="relative pl-0 sm:pl-20"
              >
                <div className="hidden sm:block absolute left-6 top-1 w-5 h-5 bg-primary rounded-full border-4 border-white dark:border-slate-900 shadow" />
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-md border border-slate-200 dark:border-slate-700">
                  <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full mb-3">
                    {exp.period}
                  </span>
                  <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-1">
                    {exp.title}
                  </h3>
                  <p className="text-sm text-primary font-medium mb-3">
                    {exp.company}
                  </p>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
