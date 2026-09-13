import { useState } from "react"
import { useProjects } from "../../hooks/useProjects"
import type { Project } from "../../types"
import { HiPencil, HiTrash, HiPlus } from "react-icons/hi"

const empty: Omit<Project, "id" | "created_at"> = {
  title: "",
  description: "",
  image: "",
  github: "",
  demo: "",
  tech: [],
  role: "",
  challenges: "",
  learnings: "",
}

export default function ProjectsAdmin() {
  const { data, loading, add, update, remove } = useProjects()
  const [form, setForm] = useState(empty)
  const [editId, setEditId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [techInput, setTechInput] = useState("")

  const openNew = () => { setForm(empty); setEditId(null); setShowForm(true); setTechInput("") }
  const openEdit = (p: Project) => {
    setForm({ title: p.title, description: p.description, image: p.image, github: p.github, demo: p.demo, tech: p.tech, role: p.role || "", challenges: p.challenges || "", learnings: p.learnings || "" })
    setEditId(p.id); setShowForm(true); setTechInput(p.tech.join(", "))
  }

  const handleSubmit = async () => {
    const techArray = techInput.split(",").map((t) => t.trim()).filter(Boolean)
    const item = { ...form, tech: techArray }
    if (editId) { await update(editId, item) } else { await add(item) }
    setShowForm(false)
  }

  const handleDelete = async (id: string) => {
    if (confirm("Hapus project ini?")) await remove(id)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Projects</h1>
        <button onClick={openNew} className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-dark transition-colors">
          <HiPlus /> Tambah
        </button>
      </div>

      {showForm && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 mb-6">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">
            {editId ? "Edit Project" : "Tambah Project"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input placeholder="Judul" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-white text-sm" />
            <input placeholder="Role (mis: Full Stack Developer)" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-white text-sm" />
            <input placeholder="Image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-white text-sm" />
            <input placeholder="GitHub URL" value={form.github} onChange={(e) => setForm({ ...form, github: e.target.value })} className="px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-white text-sm" />
            <input placeholder="Demo URL" value={form.demo} onChange={(e) => setForm({ ...form, demo: e.target.value })} className="px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-white text-sm" />
            <input placeholder="Tech (koma: Laravel, React, MySQL)" value={techInput} onChange={(e) => setTechInput(e.target.value)} className="px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-white text-sm" />
            <textarea placeholder="Deskripsi" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="md:col-span-2 px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-white text-sm resize-none" />
            <textarea placeholder="Tantangan yang dihadapi" value={form.challenges} onChange={(e) => setForm({ ...form, challenges: e.target.value })} rows={2} className="md:col-span-2 px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-white text-sm resize-none" />
            <textarea placeholder="Yang dipelajari" value={form.learnings} onChange={(e) => setForm({ ...form, learnings: e.target.value })} rows={2} className="md:col-span-2 px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-white text-sm resize-none" />
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
                <th className="text-left px-6 py-3 font-medium text-slate-600 dark:text-slate-300 hidden md:table-cell">Tech</th>
                <th className="text-right px-6 py-3 font-medium text-slate-600 dark:text-slate-300">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {data.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30">
                  <td className="px-6 py-4">
                    <div className="text-slate-800 dark:text-white font-medium">{p.title}</div>
                    {p.role && <div className="text-xs text-primary mt-0.5">{p.role}</div>}
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {p.tech.slice(0, 3).map((t) => (
                        <span key={t} className="px-2 py-0.5 text-xs bg-primary/10 text-primary rounded-full">{t}</span>
                      ))}
                      {p.tech.length > 3 && <span className="text-xs text-slate-400">+{p.tech.length - 3}</span>}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => openEdit(p)} className="p-1.5 text-slate-500 hover:text-primary transition-colors"><HiPencil /></button>
                    <button onClick={() => handleDelete(p.id)} className="p-1.5 text-slate-500 hover:text-red-600 transition-colors ml-1"><HiTrash /></button>
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
