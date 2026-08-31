"use client";

import { X, SlidersHorizontal } from "lucide-react";

interface FilterState {
  category: string;
  zone: string;
  claimStatus: "all" | "available" | "claimed";
}

export function FilterModal({
  isOpen,
  onClose,
  categories,
  zones,
  filters,
  onFilterChange,
  onReset,
}: {
  isOpen: boolean;
  onClose: () => void;
  categories: string[];
  zones: string[];
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onReset: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-end flex-col animate-in fade-in duration-200">
      <div className="bg-[#1c1c1e] rounded-t-3xl border-t border-zinc-800 p-6 flex flex-col gap-6 max-h-[85vh] overflow-y-auto">
        <div className="flex justify-between items-center pb-3 border-b border-zinc-800">
          <div className="flex items-center gap-2 text-white font-bold text-lg">
            <SlidersHorizontal size={20} className="text-[#3b82f6]" /> Filter
          </div>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white p-1"
          >
            <X size={20} />
          </button>
        </div>

        {/* Claim Status */}
        <div>
          <label className="text-xs text-zinc-400 font-semibold uppercase tracking-wider block mb-2">
            Claim Status
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(["all", "available", "claimed"] as const).map((status) => (
              <button
                key={status}
                onClick={() =>
                  onFilterChange({ ...filters, claimStatus: status })
                }
                className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-colors ${
                  filters.claimStatus === status
                    ? "bg-[#2563eb] text-white border-[#2563eb]"
                    : "border-zinc-800 text-zinc-400 hover:border-zinc-700"
                }`}
              >
                {status === "all"
                  ? "All"
                  : status === "available"
                    ? "Available"
                    : "Claimed"}
              </button>
            ))}
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="text-xs text-zinc-400 font-semibold uppercase tracking-wider block mb-2">
            Category
          </label>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => onFilterChange({ ...filters, category: cat })}
                className={`py-2 px-4 rounded-xl text-xs font-semibold border transition-colors ${
                  filters.category === cat
                    ? "bg-[#2563eb] text-white border-[#2563eb]"
                    : "border-zinc-800 text-zinc-400 hover:border-zinc-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Zone */}
        <div>
          <label className="text-xs text-zinc-400 font-semibold uppercase tracking-wider block mb-2">
            Location / Zone
          </label>
          <div className="flex flex-wrap gap-2">
            {zones.map((z) => (
              <button
                key={z}
                onClick={() => onFilterChange({ ...filters, zone: z })}
                className={`py-2 px-4 rounded-xl text-xs font-semibold border transition-colors ${
                  filters.zone === z
                    ? "bg-[#2563eb] text-white border-[#2563eb]"
                    : "border-zinc-800 text-zinc-400 hover:border-zinc-700"
                }`}
              >
                {z}
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <button
            onClick={onReset}
            className="flex-1 py-3 text-sm font-semibold border border-zinc-700 text-zinc-300 rounded-xl hover:bg-zinc-800 transition-colors"
          >
            Reset All
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-3 text-sm font-semibold bg-[#2563eb] text-white rounded-xl hover:bg-blue-600 transition-colors"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}
