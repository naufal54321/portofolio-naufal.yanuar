import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { HiChevronLeft, HiChevronRight } from "react-icons/hi"
import { useTestimonials } from "../hooks/useTestimonials"

export default function Testimonials() {
  const { data: testimonials, loading } = useTestimonials()
  const [active, setActive] = useState(0)

  if (loading) return null
  if (testimonials.length === 0) return null

  const prev = () => setActive((a) => (a === 0 ? testimonials.length - 1 : a - 1))
  const next = () => setActive((a) => (a === testimonials.length - 1 ? 0 : a + 1))

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-white mb-4">
            Testimoni
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="relative max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={testimonials[active].id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-md border border-slate-200 dark:border-slate-700 text-center"
            >
              <img
                src={testimonials[active].avatar}
                alt={testimonials[active].name}
                className="w-16 h-16 rounded-full mx-auto mb-4"
              />
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6 italic">
                "{testimonials[active].text}"
              </p>
              <h4 className="font-semibold text-slate-800 dark:text-white">
                {testimonials[active].name}
              </h4>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {testimonials[active].role}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="p-2 rounded-full bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors"
              aria-label="Previous"
            >
              <HiChevronLeft size={20} />
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    i === active
                      ? "bg-primary w-6"
                      : "bg-slate-300 dark:bg-slate-600"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="p-2 rounded-full bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors"
              aria-label="Next"
            >
              <HiChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
