"use client";

import { Bell, Search, SlidersHorizontal } from "lucide-react";
import { Item } from "@/lib/types";
import { FilterBar } from "./FilterBar";
import { ItemCard } from "./ItemCard";

export function HomeView({
  items,
  loading,
  categories,
  selectedCategory,
  setSelectedCategory,
  selectedZone,
  setSelectedZone,
  claimStatusFilter,
  setClaimStatusFilter,
  searchQuery,
  onSearchChange,
  onSelectItem,
  onOpenFilter,
  onReport,
}: {
  items: Item[];
  loading: boolean;
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedZone: string;
  setSelectedZone: (zone: string) => void;
  claimStatusFilter: "all" | "available" | "claimed";
  setClaimStatusFilter: (status: "all" | "available" | "claimed") => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onSelectItem: (item: Item) => void;
  onOpenFilter: () => void;
  onReport: () => void;
}) {
  const filtered = items.filter((item) => {
    if (selectedCategory !== "All" && item.category !== selectedCategory)
      return false;
    if (selectedZone !== "All" && item.zone !== selectedZone) return false;
    if (claimStatusFilter === "available" && item.isclaim) return false;
    if (claimStatusFilter === "claimed" && !item.isclaim) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        item.name.toLowerCase().includes(q) ||
        item.zone?.toLowerCase().includes(q) ||
        item.category?.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  }).sort((a, b) => {
    if (a.isclaim === b.isclaim) return 0;
    return a.isclaim ? 1 : -1;
  });

  return (
    <>
      <header className="bg-[#0f3d79] px-5 pt-12 pb-5 flex flex-col gap-5 flex-shrink-0">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-blue-100/90 text-sm mb-0.5">Good morning</p>
            <h1 className="text-[26px] leading-none font-bold text-white tracking-tight">
              Michelle
            </h1>
          </div>
          <div className="relative mt-1">
            <Bell className="text-white" size={24} />
            <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-orange-400 rounded-full border-2 border-[#0f3d79]"></div>
          </div>
        </div>
        <div className="bg-white rounded-xl px-4 py-2.5 flex items-center gap-2 shadow-sm">
          <Search className="text-zinc-400" size={20} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search water bottle, jumper..."
            className="flex-1 bg-transparent text-zinc-900 outline-none text-[15px] placeholder:text-zinc-400"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="text-zinc-400 hover:text-zinc-600 transition-colors"
            >
              <span className="text-xs">Clear</span>
            </button>
          )}
        </div>
      </header>

      <main className="flex-1 overflow-y-auto bg-[#131315] flex flex-col [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="px-5 py-4 border-b border-zinc-800/60 sticky top-0 bg-[#131315] z-10">
          <div className="flex items-center gap-3">
            <div className="flex-1 overflow-hidden">
              <FilterBar
                categories={categories}
                selected={selectedCategory}
                onSelect={setSelectedCategory}
              />
            </div>
            <button
              onClick={onOpenFilter}
              className="flex-shrink-0 p-2 rounded-lg border border-zinc-700 text-zinc-300 hover:bg-zinc-800 transition-colors"
            >
              <SlidersHorizontal size={18} />
            </button>
          </div>
          <p className="text-zinc-400 text-sm mt-4">
            {filtered.length} of {items.length} items in the room
          </p>
        </div>

        <div className="p-5 flex flex-col gap-4">
          {loading ? (
            <div className="text-center py-12 text-zinc-500">Loading...</div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-12 px-4">
              <div className="w-12 h-12 rounded-full bg-zinc-800/80 flex items-center justify-center mx-auto mb-3 text-zinc-400">
                <Search size={22} />
              </div>
              <h3 className="text-zinc-200 font-semibold mb-1">
                No items found
              </h3>
              <p className="text-zinc-500 text-sm">
                Try another search or category.
              </p>
            </div>
          ) : (
            filtered.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                onClick={() => onSelectItem(item)}
              />
            ))
          )}

          <div className="bg-[#151515] rounded-[24px] p-6 flex flex-col items-center text-center mt-4 border border-zinc-800/80 mb-6">
            <h3 className="text-white font-semibold text-[17px] mb-1.5">
              Not seeing your item?
            </h3>
            <p className="text-[14px] text-zinc-400 mb-5 leading-snug px-2">
              File a report and staff will check the room and cameras.
            </p>
            <button
              onClick={onReport}
              className="w-full py-3.5 rounded-[14px] border border-[#2563eb]/30 text-[#3b82f6] font-semibold text-[15px] hover:bg-blue-900/20 transition-colors"
            >
              Report a missing item
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
