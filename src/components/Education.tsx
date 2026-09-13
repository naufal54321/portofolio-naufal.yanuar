import { motion } from "framer-motion"
import { HiAcademicCap } from "react-icons/hi"
import { useSettings } from "../hooks/useSettings"

export default function Education() {
  const { data: s } = useSettings()

  const school = s.education_school
  const major = s.education_major
  const year = s.education_year
  const detail = s.education_detail

  if (!school && !major) return null

  return (
    <section id="education" className="py-20 scroll-mt-16 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-white mb-4">
            Pendidikan
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-2xl mx-auto"
        >
          <div className="relative bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-md border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-start gap-5">
              <div className="flex-shrink-0 w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center">
                <HiAcademicCap className="text-2xl text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-1">
                  {school}
                </h3>
                <p className="text-primary font-medium mb-1">{major}</p>
                {detail && (
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">{detail}</p>
                )}
                <span className="inline-block px-3 py-1 text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full">
                  {year}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
