import { motion } from "framer-motion"
import { useSettings } from "../hooks/useSettings"

export default function Footer() {
  const year = new Date().getFullYear()
  const { data: settings } = useSettings()

  return (
    <footer className="py-8 bg-slate-900 dark:bg-slate-950">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center text-slate-400 text-sm"
      >
        <p>
          Made with{" "}
          <span className="text-red-500">&hearts;</span> by{" "}
          <span className="text-primary font-medium">{settings.footer_name || "Muhammad Naufal Yanuar"}</span>
        </p>
        <p className="mt-1">&copy; {year} All rights reserved.</p>
      </motion.div>
    </footer>
  )
}
