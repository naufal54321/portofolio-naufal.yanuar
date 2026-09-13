import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { HiOutlineDocumentText, HiOutlineChevronDown, HiOutlineChevronUp } from "react-icons/hi"
import { usePosts } from "../hooks/usePosts"

export default function Blog() {
  const { data: posts, loading } = usePosts()
  const [expanded, setExpanded] = useState<string | null>(null)

  if (loading) return null
  if (posts.length === 0) return null

  const published = posts.filter((p) => p.published)

  if (published.length === 0) return null

  return (
    <section id="blog" className="py-20 scroll-mt-16 bg-white dark:bg-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-white mb-4">
            Blog
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-6">
          {published.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1 }}
              className="bg-slate-50 dark:bg-slate-700/50 rounded-2xl border border-slate-200 dark:border-slate-600 overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              {post.image && (
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-2">
                  <HiOutlineDocumentText />
                  <span>{new Date(post.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</span>
                </div>
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">
                  {post.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                  {post.excerpt}
                </p>
                {post.content && (
                  <>
                    <button
                      onClick={() => setExpanded(expanded === post.id ? null : post.id)}
                      className="text-sm font-medium text-primary hover:text-primary-dark transition-colors inline-flex items-center gap-1"
                    >
                      {expanded === post.id ? "Tutup" : "Baca Selengkapnya"}
                      {expanded === post.id ? <HiOutlineChevronUp size={16} /> : <HiOutlineChevronDown size={16} />}
                    </button>
                    <AnimatePresence>
                      {expanded === post.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line text-sm">
                            {post.content}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
