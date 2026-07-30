import { motion } from "framer-motion"
import { HiMail, HiPhone } from "react-icons/hi"
import { FaWhatsapp, FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa"

const contacts = [
  { icon: HiMail, label: "Email", value: "naufalm220@gmail.com", href: "mailto:naufalm220@gmail.com", color: "hover:bg-red-100 dark:hover:bg-red-900/30" },
  { icon: FaWhatsapp, label: "WhatsApp", value: "+62 857-2773-2041", href: "https://wa.me/6285727732041", color: "hover:bg-green-100 dark:hover:bg-green-900/30" },
  { icon: FaInstagram, label: "Instagram", value: "@naufal.ynr", href: "https://instagram.com/naufal.ynr", color: "hover:bg-pink-100 dark:hover:bg-pink-900/30" },
  { icon: FaGithub, label: "GitHub", value: "muhammadnaufal", href: "https://github.com/muhammadnaufal", color: "hover:bg-slate-100 dark:hover:bg-slate-700" },
  { icon: FaLinkedin, label: "LinkedIn", value: "Muhammad Naufal Yanuar", href: "https://www.linkedin.com/in/muhammad-naufal-yanuar-069908373", color: "hover:bg-blue-100 dark:hover:bg-blue-900/30" },
]

export default function Contact() {
  return (
    <section id="contact" className="py-20 scroll-mt-16 bg-white dark:bg-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-white mb-4">
            Contact
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {contacts.map((contact, i) => (
            <motion.a
              key={contact.label}
              href={contact.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1 }}
              className={`flex items-center gap-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 ${contact.color} transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
            >
              <contact.icon className="text-2xl text-primary flex-shrink-0" />
              <div>
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  {contact.label}
                </div>
                <div className="font-medium text-slate-800 dark:text-white text-sm">
                  {contact.value}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
