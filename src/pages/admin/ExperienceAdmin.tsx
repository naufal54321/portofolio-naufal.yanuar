import { useState } from "react"
import { useExperiences } from "../../hooks/useExperiences"
import type { Experience } from "../../types"
import { HiPencil, HiTrash, HiPlus } from "react-icons/hi"

const empty: Omit<Experience, "id" | "created_at"> = { title: "", company: "", period: "", description: "" }

export default function ExperienceAdmin() {
  const { data, loading, add, update, remove } = useExperiences()
  const [form, setForm] = useState(empty)
  const [editId, setEditId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)

  const openNew = () => { setForm(empty); setEditId(null); setShowForm(true) }
  const openEdit = (e: Experience) => { setForm({ title: e.title, company: e.company, period: e.period, description: e.description }); setEditId(e.id); setShowForm(true) }

  const handleSubmit = async () => {
    if (editId) { await update(editId, form) } else { await add(form) }
    setShowForm(false)
  }

  const handleDelete = async (id: string) => {
    if (confirm("Hapus experience ini?")) await remove(id)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Experience</h1>
        <button onClick={openNew} className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-dark transition-colors">
          <HiPlus /> Tambah
        </button>
      </div>

      {showForm && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 mb-6">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">
            {editId ? "Edit Experience" : "Tambah Experience"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input placeholder="Judul" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-white text-sm" />
            <input placeholder="Perusahaan" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-white text-sm" />
            <input placeholder="Periode (misal: 2026 - Sekarang)" value={form.period} onChange={(e) => setForm({ ...form, period: e.target.value })} className="px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-white text-sm" />
            <textarea placeholder="Deskripsi" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2} className="px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-white text-sm resize-none" />
          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={handleSubmit} className="px-6 py-2 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-dark transition-colors">Simpan</button>
            <button onClick={() => setShowForm(false)} className="px-6 py-2 bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-xl text-sm font-medium hover:bg-slate-300 dark:hover:bg-slate-500 transition-colors">Batal</button>
          </div>
        </div>
      )}

      {loading ? (
        <p className="text-slate-500">Loading...</p>
      ) : (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 dark:bg-slate-700/50">
              <tr>
                <th className="text-left px-6 py-3 font-medium text-slate-600 dark:text-slate-300">Judul</th>
                <th className="text-left px-6 py-3 font-medium text-slate-600 dark:text-slate-300">Perusahaan</th>
                <th className="text-left px-6 py-3 font-medium text-slate-600 dark:text-slate-300 hidden md:table-cell">Periode</th>
                <th className="text-right px-6 py-3 font-medium text-slate-600 dark:text-slate-300">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {data.map((e) => (
                <tr key={e.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30">
                  <td className="px-6 py-4 text-slate-800 dark:text-white font-medium">{e.title}</td>
                  <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{e.company}</td>
                  <td className="px-6 py-4 hidden md:table-cell text-slate-500 dark:text-slate-400">{e.period}</td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => openEdit(e)} className="p-1.5 text-slate-500 hover:text-primary transition-colors"><HiPencil /></button>
                    <button onClick={() => handleDelete(e.id)} className="p-1.5 text-slate-500 hover:text-red-600 transition-colors ml-1"><HiTrash /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
