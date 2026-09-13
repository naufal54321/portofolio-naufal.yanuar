import { useState, useEffect, useCallback } from "react"
import { supabase } from "../lib/supabase"
import type { Post } from "../types"

export function usePosts() {
  const [data, setData] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  const fetch = useCallback(async () => {
    if (!supabase) { setLoading(false); return }
    setLoading(true)
    try {
      const { data: rows, error } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false })
      if (error) {
        console.warn("[Portfolio] Failed to load posts:", error.message)
      } else {
        setData(rows ?? [])
      }
    } catch (e) {
      console.warn("[Portfolio] Failed to load posts:", e)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetch() }, [fetch])

  const add = async (item: Omit<Post, "id" | "created_at">) => {
    if (!supabase) return { error: "Supabase not configured" }
    const { error } = await supabase.from("posts").insert(item)
    if (error) return { error: error.message }
    await fetch()
    return {}
  }

  const update = async (id: string, item: Partial<Post>) => {
    if (!supabase) return { error: "Supabase not configured" }
    const { error } = await supabase.from("posts").update(item).eq("id", id)
    if (error) return { error: error.message }
    await fetch()
    return {}
  }

  const remove = async (id: string) => {
    if (!supabase) return { error: "Supabase not configured" }
    const { error } = await supabase.from("posts").delete().eq("id", id)
    if (error) return { error: error.message }
    await fetch()
    return {}
  }

  return { data, loading, add, update, remove, refetch: fetch }
}
