import { useState, useEffect, useCallback } from "react"
import { supabase } from "../lib/supabase"

export interface Settings {
  [key: string]: string
}

export function useSettings() {
  const [data, setData] = useState<Settings>({})
  const [loading, setLoading] = useState(true)

  const fetch = useCallback(async () => {
    if (!supabase) { setLoading(false); return }
    setLoading(true)
    try {
      const { data: rows, error } = await supabase.from("settings").select("key, value")
      if (error) {
        console.warn("[Portfolio] Failed to load settings:", error.message)
      } else {
        const map: Settings = {}
        rows?.forEach((r) => { map[r.key] = r.value })
        setData(map)
      }
    } catch (e) {
      console.warn("[Portfolio] Failed to load settings:", e)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetch() }, [fetch])

  const update = async (key: string, value: string) => {
    if (!supabase) return { error: "Supabase not configured" }
    const { error } = await supabase.from("settings").upsert({ key, value })
    if (error) {
      console.warn("[Portfolio] Failed to update setting:", error.message)
      return { error: error.message }
    }
    await fetch()
    return {}
  }

  const updateMany = async (items: { key: string; value: string }[]) => {
    if (!supabase) return { error: "Supabase not configured" }
    const { error } = await supabase.from("settings").upsert(items)
    if (error) {
      console.warn("[Portfolio] Failed to update settings:", error.message)
      return { error: error.message }
    }
    await fetch()
    return {}
  }

  return { data, loading, update, updateMany, refetch: fetch }
}
