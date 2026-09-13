import { useState } from "react"
import { useTestimonials } from "../../hooks/useTestimonials"
import type { Testimonial } from "../../types"
import { HiPencil, HiTrash, HiPlus } from "react-icons/hi"

const empty: Omit<Testimonial, "id" | "created_at"> = { name: "", role: "", avatar: "", text: "" }

export default function TestimonialsAdmin() {
  const { data, loading, add, update, remove } = useTestimonials()
  const [form, setForm] = useState(empty)
  const [editId, setEditId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)

  const openNew = () => { setForm(empty); setEditId(null); setShowForm(true) }
  const openEdit = (t: Testimonial) => { setForm({ name: t.name, role: t.role, avatar: t.avatar, text: t.text }); setEditId(t.id); setShowForm(true) }

  const handleSubmit = async () => {
    if (editId) { await update(editId, form) } else { await add(form) }
    setShowForm(false)
  }

  const handleDelete = async (id: string) => {
    if (confirm("Hapus testimoni ini?")) await remove(id)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Testimoni</h1>
        <button onClick={openNew} className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-dark transition-colors">
          <HiPlus /> Tambah
        </button>
      </div>

      {showForm && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 mb-6">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">
            {editId ? "Edit Testimoni" : "Tambah Testimoni"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input placeholder="Nama" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-white text-sm" />
            <input placeholder="Role (misal: Klien, Dosen)" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-white text-sm" />
            <input placeholder="Avatar URL" value={form.avatar} onChange={(e) => setForm({ ...form, avatar: e.target.value })} className="px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-white text-sm" />
            <textarea placeholder="Teks testimoni" value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} rows={2} className="px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-white text-sm resize-none" />
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
                <th className="text-left px-6 py-3 font-medium text-slate-600 dark:text-slate-300">Nama</th>
                <th className="text-left px-6 py-3 font-medium text-slate-600 dark:text-slate-300">Role</th>
                <th className="text-left px-6 py-3 font-medium text-slate-600 dark:text-slate-300 hidden md:table-cell">Teks</th>
                <th className="text-right px-6 py-3 font-medium text-slate-600 dark:text-slate-300">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {data.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30">
                  <td className="px-6 py-4 text-slate-800 dark:text-white font-medium">{t.name}</td>
                  <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{t.role}</td>
                  <td className="px-6 py-4 hidden md:table-cell text-slate-500 dark:text-slate-400 line-clamp-1 max-w-xs">{t.text}</td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => openEdit(t)} className="p-1.5 text-slate-500 hover:text-primary transition-colors"><HiPencil /></button>
                    <button onClick={() => handleDelete(t.id)} className="p-1.5 text-slate-500 hover:text-red-600 transition-colors ml-1"><HiTrash /></button>
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
