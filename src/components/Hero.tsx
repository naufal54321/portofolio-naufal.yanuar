import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { HiArrowRight, HiDownload } from "react-icons/hi"
import TechStack from "./TechStack"
import { useSettings } from "../hooks/useSettings"

export default function Hero() {
  const { data: settings } = useSettings()
  const [text, setText] = useState("")
  const fullText = settings.hero_title || "Full Stack Web Developer"
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setText(fullText.slice(0, index + 1))
        setIndex(index + 1)
      }, 100)
      return () => clearTimeout(timeout)
    }
  }, [index, fullText])

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900" />

      <motion.div
        className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/20 rounded-full blur-3xl"
        animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"
        animate={{ y: [0, 30, 0], x: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center gap-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 text-center md:text-left"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-primary font-medium text-lg mb-2"
          >
            Halo 👋
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-800 dark:text-white mb-4"
          >
            Saya{" "}
            <span className="text-primary">{settings.hero_name || "Muhammad Naufal Yanuar"}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl text-slate-600 dark:text-slate-300 mb-2 h-8"
          >
            {text}
            <span className="animate-pulse">|</span>
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-slate-500 dark:text-slate-400 mb-8 max-w-lg mx-auto md:mx-0"
          >
            {settings.hero_description || "Saya mengembangkan website modern menggunakan Laravel, React, dan Tailwind CSS."}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex flex-wrap gap-4 justify-center md:justify-start"
          >
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full font-medium hover:bg-primary-dark transition-colors shadow-lg shadow-primary/30"
            >
              Lihat Project
              <HiArrowRight />
            </a>
            <a
              href="/cv.pdf"
              download
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary text-primary rounded-full font-medium hover:bg-primary hover:text-white transition-colors"
            >
              Download CV
              <HiDownload />
            </a>
            <TechStack />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex-shrink-0"
        >
          <div className="relative">
            <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-gradient-to-br from-primary to-secondary p-1">
              <div className="w-full h-full rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                <img
                  src={settings.profile_image || "/images/profile.png"}
                  alt={settings.hero_name || "Muhammad Naufal Yanuar"}
                  loading="lazy"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.style.display = "none"
                    const fallback = target.nextElementSibling as HTMLElement
                    if (fallback) fallback.style.display = "flex"
                  }}
                />
                <div className="hidden w-full h-full items-center justify-center text-6xl bg-slate-200 dark:bg-slate-700">
                  👨‍💻
                </div>
              </div>
            </div>
            <motion.div
              className="absolute -bottom-4 -right-4 w-20 h-20 bg-white dark:bg-slate-800 rounded-2xl shadow-lg flex items-center justify-center rotate-12"
              animate={{ rotate: [12, 20, 12] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="text-3xl">🚀</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
