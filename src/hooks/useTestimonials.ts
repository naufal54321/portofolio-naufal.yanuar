import { useState, useEffect, useCallback } from "react"
import { supabase } from "../lib/supabase"
import type { Testimonial } from "../types"

export function useTestimonials() {
  const [data, setData] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)

  const fetch = useCallback(async () => {
    setLoading(true)
    const { data: rows } = await supabase
      .from("testimonials")
      .select("*")
      .order("created_at", { ascending: false })
    setData(rows ?? [])
    setLoading(false)
  }, [])

  useEffect(() => { fetch() }, [fetch])

  const add = async (item: Omit<Testimonial, "id" | "created_at">) => {
    await supabase.from("testimonials").insert(item)
    await fetch()
  }

  const update = async (id: string, item: Partial<Testimonial>) => {
    await supabase.from("testimonials").update(item).eq("id", id)
    await fetch()
  }

  const remove = async (id: string) => {
    await supabase.from("testimonials").delete().eq("id", id)
    await fetch()
  }

  return { data, loading, add, update, remove, refetch: fetch }
}
