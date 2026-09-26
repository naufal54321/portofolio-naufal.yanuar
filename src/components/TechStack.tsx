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
      className="grid grid-cols-4 gap-x-6 gap-y-5 mt-8 max-w-md mx-auto md:mx-0"
    >
      {techIcons.map((tech) => (
        <div
          key={tech.name}
          className="flex flex-col items-center gap-2"
        >
          <tech.icon className={`text-3xl ${tech.color} hover:scale-110 transition-transform duration-200`} />
          <span className="text-[11px] text-slate-500 dark:text-slate-400 text-center leading-tight">
            {tech.name}
          </span>
        </div>
      ))}
    </motion.div>
  )
}
