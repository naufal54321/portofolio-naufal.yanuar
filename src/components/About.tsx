import { motion } from "framer-motion"
import { HiCode, HiGlobe, HiAcademicCap, HiHeart } from "react-icons/hi"
import type { IconType } from "react-icons"

interface Stat {
  icon: IconType
  value: string
  label: string
}

const stats: Stat[] = [
  { icon: HiCode, value: "20+", label: "Project" },
  { icon: HiGlobe, value: "5+", label: "Website" },
  { icon: HiAcademicCap, value: "3+", label: "Tahun Belajar" },
  { icon: HiHeart, value: "100%", label: "Semangat" },
]

export default function About() {
  return (
    <section id="about" className="py-20 scroll-mt-16 bg-white dark:bg-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-white mb-4">
            Tentang Saya
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="flex flex-col md:flex-row items-center gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex-shrink-0"
          >
            <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-2xl bg-gradient-to-br from-primary to-secondary p-1 shadow-xl">
              <div className="w-full h-full rounded-2xl bg-slate-100 dark:bg-slate-700 overflow-hidden">
                <img
                  src="/images/profile.png"
                  alt="Muhammad Naufal"
                  loading="lazy"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.style.display = "none"
                    const fallback = target.nextElementSibling as HTMLElement
                    if (fallback) fallback.style.display = "flex"
                  }}
                />
                <div className="hidden w-full h-full items-center justify-center text-5xl bg-slate-100 dark:bg-slate-700">
                  👨‍💻
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex-1"
          >
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              Mahasiswa Informatika yang memiliki minat besar dalam pengembangan aplikasi web modern.
            </p>
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              Berpengalaman membangun aplikasi menggunakan Laravel, React, MySQL, Tailwind CSS, Bootstrap, dan JavaScript.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-6 rounded-2xl bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <stat.icon className="text-3xl text-primary mx-auto mb-3" />
              <div className="text-3xl font-bold text-slate-800 dark:text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
