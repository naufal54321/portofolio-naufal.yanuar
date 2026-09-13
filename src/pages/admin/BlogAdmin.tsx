import { useState } from "react"
import { HiPlus, HiPencil, HiTrash } from "react-icons/hi"
import { usePosts } from "../../hooks/usePosts"

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
}

export default function BlogAdmin() {
  const { data: posts, loading, add, update, remove } = usePosts()
  const [editing, setEditing] = useState<string | null>(null)
  const [form, setForm] = useState({ title: "", slug: "", excerpt: "", content: "", image: "", published: false })
  const [error, setError] = useState("")
  const [saving, setSaving] = useState(false)

  const startNew = () => {
    setEditing("new")
    setForm({ title: "", slug: "", excerpt: "", content: "", image: "", published: false })
    setError("")
  }

  const startEdit = (id: string) => {
    const post = posts.find((p) => p.id === id)
    if (!post) return
    setEditing(id)
    setForm({ title: post.title, slug: post.slug, excerpt: post.excerpt, content: post.content, image: post.image, published: post.published })
    setError("")
  }

  const handleSave = async () => {
    if (!form.title.trim()) { setError("Judul wajib diisi"); return }
    if (!form.slug.trim()) { setError("Slug wajib diisi"); return }
    setSaving(true)
    setError("")
    const result = editing === "new"
      ? await add({ ...form, slug: slugify(form.title) })
      : await update(editing!, { ...form, slug: slugify(form.title) })
    setSaving(false)
    if (result.error) {
      setError(result.error)
    } else {
      setEditing(null)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus post ini?")) return
    await remove(id)
  }

  if (editing) {
    return (
      <div>
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
            {editing === "new" ? "New Post" : "Edit Post"}
          </h1>
          <div className="flex gap-2">
            <button onClick={() => setEditing(null)} className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors">
              Batal
            </button>
            <button onClick={handleSave} disabled={saving} className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-dark transition-colors disabled:opacity-60">
              {saving ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </div>
        {error && (
          <p className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30 px-4 py-3 rounded-xl mb-6">{error}</p>
        )}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Judul</label>
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Slug</label>
            <input value={slugify(form.title)} disabled className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-white text-sm opacity-60" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Excerpt</label>
            <input value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Ringkasan singkat..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Konten</label>
            <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={10} className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none" placeholder="Tulis konten blog di sini..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Gambar URL</label>
            <input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="https://..." />
          </div>
          <div className="flex items-center gap-3">
            <input type="checkbox" id="published" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} className="w-4 h-4 text-primary rounded border-slate-300" />
            <label htmlFor="published" className="text-sm font-medium text-slate-600 dark:text-slate-400">Published</label>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Blog Posts</h1>
        <button onClick={startNew} className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-dark transition-colors">
          <HiPlus size={16} />
          New Post
        </button>
      </div>

      {loading ? (
        <p className="text-slate-500">Loading...</p>
      ) : posts.length === 0 ? (
        <p className="text-slate-500 dark:text-slate-400 text-center py-12">Belum ada post. Klik "New Post" untuk menulis.</p>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-slate-800 dark:text-white truncate">{post.title}</h3>
                  <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${post.published ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400" : "bg-slate-100 dark:bg-slate-700 text-slate-500"}`}>
                    {post.published ? "Published" : "Draft"}
                  </span>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 truncate">{post.excerpt || "No excerpt"}</p>
              </div>
              <div className="flex gap-2 ml-4">
                <button onClick={() => startEdit(post.id)} className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors">
                  <HiPencil size={18} />
                </button>
                <button onClick={() => handleDelete(post.id)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors">
                  <HiTrash size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
