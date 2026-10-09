import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { HiX, HiDownload, HiDocumentText } from "react-icons/hi"

interface Props {
  open: boolean
  cvUrl: string
  name: string
  onClose: () => void
}

export default function CvPreviewModal({ open, cvUrl, name, onClose }: Props) {
  useEffect(() => {
    if (!open) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handleKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", handleKey)
      document.body.style.overflow = ""
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Preview CV"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-3xl max-h-[90vh] flex flex-col bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-2xl"
          >
            <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2 min-w-0">
                <HiDocumentText className="text-primary shrink-0" size={20} />
                <span className="font-semibold text-slate-800 dark:text-white truncate">
                  CV — {name}
                </span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={cvUrl}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-full text-sm font-medium hover:bg-primary-dark transition-colors"
                >
                  Unduh CV
                  <HiDownload size={16} />
                </a>
                <button
                  onClick={onClose}
                  aria-label="Tutup"
                  className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                >
                  <HiX size={20} className="text-slate-600 dark:text-slate-300" />
                </button>
              </div>
            </div>

            <iframe src={cvUrl} title="Preview CV" className="w-full flex-1 min-h-0 bg-slate-100 dark:bg-slate-900" />

            <div className="px-5 py-3 border-t border-slate-200 dark:border-slate-700 text-center">
              <a
                href={cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-slate-500 dark:text-slate-400 underline hover:text-primary transition-colors"
              >
                Jika preview tidak tampil, buka di tab baru
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
