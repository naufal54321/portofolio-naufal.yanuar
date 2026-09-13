import { useState, useEffect } from "react"
import { useSettings } from "../../hooks/useSettings"
import { HiSave } from "react-icons/hi"

const sections = [
  {
    title: "Hero",
    fields: [
      { key: "hero_name", label: "Nama", placeholder: "Muhammad Naufal Yanuar" },
      { key: "hero_title", label: "Title", placeholder: "Full Stack Web Developer" },
      { key: "hero_description", label: "Deskripsi", placeholder: "Deskripsi singkat..." },
      { key: "profile_image", label: "Foto Profil URL", placeholder: "/images/profile.png" },
    ],
  },
  {
    title: "About",
    fields: [
      { key: "about_bio_1", label: "Bio Paragraf 1", placeholder: "Bio pertama..." },
      { key: "about_bio_2", label: "Bio Paragraf 2", placeholder: "Bio kedua..." },
      { key: "stat_projects", label: "Stat: Projects", placeholder: "20+" },
      { key: "stat_websites", label: "Stat: Websites", placeholder: "5+" },
      { key: "stat_years", label: "Stat: Tahun", placeholder: "3+" },
      { key: "stat_spirit", label: "Stat: Semangat", placeholder: "100%" },
    ],
  },
  {
    title: "Contact",
    fields: [
      { key: "contact_email", label: "Email", placeholder: "email@gmail.com" },
      { key: "contact_whatsapp", label: "WhatsApp", placeholder: "+62 8xx-xxxx-xxxx" },
      { key: "contact_whatsapp_link", label: "WhatsApp Link", placeholder: "https://wa.me/628xxxxxxxxxx" },
      { key: "contact_instagram", label: "Instagram", placeholder: "@username" },
      { key: "contact_instagram_link", label: "Instagram Link", placeholder: "https://instagram.com/username" },
      { key: "contact_github", label: "GitHub", placeholder: "username" },
      { key: "contact_github_link", label: "GitHub Link", placeholder: "https://github.com/username" },
      { key: "contact_linkedin", label: "LinkedIn", placeholder: "Nama Lengkap" },
      { key: "contact_linkedin_link", label: "LinkedIn Link", placeholder: "https://linkedin.com/in/username" },
    ],
  },
  {
    title: "Footer",
    fields: [
      { key: "footer_name", label: "Nama di Footer", placeholder: "Muhammad Naufal Yanuar" },
    ],
  },
]

export default function SettingsAdmin() {
  const { data, loading, updateMany } = useSettings()
  const [form, setForm] = useState<Record<string, string>>({})
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    setForm(data)
  }, [data])

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    setSaved(false)
    setError("")
  }

  const handleSave = async () => {
    setSaving(true)
    setError("")
    const items = Object.entries(form).map(([key, value]) => ({ key, value }))
    const result = await updateMany(items)
    setSaving(false)
    if (result.error) {
      setError(result.error)
    } else {
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Settings</h1>
        <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-dark transition-colors disabled:opacity-60">
          <HiSave />
          {saving ? "Menyimpan..." : saved ? "Tersimpan!" : "Simpan Semua"}
        </button>
      </div>

      {error && (
        <p className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30 px-4 py-3 rounded-xl mb-6">
          Gagal menyimpan: {error}
        </p>
      )}

      {loading ? (
        <p className="text-slate-500">Loading...</p>
      ) : (
        <div className="space-y-8">
          {sections.map((section) => (
            <div key={section.title} className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
              <h2 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">
                {section.title}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {section.fields.map((field) => (
                  <div key={field.key}>
                    <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                      {field.label}
                    </label>
                    {field.key.includes("bio") || field.key.includes("description") ? (
                      <textarea
                        value={form[field.key] || ""}
                        onChange={(e) => handleChange(field.key, e.target.value)}
                        rows={2}
                        placeholder={field.placeholder}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-white text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                      />
                    ) : (
                      <input
                        value={form[field.key] || ""}
                        onChange={(e) => handleChange(field.key, e.target.value)}
                        placeholder={field.placeholder}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
