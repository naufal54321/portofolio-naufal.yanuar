import { useState, useEffect, useCallback } from "react"
import { supabase } from "../lib/supabase"
import type { Experience } from "../types"

export function useExperiences() {
  const [data, setData] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)

  const fetch = useCallback(async () => {
    if (!supabase) { setLoading(false); return }
    setLoading(true)
    try {
      const { data: rows } = await supabase
        .from("experiences")
        .select("*")
        .order("created_at", { ascending: false })
      setData(rows ?? [])
    } catch (e) {
      console.warn("[Portfolio] Failed to load experiences:", e)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetch() }, [fetch])

  const add = async (item: Omit<Experience, "id" | "created_at">) => {
    if (!supabase) return
    await supabase.from("experiences").insert(item)
    await fetch()
  }

  const update = async (id: string, item: Partial<Experience>) => {
    if (!supabase) return
    await supabase.from("experiences").update(item).eq("id", id)
    await fetch()
  }

  const remove = async (id: string) => {
    if (!supabase) return
    await supabase.from("experiences").delete().eq("id", id)
    await fetch()
  }

  return { data, loading, add, update, remove, refetch: fetch }
}
