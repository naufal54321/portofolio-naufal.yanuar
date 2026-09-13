import { useState, useEffect, useCallback } from "react"
import { supabase } from "../lib/supabase"

export interface Settings {
  [key: string]: string
}

export function useSettings() {
  const [data, setData] = useState<Settings>({})
  const [loading, setLoading] = useState(true)

  const fetch = useCallback(async () => {
    setLoading(true)
    const { data: rows } = await supabase.from("settings").select("key, value")
    const map: Settings = {}
    rows?.forEach((r) => { map[r.key] = r.value })
    setData(map)
    setLoading(false)
  }, [])

  useEffect(() => { fetch() }, [fetch])

  const update = async (key: string, value: string) => {
    await supabase.from("settings").upsert({ key, value })
    await fetch()
  }

  const updateMany = async (items: { key: string; value: string }[]) => {
    await supabase.from("settings").upsert(items)
    await fetch()
  }

  return { data, loading, update, updateMany, refetch: fetch }
}
