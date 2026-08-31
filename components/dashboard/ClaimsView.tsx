"use client";

import { ArrowLeft, Search } from "lucide-react";
import { Item } from "@/lib/types";
import { ItemCard } from "./ItemCard";

export function ClaimsView({
  items,
  loading,
  onSelectItem,
  onBack,
}: {
  items: Item[];
  loading: boolean;
  onSelectItem: (item: Item) => void;
  onBack: () => void;
}) {
  return (
    <>
      <header className="bg-[#0f3d79] px-4 pt-12 pb-4 flex items-center gap-3 shrink-0">
        <button
          onClick={onBack}
          className="text-white p-1 hover:bg-white/10 rounded-full transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-white">My Claims</h1>
      </header>

      <main className="flex-1 overflow-y-auto bg-[#131315] flex flex-col [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none">
        <div className="p-5 flex flex-col gap-4">
          {loading ? (
            <div className="text-center py-12 text-zinc-500">Loading...</div>
          ) : items.length === 0 ? (
            <div className="text-center py-12 px-4">
              <div className="w-12 h-12 rounded-full bg-zinc-800/80 flex items-center justify-center mx-auto mb-3 text-zinc-400">
                <Search size={22} />
              </div>
              <h3 className="text-zinc-200 font-semibold mb-1">
                No claims yet
              </h3>
              <p className="text-zinc-500 text-sm">
                Items you claim will appear here.
              </p>
            </div>
          ) : (
            items.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                onClick={() => onSelectItem(item)}
              />
            ))
          )}
        </div>
      </main>
    </>
  );
}
