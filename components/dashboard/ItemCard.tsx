"use client"

import { MapPin } from "lucide-react"
import { Item } from "@/lib/types"
import { ItemCategoryIcon } from "./ItemCategoryIcon"

export function ItemCard({
  item,
  onClick,
}: {
  item: Item
  onClick: () => void
}) {
  const isClaimed = item.isclaim === true

  return (
    <div
      onClick={onClick}
      className={`p-4 rounded-3xl flex gap-4 border transition-colors cursor-pointer shadow-sm ${
        isClaimed
          ? "bg-[#18181b] border-zinc-900/80 opacity-60"
          : "bg-[#1c1c1e] border-zinc-800/40 hover:border-zinc-700"
      }`}
    >
      <ItemCategoryIcon category={item.category} />
      <div className="flex-1 flex flex-col justify-between min-w-0 py-0.5">
        <div>
          <div className="flex justify-between items-start mb-1">
            <h3
              className={`font-semibold text-[17px] truncate pr-2 ${isClaimed ? "text-zinc-300" : "text-zinc-100"}`}
            >
              {item.name}
            </h3>
            {isClaimed ? (
              <span className="text-zinc-500 text-[12px] font-medium pt-0.5">
                Claimed
              </span>
            ) : (
              <span className="bg-[#eaf4d9] text-[#4d7c0f] px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide flex-shrink-0">
                Available
              </span>
            )}
          </div>
          <p
            className={`text-[14px] leading-snug line-clamp-2 pr-1 ${isClaimed ? "text-zinc-500" : "text-zinc-400"}`}
          >
            Found in {item.zone || "Unknown Zone"}
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-zinc-500 text-xs mt-3">
          <MapPin size={13} />
          <span className="truncate">{item.zone || "Lost & Found"}</span>
        </div>
      </div>
    </div>
  )
}
