"use client"

import { useState, useMemo, useEffect } from "react"
import { useItems, getCurrentUserId } from "@/lib/useItems"
import { Item } from "@/lib/types"
import { HomeView } from "@/components/dashboard/HomeView"
import { ClaimsView } from "@/components/dashboard/ClaimsView"
import { ReportView } from "@/components/dashboard/ReportView"
import { ItemDetailView } from "@/components/dashboard/ItemDetailView"
import { FilterModal } from "@/components/dashboard/FilterModal"
import { BottomNav } from "@/components/dashboard/BottomNav"

type View = "home" | "claims" | "report" | "detail"

export default function Dashboard() {
  const { items, loading, userItems, userItemsLoading, fetchUserItems, toggleClaim, addItem } = useItems()
  const [view, setView] = useState<View>("home")
  const [previousView, setPreviousView] = useState<"home" | "claims" | "report">("home")
  const [selectedItem, setSelectedItem] = useState<Item | null>(null)

  // Filter states for Browse
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedZone, setSelectedZone] = useState("All")
  const [claimStatusFilter, setClaimStatusFilter] = useState<"all" | "available" | "claimed">("available")
  const [showFilterModal, setShowFilterModal] = useState(false)

  // Derive categories and zones from data
  const categories = useMemo(() => {
    const set = new Set(items.map((i) => i.category).filter(Boolean) as string[])
    return ["All", ...Array.from(set)]
  }, [items])

  const zones = useMemo(() => {
    const set = new Set(items.map((i) => i.zone).filter(Boolean) as string[])
    return ["All", ...Array.from(set)]
  }, [items])

  // Fetch user items when Claims tab opens
  useEffect(() => {
    if (view === "claims") {
      const userId = getCurrentUserId()
      if (userId) fetchUserItems(userId)
    }
  }, [view, fetchUserItems])

  const handleSelectItem = (item: Item) => {
    setSelectedItem(item)
    setPreviousView(view === "detail" ? "home" : view)
    setView("detail")
  }

  const handleToggleClaim = async (itemId: number) => {
    await toggleClaim(itemId)
    if (selectedItem?.id === itemId) {
      setSelectedItem((prev) => {
        if (!prev) return prev
        const next = !prev.isclaim
        return { ...prev, isclaim: next, userid: next ? getCurrentUserId() : null }
      })
    }
  }

  const handleAddItem = async (data: { name: string; category: string; zone: string; image?: string }) => {
    const ok = await addItem(data)
    if (ok) setView("home")
  }

  const handleCategorySelect = (cat: string) => {
    setSelectedCategory(cat)
    if (cat === "All") {
      setSelectedZone("All")
      setClaimStatusFilter("all")
    }
  }

  const resetFilters = () => {
    setSelectedCategory("All")
    setSelectedZone("All")
    setClaimStatusFilter("available")
    setSearchQuery("")
  }

  return (
    <div className="flex flex-col h-screen w-full bg-[#121212] text-zinc-100 font-sans md:max-w-md md:mx-auto md:border-x md:border-zinc-900 overflow-hidden relative">
      {view === "home" && (
        <HomeView
          items={items}
          loading={loading}
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={handleCategorySelect}
          selectedZone={selectedZone}
          setSelectedZone={setSelectedZone}
          claimStatusFilter={claimStatusFilter}
          setClaimStatusFilter={setClaimStatusFilter}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSelectItem={handleSelectItem}
          onOpenFilter={() => setShowFilterModal(true)}
          onReport={() => setView("report")}
        />
      )}

      {view === "claims" && (
        <ClaimsView
          items={userItems}
          loading={userItemsLoading}
          onSelectItem={handleSelectItem}
          onBack={() => setView("home")}
        />
      )}

      {view === "report" && (
        <ReportView
          categories={categories.filter((c) => c !== "All")}
          zones={zones.filter((z) => z !== "All")}
          onBack={() => setView("home")}
          onSubmit={handleAddItem}
        />
      )}

      {view === "detail" && selectedItem && (
        <ItemDetailView
          item={selectedItem}
          onBack={() => setView(previousView)}
          onToggleClaim={handleToggleClaim}
        />
      )}

      {view !== "detail" && <BottomNav view={view} setView={setView} />}

      <FilterModal
        isOpen={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        categories={categories}
        zones={zones}
        filters={{
          category: selectedCategory,
          zone: selectedZone,
          claimStatus: claimStatusFilter,
        }}
        onFilterChange={(f) => {
          setSelectedCategory(f.category)
          setSelectedZone(f.zone)
          setClaimStatusFilter(f.claimStatus)
        }}
        onReset={resetFilters}
      />
    </div>
  )
}
