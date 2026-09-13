import { useState, useEffect, useCallback } from "react"
import { supabase } from "../lib/supabase"
import type { Project } from "../types"

export function useProjects() {
  const [data, setData] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  const fetch = useCallback(async () => {
    setLoading(true)
    const { data: rows } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false })
    setData(rows ?? [])
    setLoading(false)
  }, [])

  useEffect(() => { fetch() }, [fetch])

  const add = async (item: Omit<Project, "id" | "created_at">) => {
    await supabase.from("projects").insert(item)
    await fetch()
  }

  const update = async (id: string, item: Partial<Project>) => {
    await supabase.from("projects").update(item).eq("id", id)
    await fetch()
  }

  const remove = async (id: string) => {
    await supabase.from("projects").delete().eq("id", id)
    await fetch()
  }

  return { data, loading, add, update, remove, refetch: fetch }
}
