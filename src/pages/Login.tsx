import { useState, type FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { HiLockClosed } from "react-icons/hi"
import { useAuth } from "../context/AuthContext"

export default function Login() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    const result = await signIn(email, password)
    if (result.error) {
      setError(result.error)
      setLoading(false)
    } else {
      navigate("/admin")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 border border-slate-200 dark:border-slate-700"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <HiLockClosed className="text-3xl text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
            Admin Login
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            Masuk untuk mengelola konten portfolio
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
              placeholder="admin@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30 px-4 py-3 rounded-xl">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-colors disabled:opacity-60"
          >
            {loading ? "Masuk..." : "Masuk"}
          </button>
        </form>
      </motion.div>
    </div>
  )
}
