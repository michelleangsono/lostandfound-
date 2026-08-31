"use client"

import { useState, useEffect, useCallback } from "react"
import { Item } from "@/lib/types"

export function getCurrentUserId(): number | null {
  if (typeof window === "undefined") return null
  try {
    const raw = sessionStorage.getItem("user")
    if (raw) {
      const user = JSON.parse(raw)
      return user.id ?? null
    }
  } catch {
    // ignore
  }
  return null
}

export function useItems() {
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [userItems, setUserItems] = useState<Item[]>([])
  const [userItemsLoading, setUserItemsLoading] = useState(false)

  useEffect(() => {
    let cancelled = false
    fetch("/api/items")
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setItems(Array.isArray(data) ? data : [])
      })
      .catch(() => {
        if (!cancelled) setError("Failed to fetch items")
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  const fetchUserItems = useCallback(async (userid: number) => {
    setUserItemsLoading(true)
    try {
      const res = await fetch(`/api/items?userid=${userid}`)
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setUserItems(data)
    } catch {
      setUserItems([])
    } finally {
      setUserItemsLoading(false)
    }
  }, [])

  const toggleClaim = async (itemId: number) => {
    const item = items.find((i) => i.id === itemId)
    if (!item) return

    const wasClaimed = item.isclaim === true
    const nextIsClaim = !wasClaimed
    const nextUserId = nextIsClaim ? getCurrentUserId() : null

    setItems((prev) =>
      prev.map((i) =>
        i.id === itemId ? { ...i, isclaim: nextIsClaim, userid: nextUserId } : i,
      ),
    )

    try {
      const res = await fetch("/api/items", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: itemId, isclaim: nextIsClaim, userid: nextUserId }),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error)
      }
    } catch {
      setItems((prev) =>
        prev.map((i) =>
          i.id === itemId ? { ...i, isclaim: wasClaimed, userid: item.userid } : i,
        ),
      )
    }
  }

  const addItem = async (newItem: { name: string; category: string; zone: string; image?: string }) => {
    try {
      const res = await fetch("/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newItem, isclaim: false, userid: null }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setItems((prev) => [data, ...prev])
      return true
    } catch {
      return false
    }
  }

  return { items, loading, error, userItems, userItemsLoading, fetchUserItems, toggleClaim, addItem }
}
