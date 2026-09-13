import { useState, useEffect, useCallback } from "react"
import { supabase } from "../lib/supabase"
import type { Skill } from "../types"

export function useSkills() {
  const [data, setData] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)

  const fetch = useCallback(async () => {
    setLoading(true)
    const { data: rows } = await supabase
      .from("skills")
      .select("*")
      .order("created_at", { ascending: false })
    setData(rows ?? [])
    setLoading(false)
  }, [])

  useEffect(() => { fetch() }, [fetch])

  const add = async (item: Omit<Skill, "id" | "created_at">) => {
    await supabase.from("skills").insert(item)
    await fetch()
  }

  const update = async (id: string, item: Partial<Skill>) => {
    await supabase.from("skills").update(item).eq("id", id)
    await fetch()
  }

  const remove = async (id: string) => {
    await supabase.from("skills").delete().eq("id", id)
    await fetch()
  }

  return { data, loading, add, update, remove, refetch: fetch }
}
