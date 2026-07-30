import { motion } from "framer-motion"
import type { IconType } from "react-icons"
import {
  SiLaravel,
  SiReact,
  SiTailwindcss,
  SiBootstrap,
  SiMysql,
  SiJavascript,
  SiPhp,
  SiNodedotjs,
} from "react-icons/si"

interface TechItem {
  icon: IconType
  name: string
  color: string
}

const techIcons: TechItem[] = [
  { icon: SiLaravel, name: "Laravel", color: "text-red-500" },
  { icon: SiReact, name: "React", color: "text-cyan-400" },
  { icon: SiTailwindcss, name: "Tailwind", color: "text-teal-400" },
  { icon: SiBootstrap, name: "Bootstrap", color: "text-purple-500" },
  { icon: SiJavascript, name: "JavaScript", color: "text-yellow-400" },
  { icon: SiPhp, name: "PHP", color: "text-indigo-400" },
  { icon: SiMysql, name: "MySQL", color: "text-orange-500" },
  { icon: SiNodedotjs, name: "Node.js", color: "text-green-500" },
]

export default function TechStack() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.1 }}
      className="flex flex-wrap items-center justify-center md:justify-start gap-5 mt-6"
    >
      {techIcons.map((tech) => (
        <div
          key={tech.name}
          className="group relative"
        >
          <tech.icon className={`text-2xl ${tech.color} hover:scale-125 transition-transform duration-200`} />
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-800 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            {tech.name}
          </span>
        </div>
      ))}
    </motion.div>
  )
}
